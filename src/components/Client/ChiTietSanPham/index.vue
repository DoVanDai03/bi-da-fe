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
                <div class="thumbnail-gallery">
                    <div class="thumbnail-item"
                        v-for="(image, index) in [san_pham.hinhAnh, ...(san_pham.hinhAnhPhu || [])]" :key="index"
                        :class="{ active: mainImage === image }" @click="changeMainImage(image)">
                        <img :src="image" :alt="san_pham.tenSanPham">
                    </div>
                </div>
                <div class="row-support">
                    <div class="col-md-12 col-lg-6">
                        Tư vấn mua hàng
                        1900.6753
                    </div>
                    <div class="col-md-12 col-lg-6">
                        Bảo hành
                        Chính hãng
                    </div>
                    <div class="col-md-12 col-lg-6">
                        Đổi/trả hàng
                        Trong vòng 15 ngày
                    </div>
                    <div class="col-md-12 col-lg-6">
                        Giao hàng nhanh
                        Trong 24h
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

                <div class="action-buttons">
                    <button class="btn-add-cart" @click="addToCart">
                        <i class="bi bi-cart-plus"></i>
                        Thêm vào giỏ hàng
                    </button>
                    <button class="btn-buy-now" @click="buyNow">
                        <i class="bi bi-lightning"></i>
                        Mua ngay
                    </button>
                </div>

                <div class="support-info">
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
            <div class="products-grid">
                <div v-for="product in san_pham_lien_quan" :key="product.id" class="product-card"
                    @click="viewProduct(product.id)">
                    <div class="product-card-image">
                        <img :src="product.hinhAnh" :alt="product.tenSanPham">
                    </div>
                    <div class="product-card-info">
                        <h3>{{ product.tenSanPham }}</h3>
                        <span class="price">{{ formatCurrency(product.giaSanPham) }}</span>
                    </div>
                </div>
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
            san_pham_lien_quan: [],
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
        this.laySanPhamLienQuan();
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
        laySanPhamLienQuan() {
            const id = this.$route.params.id;
            axios
                .get(`/api/client/san-pham-lien-quan/${id}`)
                .then((res) => {
                    if (res.data.status) {
                        this.san_pham_lien_quan = res.data.data;
                    }
                })
                .catch((error) => {
                    toaster.error('Có lỗi xảy ra khi lấy sản phẩm liên quan!');
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
        addToCart() {
            // Xử lý thêm vào giỏ hàng
            toaster.success('Đã thêm sản phẩm vào giỏ hàng!');
        },
        buyNow() {
            // Xử lý mua ngay
            toaster.success('Đang chuyển đến trang thanh toán!');
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
    padding: 20px;
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
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.main-image-wrapper {
    margin-bottom: 20px;
}

.main-image {
    width: 100%;
    height: 400px;
    object-fit: contain;
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

.action-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-bottom: 20px;
}

.btn-add-cart,
.btn-buy-now {
    padding: 12px;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.btn-add-cart {
    background: #0066cc;
    color: white;
}

.btn-buy-now {
    background: #e74c3c;
    color: white;
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

.product-card {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s;
}

.product-card:hover {
    transform: translateY(-5px);
}

.product-card-image {
    aspect-ratio: 1;
    overflow: hidden;
}

.product-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.product-card-info {
    padding: 15px;
}

.product-card-info h3 {
    font-size: 16px;
    margin-bottom: 8px;
    color: #333;
}

.product-card-info .price {
    color: #e74c3c;
    font-weight: 600;
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

    .action-buttons {
        grid-template-columns: 1fr;
    }
}

.row-support {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
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
</style>
