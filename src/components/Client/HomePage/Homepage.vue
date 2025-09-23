<template>
    <div class="container">
        <div class="categories-section mb-4">
            <div class="section-title mb-3">
                <i class="bx bx-category-alt me-2"></i>
                DANH MỤC SẢN PHẨM
            </div>
            <div class="row g-3">
                <template v-for="(danhMuc, index) in danh_sach_danh_muc" :key="index">
                    <div class="col">
                        <div class="category-card" @click="selectCategory(danhMuc)"
                            :class="{ active: selectedCategory?.id === danhMuc.id }">
                            <div class="category-icon">
                                <i :class="getCategoryIcon(danhMuc.name)"></i>
                            </div>
                            <div class="category-name">{{ danhMuc.name }}</div>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <div v-if="selectedCategory" class="category-products-section mb-5">
            <div class="section-title mb-3">
                <i :class="getCategoryIcon(selectedCategory.name) + ' me-2'"></i>
                {{ selectedCategory.name }}
            </div>
            <div v-if="isLoading" class="loading-container">
                <div class="loading-spinner"></div>
                <p>Đang tải sản phẩm...</p>
            </div>
            <div v-else-if="!san_pham_theo_danh_muc[selectedCategory.id]?.length" class="no-products">
                <i class="bx bx-box-open"></i>
                <p>Không có sản phẩm nào trong danh mục này.</p>
            </div>
            <div v-else class="row g-4">
                <template v-for="(sp, spIndex) in san_pham_theo_danh_muc[selectedCategory.id]" :key="spIndex">
                    <div class="col-12 col-sm-6 col-md-3">
                        <div class="product-card">
                            <img :src="sp.hinhAnh" class="card-img-top" :alt="sp.tenSanPham">
                            <div class="discount-badge" v-if="sp.giamGia">
                                <span class="badge">-{{ sp.giamGia.phamTramGiamGia }}%</span>
                            </div>
                            <div class="view-details">
                                <a @click="redirectToDetail(sp.id)" href="javascript:void(0)">Xem chi tiết</a>
                            </div>
                            <div class="card-body">
                                <h6 class="card-title">{{ sp.tenSanPham }}</h6>
                                <div class="product-details">
                                    <div class="price-section">
                                        <p class="stock-status" :class="sp.soLuongTonKho > 0 ? 'text-success' : 'text-danger'">
                                            <i class="bx bx-package"></i>
                                            {{ sp.soLuongTonKho > 0 ? 'Còn hàng' : 'Hết hàng' }}
                                            ({{ sp.soLuongTonKho }})
                                        </p>
                                        <p class="mb-0">
                                            <span v-if="sp.giamGia" class="original-price">
                                                {{ formatCurrency(sp.giaSanPham) }}
                                            </span>
                                            <span class="discounted-price">
                                                {{ formatCurrency(sp.giaSanPham * (1 - (sp.giamGia?.phamTramGiamGia || 0) / 100)) }}
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

    <hr>
    <div class="container">
        <div class="mt-3 mb-3" style="font-size: 20px;">
            <b class="align-middle">Khách hàng nói về Thời Trang - Store</b>
        </div>
        <div class="reviews-container">
            <div class="reviews-track">
                <template v-for="(value, index) in danh_sach_danh_gia" :key="index">
                    <div class="review-item">
                        <div class="card review-card">
                            <div class="card-body">
                                <div class="d-flex flex-column align-items-center">
                                    <img src="https://i.pinimg.com/originals/03/19/e7/0319e75748160709ceefa7398a4a7070.jpg"
                                        alt="Admin" class="rounded-circle p-1 bg-primary" width="110">
                                    <div class="mt-3">
                                        <h4 class="text-center">{{ value.user.hoVaTen }}</h4>
                                        <p class="text-secondary mb-1 review-text">
                                            {{ value.danhGia }}
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
            danh_sach_danh_gia: [],
            danh_sach_danh_muc: [],
            san_pham_theo_danh_muc: {},
            isLoading: false,
            selectedCategory: null,
            carouselInterval: 5000, // 5 seconds per slide
        };
    },
    computed: {
        chunkedReviews() {
            const chunks = [];
            const chunkSize = 4; // Show 3 reviews per slide
            for (let i = 0; i < this.danh_sach_danh_gia.length; i += chunkSize) {
                chunks.push(this.danh_sach_danh_gia.slice(i, i + chunkSize));
            }
            return chunks;
        }
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
        layDanhGia() {
            axios
                .get("/api/user/danh-gia/home-page")
                .then((res) => {
                    if (res.data.status == true) {
                        this.danh_sach_danh_gia = res.data.data;
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    toaster.error('Có lỗi xảy ra khi lấy danh sách đánh giá!');
                    console.error('Error fetching reviews:', error);
                });
        },
        layDanhMuc() {
            axios
                .get('/api/user/danh-muc/home-page')
                .then((res) => {
                    if (res.data.status) {
                        this.danh_sach_danh_muc = res.data.data;
                    }
                })
                .catch((error) => {
                    toaster.error('Có lỗi xảy ra khi lấy danh sách danh mục!');
                });
        },
        redirectToDetail(id) {
            this.$router.push(`/chi-tiet-san-pham/${id}`);
        },
        redirectToCategory(id) {
            this.$router.push(`/danh-muc/${id}`);
        },
        getCategoryIcon(categoryName) {
            const iconMap = {
                'Máy chạy bộ': 'bx bx-run',
                'Xe đạp tập': 'bx bx-cycling',
                'Máy tập cơ': 'bx bx-dumbbell',
                'Máy massage': 'bx bx-massage',
                'Phụ kiện': 'bx bx-dumbbell',
                'Thiết bị thể thao': 'bx bx-tennis-ball',
                'Dụng cụ tập luyện': 'bx bx-dumbbell',
                'Thực phẩm bổ sung': 'bx bx-bowl-hot'
            };

            // Tìm icon phù hợp dựa trên tên danh mục
            for (const [key, icon] of Object.entries(iconMap)) {
                if (categoryName.toLowerCase().includes(key.toLowerCase())) {
                    return icon;
                }
            }

            // Mặc định nếu không tìm thấy
            return 'bx bx-category';
        },
        selectCategory(danhMuc) {
            this.selectedCategory = danhMuc;
            if (!this.san_pham_theo_danh_muc[danhMuc.id]) {
                this.laySanPhamTheoDanhMuc(danhMuc.id);
            }
        },
        laySanPhamTheoDanhMuc(danhMucId) {
            this.isLoading = true;
            axios.get(`/api/user/danh-muc/${danhMucId}?limit=8`)
                .then(res => {
                    if (res.data.status) {
                        this.san_pham_theo_danh_muc = {
                            ...this.san_pham_theo_danh_muc,
                            [danhMucId]: res.data.data
                        };
                        console.log('Sản phẩm theo danh mục:', this.san_pham_theo_danh_muc[danhMucId]);
                    }
                })
                .catch(error => {
                    console.error(`Error loading products for category ${danhMucId}:`, error);
                    toaster.error('Có lỗi xảy ra khi tải sản phẩm!');
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
    },
    mounted() {
        this.layDanhGia();
        axios.get('/api/user/danh-muc/home-page')
            .then((res) => {
                if (res.data.status) {
                    this.danh_sach_danh_muc = res.data.data;
                    const defaultCategory = this.danh_sach_danh_muc.find(dm => dm.id === 9);
                    if (defaultCategory) {
                        this.selectCategory(defaultCategory);
                    }
                }
            })
            .catch((error) => {
                toaster.error('Có lỗi xảy ra khi lấy danh sách danh mục!');
            });
        // Initialize Bootstrap Carousel
        setTimeout(() => {
            const carousel = new bootstrap.Carousel(document.getElementById('reviewsCarousel'), {
                interval: this.carouselInterval,
                ride: 'carousel',
                wrap: true
            });
        }, 100);

        // Set CSS variable for total number of reviews
        this.$nextTick(() => {
            const root = document.documentElement;
            root.style.setProperty('--total-reviews', this.danh_sach_danh_gia.length);
        });
    },
}
</script>
<style scoped>
/* Container styles */
.container {
    padding: 20px 0;
}

.section-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 30px;
    position: relative;
    padding-bottom: 10px;
}

.section-title::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 3px;
    background: #dc3545;
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

/* Carousel controls */
.carousel-control-prev,
.carousel-control-next {
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: all 0.3s ease;
}

.carousel:hover .carousel-control-prev,
.carousel:hover .carousel-control-next {
    opacity: 1;
}

.carousel-control-prev {
    left: -20px;
}

.carousel-control-next {
    right: -20px;
}

/* Responsive styles */
@media (max-width: 768px) {
    .product-card .card-img-top {
        height: 200px;
    }

    .product-card .card-title {
        font-size: 14px;
        height: 42px;
    }

    .specs .badge {
        font-size: 11px;
        padding: 4px 8px;
    }

    .price-section .discounted-price {
        font-size: 16px;
    }
}

/* Category styles */
.categories-section {
    margin-bottom: 40px;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.section-title {
    font-size: 24px;
    font-weight: 700;
    color: #333;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.section-title i {
    color: #dc3545;
    font-size: 28px;
}

.category-card {
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 1px solid #eee;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.category-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    border-color: #dc3545;
}

.category-icon {
    width: 60px;
    height: 60px;
    background: #f8f9fa;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    transition: all 0.3s ease;
}

.category-icon i {
    font-size: 28px;
    color: #dc3545;
}

.category-card:hover .category-icon {
    background: #dc3545;
    transform: scale(1.1);
}

.category-card:hover .category-icon i {
    color: #fff;
}

.category-card:hover .category-name {
    color: #dc3545;
}

.category-card.active {
    background: #dc3545;
    border-color: #dc3545;
}

.category-card.active .category-icon {
    background: #fff;
}

.category-card.active .category-icon i {
    color: #dc3545;
}

.category-card.active .category-name {
    color: #fff;
}

.category-products-section {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.category-products-section .section-title {
    font-size: 20px;
    margin-bottom: 20px;
    color: #333;
    display: flex;
    align-items: center;
}

.category-products-section .section-title i {
    color: #dc3545;
    font-size: 24px;
}

.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    text-align: center;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #dc3545;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 15px;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.no-products {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    text-align: center;
    color: #666;
}

.no-products i {
    font-size: 48px;
    margin-bottom: 15px;
    color: #dc3545;
}

.review-card {
    margin: 10px;
    border: none;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.review-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.review-text {
    text-align: center;
    font-size: 14px;
    line-height: 1.6;
    padding: 10px;
    height: 100px;
    overflow-y: auto;
}

#reviewsCarousel {
    padding: 20px 40px;
}

#reviewsCarousel .carousel-control-prev,
#reviewsCarousel .carousel-control-next {
    width: 40px;
    height: 40px;
    background: rgba(220, 53, 69, 0.8);
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
}

#reviewsCarousel .carousel-control-prev {
    left: -10px;
}

#reviewsCarousel .carousel-control-next {
    right: -10px;
}

#reviewsCarousel .carousel-control-prev-icon,
#reviewsCarousel .carousel-control-next-icon {
    width: 20px;
    height: 20px;
}

.carousel-item {
    padding: 20px 0;
}

@media (max-width: 768px) {
    .review-text {
        height: 80px;
    }
    
    #reviewsCarousel {
        padding: 20px;
    }
}

.reviews-container {
    width: 100%;
    overflow: hidden;
    position: relative;
    padding: 20px 0;
}

.reviews-track {
    display: flex;
    gap: 20px;
    animation: scroll 30s linear infinite;
    width: fit-content;
}

.review-item {
    flex: 0 0 300px;
}

.review-card {
    margin: 10px;
    border: none;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    height: 100%;
}

.review-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.review-text {
    text-align: center;
    font-size: 14px;
    line-height: 1.6;
    padding: 10px;
    height: 100px;
    overflow-y: auto;
}

@keyframes scroll {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}

.reviews-container:hover .reviews-track {
    animation-play-state: paused;
}
</style>