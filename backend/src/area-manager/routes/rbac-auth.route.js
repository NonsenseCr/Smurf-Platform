const express = require('express');
const PermissionsList = require('../../model/PermissionsList.model');
const Staff = require('../../model/Staff.model');
const StaffPermissionsDetail = require('../../model/StaffPermissionsDetail.model');
const User = require('../../model/user.model');
const router = express.Router();

// Lấy danh sách quyền
router.get('/', async (req, res) => {
  try {
    const permissions = await PermissionsList.find();
    res.status(200).json(permissions);
  } catch (err) {
    console.error("Error fetching permissions:", err);
    res.status(500).json({ message: "Lỗi khi lấy danh sách quyền" });
  }
});

router.post('/', async (req, res) => {
  const { PermissionsName, Description, PermissionsStats } = req.body;

  if (!PermissionsName || !PermissionsStats) {
    return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
  }

  try {
    const newPermission = new PermissionsList({
      PermissionsName,
      Description,
      PermissionsStats,
    });

    await newPermission.save();
    res.status(201).json({ message: 'Thêm quyền thành công', data: newPermission });
  } catch (err) {
    console.error("Lỗi thêm quyền:", err);
    res.status(500).json({ message: 'Lỗi hệ thống khi thêm quyền' });
  }
});

router.put('/:IdPermissions', async (req, res) => {
  const { PermissionsName, Description } = req.body;

  try {
    const updatedPermission = await PermissionsList.findOneAndUpdate(
      { IdPermissions: req.params.IdPermissions },
      { PermissionsName, Description },
      { new: true }
    );

    if (!updatedPermission) {
      return res.status(404).json({ message: "Quyền không tồn tại" });
    }

    res.status(200).json({ message: "Cập nhật quyền thành công", data: updatedPermission });
  } catch (err) {
    console.error("Error updating permission:", err);
    res.status(500).json({ message: "Lỗi khi cập nhật quyền" });
  }
});


router.put('/:IdPermissions/toggle-active', async (req, res) => {
  try {
    const permission = await PermissionsList.findOne({ IdPermissions: req.params.IdPermissions });

    if (!permission) {
      return res.status(404).json({ message: "Quyền không tồn tại" });
    }

    permission.Active = !permission.Active;
    await permission.save();

    res.status(200).json({ message: "Thay đổi trạng thái thành công", active: permission.Active });
  } catch (err) {
    console.error("Error toggling permission active status:", err);
    res.status(500).json({ message: "Lỗi khi thay đổi trạng thái quyền" });
  }
});

router.put('/:IdPermissions/update-stats', async (req, res) => {
  const { PermissionsStats } = req.body;

  if (!['Có hiệu lực', 'Bảo trì', 'Ngừng vĩnh viễn'].includes(PermissionsStats)) {
    return res.status(400).json({ message: "Trạng thái không hợp lệ" });
  }

  try {
    const updatedPermission = await PermissionsList.findOneAndUpdate(
      { IdPermissions: req.params.IdPermissions },
      { PermissionsStats },
      { new: true }
    );

    if (!updatedPermission) {
      return res.status(404).json({ message: "Quyền không tồn tại" });
    }

    res.status(200).json({ message: "Cập nhật trạng thái thành công", data: updatedPermission });
  } catch (err) {
    console.error("Error updating permission stats:", err);
    res.status(500).json({ message: "Lỗi khi cập nhật trạng thái quyền" });
  }
});
router.delete('/:IdPermissions', async (req, res) => {
  try {
    const deletedPermission = await PermissionsList.findOneAndDelete({ IdPermissions: req.params.IdPermissions });

    if (!deletedPermission) {
      return res.status(404).json({ message: "Quyền không tồn tại" });
    }

    res.status(200).json({ message: "Xóa quyền thành công" });
  } catch (err) {
    console.error("Error deleting permission:", err);
    res.status(500).json({ message: "Lỗi khi xóa quyền" });
  }
});
///////////////////////////////////////////////////////////////////


// Lấy danh sách nhân viên
router.get('/staffs', async (req, res) => {
  try {
    const staffs = await Staff.find().populate('userId', 'IdUser FullName');
    const staffList = staffs.map((staff) => ({
      IdUser: staff.userId.IdUser,
      FullName: staff.userId.FullName,
      Active: staff.userId.Active,
    }));
    res.status(200).json(staffList);
  } catch (err) {
    console.error("Error fetching staff list:", err);
    res.status(500).json({ message: "Lỗi khi lấy danh sách nhân viên" });
  }
});

// Lấy danh sách quyền
router.get('/permissions', async (req, res) => {
  try {
    const permissions = await PermissionsList.find();
    res.status(200).json(permissions);
  } catch (err) {
    console.error("Error fetching permissions:", err);
    res.status(500).json({ message: "Lỗi khi lấy danh sách quyền" });
  }
});

// Lấy quyền của nhân viên
router.get('/staff-permissions/:IdUser', async (req, res) => {
  const { IdUser } = req.params;

  try {
    const staffPermissions = await StaffPermissionsDetail.find({ IdUser });
    res.status(200).json(staffPermissions);
  } catch (err) {
    console.error("Error fetching staff permissions:", err);
    res.status(500).json({ message: "Lỗi khi lấy quyền của nhân viên" });
  }
});

router.put('/:IdPermissions/:IdUser/toggle-permission-active', async (req, res) => {
  const { IdPermissions, IdUser } = req.params; // Lấy từ URL params

  try {
    // Tìm quyền theo IdUser và IdPermissions
    const staffPermission = await StaffPermissionsDetail.findOne({ IdUser, IdPermissions });

    if (!staffPermission) {
      return res.status(404).json({ message: "Quyền không tồn tại" });
    }

    // Thay đổi trạng thái Active
    staffPermission.Active = !staffPermission.Active;
    await staffPermission.save();

    res.status(200).json({ message: "Thay đổi trạng thái quyền thành công", active: staffPermission.Active });
  } catch (err) {
    console.error("Error toggling permission active status:", err);
    res.status(500).json({ message: "Lỗi khi thay đổi trạng thái quyền" });
  }
});

// Cấp quyền cho nhân viên
router.post('/grant-permission', async (req, res) => {
  const { IdUser, IdPermissions } = req.body;

  try {
    const existingPermission = await StaffPermissionsDetail.findOne({ IdUser, IdPermissions });

    if (existingPermission) {
      return res.status(400).json({ message: "Quyền đã được cấp" });
    }

    const newPermission = new StaffPermissionsDetail({
      IdUser,
      IdPermissions,
      Active: true,
    });

    await newPermission.save();

    res.status(201).json({ message: "Cấp quyền thành công" });
  } catch (err) {
    console.error("Error granting permission:", err);
    res.status(500).json({ message: "Lỗi khi cấp quyền" });
  }
});

router.get('/permissions/:IdUser', async (req, res) => {
  const { IdUser } = req.params;

  try {
    console.log(`Fetching permissions for user: ${IdUser}`);

    // Lấy danh sách quyền của nhân viên bằng IdUser
    const permissions = await StaffPermissionsDetail.find({ IdUser }).select('IdPermissions Active');

    if (!permissions || permissions.length === 0) {
      console.log(`No permissions found for user: ${IdUser}`);
      return res.status(404).json({ message: 'Người dùng này không có quyền' });
    }

    console.log(`Permissions retrieved for user ${IdUser}:`, permissions);

    // Kiểm tra nếu có bất kỳ quyền nào bị cấm (Active = false)
    const inactivePermissions = permissions.filter((permission) => !permission.Active);

    if (inactivePermissions.length > 0) {
      console.log(`Inactive permissions for user ${IdUser}:`, inactivePermissions);
      return res.status(403).json({
        message: 'Một hoặc nhiều quyền của bạn đã bị cấm',
        inactivePermissions,
      });
    }

    console.log(`All permissions for user ${IdUser} are active`);
    // Trả về danh sách quyền nếu tất cả đều hoạt động
    return res.status(200).json(permissions);
  } catch (error) {
    console.error(`Error fetching permissions for user ${IdUser}:`, error);
    return res.status(500).json({ message: 'Lỗi khi lấy danh sách quyền' });
  }
});


module.exports = router;

