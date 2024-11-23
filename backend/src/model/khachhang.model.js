const mongoose = require('mongoose');

const KhachHangSchema = new mongoose.Schema({
    google_account: { type: String },              // Tài khoản Google
    facebook_account: { type: String },            // Tài khoản Facebook
    avatar: { type: mongoose.Schema.Types.ObjectId, ref: 'Avatar' }, // Avatar
    ticket_salary: { type: Number, default: 0 },   // Số vé còn lại
    active_premium: { type: Boolean, default: false }, // Trạng thái Premium
    active_stats: { type: Number, default: 0 },    // Trạng thái thống kê
});

const KhachHang = mongoose.model('KhachHang', KhachHangSchema);
module.exports = KhachHang;