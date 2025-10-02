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
                        <span class="value">{{ san_pham.baoHanh }}</span>
                    </div>
                </div>

                <div class="price-section">
                    <div class="current-price">{{ formatCurrency(san_pham.giamGia ? san_pham.giaSanPham * (1 -
                        san_pham.giamGia.phamTramGiamGia / 100) : san_pham.giaSanPham) }}</div>
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
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="text" v-model="quantity" class="quantity-input" readonly>
                            <button class="quantity-btn" @click="increaseQuantity">
                                <i class="fas fa-plus"></i>
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
                <button class="tab-btn" :class="{ active: activeTab === 'description' }"
                    @click="activeTab = 'description'">
                    Mô tả sản phẩm
                </button>
                <button class="tab-btn" :class="{ active: activeTab === 'specs' }" @click="activeTab = 'specs'">
                    Thông số kỹ thuật
                </button>
                <button class="tab-btn" :class="{ active: activeTab === 'reviews' }" @click="switchToReviews">
                    Đánh giá
                </button>
            </div>

            <div class="tab-content">
                <div class="tab-pane" :class="{ active: activeTab === 'description' }">
                    <div class="product-description">
                        <h3>Mô tả sản phẩm</h3>
                        <p>{{ san_pham.moTa }}</p>
                    </div>
                </div>

                <div class="tab-pane" :class="{ active: activeTab === 'specs' }">
                    <div class="product-specs">
                        <h3>Thông số kỹ thuật</h3>
                        <div class="specs-table">
                            <div class="spec-row">
                                <div class="spec-label">Kích thước</div>
                                <div class="spec-value">{{ san_pham.kichCo }}</div>
                            </div>
                            <div class="spec-row">
                                <div class="spec-label">Màu sắc</div>
                                <div class="spec-value">{{ san_pham.mauSac }}</div>
                            </div>
                            <div class="spec-row">
                                <div class="spec-label">Chất liệu</div>
                                <div class="spec-value">{{ san_pham.chatLieu }}</div>
                            </div>
                            <div class="spec-row">
                                <div class="spec-label">Thương hiệu</div>
                                <div class="spec-value">{{ san_pham.thuongHieu?.tenThuongHieu }}</div>
                            </div>
                            <div class="spec-row">
                                <div class="spec-label">Xuất xứ</div>
                                <div class="spec-value">Việt Nam</div>
                            </div>
                            <div class="spec-row">
                                <div class="spec-label">Thời gian bảo hành</div>
                                <div class="spec-value">12 tháng</div>
                            </div>
                            <div class="spec-row">
                                <div class="spec-label">Nhà cung cấp</div>
                                <div class="spec-value">{{ san_pham.nhaCungCap?.tenNhaCungCap }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-pane" :class="{ active: activeTab === 'reviews' }">
                    <div class="reviews-section">
                        <h3>Đánh giá từ khách hàng</h3>

                        <!-- Review Form -->
                        <div class="review-form" v-if="isLoggedIn">
                            <h4>Viết đánh giá của bạn</h4>
                            <div class="form-group">
                                <label>Nội dung đánh giá:</label>
                                <textarea v-model="newReview.danhGia" class="form-control" rows="3"
                                    placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này...">
                                </textarea>
                            </div>
                            <div class="form-group mt-3">
                                <label>Hình ảnh (tùy chọn):</label>
                                <input type="text" class="form-control" v-model="newReview.hinhAnh"
                                    placeholder="Nhập URL hình ảnh (nếu có)">
                            </div>
                            <div v-if="newReview.hinhAnh" class="image-preview mt-2">
                                <img :src="newReview.hinhAnh" alt="Preview" @error="handleImageError"
                                    class="preview-image">
                            </div>
                            <button @click="submitReview" class="btn btn-primary mt-3" :disabled="isSubmittingReview">
                                {{ isSubmittingReview ? 'Đang gửi...' : 'Gửi đánh giá' }}
                            </button>
                        </div>
                        <div v-else class="login-prompt">
                            <p>Vui lòng <a href="/dang-nhap">đăng nhập</a> để viết đánh giá</p>
                        </div>

                        <!-- Reviews List -->
                        <div class="reviews-list mt-4">
                            <div v-if="danh_sach_danh_gia.length === 0" class="no-reviews">
                                <p>Chưa có đánh giá nào cho sản phẩm này.</p>
                            </div>
                            <div v-else v-for="review in danh_sach_danh_gia" :key="review.id" class="review-card">
                                <div class="review-header">
                                    <div class="reviewer-info">
                                        <h4>{{ review.user?.hoVaTen }}</h4>
                                        <span class="review-date">{{ formatDate(review.ngayDanhGia) }}</span>
                                    </div>
                                    <div v-if="isCurrentUserReview(review)" class="review-actions">
                                        <button class="btn btn-sm btn-primary me-2" @click="openUpdateModal(review)">
                                            <i class="fas fa-edit"></i> Sửa
                                        </button>
                                        <button class="btn btn-sm btn-danger" @click="openDeleteModal(review)">
                                            <i class="fas fa-trash"></i> Xóa
                                        </button>
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

        <!-- Modal cập nhật đánh giá -->
        <div class="modal fade" id="updateReviewModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Cập nhật đánh giá</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Nội dung đánh giá:</label>
                            <textarea v-model="updateReview.danhGia" class="form-control" rows="3"
                                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này...">
                    </textarea>
                        </div>
                        <div class="form-group mt-3">
                            <label>Hình ảnh (tùy chọn):</label>
                            <input type="text" class="form-control" v-model="updateReview.hinhAnh"
                                placeholder="Nhập URL hình ảnh (nếu có)">
                        </div>
                        <div v-if="updateReview.hinhAnh" class="image-preview mt-2">
                            <img :src="updateReview.hinhAnh" alt="Preview" @error="handleImageError"
                                class="preview-image">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        <button type="button" class="btn btn-primary" @click="submitUpdateReview"
                            :disabled="isSubmittingReview">
                            {{ isSubmittingReview ? 'Đang cập nhật...' : 'Cập nhật' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal xác nhận xóa -->
        <div class="modal fade" id="deleteReviewModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Xác nhận xóa</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Bạn có chắc chắn muốn xóa đánh giá này không?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        <button type="button" class="btn btn-danger" @click="submitDeleteReview"
                            :disabled="isSubmittingReview">
                            {{ isSubmittingReview ? 'Đang xóa...' : 'Xóa' }}
                        </button>
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
            danh_sach_san_pham: [],
            selectedSize: '',
            selectedColor: '',
            quantity: 1,
            mainImage: '',
            activeTab: 'description',
            newReview: {
                danhGia: '',
                hinhAnh: '',
                ngayDanhGia: new Date().toISOString(),
                idKhachHang: null
            },
            isSubmittingReview: false,
            isLoggedIn: false,
            discountCode: '',
            isDiscountApplied: false,
            discountMessage: '',
            discountData: null,
            finalPrice: 0,
            updateReview: {
                id: null,
                danhGia: '',
                hinhAnh: '',
                idKhachHang: null
            },
            selectedReviewId: null,
        };
    },
    mounted() {
        this.layChiTietSanPham();
        this.layDanhGia();
        this.layDanhSachSanPham();
        this.checkLoginStatus();
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
                .get(`/api/user/danh-gia/san-pham/${id}`)
                .then((res) => {
                    if (res.data.status) {
                        this.danh_sach_danh_gia = res.data.data;
                    }
                })
                .catch((error) => {
                    toaster.error('Có lỗi xảy ra khi lấy đánh giá!');
                    console.error('Error fetching reviews:', error);
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
        async applyDiscountCode() {
            if (!this.discountCode) return;

            try {
                const orderDetails = [{
                    giaSanPham: this.san_pham.giaSanPham,
                    soLuong: this.quantity
                }];

                const response = await axios.post('/api/ap-dung-ma-giam-gia', {
                    maGiamGia: this.discountCode,
                    chiTietDonHang: orderDetails
                });

                if (response.data.status) {
                    this.isDiscountApplied = true;
                    this.discountMessage = response.data.message;
                    this.discountData = response.data.data;
                    this.finalPrice = response.data.data.tongTienSauGiam;
                }
            } catch (error) {
                this.discountMessage = error.response?.data?.message || 'Có lỗi xảy ra khi áp dụng mã giảm giá';
                this.isDiscountApplied = false;
                this.discountData = null;
                this.finalPrice = this.san_pham.giaSanPham * this.quantity;
            }
        },

        removeDiscountCode() {
            this.discountCode = '';
            this.isDiscountApplied = false;
            this.discountMessage = '';
            this.discountData = null;
            this.finalPrice = this.san_pham.giaSanPham * this.quantity;
        },

        themVaoGioHang() {
            if (!this.isLoggedIn) {
                toaster.error('Vui lòng đăng nhập để thêm vào giỏ hàng!');
                this.$router.push('/dang-nhap');
                return;
            } else {
                if (this.san_pham.soLuongTonKho <= 0) {
                    toaster.error('Sản phẩm đã hết hàng!');
                    return;
                }

                const userInfo = JSON.parse(localStorage.getItem('user_info'));
                const token = localStorage.getItem('token_khach_hang');

                // Tính giá tiền sau khi áp dụng mã giảm giá (nếu có)
                const giaSauGiamGia = this.isDiscountApplied ? this.finalPrice :
                    (this.san_pham.giamGia ? this.san_pham.giaSanPham * (1 - this.san_pham.giamGia.phamTramGiamGia / 100) : this.san_pham.giaSanPham);

                const thanhTien = giaSauGiamGia * this.quantity;

                if (userInfo && token) {
                    // Thêm vào giỏ hàng qua API
                    axios.post('/api/user/gio-hang/them-san-pham', null, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        params: {
                            idKhachHang: userInfo.id,
                            idSanPham: this.san_pham.id,
                            soLuong: this.quantity,
                            thanhTien: thanhTien,
                            maGiamGia: this.isDiscountApplied ? this.discountCode : null
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
                        existingItem.soLuong += this.quantity;
                        existingItem.thanhTien = giaSauGiamGia * existingItem.soLuong;
                        if (this.isDiscountApplied) {
                            existingItem.maGiamGia = this.discountCode;
                            existingItem.giaGoc = this.san_pham.giaSanPham;
                            existingItem.giaSauGiam = giaSauGiamGia;
                        }
                    } else {
                        cartItems.push({
                            id: this.san_pham.id,
                            tenSanPham: this.san_pham.tenSanPham,
                            giaSanPham: giaSauGiamGia,
                            giaGoc: this.san_pham.giaSanPham,
                            hinhAnh: this.san_pham.hinhAnh,
                            soLuong: this.quantity,
                            thanhTien: thanhTien,
                            maGiamGia: this.isDiscountApplied ? this.discountCode : null,
                            giaSauGiam: this.isDiscountApplied ? giaSauGiamGia : null,
                            giamGia: this.san_pham.giamGia ? {
                                phamTramGiamGia: this.san_pham.giamGia.phamTramGiamGia,
                                thanhTien: giaSauGiamGia
                            } : null,
                            soLuongTonKho: this.san_pham.soLuongTonKho
                        });
                    }

                    localStorage.setItem('cart_items', JSON.stringify(cartItems));
                    toaster.success('Thêm vào giỏ hàng thành công!');
                    this.$root.$emit('update-cart');
                }
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
        },
        switchToReviews() {
            this.activeTab = 'reviews';
            this.layDanhGia(); // Refresh reviews when switching to reviews tab
        },
        checkLoginStatus() {
            const userInfo = JSON.parse(localStorage.getItem('user_info'));
            const token = localStorage.getItem('token_khach_hang');
            this.isLoggedIn = !!(userInfo && token);
            if (this.isLoggedIn) {
                this.newReview.idKhachHang = userInfo.id;
            }
        },
        isValidImageUrl(url) {
            if (!url) return false;

            // Kiểm tra xem URL có hợp lệ không
            try {
                new URL(url);
            } catch (e) {
                return false;
            }

            // Kiểm tra xem URL có phải là hình ảnh không
            return true;
        },
        handleImageError(event) {
            event.target.style.display = 'none';
            toaster.error('URL hình ảnh không hợp lệ hoặc không thể truy cập');
            this.newReview.hinhAnh = '';
        },
        async submitReview() {
            if (!this.newReview.danhGia.trim()) {
                toaster.error('Vui lòng nhập nội dung đánh giá');
                return;
            }

            // Kiểm tra URL hình ảnh nếu có
            if (this.newReview.hinhAnh) {
                const img = new Image();
                img.onerror = () => {
                    toaster.error('URL hình ảnh không hợp lệ hoặc không thể truy cập');
                    return;
                };
                img.src = this.newReview.hinhAnh;
            }

            this.isSubmittingReview = true;
            try {
                const token = localStorage.getItem('token_khach_hang');
                const response = await axios.post(
                    `/api/user/danh-gia/san-pham/${this.$route.params.id}`,
                    this.newReview,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                if (response.data.status) {
                    toaster.success('Đánh giá của bạn đã được gửi thành công');
                    // Reset form
                    this.newReview.danhGia = '';
                    this.newReview.hinhAnh = '';
                    // Refresh reviews
                    this.layDanhGia();
                } else {
                    toaster.error(response.data.message);
                }
            } catch (error) {
                toaster.error(error.response?.data?.message || 'Có lỗi xảy ra khi gửi đánh giá');
            } finally {
                this.isSubmittingReview = false;
            }
        },
        redirectToDetail(id) {
            // Kiểm tra nếu đang ở trang chi tiết sản phẩm hiện tại
            if (this.$route.params.id === id.toString()) {
                // Reload lại trang
                window.location.reload();
            } else {
                // Chuyển đến trang chi tiết sản phẩm mới
                this.$router.push(`/chi-tiet-san-pham/${id}`).then(() => {
                    window.location.reload();
                });
                this.layChiTietSanPham();
                this.layDanhGia();
                this.layDanhSachSanPham();
            }
        },
        isCurrentUserReview(review) {
            const userInfo = JSON.parse(localStorage.getItem('user_info'));
            return userInfo && userInfo.id === review.user?.id;
        },

        openUpdateModal(review) {
            this.updateReview = {
                id: review.id,
                danhGia: review.danhGia,
                hinhAnh: review.hinhAnh,
                idKhachHang: review.user.id
            };
            const modal = new bootstrap.Modal(document.getElementById('updateReviewModal'));
            modal.show();
        },

        openDeleteModal(review) {
            this.selectedReviewId = review.id;
            const modal = new bootstrap.Modal(document.getElementById('deleteReviewModal'));
            modal.show();
        },

        async submitUpdateReview() {
            if (!this.updateReview.danhGia.trim()) {
                toaster.error('Vui lòng nhập nội dung đánh giá');
                return;
            }

            this.isSubmittingReview = true;
            try {
                const token = localStorage.getItem('token_khach_hang');
                const response = await axios.put(
                    `/api/user/danh-gia/${this.updateReview.id}`,
                    this.updateReview,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                if (response.data.status) {
                    toaster.success('Cập nhật đánh giá thành công');
                    // Đóng modal
                    const modal = bootstrap.Modal.getInstance(document.getElementById('updateReviewModal'));
                    modal.hide();
                    // Refresh đánh giá
                    this.layDanhGia();
                } else {
                    toaster.error(response.data.message);
                }
            } catch (error) {
                toaster.error(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật đánh giá');
            } finally {
                this.isSubmittingReview = false;
            }
        },

        async submitDeleteReview() {
            this.isSubmittingReview = true;
            try {
                const token = localStorage.getItem('token_khach_hang');
                const userInfo = JSON.parse(localStorage.getItem('user_info'));

                const response = await axios.delete(
                    `/api/user/danh-gia/${this.selectedReviewId}?idKhachHang=${userInfo.id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                if (response.data.status) {
                    toaster.success('Xóa đánh giá thành công');
                    // Đóng modal
                    const modal = bootstrap.Modal.getInstance(document.getElementById('deleteReviewModal'));
                    modal.hide();
                    // Refresh đánh giá
                    this.layDanhGia();
                } else {
                    toaster.error(response.data.message);
                }
            } catch (error) {
                toaster.error(error.response?.data?.message || 'Có lỗi xảy ra khi xóa đánh giá');
            } finally {
                this.isSubmittingReview = false;
            }
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
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    background-color: #fff;
}

.quantity-input::-webkit-inner-spin-button,
.quantity-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.quantity-input:focus {
    outline: none;
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
    transition: all 0.3s ease;
}

.tab-btn:hover {
    color: #0066cc;
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
    transition: all 0.3s ease;
}

.tab-content {
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tab-pane {
    display: none;
}

.tab-pane.active {
    display: block;
}

.no-reviews {
    text-align: center;
    padding: 20px;
    color: #666;
    font-style: italic;
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

.pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 15px;
}

.page-info {
    font-size: 14px;
    color: #666;
    margin: 0 10px;
}

.btn-outline-primary {
    border: 1px solid #007bff;
    color: #007bff;
    background-color: transparent;
    padding: 5px 15px;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.btn-outline-primary:hover:not(:disabled) {
    background-color: #007bff;
    color: white;
}

.btn-outline-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.reviews-section {
    padding: 20px;
}

.reviews-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.review-card {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 15px;
    background-color: white;
}

.review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.reviewer-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.reviewer-info h4 {
    margin: 0;
    font-size: 16px;
    color: #333;
}

.review-date {
    font-size: 12px;
    color: #666;
}

.review-content {
    margin: 10px 0;
    color: #444;
    line-height: 1.5;
}

.review-images {
    margin-top: 10px;
}

.review-images img {
    max-width: 200px;
    border-radius: 4px;
}

.specs-table {
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;
}

.spec-row {
    display: flex;
    border-bottom: 1px solid #eee;
}

.spec-row:last-child {
    border-bottom: none;
}

.spec-label {
    width: 200px;
    padding: 12px 15px;
    background-color: #f8f9fa;
    font-weight: 500;
    color: #333;
}

.spec-value {
    flex: 1;
    padding: 12px 15px;
    color: #666;
}

.spec-row:hover {
    background-color: #f8f9fa;
}

.review-form {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #eee;
    margin-bottom: 20px;
}

.review-form h4 {
    margin-bottom: 15px;
    color: #333;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    color: #555;
}

.form-control {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

textarea.form-control {
    resize: vertical;
    min-height: 100px;
}

.login-prompt {
    text-align: center;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 20px;
}

.login-prompt a {
    color: #007bff;
    text-decoration: none;
    font-weight: 500;
}

.login-prompt a:hover {
    text-decoration: underline;
}

.btn-primary {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
}

.btn-primary:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.btn-primary:hover:not(:disabled) {
    background-color: #0056b3;
}

.image-preview {
    margin-top: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    background-color: #f8f9fa;
}

.preview-image {
    max-width: 200px;
    max-height: 200px;
    display: block;
    margin: 0 auto;
    border-radius: 4px;
}

.review-actions {
    display: flex;
    gap: 0.5rem;
}

.btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
}
</style>
