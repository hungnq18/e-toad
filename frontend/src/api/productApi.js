import axiosClient from './axiosClient';

const productApi = {
  // Lấy tất cả sản phẩm
  getAll: () => axiosClient.get('/products'),

  // Lấy sản phẩm theo id
  getById: (id) => axiosClient.get(`/products/${id}`),

  // Tạo sản phẩm mới
  create: (data) => axiosClient.post('/products', data),

  // Cập nhật sản phẩm
  update: (id, data) => axiosClient.put(`/products/${id}`, data),

  // Xóa sản phẩm
  delete: (id) => axiosClient.delete(`/products/${id}`),

  // Đổi xu lấy sản phẩm
  exchangeProduct: (id) => {
    return axiosClient.post(`/products/${id}/exchange`);
  },
};

export default productApi; 