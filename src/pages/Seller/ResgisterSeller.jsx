import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RegisterSeller.css";
import HeaderUser from "../Component/HeaderUser";
import FooterUser from "../Component/FooterUser";
import {  useNavigate } from "react-router-dom";
import AddressSelector from "../Cart/AddressSelector";
import defaultAvatar from './default_avatar.png';
import defaultCover from './default_cover.png';
import {handleImageUpload} from '../../utils/Order/UploadImageFileOnCloud'
import {createFileFromUrl} from '../../utils/Order/UploadImageFileOnCloud'

const RegisterSeller = () => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [shopName, setShopName] = useState("");
    const [pickupAddress, setPickupAddress] = useState({});
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [address, setAddress] = useState(null);
    const [showAddressSelector, setShowAddressSelector] = useState(false);
    const navigate = useNavigate();
    const [addressFormData, setAddressFormData] = useState({
        name: "",
        phone: "",
        city: "",
        district: "",
        ward: "",
        specificAddress: "",
    });

    // Fetch user data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const loggedInUser = JSON.parse(sessionStorage.getItem("user"));
                setUser(loggedInUser);

                if (loggedInUser) {
                    // Fetch user profile
                    const userProfile = await axios.get(
                        `http://localhost:8080/api/taikhoan/profile/${loggedInUser.id_tai_khoan}`
                    );
                    const { email, so_dt } = userProfile.data.result;
                    setEmail(email);
                    setPhone(so_dt);

                    // Fetch default address
                    const addressResponse = await axios.get(
                        `http://localhost:8080/api/v1/nguoidung/diachi/${loggedInUser.id_tai_khoan}`
                    );
                    if (addressResponse.data.length > 0) {
                        setPickupAddress(addressResponse.data[0]); // Assuming the first address is default
                    }
                }
            } catch (error) {
                console.error("Error fetching user or address data:", error);
            }
            const savedAddress = JSON.parse(sessionStorage.getItem('address'));
        if (savedAddress) {
            setAddress(savedAddress);
        }
        };

        fetchData();
    }, []);

 

    // Handle address form changes

    const handleSelectAddress = (selectedAddress) => {
        setAddress(selectedAddress);
        sessionStorage.setItem('address', JSON.stringify(selectedAddress));
        setShowAddressSelector(false);
    };


    // Save the updated address
const handleCompleteEditAddress = async () => {
        try {
            const updatedAddress = {
                ten_dia_chi: `${addressFormData.specificAddress}, ${addressFormData.ward}, ${addressFormData.district}, ${addressFormData.city}`,
                dia_chi_mac_dinh: true,
                tai_khoan: { id_tai_khoan: user.id_tai_khoan },
            };

            const response = await axios.post(
                `http://localhost:8080/api/v1/nguoidung/diachi/nguoidung-${user.id_tai_khoan}`,
                updatedAddress
            );

            setPickupAddress(response.data);
            setShowAddressForm(false);
        } catch (error) {
            console.error("Error updating address:", error);
        }
    };

    // Submit registration form
    const handleRegisterSeller = async () => {
        const user = JSON.parse(sessionStorage.getItem("user"));
    
        try {
            // Tạo File object từ URL của ảnh mặc định
            const avatarFile = await createFileFromUrl(defaultAvatar, "default_avatar.png");
            const coverFile = await createFileFromUrl(defaultCover, "default_cover.png");
            console.log(avatarFile)
    
            // Upload avatar và cover lên Cloudinary
            const avatarUrl = await handleImageUpload(avatarFile);
            const coverUrl = await handleImageUpload(coverFile);
    
            const payload = {
                ten_cua_hang: shopName,
                dia_chi_cua_hang: pickupAddress.ten_dia_chi || "",
                anh_dai_dien: avatarUrl, // URL từ Cloudinary
                anh_bmaiia: coverUrl, // URL từ Cloudinary
                el: email,
                so_dt: phone,
                trang_thai_cua_hang: null,
                tai_khoan: { id_tai_khoan: user.id_tai_khoan },
            };
    
            const response = await axios.post(
                `http://localhost:8080/api/v1/nguoidung/dangkiNB-${user.id_tai_khoan}`,
                payload
            );
    
            alert("Đăng ký thành công!");
            navigate('/HomeUserIndex');
            console.log("Seller registered:", response.data);
        } catch (error) {
            console.error("Error registering seller:", error);
            alert("Đăng ký thất bại!");
        }
    };
    
    
    
    

    return (
        <div>
            <HeaderUser />
            <div className="register-seller-container">
                <h2 className="register-seller-title">Đăng ký trở thành Người bán</h2>
                <div className="shop-info">
                    <h3>Thông tin Shop</h3>
                    <div className="form-group">
                        <label>Tên shop</label>
                        <input
                            type="text"
                            value={shopName}
                            onChange={(e) => setShopName(e.target.value)}
                            placeholder="Nhập tên shop của bạn"
style={{fontSize: '16px'}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Địa chỉ lấy hàng</label>
                        <p style={{fontSize: '16px'}}>
                            {pickupAddress.ten_dia_chi
                                ? `${pickupAddress.ten_dia_chi}`
                                : "Chưa có địa chỉ lấy hàng"}
                        </p>
                        <button className="edit-button" onClick={() => setShowAddressSelector(true)}>
                            Chỉnh sửa
                        </button>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            readOnly
                            style={{fontSize: '16px'}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Số điện thoại</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            readOnly
                            style={{fontSize: '16px'}}
                        />
                    </div>
                    <button className="register-button" onClick={handleRegisterSeller}>
                        Đăng ký
                    </button>
                </div>
            </div>
            <FooterUser />
            {showAddressSelector && (
                <AddressSelector
                    onSelectAddress={handleSelectAddress}
                    onClose={() => setShowAddressSelector(false)}
                />
            )}
        </div>
    );
};

export default RegisterSeller;