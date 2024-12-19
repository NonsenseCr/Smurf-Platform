import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Account = () => {
    const [info, setInfo] = useState(null);
    const [user, setUser] = useState(null);
    const [pays, setPays] = useState([]);

    useEffect(() => {
        // Giả sử API trả về thông tin user và thanh toán
        fetch('/api/user')
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((err) => console.error("Error fetching user data:", err));

        fetch('/api/payments')
            .then((res) => res.json())
            .then((data) => setPays(data))
            .catch((err) => console.error("Error fetching payments data:", err));

        if (info) {
            if (info === 'Cập nhật mật khẩu thành công') {
                Swal.fire({
                    title: 'SUCCESS!',
                    text: info,
                    icon: 'success',
                    timer: 2500,
                    showConfirmButton: false,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: info,
                });
            }
        }
    }, [info]);

    const handleSaveChanges = (e) => {
        e.preventDefault();
        // Call API to update user info
        fetch('/api/user/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then(() => {
                setInfo('Cập nhật thành công!');
            })
            .catch((err) => {
                setInfo('Cập nhật thất bại!');
                console.error("Error updating user:", err);
            });
    };

    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const payload = Object.fromEntries(form.entries());

        fetch('/api/user/update-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((res) => res.json())
            .then(() => {
                setInfo('Cập nhật mật khẩu thành công!');
            })
            .catch((err) => {
                setInfo('Cập nhật mật khẩu thất bại!');
                console.error("Error updating password:", err);
            });
    };

    return (
        <div className="containers sections flex-grow-1 container-py my-3 vh-100">
            <div className="card overflow-hidden h-100">
                <div className="row g-0">
                    <div className="col-md-3">
                        <div className="list-group list-group-flush account-settings-links">
                            <a className="list-group-item list-group-item-action active" href="#account-general">Thông Tin</a>
                            <a className="list-group-item list-group-item-action" href="#account-change-password">Mật khẩu & Bảo mật</a>
                            <a className="list-group-item list-group-item-action" href="#account-connections">Kết nối</a>
                            <a className="list-group-item list-group-item-action" href="#account-invoice">Thanh toán & Hóa đơn</a>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="p-4">
                            <h4 className="fw-bold mb-4">Cài đặt tài khoản</h4>
                            <div className="tab-content">
                                <div id="account-general">
                                    {user ? (
                                        <form onSubmit={handleSaveChanges}>
                                            <div className="mb-3">
                                                <label className="form-label">Username</label>
                                                <input type="text" className="form-control" value={user.username} readOnly />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">FullName</label>
                                                <input type="text" className="form-control" value={user.fullName} onChange={(e) => setUser({ ...user, fullName: e.target.value })} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Phone</label>
                                                <input type="text" className="form-control" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Trạng thái tài khoản</label>
                                                <input type="text" className="form-control" value={user.premium ? 'Thành viên Premium' : 'Thành viên thông thường'} readOnly />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Birthday</label>
                                                <input type="date" className="form-control" value={user.birthDate} onChange={(e) => setUser({ ...user, birthDate: e.target.value })} />
                                            </div>
                                            <div className="d-flex justify-content-end mt-3">
                                                <button type="submit" className="btn btn-primary">Save changes</button>
                                                <button type="button" className="btn btn-outline-secondary ms-2">Cancel</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <p>Đang tải thông tin tài khoản...</p>
                                    )}
                                </div>

                                <div id="account-change-password">
                                    <form onSubmit={handlePasswordUpdate} autoComplete="off">
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input name="email" type="email" className="form-control" required autoComplete="new-password" />
                                        </div>
                                        {!user?.googleAccount && (
                                            <div className="mb-3">
                                                <label className="form-label">Current password</label>
                                                <input name="currentPassword" type="password" className="form-control" required autoComplete="new-password" />
                                            </div>
                                        )}
                                        <div className="mb-3">
                                            <label className="form-label">New password</label>
                                            <input name="newPassword" type="password" className="form-control" required autoComplete="new-password" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Repeat new password</label>
                                            <input name="confirmNewPassword" type="password" className="form-control" required />
                                        </div>
                                        <div className="d-flex justify-content-end mt-3">
                                            <button type="submit" className="btn btn-primary">Save changes</button>
                                            <button type="button" className="btn btn-outline-secondary ms-2">Cancel</button>
                                        </div>
                                    </form>
                                </div>

                                <div id="account-invoice">
                                    {pays.length > 0 ? (
                                        <table className="table table-bordered table-striped">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th>ID Invoice</th>
                                                    <th>Giá trị</th>
                                                    <th>Ngày thanh toán</th>
                                                    <th>Ngày hết hạn</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pays.map((pay) => (
                                                    <tr key={pay.id}>
                                                        <td>{pay.id}</td>
                                                        <td>{pay.amount} VND</td>
                                                        <td>{pay.payDate}</td>
                                                        <td>{pay.expiresTime}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="section-bottom container w-100" style={{ height: '50vh' }}>
                                            <img src="/images/yuzu.png" alt="cat" />
                                            <span>Opps!!! Có vẻ như bạn chưa có giao dịch nào</span>
                                            <a href="/payment">Xem ngay</a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
