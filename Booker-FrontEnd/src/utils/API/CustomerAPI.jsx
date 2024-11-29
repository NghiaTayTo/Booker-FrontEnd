import axios from 'axios';

const hostCustomer = "http://localhost:8080/api/taikhoan";

// * Hàm lấy tài khoản user và seller => Khách hàng
export const getCustomer = () => {
    return axios.get(`${hostCustomer}/customer-all`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching customers:', error);
            throw error;
        });
};

// * Hàm lấy tài khoản user và seller => Khách hàng
export const getCustomerNumber = () => {
    return axios.get(`${hostCustomer}/customer-all`)
        .then(response => {
            return response.data.length;
        })
        .catch(error => {
            console.error('Error fetching customers:', error);
            throw error;
        });
};

// * Hàm lấy ra chi tiết khách hàng
export const getCustomerById = (customerId) => {
    return axios.get(`${hostCustomer}/${customerId}`)
        .then(response => {
            return response.data.result;
        })
        .catch(error => {
            console.error('Error fetching customer by id:', error);
            throw error;
        });
};

// * ADMIN - hàm đếm khách hàng đang hoạt động
export const getActiveCustomerNumber = () => {
    return axios.get(`${hostCustomer}/customer-active`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching active customers:', error);
            throw error;
        });
};

// * ADMIN - Hàm đếm khách hàng bị vô hiệu hóa
export const getInactiveCustomerNumber = () => {
    return axios.get(`${hostCustomer}/customer-inactive`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching inactive customers:', error);
            throw error;
        });
};

// * ADMIN - Hàm lấy tài khoản theo trạng thái
export const getCustomerByTrangThai = (trangThai) => {
    return axios.get(`${hostCustomer}/admin/customer/${trangThai}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching inactive customers:', error);
            throw error;
        });
};