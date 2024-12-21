const express = require('express');
const router = express.Router();
const User = require('../../model/user.model'); 
const Staff = require('../../model/Staff.model'); 

// Route thêm nhân viên mới
router.post('/add-staff', async (req, res) => {
    const { userId, StaffRole } = req.body;

    try {
        // Kiểm tra xem _id của User có tồn tại không
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại.' });
        }
        const existingStaff = await Staff.findOne({ userId });
        if (existingStaff) {
            return res.status(400).json({ message: 'Nhân viên đã tồn tại.' });
        }

        // Tạo nhân viên mới
        const newStaff = new Staff({
            userId,
            StaffRole: StaffRole || false,
        });

        // Lưu vào cơ sở dữ liệu
        await newStaff.save();

        res.status(201).json({
            message: 'Thêm nhân viên thành công.',
            data: newStaff,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi hệ thống.' });
    }
});

module.exports = router;
