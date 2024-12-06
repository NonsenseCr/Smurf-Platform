require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../model/user.model");
const KhachHang = require("../model/khachhang.model");
const Avatar = require("../model/Avatar.model");

// Hàm lấy danh sách avatar và chọn ngẫu nhiên
async function getRandomAvatar() {
  try {
    const avatars = await Avatar.find({ Active: true });
    if (avatars.length === 0) {
      return null; // Trả về null nếu không có avatar nào
    }
    const randomIndex = Math.floor(Math.random() * avatars.length);
    return avatars[randomIndex]._id; // Trả về ID của avatar ngẫu nhiên
  } catch (err) {
    console.error("Error fetching avatars:", err);
    return null;
  }
}

// Cấu hình Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const googleId = profile.id;

        // Tìm User dựa trên email
        let user = await User.findOne({ Email: email });

        if (!user) {
          const session = await User.startSession();
          session.startTransaction();

          try {
            // Tạo mới User
            user = new User({
              IdUser: `GOOGLE_${googleId}`,
              Email: email,
              UserName: profile.displayName || email.split("@")[0],
              TimeCreated: new Date(),
              TimeUpdated: new Date(),
              Active: true,
              UserRole: false,
            });

            await user.save({ session });

            // Lấy avatar ngẫu nhiên
            const randomAvatar = await getRandomAvatar();

            // Tạo mới KhachHang
            const newKhachHang = new KhachHang({
              IdUser: user.IdUser,
              GoogleAccount: googleId,
              IdAvatar: randomAvatar || null,
              SocialLogins: [{ LoginProvider: "Google", ProviderKey: googleId }],
            });

            await newKhachHang.save({ session });

            await session.commitTransaction();
            session.endSession();

            // Trả về User và yêu cầu hoàn tất thông tin
            return done(null, { user, newAccount: true });
          } catch (err) {
            await session.abortTransaction();
            session.endSession();
            console.error("Error creating user and KhachHang:", err);
            return done(err, null);
          }
        }

        // Nếu đã tồn tại, kiểm tra GoogleAccount trong KhachHang
        let khachHang = await KhachHang.findOne({ IdUser: user.IdUser });
        if (khachHang) {
          khachHang.GoogleAccount = googleId;
          khachHang.SocialLogins.push({ LoginProvider: "Google", ProviderKey: googleId });
          await khachHang.save();
        }

        // if (!khachHang.GoogleAccount) {
          
        // }

        // Nếu tài khoản đã tồn tại, không cần hoàn tất thông tin
        done(null, { user, newAccount: false });
      } catch (err) {
        console.error("Error during Google authentication:", err);
        done(err, null);
      }
    }
  )
);

// Serialize User
passport.serializeUser((data, done) => {
  done(null, data.user.IdUser);
});

// Deserialize User
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ IdUser: id });
    if (!user) {
      console.error(`User not found with IdUser: ${id}`);
      return done(new Error("User not found"), null);
    }

    const khachHang = await KhachHang.findOne({ IdUser: id });
    if (!khachHang) {
      console.error(`KhachHang not found for IdUser: ${id}`);
      return done(new Error("KhachHang not found"), null);
    }

    done(null, { user, khachHang });
  } catch (err) {
    console.error("Error during deserialization:", err);
    done(err, null);
  }
});

module.exports = passport;
