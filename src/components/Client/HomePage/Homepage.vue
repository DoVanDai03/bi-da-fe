<template>
    <div class="container">
        <!-- Search Section -->
        <div class="search-section mb-5">
            <div class="search-hero">
                <div class="search-title">
                    <h2><i class="bx bx-search-alt-2"></i> Tìm kiếm sản phẩm</h2>
                    <p>Khám phá hàng ngàn sản phẩm chất lượng cao</p>
                </div>
                <div class="search-container">
                    <div class="search-wrapper">
                        <div class="search-box-modern">
                            <div class="search-input-wrapper">
                                <i class="bx bx-search search-icon"></i>
                                <input type="text" v-model="searchKeyword" @keyup.enter="performSearch"
                                    @input="onSearchInput" placeholder="Nhập tên sản phẩm, thương hiệu..."
                                    class="search-input-modern" :class="{ 'has-content': searchKeyword }">
                                <button v-if="searchKeyword" @click="clearSearch" class="clear-input-btn">
                                    <i class="bx bx-x"></i>
                                </button>
                            </div>
                            <button @click="performSearch" class="search-btn-modern"
                                :disabled="isSearching || !searchKeyword.trim()" :class="{ 'searching': isSearching }">
                                <span v-if="!isSearching">
                                    <i class="bx bx-search"></i>
                                    Tìm kiếm
                                </span>
                                <span v-else class="loading-text">
                                    <div class="search-spinner"></div>
                                    Đang tìm...
                                </span>
                            </button>
                        </div>

                        <!-- Quick Search Suggestions -->
                        <div v-if="showSuggestions && searchSuggestions.length > 0" class="search-suggestions">
                            <div class="suggestions-header">
                                <i class="bx bx-lightbulb"></i>
                                Gợi ý tìm kiếm
                            </div>
                            <div class="suggestions-list">
                                <button v-for="suggestion in searchSuggestions" :key="suggestion"
                                    @click="selectSuggestion(suggestion)" class="suggestion-item">
                                    <i class="bx bx-history"></i>
                                    {{ suggestion }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Search Results Summary -->
                    <div v-if="searchKeyword && searchResults.length > 0" class="search-summary">
                        <div class="summary-content">
                            <div class="results-count">
                                <i class="bx bx-check-circle"></i>
                                <span>Tìm thấy <strong>{{ searchTotalItems }}</strong> sản phẩm</span>
                            </div>
                            <div class="search-term">
                                cho từ khóa: <span class="highlight">"{{ searchKeyword }}"</span>
                            </div>
                        </div>
                        <button @click="clearSearch" class="new-search-btn">
                            <i class="bx bx-refresh"></i>
                            Tìm kiếm mới
                        </button>
                    </div>
                </div>
            </div>
        </div>


        <!-- Search Results Section -->
        <div v-if="searchKeyword && (searchResults.length > 0 || isSearching)" class="search-results-section mb-5">
            <!-- Loading State -->
            <div v-if="isSearching" class="search-loading">
                <div class="loading-animation">
                    <div class="loading-circle"></div>
                    <div class="loading-circle"></div>
                    <div class="loading-circle"></div>
                </div>
                <h3>Đang tìm kiếm...</h3>
                <p>Vui lòng chờ trong giây lát</p>
            </div>

            <!-- No Results State -->
            <div v-else-if="searchResults.length === 0" class="no-results-state">
                <div class="no-results-icon">
                    <i class="bx bx-search-alt-2"></i>
                </div>
                <h3>Không tìm thấy sản phẩm</h3>
                <p>Không có sản phẩm nào khớp với từ khóa <strong>"{{ searchKeyword }}"</strong></p>
                <div class="no-results-suggestions">
                    <h4>Gợi ý:</h4>
                    <ul>
                        <li>Kiểm tra chính tả từ khóa</li>
                        <li>Thử từ khóa khác ngắn hơn</li>
                        <li>Sử dụng từ đồng nghĩa</li>
                    </ul>
                </div>
                <button @click="clearSearch" class="try-again-btn">
                    <i class="bx bx-refresh"></i>
                    Thử lại
                </button>
            </div>

            <!-- Results Grid -->
            <div v-else class="search-results-grid">
                <div class="results-header">
                    <div class="results-info">
                        <h3><i class="bx bx-grid-alt"></i> Kết quả tìm kiếm</h3>
                        <span class="results-count">{{ searchTotalItems }} sản phẩm</span>
                    </div>
                    <div class="view-options">
                        <button class="view-btn active" data-view="grid">
                            <i class="bx bx-grid-alt"></i>
                        </button>
                        <button class="view-btn" data-view="list">
                            <i class="bx bx-list-ul"></i>
                        </button>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <div class="products-grid">
                            <div v-for="(sp, spIndex) in searchResults" :key="'search-' + spIndex" class="product-item"
                                :style="{ 'animation-delay': (spIndex * 0.1) + 's' }">
                                <div class="product-card-modern">
                                    <div class="product-image">
                                        <img :src="sp.hinhAnh" :alt="sp.tenSanPham">
                                        <div class="product-overlay">
                                            <button @click="redirectToDetail(sp.id)" class="quick-view-btn">
                                                <i class="bx bx-show"></i>
                                                Xem nhanh
                                            </button>
                                        </div>
                                        <div v-if="sp.giamGia" class="discount-tag">
                                            <span>-{{ sp.giamGia.phamTramGiamGia }}%</span>
                                        </div>
                                    </div>

                                    <div class="product-info">
                                        <h4 class="product-name">{{ sp.tenSanPham }}</h4>

                                        <div class="product-meta">
                                            <div class="stock-info"
                                                :class="sp.soLuongTonKho > 0 ? 'in-stock' : 'out-of-stock'">
                                                <i class="bx bx-package"></i>
                                                <span>{{ sp.soLuongTonKho > 0 ? 'Còn hàng' : 'Hết hàng' }}</span>
                                            </div>
                                        </div>

                                        <div class="product-pricing">
                                            <div v-if="sp.giamGia" class="price-original">
                                                {{ formatCurrency(sp.giaSanPham) }}
                                            </div>
                                            <div class="price-current">
                                                {{ formatCurrency(sp.giaSanPham * (1 - (sp.giamGia?.phamTramGiamGia ||
                                                0) / 100)) }}
                                            </div>
                                        </div>

                                        <button @click="redirectToDetail(sp.id)" class="product-action-btn">
                                            <i class="bx bx-cart-add"></i>
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modern Pagination -->
            <div v-if="searchResults.length > 0 && searchTotalPages > 1" class="modern-pagination">
                <div class="pagination-info">
                    <span>Trang {{ searchCurrentPage + 1 }} / {{ searchTotalPages }}</span>
                </div>
                <div class="pagination-controls">
                    <button @click="loadSearchPage(searchCurrentPage - 1)" :disabled="searchCurrentPage === 0"
                        class="pagination-btn prev">
                        <i class="bx bx-chevron-left"></i>
                        Trước
                    </button>

                    <div class="page-numbers">
                        <button v-for="page in visiblePages" :key="page" @click="loadSearchPage(page - 1)"
                            class="page-number" :class="{ active: page === searchCurrentPage + 1 }">
                            {{ page }}
                        </button>
                    </div>

                    <button @click="loadSearchPage(searchCurrentPage + 1)"
                        :disabled="searchCurrentPage === searchTotalPages - 1" class="pagination-btn next">
                        Sau
                        <i class="bx bx-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>

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
                                        <p class="stock-status"
                                            :class="sp.soLuongTonKho > 0 ? 'text-success' : 'text-danger'">
                                            <i class="bx bx-package"></i>
                                            {{ sp.soLuongTonKho > 0 ? 'Còn hàng' : 'Hết hàng' }}
                                            ({{ sp.soLuongTonKho }})
                                        </p>
                                        <p class="mb-0">
                                            <span v-if="sp.giamGia" class="original-price">
                                                {{ formatCurrency(sp.giaSanPham) }}
                                            </span>
                                            <span class="discounted-price">
                                                {{ formatCurrency(sp.giaSanPham * (1 - (sp.giamGia?.phamTramGiamGia ||
                                                0) / 100)) }}
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
        <!-- Newest Products Section -->
        <div class="newest-products-section mb-5">
            <div class="section-title mb-3">
                <i class="bx bx-time me-2"></i>
                SẢN PHẨM MỚI NHẤT
            </div>
            <div v-if="isLoadingNewest" class="loading-container">
                <div class="loading-spinner"></div>
                <p>Đang tải sản phẩm mới nhất...</p>
            </div>
            <div v-else-if="!san_pham_moi_nhat?.length" class="no-products">
                <i class="bx bx-box-open"></i>
                <p>Không có sản phẩm mới nào.</p>
            </div>
            <div v-else class="row g-4">
                <template v-for="(sp, spIndex) in san_pham_moi_nhat" :key="'newest-' + spIndex">
                    <div class="col-12 col-sm-6 col-md-3">
                        <div class="product-card">
                            <img :src="sp.hinhAnh" class="card-img-top" :alt="sp.tenSanPham">
                            <div class="discount-badge" v-if="sp.giamGia">
                                <span class="badge">-{{ sp.giamGia.phamTramGiamGia }}%</span>
                            </div>
                            <div class="new-badge">
                                <span class="badge">Mới</span>
                            </div>
                            <div class="view-details">
                                <a @click="redirectToDetail(sp.id)" href="javascript:void(0)">Xem chi tiết</a>
                            </div>
                            <div class="card-body">
                                <h6 class="card-title">{{ sp.tenSanPham }}</h6>
                                <div class="product-details">
                                    <div class="price-section">
                                        <p class="stock-status"
                                            :class="sp.soLuongTonKho > 0 ? 'text-success' : 'text-danger'">
                                            <i class="bx bx-package"></i>
                                            {{ sp.soLuongTonKho > 0 ? 'Còn hàng' : 'Hết hàng' }}
                                            ({{ sp.soLuongTonKho }})
                                        </p>
                                        <p class="mb-0">
                                            <span v-if="sp.giamGia" class="original-price">
                                                {{ formatCurrency(sp.giaSanPham) }}
                                            </span>
                                            <span class="discounted-price">
                                                {{ formatCurrency(sp.giaSanPham * (1 - (sp.giamGia?.phamTramGiamGia ||
                                                0) / 100)) }}
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
        <div class="section-title mb-3">
            <i class="fa-solid fa-comments ms-2"></i>
                <span class="ms-2 mt-2">Khách hàng nói về Xbilliard - Store</span>          
            </div>
        <div class="reviews-container">
            <div class="reviews-track">
                <template v-for="(value, index) in danh_sach_danh_gia" :key="index">
                    <div class="review-item">
                        <div class="card review-card">
                            <div class="card-body">
                                <div class="d-flex flex-column align-items-center">
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

            // Newest products data
            san_pham_moi_nhat: [],
            isLoadingNewest: false,

            // Search related data
            searchKeyword: '',
            searchResults: [],
            searchTotalItems: 0,
            searchCurrentPage: 0,
            searchTotalPages: 0,
            searchPageSize: 12,
            isSearching: false,
            showSuggestions: false,
            searchSuggestions: [
                'Gậy Bi-a Allin',
                'Gậy Bi-a Wolf Cue',
                'Bao Đựng Cơ',
                'Găng tay',
                'Tẩy',
                'Lơ'
            ],
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
        },
        visiblePages() {
            const pages = [];
            const maxVisible = 5;
            const start = Math.max(0, this.searchCurrentPage - Math.floor(maxVisible / 2));
            const end = Math.min(this.searchTotalPages, start + maxVisible);

            for (let i = start; i < end; i++) {
                pages.push(i + 1);
            }
            return pages;
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
        performSearch() {
            if (!this.searchKeyword.trim()) {
                toaster.warning('Vui lòng nhập từ khóa tìm kiếm!');
                return;
            }

            this.searchCurrentPage = 0;
            this.loadSearchResults();
        },
        loadSearchResults() {
            this.isSearching = true;
            const params = {
                keyword: this.searchKeyword,
                page: this.searchCurrentPage,
                size: this.searchPageSize
            };

            axios.get('/api/user/tim-kiem', { params })
                .then(res => {
                    if (res.data.status) {
                        this.searchResults = res.data.data;
                        this.searchTotalItems = res.data.totalItems;
                        this.searchTotalPages = res.data.totalPages;
                        this.searchCurrentPage = res.data.currentPage;

                        if (this.searchResults.length === 0) {
                            toaster.info('Không tìm thấy sản phẩm nào!');
                        }
                    } else {
                        toaster.error(res.data.message || 'Có lỗi xảy ra khi tìm kiếm!');
                    }
                })
                .catch(error => {
                    console.error('Search error:', error);
                    toaster.error('Có lỗi xảy ra khi tìm kiếm sản phẩm!');
                })
                .finally(() => {
                    this.isSearching = false;
                });
        },
        loadSearchPage(page) {
            this.searchCurrentPage = page;
            this.loadSearchResults();
        },
        clearSearch() {
            this.searchKeyword = '';
            this.searchResults = [];
            this.searchTotalItems = 0;
            this.searchCurrentPage = 0;
            this.searchTotalPages = 0;
            this.showSuggestions = false;
        },
        onSearchInput() {
            this.showSuggestions = this.searchKeyword.length > 0 && this.searchResults.length === 0;
        },
        selectSuggestion(suggestion) {
            this.searchKeyword = suggestion;
            this.showSuggestions = false;
            this.performSearch();
        },
        laySanPhamMoiNhat() {
            this.isLoadingNewest = true;
            axios.get('/api/user/moi-nhat?limit=8')
                .then(res => {
                    if (res.data.status) {
                        this.san_pham_moi_nhat = res.data.data;
                        console.log('Sản phẩm mới nhất:', this.san_pham_moi_nhat);
                    } else {
                        toaster.error(res.data.message || 'Có lỗi xảy ra khi tải sản phẩm mới nhất!');
                    }
                })
                .catch(error => {
                    console.error('Error loading newest products:', error);
                    toaster.error('Có lỗi xảy ra khi tải sản phẩm mới nhất!');
                })
                .finally(() => {
                    this.isLoadingNewest = false;
                });
        },
    },
    mounted() {
        this.layDanhGia();
        this.laySanPhamMoiNhat(); // Load newest products
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
    line-clamp: 2;
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

/* New badge for newest products */
.new-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 2;
}

.new-badge .badge {
    font-size: 14px;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 4px;
    background: linear-gradient(45deg, #28a745, #20c997);
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
    animation: pulse-new 2s infinite;
}

@keyframes pulse-new {
    0% {
        box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
    }

    50% {
        box-shadow: 0 4px 15px rgba(40, 167, 69, 0.5);
    }

    100% {
        box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
    }
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

/* Newest Products Section */
.newest-products-section {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    margin-bottom: 40px;
    border-left: 4px solid #28a745;
}

.newest-products-section .section-title {
    color: #28a745;
    font-size: 24px;
    font-weight: 700;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.newest-products-section .section-title i {
    color: #28a745;
    font-size: 28px;
    margin-right: 10px;
    animation: bounce-time 2s infinite;
}

@keyframes bounce-time {

    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }

    40% {
        transform: translateY(-5px);
    }

    60% {
        transform: translateY(-3px);
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

/* Enhanced Reviews Styling */
.reviews-container {
    background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
    padding: 30px 16px;
}

.reviews-track {
    gap: 24px;
    padding: 4px;
    mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
}

.review-item {
    flex: 0 0 320px;
}

.review-card {
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(17, 24, 39, 0.08);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    position: relative;
    overflow: hidden;
}

.review-card::before {
    content: '“';
    position: absolute;
    top: -10px;
    left: 12px;
    font-size: 80px;
    color: rgba(220, 53, 69, 0.12);
    line-height: 1;
    pointer-events: none;
}

.review-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 14px 40px rgba(17, 24, 39, 0.12);
}

.review-card .card-body {
    padding: 22px 18px;
}

.review-text {
    font-style: italic;
    color: #4b5563;
    background: #f8fafc;
    border-left: 3px solid #dc3545;
    border-radius: 8px;
    padding: 12px 14px;
    height: auto;
    max-height: 120px;
    overflow: auto;
}

.review-text::-webkit-scrollbar {
    height: 6px;
    width: 6px;
}

.review-text::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 10px;
}

.review-text::-webkit-scrollbar-track {
    background: transparent;
}

@media (max-width: 768px) {
    .review-item {
        flex: 0 0 260px;
    }
}

/* Modern Search Section */
.search-section {
    margin-bottom: 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    padding: 40px 20px;
    position: relative;
    overflow: visible;
}

.search-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
}

.search-hero {
    position: relative;
    z-index: 2;
    text-align: center;
}

.search-title h2 {
    color: white;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.search-title h2 i {
    margin-right: 15px;
    color: #ffd700;
}

.search-title p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.1rem;
    margin-bottom: 30px;
}

.search-container {
    max-width: 800px;
    margin: 0 auto;
}

.search-wrapper {
    position: relative;
    z-index: 10;
}

.search-box-modern {
    background: white;
    border-radius: 50px;
    padding: 8px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    position: relative;
    z-index: 20;
}

.search-box-modern:focus-within {
    transform: translateY(-2px);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
}

.search-input-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    position: relative;
}

.search-icon {
    position: absolute;
    left: 20px;
    color: #666;
    font-size: 20px;
    z-index: 2;
    transition: all 0.3s ease;
}

.search-input-modern {
    width: 100%;
    padding: 18px 20px 18px 60px;
    border: none;
    background: transparent;
    font-size: 16px;
    color: #333;
    outline: none;
    transition: all 0.3s ease;
}

.search-input-modern::placeholder {
    color: #999;
    transition: all 0.3s ease;
}

.search-input-modern.has-content::placeholder {
    opacity: 0;
}

.clear-input-btn {
    position: absolute;
    right: 15px;
    background: #f8f9fa;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #666;
}

.clear-input-btn:hover {
    background: #e9ecef;
    color: #dc3545;
    transform: scale(1.1);
}

.search-btn-modern {
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
    border: none;
    color: white;
    padding: 18px 30px;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    min-width: 140px;
    justify-content: center;
}

.search-btn-modern:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(238, 90, 36, 0.4);
}

.search-btn-modern:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.search-btn-modern.searching {
    background: linear-gradient(45deg, #74b9ff, #0984e3);
}

.search-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

/* Search Suggestions */
.search-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    margin-top: 10px;
    z-index: 1000;
    animation: slideDown 0.3s ease;
}

.suggestions-header {
    padding: 15px 20px 10px;
    font-weight: 600;
    color: #666;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    gap: 8px;
}

.suggestions-list {
    padding: 10px 0;
}

.suggestion-item {
    width: 100%;
    padding: 12px 20px;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 12px;
    color: #666;
}

.suggestion-item:hover {
    background: #f8f9fa;
    color: #dc3545;
}

/* Search Summary */
.search-summary {
    background: white;
    border-radius: 15px;
    padding: 20px;
    margin-top: 20px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation: slideUp 0.5s ease;
}

.summary-content {
    display: flex;
    align-items: center;
    gap: 20px;
}

.results-count {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    color: #28a745;
}

.search-term {
    color: #666;
}

.highlight {
    color: #dc3545;
    font-weight: 600;
}

.new-search-btn {
    background: #dc3545;
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.new-search-btn:hover {
    background: #c82333;
    transform: translateY(-2px);
}

/* Search Results Section */
.search-results-section {
    background: #f8f9fa;
    border-radius: 20px;
    margin-bottom: 30px;
}

/* Loading Animation */
.search-loading {
    text-align: center;
    padding: 60px 20px;
}

.loading-animation {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 20px;
}

.loading-circle {
    width: 12px;
    height: 12px;
    background: #dc3545;
    border-radius: 50%;
    animation: bounce 1.4s ease-in-out infinite both;
}

.loading-circle:nth-child(1) {
    animation-delay: -0.32s;
}

.loading-circle:nth-child(2) {
    animation-delay: -0.16s;
}

.search-loading h3 {
    color: #333;
    margin-bottom: 10px;
}

.search-loading p {
    color: #666;
}

/* No Results State */
.no-results-state {
    text-align: center;
    padding: 60px 20px;
}

.no-results-icon {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 30px;
    animation: pulse 2s infinite;
}

.no-results-icon i {
    font-size: 48px;
    color: white;
}

.no-results-state h3 {
    color: #333;
    margin-bottom: 15px;
}

.no-results-state p {
    color: #666;
    margin-bottom: 30px;
}

.no-results-suggestions {
    background: white;
    border-radius: 15px;
    padding: 20px;
    margin: 30px auto;
    max-width: 400px;
    text-align: left;
}

.no-results-suggestions h4 {
    color: #333;
    margin-bottom: 15px;
}

.no-results-suggestions ul {
    list-style: none;
    padding: 0;
}

.no-results-suggestions li {
    padding: 8px 0;
    color: #666;
    position: relative;
    padding-left: 20px;
}

.no-results-suggestions li::before {
    content: '•';
    color: #dc3545;
    position: absolute;
    left: 0;
}

.try-again-btn {
    background: linear-gradient(45deg, #74b9ff, #0984e3);
    border: none;
    color: white;
    padding: 15px 30px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 auto;
    font-weight: 600;
}

.try-again-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(116, 185, 255, 0.4);
}

/* Results Grid */
.search-results-grid {
    animation: fadeInUp 0.6s ease;
}

.results-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #eee;
}

.results-info h3 {
    color: #333;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.results-count {
    color: #666;
    font-size: 14px;
}

.view-options {
    display: flex;
    gap: 5px;
}

.view-btn {
    width: 40px;
    height: 40px;
    border: 2px solid #ddd;
    background: white;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.view-btn:hover,
.view-btn.active {
    border-color: #dc3545;
    color: #dc3545;
}

/* Products Grid */
.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 25px;
}

.product-item {
    animation: slideInUp 0.6s ease;
    animation-fill-mode: both;
}

.product-card-modern {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.product-card-modern:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.product-image {
    position: relative;
    height: 220px;
    overflow: hidden;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
}

.product-card-modern:hover .product-image img {
    transform: scale(1.05);
}

.product-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.3s ease;
}

.product-card-modern:hover .product-overlay {
    opacity: 1;
}

.quick-view-btn {
    background: white;
    border: none;
    color: #333;
    padding: 12px 20px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
}

.quick-view-btn:hover {
    background: #dc3545;
    color: white;
    transform: scale(1.05);
}

.discount-tag {
    position: absolute;
    top: 15px;
    right: 15px;
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
}

.product-info {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.product-name {
    color: #333;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px;
    line-height: 1.4;
    height: 44px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}

.product-meta {
    margin-bottom: 15px;
}

.stock-info {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    padding: 6px 12px;
    border-radius: 15px;
    font-weight: 500;
}

.stock-info.in-stock {
    background: #d4edda;
    color: #155724;
}

.stock-info.out-of-stock {
    background: #f8d7da;
    color: #721c24;
}

.product-pricing {
    margin-bottom: 20px;
}

.price-original {
    color: #999;
    text-decoration: line-through;
    font-size: 14px;
    margin-bottom: 5px;
}

.price-current {
    color: #dc3545;
    font-size: 18px;
    font-weight: 700;
}

.product-action-btn {
    background: linear-gradient(45deg, #74b9ff, #0984e3);
    border: none;
    color: white;
    padding: 12px 20px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: 600;
    margin-top: auto;
}

.product-action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(116, 185, 255, 0.4);
}

/* Modern Pagination */
.modern-pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.pagination-info {
    color: #666;
    font-weight: 500;
}

.pagination-controls {
    display: flex;
    align-items: center;
    gap: 10px;
}

.pagination-btn {
    background: #f8f9fa;
    border: 2px solid #dee2e6;
    color: #666;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
}

.pagination-btn:hover:not(:disabled) {
    background: #dc3545;
    border-color: #dc3545;
    color: white;
    transform: translateY(-2px);
}

.pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.page-numbers {
    display: flex;
    gap: 5px;
}

.page-number {
    width: 40px;
    height: 40px;
    border: 2px solid #dee2e6;
    background: white;
    color: #666;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
}

.page-number:hover,
.page-number.active {
    background: #dc3545;
    border-color: #dc3545;
    color: white;
    transform: translateY(-2px);
}

/* Animations */
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes bounce {

    0%,
    80%,
    100% {
        transform: scale(0);
    }

    40% {
        transform: scale(1);
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .search-section {
        padding: 30px 15px;
    }

    .search-title h2 {
        font-size: 2rem;
    }

    .search-box-modern {
        flex-direction: column;
        gap: 15px;
        padding: 15px;
    }

    .search-input-wrapper {
        width: 100%;
    }

    .search-btn-modern {
        width: 100%;
    }

    .search-summary {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }

    .summary-content {
        flex-direction: column;
        gap: 10px;
    }

    .results-header {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
    }

    .products-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
    }

    .modern-pagination {
        flex-direction: column;
        gap: 15px;
    }

    .pagination-controls {
        flex-wrap: wrap;
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .search-title h2 {
        font-size: 1.5rem;
    }

    .search-title p {
        font-size: 1rem;
    }

    .products-grid {
        grid-template-columns: 1fr;
    }

    .product-image {
        height: 200px;
    }
}
</style>