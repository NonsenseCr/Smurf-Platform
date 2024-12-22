const express = require('express');
const router = express.Router();
const Payment = require('../../model/Payments.model');

// Lấy danh sách thanh toán
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(500).json({ message: "Lỗi khi lấy danh sách thanh toán." });
  }
});

router.get("/customer/:IdUser", async (req, res) => {
    const { IdUser } = req.params;
  
    try {
      console.log(`Fetching payments for customer: ${IdUser}`);
      const payments = await Payment.find({ IdUser }); // Truy vấn theo IdUser (String)
  
      if (!payments || payments.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy thanh toán nào" });
      }
  
      res.status(200).json(payments);
    } catch (error) {
      console.error(`Error fetching payments for customer ${IdUser}:`, error);
      res.status(500).json({ message: "Lỗi khi lấy danh sách thanh toán" });
    }
  });
  
  


module.exports = router;
