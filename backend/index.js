const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const session = require("express-session");
const passport = require("./src/config/passport");

const app = express();
const port = process.env.PORT || 5000;

// Middleware for serving static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Import models
const TacGia = require('./src/model/tacgia.model');
const BoTruyen = require('./src/model/botruyen.model');
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultSecret",
    resave: false,
    saveUninitialized: true,
  })
);

// Khởi tạo passport
app.use(passport.initialize());
app.use(passport.session());

// Parse options
app.use(express.json());
app.use(cors());



// Import routes
const boTruyenRoutes = require("./src/routes/botruyen.route");
const loaiTruyenRoutes = require("./src/routes/loaitruyen.route");
const tacGiaRoutes = require("./src/routes/tacgia.route");
const chapterRoutes = require('./src/routes/chapter.route');
const ctchapterRoutes = require('./src/routes/CTChapter.route');
const avatarRoutes = require('./src/routes/avatar.route'); 
const khachhangRoutes = require('./src/routes/khachhang.route'); 
const userRoutes = require('./src/routes/user.route'); 
const registerRoutes = require('./src/routes/register.route'); 
const loginRoutes = require('./src/routes/login.route');
const authRoutes = require('./src/routes/auth.route'); 
const statisticRoutes = require('./src/routes/Admin/Statistic.route'); 


// Use routes
app.use("/api/botruyen", boTruyenRoutes);
app.use("/api/loaitruyen", loaiTruyenRoutes);
app.use("/api/tacgia", tacGiaRoutes);
app.use('/api/chapter', chapterRoutes);
app.use('/api/ctchapter', ctchapterRoutes);
app.use('/api/avatar', avatarRoutes);
app.use('/api/khachhang', khachhangRoutes);
app.use('/api/user', userRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/statistics', statisticRoutes);
console.log(process.env);


// area manager 
const authorManager = require("./src/area-manager/routes/author.route");
app.use("/api/author", authorManager);
const comicRoutes = require("./src/area-manager/routes/comic.route");
app.use("/api/comic", comicRoutes); 
const genreRoutes = require("./src/area-manager/routes/genre.route");
app.use("/api/genres", genreRoutes); 
const staffRoutes = require("./src/area-manager/routes/staff.route");
app.use("/api/staff", staffRoutes); 
const userMRoutes = require("./src/area-manager/routes/user.route");
app.use("/api/user-manager", userMRoutes); 
const rbacRoutes = require("./src/area-manager/routes/rbac-auth.route");
app.use("/api/rbac", rbacRoutes); 
// const serviceRoutes = require("./src/area-manager/routes/service.route");
// app.use("/api/service", serviceRoutes); 


// MongoDB connection
async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URL); // Không cần tùy chọn
    console.log("Mongodb Connected Successfully!!");
  } catch (err) {
    console.error("Mongodb connection error:", err);
  }
}


main();

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
