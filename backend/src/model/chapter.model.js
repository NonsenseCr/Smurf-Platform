const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
    id_bo: { type: mongoose.Schema.Types.ObjectId, ref: 'BoTruyen', required: true }, // Bộ truyện
    stt_chap: { type: Number, required: true }, // Số thứ tự chương
    ten_chap: { type: String, required: true }, // Tên chương
    content: { type: String },                 // Nội dung chương
    thoi_gian: { type: Date, default: Date.now }, // Thời gian đăng
    trangthai: { type: String, enum: ['hoat_dong', 'tam_ngung'], default: 'hoat_dong' }, // Trạng thái chương
    premium: { type: Boolean, default: false },  // Trạng thái premium
    ticket_cost: { type: Number, default: 0 },   // Giá vé đọc
    luotxem: { type: Number, default: 0 },       // Lượt xem
    active: { type: Boolean, default: true },    // Trạng thái hoạt động
});

const Chapter = mongoose.model('Chapter', ChapterSchema);


module.exports = Chapter;