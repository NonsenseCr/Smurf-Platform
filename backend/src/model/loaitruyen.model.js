const mongoose = require('mongoose');

const LoaiTruyenSchema = new mongoose.Schema({
    ten_loai: { type: String, required: true },  // Tên thể loại truyện
    active: { type: Boolean, default: true },   // Trạng thái hoạt động của thể loại
}, { timestamps: true }); 

const LoaiTruyen = mongoose.model('LoaiTruyen', LoaiTruyenSchema);

module.exports = LoaiTruyen;
