<template>
    <div class="header">
        <nav class="navbar navbar-expand-lg">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FPT_logo_2010.svg/1200px-FPT_logo_2010.svg.png"
                        alt="FPT-Sport" height="50">
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
                            <router-link class="nav-link" to="/san-pham"><i class="fas fa-dumbbell"></i> Sản
                                phẩm</router-link>
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
                                data-bs-toggle="dropdown">
                                <img :src="userInfo.avatar || 'https://i.pinimg.com/originals/03/19/e7/0319e75748160709ceefa7398a4a7070.jpg'"
                                    class="user-img" alt="user">
                                <span class="ms-2">{{ userInfo.hoVaTen || 'Tài khoản' }}</span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><router-link class="dropdown-item" to="/thong-tin-tai-khoan"><i
                                            class="fas fa-user"></i> Thông tin tài khoản</router-link></li>
                                <li>
                                    <router-link class="dropdown-item" to="/lich-su-don-hang">
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
        <!-- <div class="category-menu">
            <div class="container">
                <div class="row">
                    <template v-for="(value, index) in danh_sach_danh_muc" :key="index">
                        <div class="col">
                            <ul class="category-list">
                                <li>
                                    <router-link :to="{ path: '/san-pham', query: { danh_muc_id: value.id } }">
                                        <i class="fas fa-running"></i> {{ value.name }}
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </template>
                </div>
            </div>
        </div> -->
        <div class="slider">
            <div id="mainCarousel" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="0" class="active"></button>
                    <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="2"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://www.thethaodaiviet.vn/upload/banner/maychay-cover-1920x650.png"
                            class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="https://www.thethaodaiviet.vn/upload/banner/banner-web-xe-1920x650-1.png"
                            class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="https://www.thethaodaiviet.vn/upload/banner/ghe-cover-1920x650-dvs.png"
                            class="d-block w-100" alt="...">
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
            danh_sach_danh_muc: [],
            cartItems: [],
            isLoading: false,
            cartItemCount: 0
        }
    },
    beforeDestroy() {
        // Cleanup listeners
        this.$root.$off('login-success');
        window.removeEventListener('storage', this.kiemTraDangNhap);
    },
    mounted() {
        this.kiemTraDangNhap();
        this.layDanhMuc();
        this.loadCartItems();
        // Kiểm tra định kỳ token
        setInterval(() => {
            this.kiemTraDangNhap();
        }, 30000); // Kiểm tra mỗi 30 giây
    },
    watch: {
        // Watch route changes
        '$route': {
            handler() {
                this.kiemTraDangNhap();
            },
            immediate: true
        }
    },
    methods: {
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
        layDanhMuc() {
            axios
                .get("/api/user/danh-muc/home-page")
                .then((res) => {
                    this.danh_sach_danh_muc = res.data.data;
                })
                .catch(error => {
                    console.error("Lỗi khi lấy danh sách danh mục:", error);
                });
        },
        kiemTraDangNhap() {
            const token = localStorage.getItem('token_khach_hang');
            const userInfo = localStorage.getItem('user_info');

            console.log("Kiểm tra đăng nhập - Token:", token);
            console.log("Kiểm tra đăng nhập - UserInfo:", userInfo);

            if (token && userInfo) {
                try {
                    const parsedUserInfo = JSON.parse(userInfo);
                    console.log("Parsed user info:", parsedUserInfo);

                    if (!parsedUserInfo || !parsedUserInfo.hoVaTen) {
                        console.error("User info không hợp lệ");
                        this.dangXuat();
                        return;
                    }

                    this.isLoggedIn = true;
                    this.userInfo = parsedUserInfo;

                    console.log("Trạng thái đăng nhập:", this.isLoggedIn);
                    console.log("Thông tin user:", this.userInfo);

                    // Kiểm tra token với server
                    axios.get('/api/kiem-tra-token', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(res => {
                            console.log("Kết quả kiểm tra token:", res.data);
                            if (!res.data.status) {
                                this.dangXuat();
                            }
                        })
                        .catch((error) => {
                            console.error("Lỗi kiểm tra token:", error);
                            this.dangXuat();
                        });
                } catch (error) {
                    console.error('Error parsing user info:', error);
                    this.dangXuat();
                }
            } else {
                console.log("Không tìm thấy token hoặc user info");
                this.isLoggedIn = false;
                this.userInfo = {};
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
    background: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.navbar {
    padding: 15px 0;
    border-bottom: 1px solid #eee;
}

.navbar-brand img {
    max-height: 50px;
    transition: transform 0.3s;
}

.navbar-brand img:hover {
    transform: scale(1.05);
}

.nav-link {
    color: #333;
    font-weight: 500;
    padding: 8px 15px;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 5px;
}

.nav-link i {
    font-size: 16px;
}

.nav-link:hover,
.nav-link.active {
    color: #ff4444;
    transform: translateY(-2px);
}

.search-box {
    position: relative;
    width: 400px;
}

.search-box input {
    padding-right: 35px;
    padding-left: 20px;
    border-radius: 25px;
    border: 2px solid #eee;
    transition: all 0.3s;
    height: 45px;
    font-size: 15px;
}

.search-box input:focus {
    border-color: #ff4444;
    box-shadow: 0 0 0 3px rgba(255, 68, 68, 0.1);
}

.search-box i {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
    transition: color 0.3s;
    font-size: 16px;
}

.cart-box a {
    color: #333;
    font-size: 20px;
    transition: color 0.3s;
}

.cart-box a:hover {
    color: #ff4444;
}

.cart-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #ff4444;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 12px;
    min-width: 18px;
    text-align: center;
}

.user-box {
    cursor: pointer;
}

.user-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #eee;
    transition: all 0.3s;
}

.user-box:hover .user-img {
    border-color: #ff4444;
}

.category-menu {
    background: #f8f9fa;
    padding: 15px 0;
    border-top: 1px solid #eee;
}

.category-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    gap: 40px;
}

.category-list li a {
    color: #333;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 15px;
    border-radius: 20px;
}

.category-list li a i {
    font-size: 18px;
}

.category-list li a:hover {
    color: #ff4444;
    background: rgba(255, 68, 68, 0.1);
}

.slider {
    margin-top: 20px;
}

.carousel-item {
    position: relative;
}

.carousel-item img {
    height: 500px;
    object-fit: cover;
}

.carousel-caption {
    background: rgba(0, 0, 0, 0.5);
    padding: 30px;
    border-radius: 10px;
    max-width: 600px;
    margin: 0 auto;
    bottom: 50%;
    transform: translateY(50%);
}

.carousel-caption h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 15px;
}

.carousel-caption p {
    font-size: 1.1rem;
    margin-bottom: 20px;
}

.carousel-caption .btn {
    padding: 10px 30px;
    border-radius: 25px;
    background: #ff4444;
    border: none;
    transition: all 0.3s;
}

.carousel-caption .btn:hover {
    background: #ff2222;
    transform: translateY(-2px);
}

.carousel-indicators {
    bottom: 20px;
}

.carousel-indicators button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin: 0 5px;
    background: rgba(255, 255, 255, 0.5);
    border: none;
}

.carousel-indicators button.active {
    background: #ff4444;
}

@media (max-width: 768px) {
    .search-box {
        width: 100%;
        margin: 10px 0;
    }

    .search-box input {
        height: 40px;
    }

    .category-list {
        flex-wrap: wrap;
        gap: 15px;
    }

    .carousel-item img {
        height: 300px;
    }

    .carousel-caption {
        padding: 15px;
    }

    .carousel-caption h2 {
        font-size: 1.8rem;
    }

    .carousel-caption p {
        font-size: 1rem;
    }
}
</style>