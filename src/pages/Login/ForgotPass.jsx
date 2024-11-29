import React from 'react';
import HeaderUser from '../Component/HeaderUser';
import FooterUser from '../Component/FooterUser';
import './ForgotPass.css';

const ResetPassword = () => {
    return (
        <div className="reset-password-page">
            {/* Sử dụng HeaderUser */}
            <HeaderUser />

            <section className="reset-password-section">
                <div className="reset-password-container">
                    <h2 className="reset-password-title">Đặt lại mật khẩu</h2>
                    <form className="reset-password-form">
                        <input type="email" placeholder="Email" className="reset-input" />
                        <div className="reset-input-group">
                            <input type="text" placeholder="Nhập mã" className="reset-input" />
                            <button type="button" className="send-code-button">Gửi mã</button>
                        </div>
                        <input type="password" placeholder="Mật khẩu" className="reset-input" />
                        <button type="submit" className="reset-button">Tạo mật khẩu</button>
                    </form>
                </div>
            </section>

            {/* Sử dụng FooterUser */}
            <FooterUser />
        </div>
    );
};

export default ResetPassword;
