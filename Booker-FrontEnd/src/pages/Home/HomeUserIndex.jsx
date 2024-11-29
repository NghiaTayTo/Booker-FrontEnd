import React, { useEffect, useState } from 'react';
import styles from './HomeUserIndex.module.css';
import { getAllBook } from '../../utils/API/ProductAPI'; // API để lấy sản phẩm
import { useNavigate } from 'react-router-dom';
import FooterUser from '../Component/FooterUser';
import HeaderUser from '../Component/HeaderUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faBook } from '@fortawesome/free-solid-svg-icons';

const HomeUserIndex = () => {
    const [products, setProducts] = useState([]); // Toàn bộ sản phẩm
    const [featuredProducts, setFeaturedProducts] = useState([]); // Sản phẩm nổi bật
    const [newProducts, setNewProducts] = useState([]); // Sản phẩm mới
    const [searchResults, setSearchResults] = useState([]); // Kết quả tìm kiếm
    const [isSearching, setIsSearching] = useState(false); // Trạng thái đang tìm kiếm
    const navigate = useNavigate();

    // Lấy danh sách sản phẩm khi load trang
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllBook(21); // Lấy toàn bộ sản phẩm từ API
                setProducts(data);

                // Lấy ngẫu nhiên sản phẩm cho từng danh mục
                setFeaturedProducts(data.sort(() => 0.5 - Math.random()).slice(0, 8));
                setNewProducts(data.sort(() => 0.5 - Math.random()).slice(0, 8));
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            }
        };
        fetchProducts();
    }, []);

    // Xử lý khi có kết quả tìm kiếm
    const handleSearchResults = (results) => {
        setSearchResults(results); // Cập nhật kết quả tìm kiếm
        setIsSearching(results.length > 0); // Đặt trạng thái đang tìm kiếm
    };

    // Chuyển hướng đến chi tiết sản phẩm
    const handleProductClick = (id) => {
        navigate(`/ProductDetail/${id}`);
    };

    const handleViewMore = () => {
        navigate('/HomeUser');
    };

    return (
        <div className={styles.parent}>
            <HeaderUser
                onSearchResults={handleSearchResults} // Truyền callback xử lý kết quả tìm kiếm
            />

            {/* Banner */}
            <section className={styles.bannerSection}>
                <div className={styles.menuBar}>
                    <ul>
                        <li>
                            <FontAwesomeIcon icon={faBook} style={{ marginRight: '7px' }}></FontAwesomeIcon>
                            Sách - Truyện tranh
                            <FontAwesomeIcon icon={faAngleRight} className={styles.arrowR}></FontAwesomeIcon>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faBook} style={{ marginRight: '7px' }}></FontAwesomeIcon>
                            Sách - Truyện tranh
                            <FontAwesomeIcon icon={faAngleRight} className={styles.arrowR}></FontAwesomeIcon>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faBook} style={{ marginRight: '7px' }}></FontAwesomeIcon>
                            Sách - Truyện tranh
                            <FontAwesomeIcon icon={faAngleRight} className={styles.arrowR}></FontAwesomeIcon>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faBook} style={{ marginRight: '7px' }}></FontAwesomeIcon>
                            Sách - Truyện tranh
                            <FontAwesomeIcon icon={faAngleRight} className={styles.arrowR}></FontAwesomeIcon>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faBook} style={{ marginRight: '7px' }}></FontAwesomeIcon>
                            Sách - Truyện tranh
                            <FontAwesomeIcon icon={faAngleRight} className={styles.arrowR}></FontAwesomeIcon>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faBook} style={{ marginRight: '7px' }}></FontAwesomeIcon>
                            Sách - Truyện tranh
                            <FontAwesomeIcon icon={faAngleRight} className={styles.arrowR}></FontAwesomeIcon>
                        </li>
                    </ul>
                </div>
                {/* <img
                    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
                    alt="Banner 1"
                    className={styles.banner}
                /> */}
                <div id="carouselExampleIndicators" class="carousel slide">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className={styles.carouselinner}>
                        <div className={styles.carouselitem}>
                            <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97" />
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </section>

            {/* Hiển thị sản phẩm */}
            <section className={styles.section}>
                <h2>{isSearching ? 'Kết Quả Tìm Kiếm' : 'Sách Hay'}</h2>
                <div className={styles.productGrid}>
                    {(isSearching ? searchResults : featuredProducts).map((product, index) => (
                        <div
                            className={styles.productCard}
                            key={index}
                            onClick={() => handleProductClick(product.ma_san_pham)}
                        >
                            <div className={styles.imageContainer}>
                                <img
                                    className={styles.productImage}
                                    src={product.anh_san_pham}
                                    alt={product.ten_san_pham}
                                />
                            </div>
                            <div className={styles.productInfo}>
                                <p className={styles.productName}>{product.ten_san_pham}</p>
                                <p className={styles.productPrice}>
                                    {product.gia ? product.gia.toLocaleString('vi-VN') : 0} đ
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {!isSearching && (
                    <button onClick={handleViewMore} className={styles.viewMoreButton}>
                        Xem Thêm
                    </button>
                )}
            </section>

            {!isSearching && (
                <section className={styles.section}>
                    <h2>Sách Mới</h2>
                    <div className={styles.productGrid}>
                        {newProducts.map((product, index) => (
                            <div
                                className={styles.productCard}
                                key={index}
                                onClick={() => handleProductClick(product.ma_san_pham)}
                            >
                                <img
                                    src={product.anh_san_pham}
                                    alt={product.ten_san_pham}
                                    className={styles.productImage}
                                />
                                <p className={styles.productName}>{product.ten_san_pham}</p>
                                <p className={styles.productPrice}>
                                    {product.gia ? product.gia.toLocaleString('vi-VN') : 0} đ
                                </p>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleViewMore} className={styles.viewMoreButton}>
                        Xem Thêm
                    </button>
                </section>
            )}

            {/* Footer */}
            <FooterUser />
        </div>
    );
};

export default HomeUserIndex;
