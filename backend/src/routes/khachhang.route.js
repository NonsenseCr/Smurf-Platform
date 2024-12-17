const express = require("express");
const KhachHang = require("../model/khachhang.model");
const User = require("../model/user.model"); 
const Avatar = require("../model/Avatar.model"); 
const router = express.Router();
const mongoose = require("mongoose");
// Tạo mới một khách hàng
router.post("/create", async (req, res) => {
    const {
        IdUser,
        GoogleAccount,
        FacebookAccount,
        IdAvatar,
        TicketSalary,
        ActivePremium,
        ActiveStats,
        SocialLogins,
        Payments,
    } = req.body;

    try {
        // Kiểm tra người dùng có tồn tại
        const user = await User.findById(IdUser);
        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        // Tạo khách hàng mới
        const khachHang = new KhachHang({
            IdUser,
            GoogleAccount,
            FacebookAccount,
            IdAvatar,
            TicketSalary,
            ActivePremium,
            ActiveStats,
            SocialLogins,
            Payments,
        });

        await khachHang.save();
        res.status(201).json({ message: "Tạo khách hàng thành công", khachHang });
    } catch (error) {
        console.error("Error creating customer:", error);
        res.status(500).json({ message: "Lỗi khi tạo khách hàng" });
    }
});


// Cập nhật thông tin khách hàng và người dùng
router.put("/update", async (req, res) => {
    const { idUser, fullName, birthDate, gender, idAvatar } = req.body;
  
    if (!idUser) {
      return res.status(400).json({ success: false, message: "User ID is required!" });
    }
  
    try {
      // Truy vấn và cập nhật bằng `IdUser`
      const updatedCustomer = await KhachHang.findOneAndUpdate(
        { IdUser: idUser }, // Sử dụng IdUser
        { IdAvatar: idAvatar },
        { new: true }
      );
  
      if (!updatedCustomer) {
        return res.status(404).json({ success: false, message: "Customer not found!" });
      }
  
      const updatedUser = await User.findOneAndUpdate(
        { IdUser: idUser }, // Sử dụng IdUser
        {
          FullName: fullName,
          Birth: birthDate,
          Gender: gender,
        },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: "User not found!" });
      }
  
      res.status(200).json({
        success: true,
        message: "Customer and User updated successfully.",
        updatedCustomer,
        updatedUser,
      });
    } catch (error) {
      console.error("Error updating customer:", error);
      res.status(500).json({
        success: false,
        message: "Error updating customer and user.",
      });
    }
  });
  
  

// Lấy chi tiết khách hàng

router.get("/:id", async (req, res) => {
  const { id } = req.params; // Lấy ID từ URL

  try {
    // Tìm khách hàng với IdUser là chuỗi
    const khachHang = await KhachHang.findOne({ IdUser: id });

    if (!khachHang) {
      return res.status(404).json({ message: "Không tìm thấy khách hàng" });
    }

    // Tìm thông tin User từ bảng User dựa trên IdUser (chuỗi)
    const user = await User.findOne({ IdUser: khachHang.IdUser }).select("UserName Email");

    // Lấy thông tin Avatar từ bảng Avatar dựa trên IdAvatar
    let avatar = null;
    if (khachHang.IdAvatar) {
      avatar = await Avatar.findOne({ _id: khachHang.IdAvatar }).select("AvatarContent");
    }

    // Trả về thông tin khách hàng, User và Avatar
    res.status(200).json({
      ...khachHang._doc,    // Thông tin khách hàng
      UserDetail: user,     // Thông tin chi tiết từ User
      Avatar: avatar ? avatar.AvatarContent : null, // URL Avatar nếu có
    });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin khách hàng:", error);
    res.status(500).json({ message: "Lỗi khi lấy thông tin khách hàng" });
  }
});

// Cập nhật khách hàng
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const {
        GoogleAccount,
        FacebookAccount,
        IdAvatar,
        TicketSalary,
        ActivePremium,
        ActiveStats,
        SocialLogins,
        Payments,
    } = req.body;

    try {
        const khachHang = await KhachHang.findByIdAndUpdate(
            id,
            {
                GoogleAccount,
                FacebookAccount,
                IdAvatar,
                TicketSalary,
                ActivePremium,
                ActiveStats,
                SocialLogins,
                Payments,
            },
            { new: true }
        );

        if (!khachHang) {
            return res.status(404).json({ message: "Không tìm thấy khách hàng" });
        }

        res.status(200).json({ message: "Cập nhật khách hàng thành công", khachHang });
    } catch (error) {
        console.error("Error updating customer:", error);
        res.status(500).json({ message: "Lỗi khi cập nhật khách hàng" });
    }
});

  
// Xóa khách hàng
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const khachHang = await KhachHang.findByIdAndDelete(id);
        if (!khachHang) {
            return res.status(404).json({ message: "Không tìm thấy khách hàng" });
        }
        res.status(200).json({ message: "Xóa khách hàng thành công" });
    } catch (error) {
        console.error("Error deleting customer:", error);
        res.status(500).json({ message: "Lỗi khi xóa khách hàng" });
    }
});

// Thêm vé thưởng cho khách hàng
router.post("/:id/add-ticket", async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;

    try {
        const khachHang = await KhachHang.findByIdAndUpdate(
            id,
            { $inc: { TicketSalary: amount } }, // Tăng số vé thưởng
            { new: true }
        );

        if (!khachHang) {
            return res.status(404).json({ message: "Không tìm thấy khách hàng" });
        }

        res.status(200).json({ message: "Thêm vé thưởng thành công", TicketSalary: khachHang.TicketSalary });
    } catch (error) {
        console.error("Error adding ticket:", error);
        res.status(500).json({ message: "Lỗi khi thêm vé thưởng" });
    }
});

// Xóa tất cả khách hàng
router.delete("/delete-all", async (req, res) => {
    try {
      // Xóa tất cả các bản ghi trong collection KhachHang
      const result = await KhachHang.deleteMany({}); // Xóa tất cả tài liệu
  
      res.status(200).json({
        success: true,
        message: `Đã xóa ${result.deletedCount} khách hàng thành công.`,
      });
    } catch (error) {
      console.error("Error deleting customer:", error);
      res.status(500).json({
        success: false,
        message: "Đã xảy ra lỗi khi xóa tất cả khách hàng.",
      });
    }
  });

module.exports = router;