import { useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react";
import { Table, Button, message, Modal, Form, Input, Popover } from "antd";
import { SortAscendingOutlined, SortDescendingOutlined, /*ExclamationCircleOutlined*/ } from "@ant-design/icons";
import {
  getAllPayments 
} from "@/area-manager/services/paymentService";
import AddAuthor from "../author/Add";
import styles from "@/area-manager/styles/author-index.module.css";
import { Collapse } from "antd";
const PaymentIndex = () => {
  const navigate = useNavigate(); // Hook điều hướng
  
  const handleDoubleClick = (record) => {
    navigate(`/manager/comic/author-index/comic-index-author-id/${record._id}`);
  };
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [hoverTimeout, setHoverTimeout] = useState(null);
  // const [payments, setpayments] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [hoveredAuthor, setHoveredAuthor] = useState(null); // Xử lý hover
  const [pinnedAuthor, setPinnedAuthor] = useState(null); // Neo popup
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [isAscending, setIsAscending] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [advancedFilterVisible, setAdvancedFilterVisible] = useState(false); // Hiển thị dòng thứ 2
  // const [filters, setFilters] = useState({
  //   active: null, // "all", "active", "inactive"
  //   toppayments: false, // Hóa Đơn hàng đầu
  //   mostBooks: false, // Nhiều tác phẩm nhất
  //   leastBooks: false, // Ít tác phẩm nhất
  // });


  const [originalPayments, setOriginalPayments] = useState([]); // Lưu danh sách gốc
  const [payments, setPayments] = useState([]); // Hiển thị danh sách
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const [filters, setFilters] = useState({
    status: "all", // "all", "Completed", "Pending", "Cancelled"
    minAmount: null, // Số tiền tối thiểu
    maxAmount: null, // Số tiền tối đa
    method: "all", // Phương thức thanh toán: Cash, Card, Other, paypal
  });
  
  useEffect(() => {
    loadPayments();
    // if (countdown === 0 && confirmAction?.type === "delete") {
    //   executeDelete();
    //   return;
    // }
    if (confirmAction?.type === "delete") {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, confirmAction]);

  const loadPayments = async () => {
    setLoading(true);
    try {
      const data = await getAllPayments(); // Gọi API từ service
      const paymentData = data.map((payment) => ({
        ...payment,
        key: payment.IdPayment, // Sử dụng IdPayment làm key
        PayAmountFormatted: `${payment.PayAmount.toFixed(2)} VND`,
        PayDateFormatted: new Date(payment.PayDate).toLocaleString(),
      }));
      setOriginalPayments(paymentData); // Lưu danh sách gốc
      setPayments(paymentData); // Hiển thị danh sách
    } catch (error) {
      message.error("Không thể tải danh sách hóa đơn", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleDoubleClick = (record) => {
  //   navigate(`/manager/payment/details/${record.IdPayment}`);
  // };
  
  // Hàm áp dụng bộ lọc
  const applyFilter = (type) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: !prevFilters[type],
    }));

    const newFilters = { ...filters, [type]: !filters[type] };

    // Bắt đầu từ dữ liệu gốc
    let filteredPayments = [...originalPayments];

    // Lọc theo trạng thái
    if (newFilters.status !== "all") {
      filteredPayments = filteredPayments.filter(
        (payment) => payment.PayStats === newFilters.status
      );
    }

    // Lọc theo số tiền
    if (newFilters.minAmount !== null) {
      filteredPayments = filteredPayments.filter(
        (payment) => payment.PayAmount >= newFilters.minAmount
      );
    }
    if (newFilters.maxAmount !== null) {
      filteredPayments = filteredPayments.filter(
        (payment) => payment.PayAmount <= newFilters.maxAmount
      );
    }

    // Lọc theo phương thức thanh toán
    if (newFilters.method !== "all") {
      filteredPayments = filteredPayments.filter(
        (payment) => payment.PayMethod === newFilters.method
      );
    }

    setPayments(filteredPayments);
  };
  
  const toggleAdvancedFilter = () => {
    setAdvancedFilterVisible(!advancedFilterVisible);
  };

  const handleDelete = (author) => {
    if (author.soLuongTruyen > 0) {
      Modal.info({
        title: "Không thể xóa Hóa Đơn",
        content: (
          <div style={{ textAlign: "center" }}>
            <img
              src="@/area-manager/assets/images/ban_girl.png"
              alt="Không thể xóa"
              style={{ width: "200px", height: "250px", marginBottom: "20px" }}
            />
            <p>
              Hóa Đơn <strong>{author.ten_tg}</strong> có{" "}
              <strong>{author.soLuongTruyen}</strong> bộ truyện liên quan.
            </p>
            <Button
              type="primary"
              style={{
                backgroundColor: "#6a1b9a",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "5px 15px",
                marginTop: "10px",
              }}
              onClick={() => {
                navigate(`/manager/comic/author-index/comic-index-author-id/${author._id}`);
              }}
            >
              Xem Chi Tiết
            </Button>
          </div>
        ),
        centered: true, // Hiển thị giữa màn hình
        icon: null, // Không sử dụng icon mặc định
        closable: true, // Có nút đóng
      });
      return;
    }
  
    // Nếu không có bộ truyện liên quan, hiển thị Modal xác nhận xóa
    setConfirmAction({ type: "delete", record: { _id: author._id } });
    setCountdown(5);
  };
  
  

  // const executeDelete = async () => {
  //   if (confirmAction?.type !== "delete") return;
  //   try {
  //     await deleteAuthor(confirmAction.record._id);
  //     message.success("Xóa Hóa Đơn thành công");
  //     loadpayments();
  //   } catch {
  //     message.error("Không thể xóa Hóa Đơn");
  //   } finally {
  //     setConfirmAction(null);
  //     setCountdown(5);
  //   }
  // };

  // const handleToggleActive = (record) => {
  //   Modal.confirm({
  //     title: "Xác nhận thay đổi trạng thái",
  //     icon: <ExclamationCircleOutlined />,
  //     content: `Bạn có chắc chắn muốn ${
  //       record.active ? "vô hiệu hóa" : "kích hoạt"
  //     } Hóa Đơn "${record.ten_tg}" không?`,
  //     onOk: async () => {
  //       try {
  //         await toggleAuthorActive(record._id);
  //         message.success(
  //           `Trạng thái đã được ${
  //             record.active ? "vô hiệu hóa" : "kích hoạt"
  //           } thành công`
  //         );
  //         loadpayments();
  //       } catch {
  //         message.error("Không thể thay đổi trạng thái Hóa Đơn");
  //       }
  //     },
  //     onCancel: () => {
  //       message.info("Hủy thao tác thay đổi trạng thái");
  //     },
  //   });
  // };
  

  const handleUpdate = (author) => {
    setEditingAuthor(author);
    setIsEditModalVisible(true);
  };

  // const handleEditSubmit = async (values) => {
  //   try {
  //     await updateAuthor(editingAuthor._id, values);
  //     message.success("Cập nhật Hóa Đơn thành công");
  //     setIsEditModalVisible(false);
  //     loadpayments();
  //   } catch {
  //     message.error("Không thể cập nhật Hóa Đơn");
  //   }
  // };

  const handleHover = (author, event) => {
    const { clientX, clientY } = event;
  
    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(`/api/author/${author._id}/top-comics`);
        const topComics = await response.json();
        setHoveredAuthor({ ...author, topComics });
        setPopupPosition({ top: clientY, left: clientX });
      } catch {
        message.error("Không thể tải danh sách truyện hot");
      }
    }, 750);
  
    setHoverTimeout(timeout);
  };
  

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    if (!pinnedAuthor) {
      setHoveredAuthor(null);
      setPopupPosition({ top: 0, left: 0 });
    }
  };

  const pinPopover = (author) => {
    setPinnedAuthor(author);
  };

  const unpinPopover = () => {
    setPinnedAuthor(null);
    setHoveredAuthor(null);
  };

  const handleSort = () => {
    const sortedpayments = [...payments].sort((a, b) =>
      isAscending ? a.ten_tg.localeCompare(b.ten_tg) : b.ten_tg.localeCompare(a.ten_tg)
    );
    setPayments(sortedpayments);
    setIsAscending(!isAscending);
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const columns = [
    {
      title: "Mã Thanh Toán",
      dataIndex: "IdPayment",
      key: "IdPayment",
    },
    {
      title: "Người Dùng",
      dataIndex: "IdUser",
      key: "IdUser",
    },
    {
      title: "Số Tiền",
      dataIndex: "PayAmount",
      key: "PayAmount",
      render: (amount) => <span style={{ color: "#3c8dbc" }}>{amount.toFixed(2)} VND</span>,
    },
    {
      title: "Phương Thức",
      dataIndex: "PayMethod",
      key: "PayMethod",
      render: (method) => (
        <span style={{ color: method === "paypal" ? "green" : "gray" }}>
          {method.toUpperCase()}
        </span>
      ),
    },
    {
      title: "Trạng Thái",
      dataIndex: "PayStats",
      key: "PayStats",
      render: (status) => (
        <span
          style={{
            color:
              status === "Completed"
                ? "green"
                : status === "Pending"
                ? "orange"
                : "red",
          }}
        >
          {status === "Completed"
            ? "Hoàn Thành"
            : status === "Pending"
            ? "Chờ Xử Lý"
            : "Hủy"}
        </span>
      ),
    },
    {
      title: "Ngày Thanh Toán",
      dataIndex: "PayDate",
      key: "PayDate",
      render: (date) => (
        <span>{new Date(date).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}</span>
      ),
    },
    {
      title: "Thao Tác",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="link"
            icon={<i className="feather icon-edit" />}
            onClick={() => handleUpdate(record)}
          />
          <Button
            type="link"
            icon={<i className="feather icon-trash" />}
            onClick={() => handleDelete(record)}
            danger
          />
        </div>
      ),
    },
  ];
  

  return (
    <div className={styles.authorIndexContainer}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <h1 className={styles.authorIndexTitle}>danh sách hóa đơn</h1>
        <div className={styles.filters}>
          {/* Dòng 1 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <Button
              onClick={() => setFilters({ ...filters, active: "all" })}
              style={{
                backgroundColor: filters.active === "all" ? "#6a1b9a" : "#fff",
                color: filters.active === "all" ? "#fff" : "#000",
                borderRadius: "20px",
              }}
            >
              Tất Cả
            </Button>
            <Button
              onClick={() => setFilters({ ...filters, active: "active" })}
              style={{
                backgroundColor: filters.active === "active" ? "#6a1b9a" : "#fff",
                color: filters.active === "active" ? "#fff" : "#000",
                borderRadius: "20px",
              }}
            >
              Hoạt Động
            </Button>
            <Button
              onClick={() => setFilters({ ...filters, active: "inactive" })}
              style={{
                backgroundColor: filters.active === "inactive" ? "#6a1b9a" : "#fff",
                color: filters.active === "inactive" ? "#fff" : "#000",
                borderRadius: "20px",
              }}
            >
              Vô Hiệu
            </Button>
            <Button
              onClick={() => toggleAdvancedFilter()}
              style={{
                backgroundColor: "#6a1b9a",
                color: "#fff",
                borderRadius: "20px",
              }}
            >
              Nâng Cao
            </Button>
          </div>

          {/* Dòng 2: Collapse */}
          <Collapse
            activeKey={advancedFilterVisible ? "1" : ""}
            onChange={toggleAdvancedFilter}
            className={styles.collapse}
          >
            <Collapse.Panel key="1" showArrow={false}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  justifyContent: "flex-start",
                }}
              >
                <Button
                  onClick={() => applyFilter("toppayments")}
                  style={{
                    backgroundColor: filters.toppayments ? "#6a1b9a" : "#fff",
                    color: filters.toppayments ? "#fff" : "#000",
                    borderRadius: "20px",
                  }}
                >
                  Hóa Đơn Hàng Đầu
                </Button>
                <Button
                  onClick={() => applyFilter("mostBooks")}
                  style={{
                    backgroundColor: filters.mostBooks ? "#6a1b9a" : "#fff",
                    color: filters.mostBooks ? "#fff" : "#000",
                    borderRadius: "20px",
                  }}
                >
                  Nhiều Tác Phẩm Nhất
                </Button>
                <Button
                  onClick={() => applyFilter("leastBooks")}
                  style={{
                    backgroundColor: filters.leastBooks ? "#6a1b9a" : "#fff",
                    color: filters.leastBooks ? "#fff" : "#000",
                    borderRadius: "20px",
                  }}
                >
                  Ít Tác Phẩm Nhất
                </Button>
              </div>
            </Collapse.Panel>
          </Collapse>
        </div>


        <Button
          onClick={handleSort}
          icon={isAscending ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
          style={{
            backgroundColor: "#6a1b9a",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        />
      </div>
      <Table
  dataSource={payments}
  columns={columns}
  loading={loading}
  className={styles.antTable}
  pagination={{ pageSize: 10 }}
  onRow={(record) => ({
    onMouseEnter: (event) => handleHover(record, event),
    onMouseLeave: handleMouseLeave,
    onClick: () => pinPopover(record),
    onDoubleClick: () => handleDoubleClick(record), // Điều hướng khi double-click
  })}
/>

      <AddAuthor
        isVisible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddSuccess={loadPayments}
      />
     {(hoveredAuthor || pinnedAuthor) && (
  <Popover
    content={
      <div className={styles.popoverContent}>
        <h3 className={styles.popoverTitle}>
          Top 5 của {pinnedAuthor?.ten_tg || hoveredAuthor?.ten_tg}
        </h3>
        {(pinnedAuthor?.topComics || hoveredAuthor?.topComics || []).map((comic, index) => (
          <div key={comic._id} className={styles.popoverItem}>
            <span className={styles.popoverRank}>#{index + 1}</span>
            <div
              className={styles.popoverBanner}
              style={{
                backgroundImage: `url(http://localhost:5000${comic.banner})`,
              }}
            >
              <div className={styles.popoverComicName}>{comic.tenbo}</div>
              <div className={styles.popoverComicStats}>
                TF: {comic.totalFollow} | V: {comic.totalView}
              </div>
            </div>
          </div>
        ))}
        <Button onClick={unpinPopover} className={styles.closePopoverBtn}>
          Đóng
        </Button>
      </div>
    }
    visible
    placement="rightTop"
    style={{
      position: "absolute",
      top: popupPosition.top,
      left: popupPosition.left,
      zIndex: 1000,
    }}
  />
)}

      <Modal
        title="Cảnh báo xóa"
        visible={confirmAction?.type === "delete"}
        onOk={""}
        onCancel={() => setConfirmAction(null)}
        okText={`Xóa ngay (${countdown})`}
        cancelText="Hủy"
        okButtonProps={{
          danger: true,
          style: { backgroundColor: "red", borderColor: "red" },
        }}
      >
        <p>Bạn có chắc chắn muốn xóa Hóa Đơn này không? Thao tác không thể hoàn tác.</p>
      </Modal>
      <Modal
        title="Cập Nhật Hóa Đơn"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={""} initialValues={{ ten_tg: editingAuthor?.ten_tg }}>
          <Form.Item
            name="ten_tg"
            label="Tên Hóa Đơn"
            rules={[{ required: true, message: "Vui lòng nhập tên Hóa Đơn!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PaymentIndex;