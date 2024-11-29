import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

import './FormDetailsAdmin.css';
import { getCustomerById } from '../../../utils/API/CustomerAPI';

const CustomerForm = ({ customerID, status, onClose }) => {

    const [customer, setCustomer] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCustomerById(customerID);
                setCustomer(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [customerID]);

    return (
        <div>
            <div className="bg_black">
                <div className="addnewbook customer-form-heigth">
                    <div className="addnewbook-header customer-form-header">
                        <div>
                            <h3>Thông tin khách hàng</h3>
                            <p className={`title-customer ${status ? 'khoa' : 'conhang'}`}>{status ? 'Vô hiệu hóa' : 'Hoạt động'}</p>
                        </div>
                        <FontAwesomeIcon
                            onClick={onClose}
                            style={{ cursor: 'pointer' }} className="faXmark" icon={faXmark}></FontAwesomeIcon>
                    </div>

                    <div className='customer-form'>
                        <div className='customer-form-img'>
                            <img className={status ? 'shadow-no' : 'shadow-ok'} src='/images/avtadmin.jpg' alt='customer' />
                        </div>
                        <div className='customer-form-info'>
                            <div className='customer-form-info_col'>
                                <div className='customer-form-info_col_item'>
                                    <label>Tên tài khoản</label>
                                    <input disabled
                                        value={customer.ho_ten}
                                    />
                                </div>
                                <div className='customer-form-info_col_item'>
                                    <label>Email</label>
                                    <input disabled value={customer.email} />
                                </div>
                                <div className='customer-form-info_col_item'>
                                    <label>Số điện thoại</label>
                                    <input disabled value={customer.so_dt} />
                                </div>
                            </div>
                            <div className='customer-form-info_col'>
                                <div className='customer-form-info_col_item'>
                                    <label>Ngày sinh</label>
                                    <input disabled value={customer.ngay_sinh} />
                                </div>
                                <div className='customer-form-info_col_item'>
                                    <label>Vai trò</label>
                                    <input disabled value={customer.vai_tro?.ma_vai_tro === 2 ? 'Người bán, Người dùng' : 'Người dùng'} />
                                </div>
                                <div className='customer-form-info_col_item'>
                                    <label>Ngày tạo</label>
                                    <input disabled value={customer.ngay_tao} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='customer-form-footter'>
                        <div className='customer-form-note note-color-red'>
                            <p>Điểm vi phạm: 24 - Nguy hiểm</p>
                        </div>
                        <div className='customer-form-btn'>
                            <button className='customer-form-btn_out' onClick={onClose}>Thoát</button>
                            {
                                status && (
                                    <button className='customer-form-btn_lock'>Mở khóa tài khoản</button>
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CustomerForm;