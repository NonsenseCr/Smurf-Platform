const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new Schema(
    {
        IdUser: { type: Schema.Types.ObjectId, auto: true }, // Tự động tạo ID
        UserName: { type: String, required: true, unique: true }, // Tên người dùng
        Password: { type: String, required: true }, // Mật khẩu
        FullName: { type: String, required: true }, // Họ và tên đầy đủ
        Email: { type: String, required: true, unique: true }, // Email
        Phone: { type: String, required: false }, // Số điện thoại (không bắt buộc)
        Birth: { type: Date, required: false }, // Ngày sinh (không bắt buộc)
        Gender: { type: String, enum: ['Male', 'Female', 'Other'], required: false }, // Giới tính 
        TimeCreated: { type: Date, default: Date.now }, // Thời gian tạo
        TimeUpdated: { type: Date, default: null }, // Thời gian cập nhật
        Active: { type: Boolean, default: true }, // Trạng thái hoạt động
        UserRole: { type: String, enum: ['user', 'admin'], default: 'user' } // Vai trò người dùng
    },
    {
        timestamps: false 
    }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    const user = this;

    // Chỉ hash password nếu nó được thay đổi hoặc mới
    if (!user.isModified('Password')) return next();

    try {
        const hashedPassword = await bcrypt.hash(user.Password, 10); // Hash với độ dài salt 10
        user.Password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

// Add a method to compare passwords
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.Password); // So sánh mật khẩu
};

// Create and export the User model
const UserBoTruyen = model('UserBoTruyen', userSchema);

module.exports = UserBoTruyen;