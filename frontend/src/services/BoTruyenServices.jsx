import axios from 'axios';

// URL cơ bản cho API backend
const API_BASE_URL = '/api/botruyen';

// Lấy danh sách bộ truyện đang hoạt động
export const fetchActiveBoTruyen = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/active`);
        return response.data; // Trả về dữ liệu
    } catch (error) {
        throw new Error('Không thể tải danh sách bộ truyện hoạt động', error.response);
    }
};

// Lấy thông tin chi tiết một bộ truyện
export const fetchBoTruyenById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data; // Trả về thông tin bộ truyện
    } catch (error) {
        throw new Error('Không thể tải thông tin bộ truyện', error.response);
    }
};

// Tìm kiếm bộ truyện theo tên
export const searchBoTruyen = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search`, { params: { query } });
        return response.data; // Trả về kết quả tìm kiếm
    } catch (error) {
        throw new Error('Không thể tìm kiếm bộ truyện', error.response);
    }
};
