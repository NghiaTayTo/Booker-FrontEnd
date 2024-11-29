import React, { useEffect, useState } from 'react';
import HeaderUser from '../Component/HeaderUser';
import FooterUser from '../Component/FooterUser';
import axios from 'axios';
import styles from './Donhang.module.css';

const DonHang = () => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [filteredOrderDetails, setFilteredOrderDetails] = useState([]);
    const [selectedReason, setSelectedReason] = useState("");
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [orderDetailToCancel, setOrderDetailToCancel] = useState(null);
    const [currentFilter, setCurrentFilter] = useState("Tất cả");

    useEffect(() => {
        const fetchAllOrderDetails = async () => {
            try {
                const userId = JSON.parse(sessionStorage.getItem('user')).id_tai_khoan;
                const response = await axios.get(`http://localhost:8080/api/v1/donhang/taikhoan-${userId}`);
                setOrderDetails(response.data);
                setFilteredOrderDetails(response.data); // Hiển thị tất cả đơn hàng ban đầu
            } catch (error) {
                console.error("Lỗi khi lấy danh sách đơn hàng chi tiết:", error);
            }
        };
        fetchAllOrderDetails();
    }, []);

    const filterOrderDetails = (filter) => {
        setCurrentFilter(filter);
        if (filter === "Tất cả") {
            setFilteredOrderDetails(orderDetails);
        } else {
            setFilteredOrderDetails(
                orderDetails.filter(detail => detail.trang_thai?.ten_trang_thai === filter)
            );
        }
    };

    const handleCancelOrderDetail = (orderDetailId) => {
        setOrderDetailToCancel(orderDetailId);
        setShowCancelModal(true);
    };

    const confirmCancelOrderDetail = async () => {
        try {
            const reason = selectedReason;
            await axios.put(`http://localhost:8080/api/v1/orderdetail/huy/${orderDetailToCancel}`, null, {
                params: {
                    lyDoHuy: reason
                }
            });

            const updatedOrderDetails = orderDetails.map(detail =>
                detail.ma_don_hang_chi_tiet === orderDetailToCancel
                    ? { ...detail, trang_thai: { ma_trang_thai: 14, ten_trang_thai: "Khách hàng hủy" } }
                    : detail
            );

            setOrderDetails(updatedOrderDetails);
            setFilteredOrderDetails(updatedOrderDetails.filter(detail => currentFilter === "Tất cả" || detail.trang_thai?.ten_trang_thai === currentFilter));

            setShowCancelModal(false);
            alert("Đơn hàng đã gửi yêu cầu hủy");
        } catch (error) {
            console.error("Lỗi khi hủy đơn hàng:", error);
        }
    };

    // Hàm xử lý xác nhận nhận hàng
    const confirmReceivedOrderDetail = async (orderDetailId) => {
        try {
            await axios.put(`http://localhost:8080/api/v1/orderdetail/nhan/${orderDetailId}`);
            
            const updatedOrderDetails = orderDetails.map(detail =>
                detail.ma_don_hang_chi_tiet === orderDetailId
                    ? { ...detail, trang_thai: { ma_trang_thai: 13, ten_trang_thai: "Đã giao hàng" } }
                    : detail
            );

            setOrderDetails(updatedOrderDetails);
            setFilteredOrderDetails(updatedOrderDetails.filter(detail => currentFilter === "Tất cả" || detail.trang_thai?.ten_trang_thai === currentFilter));
            alert("Đơn hàng đã được xác nhận nhận hàng");
        } catch (error) {
            console.error("Lỗi khi xác nhận nhận hàng:", error);
        }
    };
    const confirmTraHang = async (orderDetailId) => {
        try {
            // Gọi API để cập nhật trạng thái đơn hàng
            await axios.put(`http://localhost:8080/api/v1/orderdetail/tra/${orderDetailId}`);
    
            // Cập nhật trạng thái đơn hàng trong frontend
            const updatedOrderDetails = orderDetails.map(detail =>
                detail.ma_don_hang_chi_tiet === orderDetailId
                    ? { ...detail, trang_thai: { ma_trang_thai: 15, ten_trang_thai: "Yêu cầu trả hàng / Hoàn tiền" } }
                    : detail
            );
    
            // Cập nhật lại danh sách đơn hàng sau khi thay đổi trạng thái
            setOrderDetails(updatedOrderDetails);
            setFilteredOrderDetails(updatedOrderDetails.filter(detail => currentFilter === "Tất cả" || detail.trang_thai?.ten_trang_thai === currentFilter));
    
            alert("Yêu cầu trả hàng/Hoàn tiền đã được gửi.");
        } catch (error) {
            console.error("Lỗi khi yêu cầu trả hàng/Hoàn tiền:", error);
        }
    };
    

    return (
        <div className={styles.parent}>
            <HeaderUser />
            <div className={styles.orderContainer}>
                <h2 style={{fontSize: '30px', marginTop:'20px'}} className={styles.orderTitle}>Chi Tiết Đơn Hàng Của Tôi</h2>

                <div className={styles.orderTabs}>
                    <button className={styles.buttonDonHang} onClick={() => filterOrderDetails("Tất cả")}>Tất cả</button>
                    <button className={styles.buttonDonHang} onClick={() => filterOrderDetails("Đang xử lý")}>Đang xử lý</button>
                    <button className={styles.buttonDonHang} onClick={() => filterOrderDetails("Đang vận chuyển")}>Đang vận chuyển</button>
                    <button className={styles.buttonDonHang} onClick={() => filterOrderDetails("Đã giao hàng")}>Đã giao hàng</button>
                    <button className={styles.buttonDonHang} onClick={() => filterOrderDetails("Khách hàng hủy")}>Khách hàng hủy</button>
                    <button className={styles.buttonDonHang} onClick={() => filterOrderDetails("Yêu cầu Trả hàng / Hoàn tiền")}>Yêu cầu Trả hàng / Hoàn tiền</button>
                </div>

                <div className={styles.orderList}>
                    {filteredOrderDetails.map(detail => (
                        <div key={detail.ma_don_hang_chi_tiet} className={styles.orderDetailItem}>
                            <img src={detail.san_pham?.anh_san_pham} alt={detail.san_pham?.ten_san_pham} className={styles.productImage} />
                            <div>
                                <h4>{detail.san_pham?.ten_san_pham}</h4>
                                <p>Số lượng: {detail.so_luong}</p>
                                <p>Thành tiền: {(detail.gia * detail.so_luong).toLocaleString()} đ</p>
                            </div>
                            <div className={styles.orderDetailStatus}>
                                <p>Trạng thái: {detail.trang_thai?.ten_trang_thai || "Không xác định"}</p>
                            </div>
                            {/* Hiển thị nút hủy nếu trạng thái là "Đang xử lý" */}
                            {detail.trang_thai?.ten_trang_thai === "Đang xử lý" && (
                                <button className={styles.cancelButton} onClick={() => handleCancelOrderDetail(detail.ma_don_hang_chi_tiet)}>Huỷ đơn hàng</button>
                            )}
                            {/* Hiển thị nút "Đã nhận hàng" nếu trạng thái là "Đang vận chuyển" */}
                            {detail.trang_thai?.ma_trang_thai === 12 && (
                                <button className={styles.cancelButton} onClick={() => confirmReceivedOrderDetail(detail.ma_don_hang_chi_tiet)}>Đã nhận hàng</button>
                            )}
                            {detail.trang_thai?.ma_trang_thai === 13 && (
                                <button className={styles.cancelButton} onClick={() => confirmTraHang(detail.ma_don_hang_chi_tiet)}>Yêu cầu trả hàng/Hoàn tiền</button>
                            )}
                        </div>
                    ))}
                </div>

                {showCancelModal && (
                    <div className={styles.cancelModal}>
                        <div className={styles.modalContent}>
                            <h3>Lý do</h3>
                            <div className={styles.reasonOptions}>
                                <label><input type="radio" name="reason" value="Cập nhật địa chỉ" onChange={(e) => setSelectedReason(e.target.value)} /> Tôi muốn cập nhật địa chỉ / sdt nhận hàng</label>
                                <label><input type="radio" name="reason" value="Thay đổi sản phẩm" onChange={(e) => setSelectedReason(e.target.value)} /> Tôi muốn thay đổi sản phẩm</label>
                                <label><input type="radio" name="reason" value="Thanh toán rắc rối" onChange={(e) => setSelectedReason(e.target.value)} /> Thủ tục thanh toán rắc rối</label>
                                <label><input type="radio" name="reason" value="Tìm chỗ khác" onChange={(e) => setSelectedReason(e.target.value)} /> Tôi tìm thấy chỗ mua khác tốt hơn</label>
                                <label><input type="radio" name="reason" value="Không có nhu cầu" onChange={(e) => setSelectedReason(e.target.value)} /> Tôi không có nhu cầu mua nữa</label>
                                <label><input type="radio" name="reason" value="Không lý do phù hợp" onChange={(e) => setSelectedReason(e.target.value)} /> Tôi không tìm thấy lý do hủy phù hợp</label>
                            </div>
                            <div className={styles.modalActions}>
                                <button onClick={() => setShowCancelModal(false)} className={styles.cancelButton}>Đóng</button>
                                <button onClick={confirmCancelOrderDetail} className={styles.cancelButton}>Xác nhận hủy</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <FooterUser />
        </div>
    );
};

export default DonHang;
