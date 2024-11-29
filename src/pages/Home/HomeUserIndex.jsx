import React, { useEffect, useState } from 'react';
import styles from './HomeUserIndex.module.css';
import { getAllBook } from '../../utils/API/ProductAPI'; // API để lấy sản phẩm
import { useNavigate } from 'react-router-dom';
import FooterUser from '../Component/FooterUser';
import HeaderUser from '../Component/HeaderUser';

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
                <img
                    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
                    alt="Banner 1"
                    className={styles.banner}
                />
                <img
                    src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                    alt="Banner 2"
                    className={styles.banner}
                />
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
                                    src={`/images/${product.anh_san_pham}`}
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
