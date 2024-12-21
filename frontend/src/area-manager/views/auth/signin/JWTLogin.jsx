import  { useState } from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JWTLogin = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // Lưu vào localStorage với thời gian hết hạn
  const setWithExpiry = (key, value, ttl) => {
    const now = new Date();

    const item = {
      value: value,
      expiry: now.getTime() + ttl, // TTL: thời gian tồn tại (ms)
    };

    localStorage.setItem(key, JSON.stringify(item));
  };

  // // Lấy từ localStorage và kiểm tra hết hạn
  // const getWithExpiry = (key) => {
  //   const itemStr = localStorage.getItem(key);

  //   if (!itemStr) return null;

  //   const item = JSON.parse(itemStr);
  //   const now = new Date();

  //   if (now.getTime() > item.expiry) {
  //     localStorage.removeItem(key); // Xóa nếu hết hạn
  //     return null;
  //   }

  //   return item.value;
  // };

  // Xử lý đăng nhập
  const handleLogin = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/user-manager/login', {
        UserName: values.username.trim(),
        Password: values.password.trim(),
      });
  
      if (response.data.message === "Đăng nhập thành công") {
        // Lưu session và user vào localStorage
        const userData = response.data.data;
        setWithExpiry("session", userData, 7200000);
        setWithExpiry("userM", {
          id: userData.IdUser,
          username: userData.UserName,
          email: userData.Email,
          staffRole: userData.StaffRole,
        }, 3600000);
  
        // Lấy danh sách quyền
        const permissionsResponse = await axios.get(`http://localhost:5000/api/rbac/permissions/${userData.IdUser}`);
        setWithExpiry("permissions", permissionsResponse.data, 3600000);
  
        // Chuyển hướng đến trang /manager
        navigate("/manager");
      } else {
        setErrorMessage(response.data.message || "Đăng nhập thất bại!");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Đăng nhập thất bại.');
      } else {
        setErrorMessage('Lỗi kết nối đến server.');
      }
      console.error("Error during login:", error);
    }
  };
  
  

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required('Username là bắt buộc'),
        password: Yup.string().required('Mật khẩu là bắt buộc'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        handleLogin(values).finally(() => setSubmitting(false));
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              className="form-control"
              name="username"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.username}
              placeholder="Nhập vào Username"
            />
            {touched.username && errors.username && <small className="text-danger">{errors.username}</small>}
          </div>
          <div className="form-group mb-4">
            <input
              className="form-control"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
              placeholder="Nhập vào Password"
            />
            {touched.password && errors.password && <small className="text-danger">{errors.password}</small>}
          </div>

          {errorMessage && (
            <Col sm={12}>
              <Alert variant="danger">{errorMessage}</Alert>
            </Col>
          )}

          <Row>
            <Col mt={2}>
              <Button
                className="btn-block mb-4"
                color="primary"
                disabled={isSubmitting}
                type="submit"
                variant="primary"
              >
                Đăng nhập
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;
