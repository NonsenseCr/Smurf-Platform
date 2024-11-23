import axios from 'axios';

// URL cơ bản cho API backend
const API_BASE_URL = '/api/loaitruyen';

// Lấy danh sách loai truyện đang hoạt động
export const fetchActiveLoaiTruyen  = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data; // Trả về dữ liệu
    } catch (error) {
        throw new Error('Không thể tải danh sách loai truyen hoạt động', error.response);
    }
};

