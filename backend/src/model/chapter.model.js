const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
    id_bo: { type: mongoose.Schema.Types.ObjectId, ref: 'BoTruyen', required: true }, // Tham chiếu đến bộ truyện
    stt_chap: { type: Number, required: true },     // Số thứ tự của chapter
    ten_chap: { type: String, required: true },     // Tên của chapter
    ChapterContent: { type: String, required: true }, // Nội dung của chapter
    thoi_gian: { type: Date, default: Date.now },   // Ngày đăng hoặc tạo chapter
    TrangThai: { 
        type: String, 
        enum: ['dang_phat_hanh', 'tam_ngung', 'hoan_thanh'], 
        default: 'dang_phat_hanh' 
    },                                             // Trạng thái của chapter
    tt_premium: { type: Boolean, default: false }, // Trạng thái premium
    TicketCost: { type: Number, default: 0 },      // Giá vé để đọc chapter (nếu premium)
    tk_luotxem: { type: Number, default: 0 },      // Tổng lượt xem chapter
    active: { type: Boolean, default: true },      // Trạng thái hoạt động của chapter
}, { timestamps: true }); 

const Chapter = mongoose.model('Chapter', ChapterSchema);

module.exports = Chapter;