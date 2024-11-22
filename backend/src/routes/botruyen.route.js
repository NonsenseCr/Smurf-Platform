const express = require('express');
const BoTruyen = require('../model/botruyen.model');
const TacGia = require('../model/tacgia.model'); 
const LoaiTruyen = require('../model/loaitruyen.model');
const router = express.Router();

router.post('/create-post', async(req, res) => {
    const { id_tg, ...boTruyenData } = req.body;

    // Kiểm tra ID tác giả có tồn tại không
    try {
        const tacGia = await TacGia.findById(id_tg);
        if (!tacGia) {
            return res.status(404).send({ message: "Tác giả không tìm thấy" });
        }
        // Nếu tác giả tồn tại, tạo bộ truyện mới với dữ liệu nhận được
        const newPost = new BoTruyen({
            ...boTruyenData,
            id_tg  
        });
        await newPost.save();
        res.status(201).send({
            message: "Bộ truyện được tạo thành công",
            post: newPost
        });
    } catch (error) {
        console.log("Error : ", error);
        res.status(500).send({ message: "Lỗi khi tạo bộ truyện" });
    }
});

// Thêm loại truyện vào bộ truyện 
router.post('/:id/add-loai', async (req, res) => {
    const { id } = req.params; 
    const { loaiTruyenId } = req.body; 

    try {
        // Cập nhật danh sách loại trong BoTruyen
        const boTruyen = await BoTruyen.findByIdAndUpdate(
            id,
            { $addToSet: { listloai: loaiTruyenId } }, 
            { new: true }
        );

        if (!boTruyen) {
            return res.status(404).json({ message: 'Không tìm thấy bộ truyện' });
        }

        // Cập nhật danh sách bộ truyện trong LoaiTruyen
        const loaiTruyen = await LoaiTruyen.findByIdAndUpdate(
            loaiTruyenId,
            { $addToSet: { listTruyen: id } }, // Tránh thêm trùng lặp
            { new: true }
        );

        if (!loaiTruyen) {
            return res.status(404).json({ message: 'Không tìm thấy loại truyện' });
        }

        res.status(200).json({
            message: 'Thêm loại truyện vào bộ truyện thành công',
            boTruyen,
            loaiTruyen,
        });
    } catch (error) {
        console.error('Error adding LoaiTruyen to BoTruyen:', error);
        res.status(500).json({ message: 'Lỗi khi thêm loại truyện vào bộ truyện' });
    }
});

router.post('/:id/remove-loai', async (req, res) => {
    const { id } = req.params;
    const { loaiTruyenId } = req.body; 

    try {
        // Xóa loại khỏi bộ truyện
        const boTruyen = await BoTruyen.findByIdAndUpdate(
            id,
            { $pull: { listloai: loaiTruyenId } },
            { new: true }
        );

        if (!boTruyen) {
            return res.status(404).json({ message: 'Không tìm thấy bộ truyện' });
        }

        // Xóa bộ truyện khỏi loại
        const loaiTruyen = await LoaiTruyen.findByIdAndUpdate(
            loaiTruyenId,
            { $pull: { listTruyen: id } },
            { new: true }
        );

        if (!loaiTruyen) {
            return res.status(404).json({ message: 'Không tìm thấy loại truyện' });
        }

        res.status(200).json({
            message: 'Xóa loại truyện khỏi bộ truyện thành công',
            boTruyen,
            loaiTruyen,
        });
    } catch (error) {
        console.error('Error removing LoaiTruyen from BoTruyen:', error);
        res.status(500).json({ message: 'Lỗi khi xóa loại truyện khỏi bộ truyện' });
    }
});




// Lấy tất cả bộ truyện
router.get('/', async (req, res) => {
    try {
        const { search, category, trang_thai } = req.query;

        let query = {};

        if (search) {
            query = {
                ...query,
                $or: [
                    { tenbo: { $regex: search, $options: 'i' } },
                    { mota: { $regex: search, $options: 'i' } }
                ]
            };
        }

        if (category) {
            query = { ...query, listloai: category };
        }

        if (trang_thai) {
            query = { ...query, trang_thai };
        }

        const boTruyen = await BoTruyen.find(query)
            .populate('id_tg', 'ten') 
            .sort({ createdAt: -1 });

        res.status(200).send(boTruyen);
    } catch (error) {
        console.error('Error fetching Bo Truyen:', error);
        res.status(500).send({ message: 'Failed to fetch Bo Truyen' });
    }
});




// lấy tất cả bộ truyện còn active 
router.get('/active', async (req, res) => {
    try {
        const activeBoTruyen = await BoTruyen.find({ active: true })
            .populate('id_tg', 'ten')  
            .sort({ createdAt: -1 });

        console.log('Active BoTruyen:', activeBoTruyen); 
        res.status(200).send(activeBoTruyen);
    } catch (error) {
        console.error('Error fetching active Bo Truyen:', error);
        res.status(500).send({ message: 'Failed to fetch active Bo Truyen' });
    }
});



// Lấy chi tiết một bộ truyện (route công khai)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const boTruyen = await BoTruyen.findById(id)
            .populate('id_tg', 'ten email') 
            .populate('listloai', 'ten')   
            .populate('chapters');    
        if (!boTruyen) return res.status(404).json({ message: 'Không tìm thấy bộ truyện' });
        res.status(200).json(boTruyen);
    } catch (error) {
        console.error('Error fetching Bo Truyen by ID:', error);
        res.status(500).json({ message: 'Lỗi khi lấy thông tin bộ truyện' });
    }
});

//Tìm kiếm bộ truyện theo tên
router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const boTruyen = await BoTruyen.find({
            tenbo: { $regex: query, $options: 'i' },
        });
        res.status(200).json(boTruyen);
    } catch (error) {
        console.error('Error searching Bo Truyen:', error);
        res.status(500).json({ message: 'Lỗi khi tìm kiếm bộ truyện' });
    }
});

//Lọc bộ truyện theo trạng thái
router.get('/filter', async (req, res) => {
    const { trangthai } = req.query;
    try {
        const boTruyen = await BoTruyen.find({ trangthai });
        res.status(200).json(boTruyen);
    } catch (error) {
        console.error('Error filtering Bo Truyen:', error);
        res.status(500).json({ message: 'Lỗi khi lọc bộ truyện' });
    }
});


// Cập nhật một bộ truyện 
// router.patch('/update-post/:id', verifyToken, isAdmin, async (req, res) => {
//     try {
//         const id = req.params.id;

//         const updatedBoTruyen = await BoTruyen.findByIdAndUpdate(id, { ...req.body }, { new: true });

//         if (!updatedBoTruyen) {
//             return res.status(404).send({ message: 'Bo Truyen not found' });
//         }

//         res.status(200).send({ message: 'Bo Truyen updated successfully', post: updatedBoTruyen });
//     } catch (error) {
//         console.error('Error updating Bo Truyen:', error);
//         res.status(500).send({ message: 'Failed to update Bo Truyen' });
//     }
// });

// Xóa một bộ truyện 
// router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
//     try {
//         const id = req.params.id;

//         const deletedBoTruyen = await BoTruyen.findByIdAndDelete(id);

//         if (!deletedBoTruyen) {
//             return res.status(404).send({ message: 'Bo Truyen not found' });
//         }

//         res.status(200).send({ message: 'Bo Truyen deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting Bo Truyen:', error);
//         res.status(500).send({ message: 'Failed to delete Bo Truyen' });
//     }
// });

module.exports = router;