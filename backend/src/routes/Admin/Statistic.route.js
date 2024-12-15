const express = require('express');
const router = express.Router();
const Payment = require('../../model/Payments.model');
const KhachHang = require('../../model/khachhang.model');
const Chapter = require('../../model/chapter.model');
const BoTruyen = require('../../model/botruyen.model');
const TacGia = require('../../model/tacgia.model');


// Route: Tổng doanh thu
router.get('/total-revenue', async (req, res) => {
    try {
        const totalRevenue = await Payment.aggregate([
            { $match: { PayStats: 'Completed' } },
            { $group: { _id: null, total: { $sum: '$PayAmount' } } },
        ]);
        const revenue = totalRevenue[0]?.total || 0;
        res.json({ title: 'Doanh thu', amount: revenue.toFixed(2) });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tính tổng doanh thu', error });
    }
});


// Route: Tính tổng số lượt xem 
router.get('/total-visits', async (req, res) => {
    try {
        const totalVisits = await Chapter.aggregate([
            { $match: { active: true } },
            { $group: { _id: null, totalLuotXem: { $sum: '$luotxem' } } },
        ]);

        const total = totalVisits[0]?.totalLuotXem || 0;
        res.json({ title: 'Lượt truy cập', amount: total });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tính tổng lượt xem', error });
    }
});

// Route: Tính tổng lượt truy cậpcập
router.get('/active-users', async (req, res) => {
    try {
        const activeUsersCount = await KhachHang.countDocuments({ ActiveStats: 1 });
        res.json({ title: 'Đang hoạt động', amount: activeUsersCount });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi đếm khách hàng đang hoạt động', error });
    }
});

// Route: Đếm tổng số bộ truyện
router.get('/total-series', async (req, res) => {
    try {
        // Đếm tổng số bộ truyện có trạng thái hoạt động
        const totalSeries = await BoTruyen.countDocuments({ active: true }) || 0;

        res.json({
            title: 'Tổng số bộ truyện',
            amount: totalSeries,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi khi đếm tổng số bộ truyện',
            error,
        });
    }
});

// Route: Đếm tổng số chapter
router.get('/total-chapters', async (req, res) => {
    try {
        // Đếm tất cả các chapter
        const totalChapters = await Chapter.countDocuments({}) || 0;

        res.json({
            title: 'Tổng số chapter',
            amount: totalChapters,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi khi đếm tổng số chapter',
            error,
        });
    }
});

// Route: Đếm tổng số tác giả
router.get('/total-authors', async (req, res) => {
    try {
        // Đếm tổng số tác giả có trạng thái hoạt động
        const totalAuthors = await TacGia.countDocuments({ active: true });

        res.json({
            title: 'Tổng số tác giả',
            amount: totalAuthors,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi khi đếm tổng số tác giả',
            error,
        });
    }
});

router.get('/ratings', async (req, res) => {
    try {
        const ratings = await BoTruyen.aggregate([
            { $match: { active: true } },
            {
                $group: {
                    _id: '$danhgia',
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        const formattedRatings = [1, 2, 3, 4, 5].map((star) => {
            const rating = ratings.find((r) => r._id === star);
            return { star, count: rating ? rating.count : 0 };
        });

        res.status(200).json({
            ratings: formattedRatings,
        });
    } catch (error) {
        console.error('Lỗi khi tính tổng số lượng đánh giá:', error);
        res.status(500).json({
            message: 'Lỗi khi tính tổng số lượng đánh giá',
        });
    }
});


module.exports = router;
