import axios from 'axios';

// URL cơ bản cho API backend
const API_BASE_URL = '/api/botruyen';

// Lấy danh sách bộ truyện đang hoạt động
export const fetchActiveBoTruyen = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/active`);
        return response.data; 
    } catch (error) {
        throw new Error('Không thể tải danh sách bộ truyện hoạt động', error.response);
    }
};

// Lấy danh sách bộ truyện mới nhất
export const fetchBoTruyenLatest = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/latest`);
        return response.data; 
    } catch (error) {
        throw new Error('Không thể tải danh sách bộ truyện moi nhat', error.response);
    }
};

export const fetchTopReadBoTruyen = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/top-read`);
        return response.data;
    } catch (error) {
        console.error('Error fetching top-read comics:', error.response || error);
        throw new Error('Không thể tải  Top bộ truyện ', error.response);
    }
};

export const fetchCategories  = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
    } catch (error) {
        throw new Error('Không thể tải danh sách loaitruyen', error.response);
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

// lấy danh sách truyen trending
export const fetchTrendingComics = async (page = 1, limit = 12) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/trending`, {
            params: { page, limit }, 
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching trending comics:', error);
        throw new Error('Không thể tải danh sách truyện Trending');
    }
};

// Lấy danh sách truyện mới cập nhật với phân trang
export const fetchLatestComics = async (page = 1, limit = 12) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/listlatest`, {
            params: { page, limit },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching latest comics:', error);
        throw new Error('Không thể tải danh sách truyện mới cập nhật');
    }
};


export const fetchBoTruyenByCategory = async (categoryId, page = 1, limit = 12) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/category/${categoryId}`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching BoTruyen by category:", error);
      throw new Error("Không thể tải danh sách bộ truyện theo thể loại");
    }
  };

// Lấy danh sách xếp hạng theo tiêu chí
export const fetchRankingsByType = async (type) => {
    try {
      const response = await axios.get(`/api/botruyen/rankings`, {
        params: { type },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching rankings:", error);
      throw new Error("Không thể tải danh sách xếp hạng");
    }
  };
  