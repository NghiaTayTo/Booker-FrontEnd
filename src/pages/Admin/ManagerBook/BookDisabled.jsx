import React, { useEffect, useState } from 'react';
import BoxThongKeBlack from '../Order/BoxThongKeBlack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../../utils/Order/Loading';
import { getProductLocked } from '../../../utils/API/ProductAPI';
import ListManagerBookAdmin from '../ListData/ListManagerBookAdmin';

const BookDisabled = () => {

    const [listBooks, setListBooks] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fecthData = async () => {
            try {
                const data = await getProductLocked();
                setListBooks(data);
            } catch (e) {
                console.log(e);
            }
            setIsLoading(false);
        }
        fecthData();
    }, []);

    return (
        <div className="page scroll-container">
            <div className="container">
                {
                    isLoading ? (
                        <Loading />
                    ) : (
                        <>
                            <div className='admin-home'>
                                <BoxThongKeBlack title={'Sách vô hiệu hóa'} value={listBooks.length} image={'books.png'} cursor={'pointer'} />
                            </div>
                            <div className="product-search_item">
                                <label style={{ fontWeight: '600' }}>Tên thể loại</label>
                                <div
                                    style={{ width: "350px" }}
                                    className="product-search_item__flex"
                                >
                                    <input
                                        type="text"
                                        class="form-control"
                                    // value={searchName}
                                    // onChange={handleKeySearchByName}
                                    />
                                    <button
                                        className="product-search_item__btn"
                                    // onClick={handleSearchByName}
                                    >
                                        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                                    </button>
                                </div>
                            </div>

                            <ListManagerBookAdmin listBooks={listBooks} trangThaiSach={'book_disabled'}/>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default BookDisabled;