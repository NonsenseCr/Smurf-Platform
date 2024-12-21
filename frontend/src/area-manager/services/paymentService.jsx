import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/payment';

/**
 * Lấy danh sách tất cả Payment
 */
export const getAllPayments = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/payments`);
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error('Error fetching payments:', error.message);
        throw new Error('Không thể lấy danh sách payments');
    }
};
