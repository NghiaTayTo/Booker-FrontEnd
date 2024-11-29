import React, { useEffect, useState } from 'react';
import Loading from '../../../utils/Order/Loading';
import BoxThongKeBlue from '../Order/BoxThongKeBlue';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getBookByDoanhThuAdmin } from '../../../utils/API/StoreAPI';
import ListMoneyStore from '../ListData/ListMoneyStore';
import ListMoneyAdmin from '../ListData/ListMoneyAdmin';

const MoneyAdmin = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [listStore, setListStore] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const data = await getBookByDoanhThuAdmin();
                setListStore(data);
            } catch (e) {
                console.log(e);
            }
            setIsLoading(false);
        }
        fetchData();
    }, [])

    return (
        <div className="page scroll-container">
            <div className="container">
                {
                    isLoading ? (
                        <>
                            <Loading />
                        </>
                    ) : (
                        <>
                            <div className='admin-home'>
                                <BoxThongKeBlue
                                    // action={handleGetAllCategory} 
                                    title={'Doanh thu hệ thống'}
                                    value={'120.000.000.000'}
                                    image={'requisition.png'}
                                    cursor={'pointer'} />
                            </div>

                            <div className="product-search_item">
                                <label>Tên cửa hàng</label>
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

                            <ListMoneyAdmin
                                storeList={listStore}
                            />

                        </>
                    )
                }

            </div>
        </div>
    );
};

export default MoneyAdmin;