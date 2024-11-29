import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsToCircle } from "@fortawesome/free-solid-svg-icons";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faTicket, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import TickPlacement from "../../chart/TickPlacement";
import ApexChart from "../../chart/ApexChart";
import { countUp } from "../countUp";

import { getCuaHangById, getDoanhThuCuaHang } from "../../utils/API/StoreAPI";
import { getSanPhamByCuaHangId } from "../../utils/API/ProductAPI";
import { getVouchersByCuaHangId } from "../../utils/API/VoucherAPI";

import "./Home.css";

import StoreForm from "../../utils/FormVisible/StoreForm";
import { Link } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [vouchers, setVouchers] = useState([]);
    const [store, setStore] = useState({});

    const [doanhThu, setDoanhThu] = useState(0);
    // * ẩn hiện form chỉnh sửa thông tin cửa hàng
    const [isShowStore, setIsShowStore] = useState(false);

    const handleShowStore = () => {
        setIsShowStore(true);
    }
    const handleCloseStore = () => {
        setIsShowStore(false);
    }

    // const handleUpdateDoanhThuCuaHang = async (doanhThu) => {
    //     const data = 
    // }

    useEffect(() => {

        // * Hàm lấy doanh thu theo đơn hàng đã giao của cửa hàng
        const fetchData = async () => {
            
            try {
                const data = await getCuaHangById();
                setStore(data);
                countUp("countdt", 0, data.doanh_thu, 1200);

                const demSanPham = await getSanPhamByCuaHangId();
                setProducts(demSanPham); // Đặt giá trị sản phẩm sau khi lấy dữ liệu

                // Sau khi dữ liệu đã được đặt xong, gọi countUp
                countUp("countlb", 0, 12187, 1200);
                countUp("countsp", 0, demSanPham.length, 1200); 
                console.log('cc cút' + demSanPham);
                

                const demVoucher = await getVouchersByCuaHangId();
                setVouchers(demVoucher);

                countUp("countvc", 0, demVoucher.length, 1200);  

            }
            catch (e) {
                console.log(e);
            }
        }

        // * Lấy tất cả sản phẩm của cửa hàng
       
        // getSanPhamByCuaHangId()
        //     .then((data) => {
        //         // console.log(data);
        //         setProducts(data); // Đặt giá trị sản phẩm sau khi lấy dữ liệu

        //         // Sau khi dữ liệu đã được đặt xong, gọi countUp
        //         countUp("countlb", 0, 12187, 1200);
        //         countUp("countsp", 0, data.length, 1200); // Dùng data.length thay vì products.length
        //         // countUp("countdt", 0, 200000000, 1200);
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching data:", error);
        //     });

        // // * Lấy tất cả Voucher của cửa hàng
        // getVouchersByCuaHangId()
        //     .then((vc) => {
        //         // console.log(vc);
        //         setVouchers(vc);

        //         countUp("countvc", 0, vc.length, 1200);
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching data:", error);
        //     });

        // getCuaHangById()
        //     .then((data) => {

        //         setStore(data);
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching data:", error);
        //     });

        fetchData();

        return () => {
            // Dọn dẹp tất cả các phần tử đã sử dụng trong countUp
            const ids = ["countlb", "countsp", "countvc", "countdt"];
            ids.forEach((id) => {
                const element = document.getElementById(id);
                if (element) {
                    element.innerText = ""; // Reset giá trị nếu cần thiết
                }
            });
        };
    }, []);

    return (
        <div className="page scroll-container">
            <div className="container">
                <div className="info-basic">
                    <div className="info-basic_column1">
                        <div className="info-store">
                            <img src={`${store.anh_bia}`} alt="Ảnh bìa" />
                            <div className="info-store_detail">
                                <div className="info-store_avatar">
                                    <img
                                        src={`${store.anh_dai_dien}`}
                                        alt="Ảnh đại diện cửa hàng"
                                    />
                                    <p>My store</p>
                                </div>
                                <div className="info-store_name">
                                    <h1>{store.ten_cua_hang}</h1>
                                    <p>{store.dia_chi_cua_hang}</p>
                                </div>
                                <div onClick={handleShowStore} className="info-store_icon">
                                    <div className="info-store_icon--layout2">
                                        <FontAwesomeIcon className="faCheck" icon={faPenToSquare}></FontAwesomeIcon>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="info-box">
                            <div style={{ width: "260px" }} className="info-box_item">
                                <div
                                    style={{ backgroundColor: "#EDEFFE" }}
                                    className="info-box_item_icon"
                                >
                                    <div
                                        style={{ backgroundColor: "#5065F6" }}
                                        className="info-box_item_icon--layout2"
                                    >
                                        <FontAwesomeIcon
                                            style={{ left: "16px" }}
                                            className="faIcon"
                                            icon={faFileInvoiceDollar}
                                        ></FontAwesomeIcon>
                                    </div>
                                </div>
                                <div className="info-box_item_parameter">
                                    <h3>Số lượt bán</h3>
                                    <p id="countlb"></p>
                                </div>
                            </div>

                            <div style={{ width: "260px" }} className="info-box_item">
                                <div
                                    style={{ backgroundColor: "#E9F9EF" }}
                                    className="info-box_item_icon"
                                >
                                    <div
                                        style={{ backgroundColor: "#28B95E" }}
                                        className="info-box_item_icon--layout2"
                                    >
                                        <FontAwesomeIcon
                                            style={{ left: "11px" }}
                                            className="faIcon"
                                            icon={faTicket}
                                        ></FontAwesomeIcon>
                                    </div>
                                </div>
                                <div className="info-box_item_parameter">
                                    <h3>Voucher</h3>
                                    <p id="countvc"></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="info-basic_column2">
                        <div style={{ marginTop: "20px" }} className="info-box_item">
                            <div
                                style={{ backgroundColor: "#E9F9EF" }}
                                className="info-box_item_icon"
                            >
                                <div
                                    style={{ backgroundColor: "#28B95E" }}
                                    className="info-box_item_icon--layout2"
                                >
                                    <FontAwesomeIcon
                                        className="faIcon"
                                        icon={faBook}
                                    ></FontAwesomeIcon>
                                </div>
                            </div>
                            <div className="info-box_item_parameter">
                                <h3>Sản phẩm</h3>
                                <p id="countsp"></p>
                            </div>
                        </div>

                        <div style={{ marginTop: "10px" }} className="info-box_item">
                            <div
                                style={{ backgroundColor: "#FDEDF0" }}
                                className="info-box_item_icon"
                            >
                                <div
                                    style={{ backgroundColor: "#F04B69" }}
                                    className="info-box_item_icon--layout2"
                                >
                                    <FontAwesomeIcon
                                        style={{ left: "10px" }}
                                        className="faIcon"
                                        icon={faArrowsToCircle}
                                    ></FontAwesomeIcon>
                                </div>
                            </div>
                            <div className="info-box_item_parameter">
                                <h3>Điểm uy tín</h3>
                                <p>4.9 / 5</p>
                            </div>
                        </div>
                    </div>

                    <div className="info-basic_column3">
                        <div style={{ height: "230px" }} className="info-box_item">
                            <div
                                style={{ backgroundColor: "#FFF8DA" }}
                                className="info-box_item_icon"
                            >
                                <div
                                    style={{ backgroundColor: "#FFDB45" }}
                                    className="info-box_item_icon--layout2"
                                >
                                    <FontAwesomeIcon
                                        style={{ left: "12px" }}
                                        className="faIcon"
                                        icon={faWallet}
                                    ></FontAwesomeIcon>
                                </div>
                            </div>
                            <div className="info-box_item_money">
                                <h3>Tổng Doanh Thu</h3>
                                <p>
                                    <strong id="countdt"></strong> <span>VNĐ</span>
                                </p>
                            </div>
                            <Link to="/seller/transaction-history">
                                <button className="info-box_item--btn">Rút ngay</button>
                            </Link>
                        </div>
                    </div>
                </div>

                {
                    isShowStore === true && (
                        <StoreForm onClose={handleCloseStore} storeData={store} />
                    )
                }

                <div className="chart">
                    <TickPlacement className="chart-w" />
                    <ApexChart />
                </div>
            </div>

            {/* <div>
                <NotificationUI
                    type="success"
                    title="Task Completed"
                    description="Your task has been completed successfully."
                    keyPage={"managerPage"}
                />
            </div> */}

        </div>
    );
};

export default Home;
