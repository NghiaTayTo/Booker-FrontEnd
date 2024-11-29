import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { getCuaHangByIdAdmin } from '../../../utils/API/StoreAPI';

const StoreFromAdmin = ({ storeId, onClose }) => {

    const [store, setStore] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCuaHangByIdAdmin(storeId);
                setStore(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [storeId])

    return (
        <div>
            <div className="bg_black">
                <div className="addnewbook store-form">

                    <div className='store-form-img'>
                        <img src='/images/bia3.jpg' alt='ảnh bìa' />
                    </div>

                    <div className='store-form-img-icon' >
                        <FontAwesomeIcon
                            onClick={onClose}
                            className='store-form-img-icon_css'
                            icon={faXmark} />
                    </div>

                    <div className='store-form-avt'>
                        <img src='/images/avt3.jpg' alt='avatar' />
                    </div>

                    <div className='store-form-info'>
                        <h1>{store.ten_cua_hang}</h1>
                        <p style={{ marginTop: '10px' }}>Email: {store.email}</p>
                        <p>Số điện thoại: {store.so_dien_thoai}</p>
                        <p>Địa chỉ: {store.dia_chi_cua_hang}</p>
                        <div className='store-form-info_account'>
                            <h2 style={{ marginTop: '20px' }}> - Tài khoản đăng ký:</h2>
                            <p style={{ marginTop: '10px' }}>Họ và tên: {store.tai_khoan?.ho_ten}</p>
                            <p>Email: {store.tai_khoan?.email}</p>
                            <p>Số điện thoại: {store.tai_khoan?.so_dt}</p>
                            <p>Ngày tạo: {store.tai_khoan?.ngay_tao}</p>
                        </div>
                    </div>

                    <div className='store-form-info_btn'>
                        <button>Hủy duyệt</button>
                        <button>Xác nhận cửa hàng</button>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default StoreFromAdmin;