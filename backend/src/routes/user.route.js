const express = require('express');
const User = require('../model/user.model'); // Import model User
const router = express.Router();

// Route xóa tất cả người dùng
router.delete('/delete-all', async (req, res) => {
    try {
        // Xóa tất cả người dùng
        const result = await User.deleteMany({});
        
        // Phản hồi kết quả
        res.status(200).json({
            success: true,
            message: `Đã xóa ${result.deletedCount} tài khoản người dùng thành công.`,
        });
    } catch (error) {
        console.error('Error deleting all users:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi xóa tất cả tài khoản người dùng.',
        });
    }
});

module.exports = router;
