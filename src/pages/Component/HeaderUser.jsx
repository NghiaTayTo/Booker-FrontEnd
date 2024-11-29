import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faStore, faGift, faBox, faUser, faUserPlus, faPhoneAlt, faShoppingCart, faBars, faChevronDown, faWallet } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../Home/SearchBar';
import styles from '../Home/HomeUser.module.css';
import logo from '../Home/logoBooker.png';
import StoreID from '../../StoreId';
import { useCart } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';

const HeaderUser = ({ logout, onSearchResults }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [query, setQuery] = useState("");
    const [user, setUser] = useState(null);
    const [walletBalance, setWalletBalance] = useState(0); // Thêm state để lưu số dư ví
    const { cartItems } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const navigate = useNavigate();

    // Lấy thông tin người dùng từ sessionStorage khi component được mount
    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            fetchWalletBalance(storedUser.id_tai_khoan); // Gọi hàm lấy số dư ví

            // const fetchIdShop = async () =>{
            //     const storeID = await axios.get(`http://localhost:8080/api/v1/cuahang/taikhoan/${storedUser.id_tai_khoan}`)
            // StoreID(storeID.data.ma_cua_hang);
            // console.log(StoreID(storeID.data.ma_cua_hang), 123456);
            // }
            // fetchIdShop();
        }
        
        
    }, []);
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.so_luong, 0);

    const fetchWalletBalance = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/get-vi/${userId}`);
            console.log(response.data)
            setWalletBalance(response.data.so_tien); // Giả sử API trả về số dư ví dưới trường balance
        } catch (error) {
            console.error("Lỗi khi lấy số dư ví:", error);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('user'); // Xóa thông tin người dùng khỏi sessionStorage
        setUser(null); // Cập nhật lại trạng thái
        if (logout) logout();
    };

    const handleSearch = async () => {
        try {
            // Sử dụng keyword từ query
            const response = await axios.get(`http://localhost:8080/api/v1/sanpham/${query}`);
            const results = response.data;

            // Gọi callback và cập nhật kết quả tìm kiếm
            onSearchResults(results);
            setSearchResults(results);
        } catch (error) {
            console.error("Error fetching search results:", error);
            onSearchResults([]); // Nếu lỗi, trả về mảng rỗng
        }
    };
    const handleCartClick = () => {
        navigate('/shopping');
    };

    const handleProductClick = (productId) => {
        navigate(`/ProductDetail/${productId}`);
    };
    



    return (
        <div className={styles.parent}>
            <div className={styles.toppp}>
                <div className={styles.marginHandle}>
                    <div className={styles.help}>
                        <span>
                            <FontAwesomeIcon icon={faQuestionCircle} /> Trợ giúp
                        </span>
                        {user?.vai_tro?.ma_vai_tro === 2 && (
                            <Link to={`/seller}`}>
                                <span>
                                    <FontAwesomeIcon icon={faStore} /> Kênh người bán hàng
                                </span>
                            </Link>
                            
                        )}
                    </div>
                    <div className={styles.wallet} >
                        {/* Ví người dùng */}
                        {user && (
                            <div className={styles.walletInfo}>
                                <FontAwesomeIcon icon={faWallet} /> Ví:{walletBalance ? walletBalance.toLocaleString() : 0} đ
                            </div>
                        )}
                    </div>
                    <div className={styles.userOptions}>
                        <span>
                            <FontAwesomeIcon icon={faGift} /> Ưu đãi & tiện ích
                        </span>
                        <Link to='/donhang'>
                            <span>
                                <FontAwesomeIcon icon={faBox} /> Kiểm tra đơn hàng
                            </span>
                        </Link>
                        <div>
                            {console.log(user)}
                            {user ? (

                                <div
                                    className={styles.userMenu}
                                    onMouseEnter={() => setIsDropdownOpen(true)}
                                    onMouseLeave={() => setIsDropdownOpen(false)}
                                >
                                    <span className={styles.userName}>
                                        {user.ho_ten} <FontAwesomeIcon icon={faChevronDown} />
                                    </span>
                                    {isDropdownOpen && (
                                        <div className={styles.dropdownMenu}>
                                            <Link to="/profile-user">Quản lý tài khoản</Link>
                                            <Link to="/wallet">Nạp tiền</Link>
                                            <Link to="/shopping">Giỏ hàng</Link>
                                            {user.vai_tro.ma_vai_tro === 2 ? (
                                                // Hiển thị "Cửa hàng của tôi" nếu ma_vai_tro = 2
                                                <Link to="/seller">
                                                    Cửa hàng của tôi
                                                </Link>
                                            ) : (
                                                // Hiển thị "Đăng ký trở thành người bán" nếu ma_vai_tro khác 2
                                                <Link to="/sellerRegister">
                                                    Đăng ký trở thành người bán
                                                </Link>
                                            )}
                                            <Link to='/HomeUserIndex'>
                                                <span onClick={handleLogout}>Đăng xuất</span>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <Link to="/login">
                                        <span>
                                            <FontAwesomeIcon icon={faUser} /> Đăng Nhập
                                        </span>
                                    </Link>
                                    <Link to="/register">
                                        <span>
                                            <FontAwesomeIcon icon={faUserPlus} /> Đăng Ký
                                        </span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <header className={styles.header}>
                <div className={styles.mainHeader}>
                    <Link to={`/HomeUserIndex`}>
                        <div className={styles.logo}>
                            <img src={logo} alt="Booker Logo" />
                        </div>
                    </Link>

                    {/* Search Bar */}
                    <SearchBar onSearchResults={handleSearch} setQuery={setQuery} query={query} />

                    {/* Contact Section */}
                    <div className={styles.contact}>
                        <FontAwesomeIcon style={{fontSize: '24px', color: '#FF5722'}} icon={faPhoneAlt} />
                        <div>
                            <span className={styles.hotline}>0399100999</span>
                            <span>Hotline</span>
                        </div>
                    </div>

                    {/* Giỏ hàng */}
                    <div
                        className={styles.cart}
                        onMouseEnter={() => setIsCartOpen(true)}
                        onMouseLeave={() => setIsCartOpen(false)}
                        onClick={handleCartClick} // Chuyển đến /shopping khi nhấn vào icon giỏ hàng
                    >
                        <FontAwesomeIcon style={{fontSize: '24px', color: '#FF5722'}} icon={faShoppingCart} />
                        <span>{totalQuantity} sản phẩm</span>

                        {/* Giỏ hàng nhỏ khi hover */}
                        {isCartOpen && (
                            <div className={styles.cartDropdown}>
                                {cartItems.length > 0 ? (
                                    cartItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className={styles.cartItem}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Ngăn chặn sự kiện click lên icon giỏ hàng
                                                handleProductClick(item.ma_san_pham); // Chuyển đến trang chi tiết sản phẩm
                                            }}
                                        >
                                            <img
                                                src={item.anh_san_pham}
                                                alt={item.ten_san_pham}
                                                className={styles.cartItemImage}
                                            />
                                            <div className={styles.cartItemInfo}>
                                                <h4 className={styles.cartItemName}>{item.ten_san_pham}</h4>
                                                <p className={styles.cartItemPrice}>
                                                    {item.gia ? item.gia.toLocaleString('vi-VN') : 0} đ x {item.so_luong}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className={styles.emptyCart}>Giỏ hàng trống</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Bar */}
                <nav className={styles.navBar}>
                    <div
                        className={styles.navItem}
                        onMouseEnter={() => setShowCategories(true)}
                        onMouseLeave={() => setShowCategories(false)}
                    >
                        <div>
                            <span>
                                <FontAwesomeIcon icon={faBars} /> Danh mục sản phẩm
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </span>
                        </div>
                        {showCategories && (
                            <div className={styles.dropdownMenu}>
                                <ul>
                                    <li>Sách - Truyện Tranh</li>
                                    <li>Phụ kiện số</li>
                                    <li>Làm đẹp - Sức khoẻ</li>
                                    <li>Vật dụng - Đời sống</li>
                                    <li>Quà tặng - Đồ chơi</li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className={styles.navItem}>Giảm thêm 5%</div>
                    <div className={styles.navItem}>Chương trình khuyến mãi</div>
                    <div className={styles.sale}>Sale Sốc Xả Kho</div>
                </nav>
            </header>
        </div>
    );
};

export default HeaderUser;
