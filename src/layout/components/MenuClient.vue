<template>
    <div class="header">
        <nav class="navbar navbar-expand-lg">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <img src="https://xbilliard.vn/wp-content/uploads/2025/02/cropped-Artboard-1-copy-2-1536x932.png"
                        alt="THOI TRANG - STORE" height="50">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/home-page"><i class="fas fa-home"></i> Trang
                                chủ</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/tin-tuc"><i class="fas fa-newspaper"></i> Tin
                                tức</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/lien-he"><i class="fas fa-envelope"></i> Liên
                                hệ</router-link>
                        </li>
                    </ul>
                    <div class="d-flex align-items-center">
                        <div class="cart-box me-3">
                            <router-link to="/gio-hang" class="position-relative">
                                <i class="fas fa-shopping-cart"></i>
                                <span class="cart-count">{{ cartItemCount }}</span>
                            </router-link>
                        </div>
                        <div class="user-box dropdown" v-if="isLoggedIn">
                            <a class="d-flex align-items-center dropdown-toggle" href="#" role="button"
                                @click.prevent="toggleDropdown" :aria-expanded="isDropdownOpen" id="userDropdown">
                                <img :src="userInfo.avatar || 'https://i.pinimg.com/originals/03/19/e7/0319e75748160709ceefa7398a4a7070.jpg'"
                                    class="user-img" alt="user">
                                <span class="ms-2">{{ userInfo.hoVaTen || 'Tài khoản' }}</span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" :class="{ 'show': isDropdownOpen }" 
                                aria-labelledby="userDropdown" @click.stop>
                                <li><router-link class="dropdown-item" to="/thong-tin-tai-khoan" @click="closeDropdown"><i
                                            class="fas fa-user"></i> Thông tin tài khoản</router-link></li>
                                <li>
                                    <router-link class="dropdown-item" to="/lich-su-don-hang" @click="closeDropdown">
                                        <i class="fas fa-history"></i>
                                        Lịch sử đơn hàng
                                    </router-link>
                                </li>
                                <li><a class="dropdown-item" href="#" @click.prevent="dangXuat"><i
                                            class="fas fa-sign-out-alt"></i> Đăng xuất</a></li>
                            </ul>
                        </div>
                        <div v-else class="d-flex gap-2">
                            <router-link to="/dang-nhap" class="btn btn-outline-primary">Đăng nhập</router-link>
                            <router-link to="/dang-ky" class="btn btn-primary">Đăng ký</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <div class="slider">
            <div id="mainCarousel" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="0" class="active"></button>
                    <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="2"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://xbilliard.vn/wp-content/uploads/2025/07/313-web.jpg"
                            class="d-block w-100 " style="height : 650px" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="https://xbilliard.vn/wp-content/uploads/2025/06/281-web.jpg"
                            class="d-block w-100 " style="height : 650px" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="https://xbilliard.vn/wp-content/uploads/2024/08/24-Web-150kb.jpg"
                            class="d-block w-100 " style="height : 650px" alt="...">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon"></span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { createToaster } from "@meforma/vue-toaster";
import axios from "axios";
const toaster = createToaster({ position: "top-right" });

export default {
    name: 'MenuClient',
    data() {
        return {
            isLoggedIn: false,
            userInfo: {},
            cartItems: [],
            isLoading: false,
            cartItemCount: 0,
            isDropdownOpen: false,
        }
    },
    beforeDestroy() {
        // Cleanup listeners
        this.$root.$off('login-success');
        window.removeEventListener('storage', this.kiemTraDangNhap);
        document.removeEventListener('click', this.handleClickOutside);
    },
    mounted() {
        // Chỉ khởi tạo kiểm tra token nếu không phải là admin
        if (!this.isAdminRoute()) {
            this.initializeCustomerChecks();
        }
        
        // Thêm event listener để đóng dropdown khi click bên ngoài
        document.addEventListener('click', this.handleClickOutside);
    },
    methods: {
        isAdminRoute() {
            return this.$route.path.startsWith('/admin');
        },
        initializeCustomerChecks() {
            this.kiemTraDangNhap();
            this.loadCartItems();
        },
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        closeDropdown() {
            this.isDropdownOpen = false;
        },
        handleClickOutside(event) {
            const dropdown = this.$el.querySelector('.user-box');
            if (dropdown && !dropdown.contains(event.target)) {
                this.isDropdownOpen = false;
            }
        },
        loadCartItems() {
            this.isLoading = true;
            const userInfo = JSON.parse(localStorage.getItem('user_info'));
            const token = localStorage.getItem('token_khach_hang');

            if (userInfo && userInfo.id && token) {
                // Lấy giỏ hàng từ API nếu đã đăng nhập
                axios.get(`/api/user/gio-hang/khach-hang/${userInfo.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(res => {
                        if (res.data.status) {
                            this.cartItems = res.data.data;
                            // Tính tổng số lượng sản phẩm trong giỏ hàng
                            this.calculateCartCount();
                        } else {
                            toaster.error(res.data.message || 'Có lỗi xảy ra khi tải giỏ hàng!');
                        }
                        this.isLoading = false;
                    })
                    .catch(error => {
                        console.error(error);
                        toaster.error('Có lỗi xảy ra khi tải giỏ hàng!');
                        this.isLoading = false;
                    });
            } else {
                // Lấy giỏ hàng từ localStorage nếu chưa đăng nhập
                this.cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');
                // Tính tổng số lượng sản phẩm trong giỏ hàng
                this.calculateCartCount();
                this.isLoading = false;
            }
        },

        calculateCartCount() {
            if (!this.cartItems || !Array.isArray(this.cartItems)) {
                this.cartItemCount = 0;
                return;
            }

            this.cartItemCount = this.cartItems.reduce((total, item) => {
                return total + (parseInt(item.soLuong) || 1);
            }, 0);
        },
        kiemTraDangNhap() {
            const token = localStorage.getItem('token_khach_hang');
            const userInfo = localStorage.getItem('user_info');

            if (!token || !userInfo) {
                this.isLoggedIn = false;
                this.userInfo = {};
                return;
            }

            try {
                const parsedUserInfo = JSON.parse(userInfo);
                if (!parsedUserInfo || !parsedUserInfo.hoVaTen) {
                    this.dangXuat();
                    return;
                }

                this.isLoggedIn = true;
                this.userInfo = parsedUserInfo;

                // Kiểm tra token với server
                axios.get('/api/user/kiem-tra-token', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(res => {
                        if (!res.data.status || res.data.user.isBlocked === 0) {
                            this.dangXuat();
                        }
                    })
                    .catch(() => {
                        this.dangXuat();
                    });
            } catch (error) {
                this.dangXuat();
            }
        },
        dangXuat() {
            localStorage.removeItem('token_khach_hang');
            localStorage.removeItem('user_info');
            this.isLoggedIn = false;
            this.userInfo = {};
            toaster.success('Đăng xuất thành công!');
            this.$router.push('/dang-nhap');
        }
    }
}
</script>

<style scoped>
.header {
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.navbar {
    padding: 20px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.navbar-brand img {
    max-height: 50px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
}

.navbar-brand img:hover {
    transform: scale(1.08) rotate(2deg);
}

.nav-link {
    color: #2c3e50;
    font-weight: 600;
    font-size: 16px;
    padding: 12px 20px;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 25px;
    position: relative;
    overflow: hidden;
}

.nav-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 68, 68, 0.1), transparent);
    transition: left 0.5s;
}

.nav-link:hover::before {
    left: 100%;
}

.nav-link i {
    font-size: 18px;
    transition: transform 0.3s;
}

.nav-link:hover,
.nav-link.active {
    color: #ff4444;
    background: rgba(255, 68, 68, 0.08);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 68, 68, 0.2);
}

.nav-link:hover i {
    transform: scale(1.2);
}

/* Cart Styling */
.cart-box {
    position: relative;
}

.cart-box a {
    color: #2c3e50;
    font-size: 24px;
    transition: all 0.3s;
    padding: 12px;
    border-radius: 50%;
    background: rgba(255, 68, 68, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 55px;
    height: 55px;
    position: relative;
    overflow: hidden;
    text-decoration: none;
}

.cart-box a::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 68, 68, 0.1);
    border-radius: 50%;
    transition: all 0.4s;
    transform: translate(-50%, -50%);
}

.cart-box a:hover::before {
    width: 100%;
    height: 100%;
}

.cart-box a:hover {
    color: #ff4444;
    background: rgba(255, 68, 68, 0.15);
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(255, 68, 68, 0.3);
}

.cart-count {
    position: absolute;
    top: -5px;
    right: -5px;
    background: linear-gradient(135deg, #ff4444, #ff6b6b);
    color: white;
    border-radius: 50%;
    padding: 4px 8px;
    font-size: 11px;
    font-weight: 700;
    min-width: 22px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(255, 68, 68, 0.4);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

/* User Box Styling */
.user-box {
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
}

.user-box .dropdown-toggle {
    padding: 8px 16px;
    border-radius: 25px;
    background: rgba(255, 68, 68, 0.05);
    border: 2px solid transparent;
    transition: all 0.3s;
    text-decoration: none;
    color: #2c3e50;
    font-size: 16px;
    font-weight: 500;
}

.user-box .dropdown-toggle:hover {
    background: rgba(255, 68, 68, 0.1);
    border-color: rgba(255, 68, 68, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 68, 68, 0.15);
}

.user-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s;
}

.user-box:hover .user-img {
    border-color: #ff4444;
    transform: scale(1.05);
}

/* Login/Register Buttons - The Main Focus */
.d-flex.gap-2 {
    gap: 12px !important;
}

.btn {
    padding: 14px 32px;
    font-weight: 600;
    font-size: 16px;
    border-radius: 25px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 130px;
    border: 2px solid;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    transition: left 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: -1;
}

/* Login Button (Outline) */
.btn-outline-primary {
    color: #ff4444;
    border-color: #ff4444;
    background: transparent;
    box-shadow: 0 4px 15px rgba(255, 68, 68, 0.2);
}

.btn-outline-primary::before {
    background: linear-gradient(135deg, #ff4444, #ff6b6b);
}

.btn-outline-primary:hover {
    color: white;
    border-color: #ff4444;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 12px 35px rgba(255, 68, 68, 0.4);
}

.btn-outline-primary:hover::before {
    left: 0;
}

/* Register Button (Filled) */
.btn-primary {
    color: white;
    border-color: #ff4444;
    background: linear-gradient(135deg, #ff4444, #ff6b6b);
    box-shadow: 0 4px 15px rgba(255, 68, 68, 0.3);
}

.btn-primary::before {
    background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
}

.btn-primary:hover {
    color: white;
    border-color: #ff6b6b;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 12px 35px rgba(255, 68, 68, 0.5);
}

.btn-primary:hover::before {
    left: 0;
}

/* Button Active States */
.btn:active {
    transform: translateY(-1px) scale(1.02);
}

/* Dropdown Menu Styling */
.dropdown-menu {
    border: none;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    border-radius: 15px;
    padding: 10px 0;
    margin-top: 10px;
    min-width: 200px;
    z-index: 1050;
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
}

.dropdown-menu.show {
    display: block !important;
    animation: dropdownFadeIn 0.3s ease-in-out;
}

@keyframes dropdownFadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.dropdown-item {
    padding: 12px 20px;
    transition: all 0.3s;
    color: #2c3e50;
    display: flex;
    align-items: center;
    gap: 10px;
}

.dropdown-item:hover {
    background: rgba(255, 68, 68, 0.08);
    color: #ff4444;
    transform: translateX(5px);
}

.dropdown-item i {
    width: 16px;
    font-size: 14px;
}

/* Slider Improvements */
.slider {
    margin-top: 0;
    border-radius: 0 0 20px 20px;
    overflow: hidden;
}

.carousel-item {
    position: relative;
}

.carousel-item img {
    height: 500px;
    object-fit: cover;
    transition: transform 0.5s;
}

.carousel-item:hover img {
    transform: scale(1.02);
}

.carousel-caption {
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    padding: 40px;
    border-radius: 20px;
    max-width: 600px;
    margin: 0 auto;
    bottom: 50%;
    transform: translateY(50%);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.carousel-caption h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 15px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.carousel-caption p {
    font-size: 1.1rem;
    margin-bottom: 20px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.carousel-caption .btn {
    padding: 12px 35px;
    border-radius: 25px;
    background: linear-gradient(135deg, #ff4444, #ff6b6b);
    border: none;
    transition: all 0.3s;
    box-shadow: 0 8px 25px rgba(255, 68, 68, 0.4);
}

.carousel-caption .btn:hover {
    background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 12px 35px rgba(255, 68, 68, 0.6);
}

.carousel-indicators {
    bottom: 30px;
}

.carousel-indicators button {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin: 0 8px;
    background: rgba(255, 255, 255, 0.4);
    border: 2px solid rgba(255, 255, 255, 0.6);
    transition: all 0.3s;
}

.carousel-indicators button.active {
    background: #ff4444;
    border-color: #ff4444;
    transform: scale(1.2);
    box-shadow: 0 4px 12px rgba(255, 68, 68, 0.5);
}

/* Responsive Design */
@media (max-width: 768px) {
    .navbar {
        padding: 15px 0;
    }
    
    .nav-link {
        padding: 10px 15px;
        margin: 2px 0;
    }
    
    .d-flex.gap-2 {
        flex-direction: column;
        width: 100%;
        margin-top: 15px;
    }
    
    .btn {
        width: 100%;
        margin: 5px 0;
    }
    
    .cart-box {
        margin-bottom: 15px;
    }
    
    .carousel-item img {
        height: 300px;
    }
    
    .carousel-caption {
        padding: 20px;
        bottom: 20px;
        transform: none;
    }
    
    .carousel-caption h2 {
        font-size: 1.8rem;
    }
    
    .carousel-caption p {
        font-size: 1rem;
    }
}

@media (max-width: 576px) {
    .btn {
        padding: 10px 20px;
        font-size: 13px;
        min-width: 100px;
    }
    
    .navbar-brand img {
        max-height: 40px;
    }
    
    .cart-box a {
        width: 45px;
        height: 45px;
        font-size: 20px;
    }
}
</style>