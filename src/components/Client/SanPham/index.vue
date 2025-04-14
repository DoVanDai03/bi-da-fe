<template>
    <div class="san-pham-page">
        <div class="container py-4">
            <div class="row">
                <div class="col-md-3">
                    <div class="category-sidebar">
                        <div class="category-header">
                            <h5 class="mb-0">Danh mục sản phẩm</h5>
                        </div>
                        <div class="category-list">
                            <router-link v-for="(danhMuc, index) in danh_sach_danh_muc" :key="index"
                                :to="{ path: '/san-pham', query: { danh_muc_id: danhMuc.id } }" class="category-item"
                                :class="{ active: selectedCategoryId == danhMuc.id }">
                                <i class="fas fa-running me-2"></i>
                                <span>{{ danhMuc.name }}</span>
                                <i class="fas fa-chevron-right ms-auto"></i>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="product-grid">
                        <div v-if="isLoading" class="loading-container">
                            <div class="loading-spinner"></div>
                            <p>Đang tải sản phẩm...</p>
                        </div>
                        <template v-else>
                            <div v-if="san_pham.length === 0" class="no-products">
                                <i class="fas fa-box-open"></i>
                                <p>Không có sản phẩm nào trong danh mục này.</p>
                            </div>
                            <div v-else v-for="(sp, index) in san_pham" :key="index" class="product-card-wrapper">
                                <div class="product-card">
                                    <div class="product-image">
                                        <img :src="sp.hinhAnh" :alt="sp.tenSanPham">
                                        <div class="product-overlay">
                                            <div class="overlay-content">
                                                <button class="btn btn-light" @click="redirectToDetail(sp.id)">
                                                    <i class="fas fa-eye"></i>
                                                    <span>Xem chi tiết</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="discount-badge" v-if="sp.giamGia">
                                            <span class="badge">-{{ sp.giamGia.phamTramGiamGia }}%</span>
                                        </div>
                                    </div>
                                    <div class="product-info">

                                        <h3 class="product-title">{{ sp.tenSanPham }}</h3>
                                        <div class="product-meta d-flex justify-content-between">
                                            <div class="stock-status "
                                                :class="sp.soLuongTonKho > 0 ? 'in-stock' : 'out-of-stock'">
                                                <span class="bx bx-package"></span>
                                                {{ sp.soLuongTonKho > 0 ? 'Còn hàng' : 'Hết hàng' }}
                                                
                                            </div>
                                            <div class="product-brand mt-2">
                                                <span class="bx bx-package">{{ sp.thuongHieu.tenThuongHieu }}</span>
                                            </div>
                                        </div>
                                        <div class="product-price">
                                            <div class="price-wrapper d-flex justify-content-between">
                                                
                                                <span v-if="sp.giamGia" class="original-price">
                                                    {{ formatPrice(sp.giaSanPham) }}đ
                                                </span>
                                                <span class="current-price">
                                                    {{ formatPrice(sp.giaSanPham * (1 - (sp.giamGia?.phamTramGiamGia ||
                                                    0) / 100)) }}đ
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createToaster } from "@meforma/vue-toaster";
import axios from "axios";
const toaster = createToaster({ position: "top-right" });

export default {
    name: 'SanPhamPage',
    data() {
        return {
            danh_sach_danh_muc: [],
            san_pham: [],
            isLoading: false,
            selectedCategoryId: null,
            limit: 8
        }
    },
    watch: {
        '$route.query.danh_muc_id': {
            handler(newVal) {
                this.selectedCategoryId = newVal ? parseInt(newVal) : null;
                this.loadSanPham();
            },
            immediate: true
        }
    },
    mounted() {
        this.loadDanhMuc();
    },
    methods: {
        redirectToDetail(id) {
            this.$router.push(`/chi-tiet-san-pham/${id}`);
        },
        loadDanhMuc() {
            axios.get("/api/user/danh-muc/home-page")
                .then((res) => {
                    this.danh_sach_danh_muc = res.data.data;
                })
                .catch(error => {
                    toaster.error("Có lỗi xảy ra khi tải danh mục!");
                });
        },
        loadSanPham() {
            this.isLoading = true;
            let url = "/api/user/san-pham";

            if (this.selectedCategoryId) {
                url = `/api/user/danh-muc/${this.selectedCategoryId}?limit=${this.limit}`;
            }

            axios.get(url)
                .then((res) => {
                    if (res.data.status) {
                        this.san_pham = res.data.data;
                    } else {
                        toaster.error(res.data.message || "Có lỗi xảy ra khi tải sản phẩm!");
                    }
                })
                .catch(error => {
                    // toaster.error("Có lỗi xảy ra khi tải sản phẩm!");
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        formatPrice(price) {
            return new Intl.NumberFormat('vi-VN').format(price);
        },
    }
}
</script>

<style scoped>
.san-pham-page {
    min-height: calc(100vh - 300px);
    background-color: #f8f9fa;
    padding: 2rem 0;
}

.category-sidebar {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
    overflow: hidden;
}

.category-header {
    padding: 1.25rem;
    background: #f8f9fa;
    border-bottom: 1px solid #eee;
}

.category-header h5 {
    font-weight: 600;
    color: #333;
}

.category-list {
    padding: 0.5rem;
}

.category-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    color: #666;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.3s ease;
    margin-bottom: 0.25rem;
}

.category-item:hover {
    background: #f8f9fa;
    color: #333;
    transform: translateX(5px);
}

.category-item.active {
    background: #e3f2fd;
    color: #1976d2;
    font-weight: 500;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding: 0.5rem;
}

.product-card-wrapper {
    height: 100%;
}

.product-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
}

.product-image {
    position: relative;
    padding-top: 100%;
    overflow: hidden;
    background: #f8f9fa;
}

.product-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.product-card:hover .product-image img {
    transform: scale(1.1);
}

.product-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.product-card:hover .product-overlay {
    opacity: 1;
}

.overlay-content .btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border-radius: 25px;
    background: white;
    color: #333;
    font-weight: 500;
    transition: all 0.3s ease;
}

.overlay-content .btn:hover {
    background: #1976d2;
    color: white;
    transform: translateY(-2px);
}

.discount-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 1;
}

.discount-badge .badge {
    background: linear-gradient(45deg, #ff4444, #ff6b6b);
    color: white;
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.product-info {
    padding: 1.5rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.product-brand {
    margin-bottom: 0.5rem;
}

.brand-tag {
    background: #f8f9fa;
    color: #666;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.85rem;
}

.product-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
    line-height: 1.4;
    height: 3em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin: 0;
}

.product-meta {
    margin: 0;
}

.stock-status {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.85rem;
}

.stock-status.in-stock {
    background: #e8f5e9;
    color: #2e7d32;
}

.stock-status.out-of-stock {
    background: #ffebee;
    color: #c62828;
}

.product-price {
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid #eee;
}

.price-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.original-price {
    font-size: 0.9rem;
    color: #999;
    text-decoration: line-through;
}

.current-price {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1976d2;
}

.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    grid-column: 1 / -1;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #1976d2;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
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
    grid-column: 1 / -1;
    text-align: center;
    padding: 3rem;
    color: #666;
}

.no-products i {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #999;
}

@media (max-width: 1200px) {
    .product-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 992px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 576px) {
    .product-grid {
        grid-template-columns: 1fr;
    }

    .product-card {
        max-width: 400px;
        margin: 0 auto;
    }
}
</style>
