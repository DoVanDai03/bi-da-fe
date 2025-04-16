<template>
    <div class="cart-page">
        <div class="container">
            <h1 class="page-title">Giỏ hàng của bạn</h1>

            <div v-if="isLoading" class="text-center my-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Đang tải...</span>
                </div>
            </div>

            <div v-else-if="cartItems.length === 0" class="empty-cart">
                <div class="empty-cart-content">
                    <i class="bi bi-cart-x"></i>
                    <h3>Giỏ hàng trống</h3>
                    <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                    <a href="/home-page" class="btn-continue-shopping">Tiếp tục mua sắm</a>
                </div>
            </div>

            <div v-else class="cart-content">
                <div class="cart-list">
                    <div class="cart-header">
                        <div class="cart-row">
                            <div class="col-product">Sản phẩm</div>
                            <div class="col-price">Đơn giá</div>
                            <div class="col-quantity">Số lượng</div>
                            <div class="col-total">Thành tiền</div>
                            <div class="col-action"></div>
                            <div class="col-checkbox">
                                <input type="checkbox" v-model="selectAll" @change="toggleSelectAll">
                            </div>
                        </div>
                    </div>

                    <div class="cart-body">
                        <div v-for="(item, index) in cartItems" :key="index" class="cart-row">
                            <div class="col-product">
                                <div class="product-info">
                                    <div class="product-image-container">
                                        <img :src="item.hinhAnh" :alt="item.tenSanPham" class="product-image">
                                        <div class="product-badges" v-if="item.giaGoc > item.giaSanPham">
                                            <span class="badge discount">-{{ calculateDiscountPercent(item) }}%</span>
                                        </div>
                                    </div>
                                    <div class="product-details">
                                        <h3 class="product-name">{{ item.tenSanPham }}</h3>
                                        <div class="product-meta" v-if="item.kichCo || item.mauSac">
                                            <span v-if="item.kichCo" class="meta-item">
                                                <i class="bi bi-rulers"></i>
                                                {{ item.kichCo }}
                                            </span>
                                            <span v-if="item.mauSac" class="meta-item">
                                                <i class="bi bi-palette"></i>
                                                {{ item.mauSac }}
                                            </span>
                                        </div>
                                        <div class="product-brand" v-if="item.thuongHieu">
                                            <i class="bi bi-shop"></i>
                                            {{ item.thuongHieu }}
                                        </div>
                                        <div class="product-stock" v-if="item.soLuongTonKho">
                                            <i class="bi bi-box-seam"></i>
                                            Còn {{ item.soLuongTonKho }} sản phẩm
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-price">
                                <div class="price-display">
                                    <span class="current-price">{{ formatCurrency(item.giaSanPham) }}</span>
                                    <span v-if="item.giaGoc > item.giaSanPham" class="original-price">
                                        {{ formatCurrency(item.giaGoc) }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-quantity">
                                <div class="quantity-control">
                                    <button @click="decreaseQuantity(item)" class="quantity-btn"
                                        :disabled="item.soLuong <= 1">
                                        <i class="bi bi-dash">-</i>
                                    </button>
                                    <input type="number" v-model="item.soLuong" min="1" class="quantity-input"
                                        @change="updateQuantity(item)">
                                    <button @click="increaseQuantity(item)" class="quantity-btn">
                                        <i class="bi bi-plus">+</i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-total">
                                {{ formatCurrency(item.giaSanPham * item.soLuong) }}
                            </div>
                            <div class="col-action">
                                <button @click="removeItem(item)" class="btn-remove">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                            <div class="col-checkbox">
                                <input type="checkbox" v-model="selectedItems" :value="item">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="cart-summary">
                    <div class="summary-content">

                        <h3>Tóm tắt đơn hàng</h3>

                        <div class="summary-row">
                            <span>Tổng tiền hàng:</span>
                            <span>{{ formatCurrency(calculateSubtotal()) }}</span>
                        </div>

                        <div class="summary-row">
                            <span>Phí vận chuyển:</span>
                            <span>{{ formatCurrency(shippingFee) }}</span>
                        </div>

                        <div class="summary-discount" v-if="discount > 0">
                            <span>Giảm giá:</span>
                            <span>-{{ formatCurrency(discount) }}</span>
                        </div>

                        <div class="summary-total">
                            <span>Tổng thanh toán:</span>
                            <span>{{ formatCurrency(calculateTotal()) }}</span>
                        </div>

                        <button @click="checkout" class="btn-checkout">Thiết lập đơn hàng</button>
                        <a href="/home-page" class="btn-continue-shopping">Tiếp tục mua sắm</a>
                        <button v-if="selectedItems.length > 0" @click="deleteSelectedItems" class="btn-delete-selected">
                            <i class="bi bi-trash"></i>
                            Xóa sản phẩm đã chọn ({{ selectedItems.length }})
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
            cartItems: [],
            isLoading: true,
            couponCode: "",
            discount: 0,
            shippingFee: 300000, // Phí vận chuyển mặc định
            discountPercent: 0,
            maxDiscountAmount: 0,
            showDeleteModal: false,
            selectedItem: null,
            selectedItems: [],
            selectAll: false
        };
    },
    mounted() {
        this.loadCartItems();
    },
    methods: {
        formatCurrency(amount) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
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
                this.isLoading = false;
            }
        },
        updateQuantity(item) {
            // Kiểm tra số lượng tối thiểu
            if (item.soLuong < 1) {
                item.soLuong = 1;
            }

            // Kiểm tra số lượng tối đa
            if (item.soLuong > item.soLuongTonKho) {
                toaster.warning(`Số lượng không thể vượt quá ${item.soLuongTonKho} sản phẩm trong kho!`);
                item.soLuong = item.soLuongTonKho;
            }

            // Cập nhật giỏ hàng
            this.updateCart(item);
        },
        increaseQuantity(item) {
            // Kiểm tra nếu số lượng sắp vượt quá tồn kho
            if (item.soLuong >= item.soLuongTonKho) {
                toaster.warning(`Số lượng không thể vượt quá ${item.soLuongTonKho} sản phẩm trong kho!`);
                return;
            }

            item.soLuong++;
            this.updateCart(item);
        },
        decreaseQuantity(item) {
            if (item.soLuong > 1) {
                item.soLuong--;
                this.updateCart(item);
            }
        },
        updateCart(item) {
            const userInfo = JSON.parse(localStorage.getItem('user_info'));
            const token = localStorage.getItem('token_khach_hang');

            if (userInfo && userInfo.id && token) {
                // Cập nhật số lượng thông qua API nếu đã đăng nhập
                axios.put('/api/user/gio-hang/cap-nhat-san-pham', null, {
                    params: {
                        idKhachHang: userInfo.id,
                        idSanPham: item.idSanPham || item.id,
                        soLuong: item.soLuong,
                        thanhTien: item.giaSanPham * item.soLuong
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(res => {
                        if (!res.data.status) {
                            toaster.error(res.data.message || 'Có lỗi xảy ra khi cập nhật giỏ hàng!');
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        toaster.error('Có lỗi xảy ra khi cập nhật giỏ hàng!');
                    });
            } else {
                // Cập nhật localStorage nếu chưa đăng nhập
                localStorage.setItem('cart_items', JSON.stringify(this.cartItems));
            }
        },
        calculateSubtotal() {
            return this.cartItems.reduce((sum, item) => sum + (item.giaSanPham * item.soLuong), 0);
        },
        calculateDiscount() {
            // Tính giảm giá dựa trên phần trăm
            const subtotal = this.calculateSubtotal();
            const discountAmount = subtotal * (this.discountPercent / 100);

            // Giới hạn số tiền giảm giá không vượt quá giá trị tối đa
            return this.maxDiscountAmount > 0
                ? Math.min(discountAmount, this.maxDiscountAmount)
                : discountAmount;
        },
        calculateTotal() {
            const subtotal = this.calculateSubtotal();
            const discount = this.calculateDiscount();

            return subtotal + this.shippingFee - discount;
        },       
        checkout() {
            if (this.cartItems.length === 0) {
                toaster.error('Giỏ hàng trống, vui lòng thêm sản phẩm vào giỏ hàng!');
                return;
            }

            const userInfo = JSON.parse(localStorage.getItem('user_info'));
            const token = localStorage.getItem('token_khach_hang');

            if (!userInfo || !token) {
                toaster.error('Vui lòng đăng nhập để thanh toán!');
                this.$router.push('/dang-nhap');
                return;
            }

            // Chuyển hướng đến trang thanh toán
            this.$router.push('/don-hang');
        },
        toggleSelectAll() {
            if (this.selectAll) {
                this.selectedItems = [...this.cartItems];
            } else {
                this.selectedItems = [];
            }
        },
        deleteSelectedItems() {
            const userInfo = JSON.parse(localStorage.getItem('user_info'));
            const token = localStorage.getItem('token_khach_hang');

            if (userInfo && userInfo.id && token) {
                // Xóa nhiều sản phẩm thông qua API
                const deletePromises = this.selectedItems.map(item =>
                    axios.delete('/api/user/gio-hang/xoa-san-pham', {
                        params: {
                            idKhachHang: userInfo.id,
                            idSanPham: item.idSanPham || item.id
                        },
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                );

                Promise.all(deletePromises)
                    .then(responses => {
                        // Kiểm tra tất cả các response có thành công không
                        const allSuccess = responses.every(res => res.data.status);
                        if (allSuccess) {
                            // Cập nhật lại danh sách sản phẩm trong giỏ hàng
                            this.cartItems = this.cartItems.filter(item =>
                                !this.selectedItems.some(selected =>
                                    (selected.idSanPham || selected.id) === (item.idSanPham || item.id)
                                )
                            );
                            this.selectedItems = [];
                            this.selectAll = false;
                            toaster.success('Đã xóa sản phẩm thành công!');
                            this.$root.$emit('update-cart');
                        } else {
                            // Nếu có lỗi, hiển thị thông báo lỗi
                            const errorMessages = responses
                                .filter(res => !res.data.status)
                                .map(res => res.data.message)
                                .join(', ');
                            toaster.error(`Có lỗi xảy ra: ${errorMessages}`);
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        toaster.error('Có lỗi xảy ra khi xóa sản phẩm!');
                    });
            } else {
                // Xóa sản phẩm khỏi localStorage
                this.cartItems = this.cartItems.filter(item =>
                    !this.selectedItems.some(selected =>
                        (selected.idSanPham || selected.id) === (item.idSanPham || item.id)
                    )
                );
                localStorage.setItem('cart_items', JSON.stringify(this.cartItems));
                this.selectedItems = [];
                this.selectAll = false;
                toaster.success('Đã xóa sản phẩm thành công!');
                this.$root.$emit('update-cart');
            }
        },
        calculateDiscountPercent(item) {
            if (item.giaGoc > item.giaSanPham) {
                return Math.round(((item.giaGoc - item.giaSanPham) / item.giaGoc) * 100);
            }
            return 0;
        }
    }
}
</script>

<style scoped>
.cart-page {
    padding: 30px 0;
    min-height: 70vh;
}

.page-title {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 30px;
    color: #333;
}

.empty-cart {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px 0;
}

.empty-cart-content {
    text-align: center;
}

.empty-cart-content i {
    font-size: 60px;
    color: #ccc;
    margin-bottom: 20px;
}

.empty-cart-content h3 {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
}

.empty-cart-content p {
    color: #666;
    margin-bottom: 20px;
}

.btn-continue-shopping {
    display: inline-block;
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.btn-continue-shopping:hover {
    background-color: #2980b9;
}

.cart-content {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 30px;
}

.cart-header {
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    padding: 25px;
    font-weight: 700;
    color: #2c3e50;
    border-bottom: 1px solid #eee;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 14px;
}

.cart-row {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr 50px 50px;
    align-items: center;
    padding: 25px;
    border-bottom: 1px solid #eee;
    transition: all 0.3s ease;
}

.cart-header .cart-row {
    padding: 0;
    border-bottom: none;
}

.col-product {
    min-width: 0;
    /* Cho phép text bị cắt nếu quá dài */
}

.col-price,
.col-quantity,
.col-total {
    text-align: center;
    min-width: 120px;
}

.col-action,
.col-checkbox {
    text-align: center;
    min-width: 50px;
}

.cart-body .cart-row {
    background-color: white;
}

.cart-body .cart-row:last-child {
    border-bottom: none;
    border-radius: 0 0 8px 8px;
}

.product-info {
    display: flex;
    align-items: center;
}

.product-image-container {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.product-badges {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
}

.badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    color: white;
}

.badge.discount {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.product-details {
    margin-left: 15px;
}

.product-name {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 5px;
}

.product-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 8px 0;
}

.meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    color: #7f8c8d;
    background: #f8f9fa;
    padding: 4px 8px;
    border-radius: 4px;
}

.meta-item i {
    font-size: 12px;
}

.product-brand,
.product-stock {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #7f8c8d;
    margin-top: 4px;
}

.product-brand i,
.product-stock i {
    font-size: 12px;
}

.price-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.current-price {
    font-weight: 700;
    color: #e74c3c;
    font-size: 16px;
}

.original-price {
    font-size: 13px;
    text-decoration: line-through;
    color: #95a5a6;
}

.quantity-control {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: fit-content;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    background: none;
    border: none;
    font-size: 14px;
    cursor: pointer;
}

.quantity-btn:disabled {
    color: #ccc;
    cursor: not-allowed;
}

.quantity-input {
    width: 40px;
    height: 30px;
    text-align: center;
    border: none;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
}

.col-total {
    font-weight: 600;
    color: #e74c3c;
}

.btn-remove {
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    transition: color 0.3s;
}

.btn-remove:hover {
    color: #e74c3c;
}

.cart-summary {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.summary-content {
    padding: 20px;
}

.summary-content h3 {
    font-size: 18px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    color: #666;
}

.summary-discount {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    color: #27ae60;
}

.summary-total {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    font-size: 18px;
    font-weight: 600;
}

.coupon-section {
    margin-bottom: 20px;
}

.coupon-input {
    display: flex;
    margin-bottom: 15px;
}

.coupon-input input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
}

.btn-apply-coupon {
    padding: 10px 15px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
}

.btn-checkout {
    display: block;
    width: 100%;
    padding: 12px;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-checkout:hover {
    background-color: #c0392b;
}

.btn-continue-shopping {
    display: block;
    width: 100%;
    padding: 12px;
    text-align: center;
}

@media (max-width: 992px) {
    .cart-content {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .cart-row {
        grid-template-columns: 2fr 1fr 1fr 1fr 50px 50px;
    }

    .col-price,
    .col-quantity,
    .col-total {
        min-width: 100px;
    }
}

@media (max-width: 576px) {
    .cart-header {
        display: none;
    }

    .cart-row {
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 20px;
    }

    .col-product,
    .col-price,
    .col-quantity,
    .col-total,
    .col-action,
    .col-checkbox {
        width: 100%;
        min-width: auto;
        text-align: left;
    }

    .col-price,
    .col-quantity,
    .col-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px dashed #eee;
    }

    .col-price::before {
        content: "Đơn giá:";
        color: #7f8c8d;
        font-weight: 600;
    }

    .col-quantity::before {
        content: "Số lượng:";
        color: #7f8c8d;
        font-weight: 600;
    }

    .col-total::before {
        content: "Thành tiền:";
        color: #7f8c8d;
        font-weight: 600;
    }

    .col-action {
        justify-content: center;
        padding: 15px 0;
    }

    .col-checkbox {
        order: 6;
        text-align: center;
        padding: 10px 0;
        border-top: 1px dashed #eee;
    }
}

/* Modal Styles */
.modal {
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
}

.modal-dialog {
    max-width: 400px;
    margin: 1.75rem auto;
}

.modal-content {
    border: none;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.modal-header {
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
    padding: 1.25rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.modal-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.modal-title i {
    color: #e74c3c;
    font-size: 1.5rem;
}

.btn-close {
    padding: 0.5rem;
    margin: -0.5rem -0.5rem -0.5rem 0;
    background-color: transparent;
    border: 0;
    border-radius: 0.375rem;
    opacity: 0.5;
    transition: all 0.2s ease;
    font-size: 1.5rem;
    line-height: 1;
    color: #95a5a6;
}

.btn-close:hover {
    opacity: 1;
    color: #e74c3c;
    transform: rotate(90deg);
}

.modal-body {
    padding: 1.5rem;
    color: #666;
    font-size: 1rem;
    line-height: 1.6;
    text-align: center;
}

.modal-body p {
    margin: 0;
    font-size: 1.1rem;
}

.modal-footer {
    background-color: #fff;
    border-top: 1px solid #f0f0f0;
    padding: 1.25rem 1.5rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
}

.modal-footer .btn {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    border-radius: 8px;
    transition: all 0.3s ease;
    min-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.modal-footer .btn-secondary {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    color: #495057;
}

.modal-footer .btn-secondary:hover {
    background-color: #e9ecef;
    border-color: #dee2e6;
    transform: translateY(-2px);
}

.modal-footer .btn-primary {
    background-color: #e74c3c;
    border: 1px solid #e74c3c;
    color: white;
}

.modal-footer .btn-primary:hover {
    background-color: #c0392b;
    border-color: #c0392b;
    transform: translateY(-2px);
}

.modal-footer .btn i {
    font-size: 1rem;
}

@media (max-width: 576px) {
    .modal-dialog {
        margin: 0.5rem;
    }
    
    .modal-content {
        border-radius: 8px;
    }
    
    .modal-header,
    .modal-body,
    .modal-footer {
        padding: 1rem;
    }

    .modal-footer .btn {
        padding: 0.625rem 1.25rem;
        min-width: 80px;
    }
}

.summary-actions {
    margin-bottom: 20px;
}

.btn-delete-selected {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 12px 20px;
    background: #f8f9fa;
    color: #e74c3c;
    border: 1px solid #e74c3c;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    font-size: 14px;
    margin-top: 20px;
}

.btn-delete-selected:hover {
    background: #e74c3c;
    color: white;
    transform: translateY(-2px);
}

.btn-delete-selected:disabled {
    background: #f8f9fa;
    color: #95a5a6;
    border-color: #95a5a6;
    cursor: not-allowed;
    transform: none;
}

.btn-delete-selected i {
    font-size: 16px;
}
</style>
