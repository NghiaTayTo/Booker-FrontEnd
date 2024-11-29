import axios from "axios";

const hostAdmin = "http://localhost:8080/api/thongkesan";

// * ADMIN - Hàm lấy thống kê tiền

export const getRevenueAdmin = () => {
    return axios.get(`${hostAdmin}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error fetching revenue:", error);
        });
};