<template>
    <div class="product-detail-page">
        <div class="breadcrumb">
            <a href="/">Trang chủ</a> /
            <a href="/danh-muc">{{ san_pham.danhMuc?.name }}</a> /
            <span>{{ san_pham.tenSanPham }}</span>
        </div>

        <div class="product-main">
            <div class="product-gallery">
                <div class="main-image-wrapper">
                    <img :src="mainImage || san_pham.hinhAnh" :alt="san_pham.tenSanPham" class="main-image">
                </div>
                <div class="support-info mt-2">
                    <div class="support-item">
                        <i class="bi bi-truck"></i>
                        <span>Miễn phí vận chuyển</span>
                    </div>
                    <div class="support-item">
                        <i class="bi bi-shield-check"></i>
                        <span>Bảo hành chính hãng</span>
                    </div>
                    <div class="support-item">
                        <i class="bi bi-credit-card"></i>
                        <span>Thanh toán linh hoạt</span>
                    </div>
                </div>
            </div>

            <div class="product-info">
                <h1 class="product-title">{{ san_pham.tenSanPham }}</h1>

                <div class="product-meta">
                    <div class="meta-item">
                        <span class="label">Mã sản phẩm:</span>
                        <span class="value">{{ san_pham.maSanPham }}</span>
                    </div>
                    <div class="meta-item">
                        <span class="label">Thương hiệu:</span>
                        <span class="value">{{ san_pham.thuongHieu?.tenThuongHieu }}</span>
                    </div>
                    <div class="meta-item">
                        <span class="label">Xuất xứ:</span>
                        <span class="value">{{ san_pham.xuatXu }}</span>
                    </div>
                    <div class="meta-item">
                        <span class="label">Bảo hành:</span>
                        <span class="value">{{ san_pham.thoiGianBaoHanh }}</span>
                    </div>
                </div>

                <div class="price-section">
                    <div class="current-price">{{ formatCurrency(san_pham.giaSanPham) }}</div>
                    <div class="price-details" v-if="san_pham.giamGia">
                        <span class="original-price">{{ formatCurrency(san_pham.giaSanPham) }}</span>
                        <span class="discount-badge">-{{ san_pham.giamGia.phamTramGiamGia }}%</span>
                    </div>
                </div>

                <div class="product-options">
                    <div class="option-group">
                        <label>Kích cỡ</label>
                        <div class="size-options">
                            <button v-for="size in san_pham.kichCo?.split(',')" :key="size"
                                :class="{ active: selectedSize === size }" @click="selectedSize = size">
                                {{ size }}
                            </button>
                        </div>
                    </div>

                    <div class="option-group">
                        <label>Màu sắc</label>
                        <div class="color-options">
                            <button v-for="color in san_pham.mauSac?.split(',')" :key="color"
                                :class="{ active: selectedColor === color }" @click="selectedColor = color">
                                {{ color }}
                            </button>
                        </div>
                    </div>

                    <div class="option-group">
                        <label>Số lượng</label>
                        <div class="quantity-selector">
                            <button class="quantity-btn" @click="decreaseQuantity">
                                <i class="bi bi-dash">-</i>
                            </button>
                            <input type="number" v-model="quantity" min="1" class="quantity-input">
                            <button class="quantity-btn" @click="increaseQuantity">
                                <i class="bi bi-plus">+</i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="product-actions">
                    <button @click="themVaoGioHang" class="btn-add-to-cart" :disabled="san_pham.soLuongTonKho <= 0">
                        <i class="fas fa-shopping-cart"></i>
                        Thêm vào giỏ hàng
                    </button>
                    <button @click="muaNgay" class="btn-buy-now" :disabled="san_pham.soLuongTonKho <= 0">
                        Mua ngay
                    </button>
                </div>

            </div>
        </div>

        <div class="product-tabs">
            <div class="tab-header">
                <button class="tab-btn active" @click="activeTab = 'description'">Mô tả sản phẩm</button>
                <button class="tab-btn" @click="activeTab = 'specs'">Thông số kỹ thuật</button>
                <button class="tab-btn" @click="activeTab = 'reviews'">Đánh giá</button>
            </div>

            <div class="tab-content">
                <div v-if="activeTab === 'description'" class="tab-pane">
                    <div class="product-description">
                        <h3>Mô tả sản phẩm</h3>
                        <p>{{ san_pham.moTa }}</p>
                    </div>
                </div>

                <div v-if="activeTab === 'specs'" class="tab-pane">
                    <div class="product-specs">
                        <h3>Thông số kỹ thuật</h3>
                        <div class="specs-table">
                            <div class="spec-row" v-for="(value, key) in san_pham.thongSoKyThuat" :key="key">
                                <div class="spec-label">{{ key }}</div>
                                <div class="spec-value">{{ value }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="activeTab === 'reviews'" class="tab-pane">
                    <div class="reviews-section">
                        <h3>Đánh giá từ khách hàng</h3>
                        <div class="reviews-list">
                            <div v-for="review in danh_sach_danh_gia" :key="review.id" class="review-card">
                                <div class="review-header">
                                    <img :src="review.user?.avatar || '/default-avatar.png'" class="reviewer-avatar">
                                    <div class="reviewer-info">
                                        <h4>{{ review.user?.hoVaTen }}</h4>
                                        <span class="review-date">{{ formatDate(review.ngayDanhGia) }}</span>
                                    </div>
                                </div>
                                <p class="review-content">{{ review.danhGia }}</p>
                                <div v-if="review.hinhAnh" class="review-images">
                                    <img :src="review.hinhAnh" alt="Review image">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="related-products">
            <h2>Sản phẩm liên quan</h2>
            <div class="row g-4">
                <template v-for="(value, index) in danh_sach_san_pham" :key="index">
                    <div class="col-12 col-sm-6 col-md-3">
                        <div class="product-card">
                            <img :src="value.hinhAnh" class="card-img-top" :alt="value.tenSanPham">
                            <div class="discount-badge" v-if="value.giamGia">
                                <span class="badge">-{{ value.giamGia.phamTramGiamGia }}%</span>
                            </div>
                            <div class="view-details">
                                <a @click="redirectToDetail(value.id)" href="javascript:void(0)">Xem chi tiết</a>
                            </div>
                            <div class="card-body">
                                <h6 class="card-title">{{ value.tenSanPham }}</h6>
                                <div class="product-details">
                                    <!-- <div class="specs">
                                                <span class="badge">Kích cỡ: {{ value.kichCo }}</span>
                                                <span class="badge">Màu sắc: {{ value.mauSac }}</span>
                                                <span class="badge">Chất liệu: {{ value.chatLieu }}</span>
                                            </div> -->
                                    <div class="price-section">
                                        <p class="stock-status"
                                            :class="value.soLuongTonKho > 0 ? 'text-success' : 'text-danger'">
                                            <i class="bx bx-package"></i>
                                            {{ value.soLuongTonKho > 0 ? 'Còn hàng' : 'Hết hàng' }}
                                            ({{ value.soLuongTonKho }})
                                        </p>
                                        <p class="mb-0">
                                            <span v-if="value.giamGia" class="original-price">
                                                {{ formatCurrency(value.giaSanPham) }}
                                            </span>
                                            <span class="discounted-price">
                                                {{ formatCurrency(value.giaSanPham * (1 -
                                                    (value.giamGia?.phamTramGiamGia || 0) / 100)) }}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
    data() {
        return {
            san_pham: {},
            danh_sach_danh_gia: [],
            danh_sach_san_pham: [],
            selectedSize: '',
            selectedColor: '',
            quantity: 1,
            mainImage: '',
            activeTab: 'description'
        };
    },
    mounted() {
        this.layChiTietSanPham();
        this.layDanhGia();
        this.layDanhSachSanPham();
    },
    methods: {
        formatCurrency(amount) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
        },
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN');
        },
        layChiTietSanPham() {
            const id = this.$route.params.id;
            axios
                .get('/api/user/san-pham/' + id)
                .then((res) => {
                    if (res.data.status) {
                        this.san_pham = res.data.data;
                        this.mainImage = this.san_pham.hinhAnh;
                    }
                })
                .catch((error) => {
                    toaster.error('Có lỗi xảy ra khi lấy thông tin sản phẩm!');
                });
        },
        layDanhGia() {
            const id = this.$route.params.id;
            axios
                .get(`/api/client/danh-gia/${id}`)
                .then((res) => {
                    if (res.data.status) {
                        this.danh_sach_danh_gia = res.data.data;
                    }
                })
                .catch((error) => {
                    toaster.error('Có lỗi xảy ra khi lấy đánh giá!');
                });
        },
        layDanhSachSanPham() {
            axios
                .get('/api/user/san-pham/home-page')
                .then((res) => {
                    if (res.data.status) {
                        this.danh_sach_san_pham = res.data.data;
                    }
                })
                .catch((error) => {
                    toaster.error('Có lỗi xảy ra khi lấy danh sách sản phẩm!');
                });
        },
        changeMainImage(image) {
            this.mainImage = image;
        },
        increaseQuantity() {
            this.quantity++;
        },
        decreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },
        themVaoGioHang() {
            if (this.san_pham.soLuongTonKho <= 0) {
                toaster.error('Sản phẩm đã hết hàng!');
                return;
            }

            const userInfo = JSON.parse(localStorage.getItem('user_info'));
            const token = localStorage.getItem('token_khach_hang');
            
            if (userInfo && token) {
                // Tính giá tiền sau khi giảm giá (nếu có)
                const giaSauGiamGia = this.san_pham.giamGia
                    ? this.san_pham.giaSanPham * (1 - this.san_pham.giamGia.phamTramGiamGia / 100)
                    : this.san_pham.giaSanPham;
                
                const thanhTien = giaSauGiamGia * 1; // Mặc định thêm 1 sản phẩm

                // Thêm vào giỏ hàng qua API
                axios.post('/api/user/gio-hang/them-san-pham', null, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        idKhachHang: userInfo.id,
                        idSanPham: this.san_pham.id,
                        soLuong: 1,
                        thanhTien: thanhTien
                    }
                })
                .then(res => {
                    if (res.data.status) {
                        toaster.success('Thêm vào giỏ hàng thành công!');
                        this.$root.$emit('update-cart');
                    } else {
                        toaster.error(res.data.message || 'Có lỗi xảy ra!');
                    }
                })
                .catch(error => {
                    console.error(error);
                    toaster.error('Có lỗi xảy ra khi thêm vào giỏ hàng!');
                });
            } else {
                // Thêm vào giỏ hàng localStorage
                let cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');
                const existingItem = cartItems.find(item => item.id === this.san_pham.id);
                
                if (existingItem) {
                    if (existingItem.soLuong >= this.san_pham.soLuongTonKho) {
                        toaster.error('Số lượng sản phẩm trong giỏ hàng đã đạt tối đa!');
                        return;
                    }
                    existingItem.soLuong += 1;
                } else {
                    cartItems.push({
                        id: this.san_pham.id,
                        tenSanPham: this.san_pham.tenSanPham,
                        giaSanPham: this.san_pham.giaSanPham,
                        hinhAnh: this.san_pham.hinhAnh,
                        soLuong: 1,
                        giamGia: this.san_pham.giamGia ? {
                            phamTramGiamGia: this.san_pham.giamGia.phamTramGiamGia,
                            thanhTien: this.san_pham.giaSanPham * (1 - this.san_pham.giamGia.phamTramGiamGia / 100)
                        } : null,
                        soLuongTonKho: this.san_pham.soLuongTonKho
                    });
                }
                
                localStorage.setItem('cart_items', JSON.stringify(cartItems));
                toaster.success('Thêm vào giỏ hàng thành công!');
                this.$root.$emit('update-cart');
            }
        },
        muaNgay() {
            if (this.san_pham.soLuongTonKho <= 0) {
                toaster.error('Sản phẩm đã hết hàng!');
                return;
            }
            this.themVaoGioHang();
            this.$router.push('/gio-hang');
        },
        viewProduct(id) {
            this.$router.push(`/chi-tiet-san-pham/${id}`);
        }
    }
}
</script>

<style scoped>
.product-detail-page {
    max-width: 1200px;
    margin: 0 auto;
}

.breadcrumb {
    margin-bottom: 20px;
    font-size: 14px;
    color: #666;
}

.breadcrumb a {
    color: #0066cc;
    text-decoration: none;
}

.breadcrumb a:hover {
    text-decoration: underline;
}

.product-main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 40px;
}

.product-gallery {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.main-image-wrapper {
    margin-bottom: 20px;
}

.main-image {
    width: 100%;
}

.thumbnail-gallery {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

.thumbnail-item {
    border: 2px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
}

.thumbnail-item.active {
    border-color: #0066cc;
}

.thumbnail-item img {
    width: 100%;
    height: 80px;
    object-fit: cover;
}

.product-info {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-title {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin-bottom: 20px;
}

.product-meta {
    margin-bottom: 20px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 4px;
}

.meta-item {
    display: flex;
    margin-bottom: 10px;
}

.meta-item:last-child {
    margin-bottom: 0;
}

.meta-item .label {
    width: 120px;
    color: #666;
}

.meta-item .value {
    color: #333;
    font-weight: 500;
}

.price-section {
    margin-bottom: 20px;
}

.current-price {
    font-size: 28px;
    font-weight: 700;
    color: #e74c3c;
}

.price-details {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 5px;
}

.original-price {
    text-decoration: line-through;
    color: #999;
}

.discount-badge {
    background: #e74c3c;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 14px;
}

.product-options {
    margin-bottom: 20px;
}

.option-group {
    margin-bottom: 15px;
}

.option-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
}

.size-options,
.color-options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.size-options button,
.color-options button {
    padding: 8px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
}

.size-options button.active,
.color-options button.active {
    background: #0066cc;
    color: white;
    border-color: #0066cc;
}

.quantity-selector {
    display: inline-flex;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.quantity-btn {
    width: 40px;
    height: 40px;
    background: #f8f9fa;
    border: none;
    cursor: pointer;
}

.quantity-input {
    width: 60px;
    text-align: center;
    border: none;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
}

.product-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

.btn-add-to-cart {
    flex: 1;
    padding: 12px;
    background-color: #fff;
    color: #dc3545;
    border: 2px solid #dc3545;
    border-radius: 4px;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.btn-add-to-cart:hover {
    background-color: #dc3545;
    color: #fff;
}

.btn-add-to-cart:disabled {
    background-color: #f8f9fa;
    color: #999;
    border-color: #ddd;
    cursor: not-allowed;
}

.btn-buy-now {
    flex: 1;
    padding: 12px;
    background-color: #dc3545;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-buy-now:hover {
    background-color: #c82333;
}

.btn-buy-now:disabled {
    background-color: #f8f9fa;
    color: #999;
    cursor: not-allowed;
}

.support-info {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 4px;
}

.support-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #666;
}

.product-tabs {
    margin-bottom: 40px;
}

.tab-header {
    display: flex;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
}

.tab-btn {
    padding: 12px 20px;
    border: none;
    background: none;
    cursor: pointer;
    font-weight: 500;
    color: #666;
    position: relative;
}

.tab-btn.active {
    color: #0066cc;
}

.tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: #0066cc;
}

.tab-pane {
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.related-products {
    margin-bottom: 40px;
}

.related-products h2 {
    font-size: 20px;
    margin-bottom: 20px;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

@media (max-width: 1024px) {
    .products-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 768px) {
    .product-main {
        grid-template-columns: 1fr;
    }

    .products-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .support-info {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .products-grid {
        grid-template-columns: 1fr;
    }

    .product-actions {
        grid-template-columns: 1fr;
    }
}

.row-support {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    background-color: var(--background-light);
    border-radius: 8px;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border-color);
}

.row-support .col-md-12 {
    flex: 1 1 calc(50% - 20px);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 15px;
    background-color: var(--background-white);
    border-radius: 6px;
    box-shadow: var(--shadow-sm);
    transition: var(--transition);
    gap: 10px;
}

.row-support .col-md-12 i {
    font-size: 24px;
    color: var(--secondary-color);
}

.row-support .col-md-12 span {
    font-size: 16px;
    font-weight: 500;
    color: var(--text-color);
}

.row-support .col-md-12:hover {
    box-shadow: var(--shadow-md);
    background-color: #f0f8ff;
}

/* Product card styles */
.product-card {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
    height: 100%;
    position: relative;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

/* Product image */
.product-card .card-img-top {
    height: 280px;
    background: #f8f9fa;
    transition: transform 0.3s ease;
}

.product-card:hover .card-img-top {
    transform: scale(1.05);
}

/* Card body */
.product-card .card-body {
    padding: 20px;
}

.product-card .card-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 15px;
    height: 48px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: center;
}

/* Specifications */
.specs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-bottom: 15px;
}

.specs .badge {
    font-size: 12px;
    font-weight: 500;
    padding: 6px 12px;
    border-radius: 4px;
    background-color: #f8f9fa;
    color: #666;
}

/* Price section */
.price-section {
    text-align: center;
    padding-top: 15px;
    border-top: 1px solid #eee;
}

.stock-status {
    font-size: 14px;
    margin-bottom: 10px;
}

.stock-status i {
    margin-right: 5px;
}

.price-section .original-price {
    color: #999;
    text-decoration: line-through;
    font-size: 14px;
    margin-right: 8px;
}

.price-section .discounted-price {
    color: #dc3545;
    font-size: 18px;
    font-weight: 700;
}

/* Discount badge */
.discount-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2;
}

.discount-badge .badge {
    font-size: 14px;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 4px;
    background: #dc3545;
}

/* View details overlay */
.view-details {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: all 0.3s ease;
}

.view-details a {
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    padding: 12px 24px;
    border: 2px solid #fff;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.view-details a:hover {
    background: #fff;
    color: #333;
}

.product-card:hover .view-details {
    opacity: 1;
}
</style>
