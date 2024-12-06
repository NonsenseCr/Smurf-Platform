const { Schema, model } = require('mongoose');

// Định nghĩa schema cho Payment
const paymentSchema = new Schema(
    {
        IdPayment: { type: String, required: true, unique: true }, 
        IdUser: { type: Schema.Types.ObjectId, ref: 'KhachHang', required: true }, 
        IdPack: { type: Schema.Types.ObjectId, ref: 'ServicePackConfig', required: false },
        PayAmount: { type: Number, required: true }, 
        PayMethod: {
            type: String,
            enum: ['Cash', 'Card', 'Other'], 
            required: true,
        },
        PayStats: {
            type: String,
            enum: ['Pending', 'Completed', 'Cancelled'], 
            default: 'Pending',
        },
        PayDate: { type: Date, default: Date.now },
        ExpiresTime: { type: Date, required: false }, 
    },
    {
        timestamps: true,
    }
);

// Tạo và xuất mô hình Payment
const Payment = model('Payment', paymentSchema);

module.exports = Payment;
