const mongoose = require('mongoose');

// Schema CT_Chapter
const CT_ChapterSchema = new mongoose.Schema({
    id_bo: { type: mongoose.Schema.Types.ObjectId, ref: 'BoTruyen', required: true },
    stt_chap: { type: Number, required: true }, // Số thứ tự chương
    so_trang: { type: Number, required: true }, // Số thứ tự trang
    anh_trang: { type: String, required: true }, // Đường dẫn ảnh
    active: { type: Boolean, default: true },
});

const CT_Chapter = mongoose.model('CT_Chapter', CT_ChapterSchema);

module.exports = CT_Chapter;
