<template>
    <div class="order-page">
        <div class="container">
            <h1 class="page-title">Đặt hàng</h1>

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

            <div v-else class="order-content">
                <div class="order-list">
                    <div class="order-header">
                        <div class="order-row">
                            <div class="col-product">Sản phẩm</div>
                            <div class="col-price">Đơn giá</div>
                            <div class="col-quantity">Số lượng</div>
                            <div class="col-total">Thành tiền</div>
                        </div>
                    </div>

                    <div class="order-body">
                        <div v-for="(item, index) in cartItems" :key="index" class="order-row">
                            <div class="col-product">
                                <div class="product-info">
                                    <img :src="item.hinhAnh" :alt="item.tenSanPham" class="product-image">
                                    <div class="product-details">
                                        <h3 class="product-name">{{ item.tenSanPham }}</h3>
                                        <div class="product-meta" v-if="item.kichCo || item.mauSac">
                                            <span v-if="item.kichCo" class="meta-item">Kích cỡ: {{ item.kichCo }}</span>
                                            <span v-if="item.mauSac" class="meta-item">Màu sắc: {{ item.mauSac }}</span>
                                        </div>
                                        <div class="product-brand" v-if="item.thuongHieu">
                                            Thương hiệu: {{ item.thuongHieu }}
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
                                {{ item.soLuong }}
                            </div>
                            <div class="col-total">
                                {{ formatCurrency(item.giaSanPham * item.soLuong) }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="order-form">
                    <div class="form-group">
                        <label for="tenNguoiNhan">Tên người nhận</label>
                        <input type="text" id="tenNguoiNhan" v-model="tenNguoiNhan" class="form-control"
                            placeholder="Nhập tên người nhận" required>
                    </div>

                    <div class="form-group">
                        <label for="sdtNguoiNhan">Số điện thoại người nhận</label>
                        <input type="tel" id="sdtNguoiNhan" v-model="sdtNguoiNhan" class="form-control"
                            placeholder="Nhập số điện thoại người nhận" required>
                    </div>

                    <div class="form-group">
                        <label for="deliveryAddress">Địa chỉ giao hàng</label>
                        <textarea id="deliveryAddress" v-model="deliveryAddress" class="form-control" rows="3"
                            placeholder="Nhập địa chỉ giao hàng chi tiết" required></textarea>
                    </div>

                    <div class="form-group">
                        <label>Phương thức thanh toán</label>
                        <div class="payment-methods">
                            <div class="payment-method">
                                <input type="radio" id="paymentOnDelivery" v-model="paymentMethod" value="onDelivery">
                                <label for="paymentOnDelivery">Thanh toán bằng tiền mặt</label>
                            </div>
                            <div class="payment-method">
                                <input type="radio" id="paymentOnline" v-model="paymentMethod" value="online">
                                <label for="paymentOnline">Thanh toán online</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="order-summary">
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

                        <div class="coupon-section">
                            <div class="coupon-input">
                                <input type="text" v-model="couponCode" placeholder="Nhập mã giảm giá"
                                    :disabled="discount > 0">
                                <button @click="applyCoupon" class="btn-apply-coupon"
                                    :disabled="discount > 0 || !couponCode.trim()">
                                    Áp dụng
                                </button>
                            </div>
                            <div v-if="couponError" class="coupon-error">
                                {{ couponError }}
                            </div>
                        </div>

                        <div class="summary-total">
                            <span>Tổng thanh toán:</span>
                            <span>{{ formatCurrency(calculateTotal()) }}</span>
                        </div>

                        <button @click="placeOrder" class="btn-checkout" :disabled="!isFormValid">
                            Đặt hàng
                        </button>
                        <a href="/gio-hang" class="btn-continue-shopping">Quay lại giỏ hàng</a>
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
            tenNguoiNhan: "",
            sdtNguoiNhan: "",
            deliveryAddress: "",
            paymentMethod: "onDelivery",
            shippingFee: 300000,
            discount: 0,
            couponCode: "",
            couponError: "",
            discountPercent: 0,
            maxDiscountAmount: 0
        };
    },
    computed: {
        isFormValid() {
            return this.tenNguoiNhan.trim() !== "" &&
                this.sdtNguoiNhan.trim() !== "" &&
                this.deliveryAddress.trim() !== "" &&
                this.paymentMethod;
                
        }
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
                this.cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');
                this.isLoading = false;
            }
        },
        calculateSubtotal() {
            return this.cartItems.reduce((total, item) => {
                return total + (item.giaSanPham * item.soLuong);
            }, 0);
        },
        calculateTotal() {
            return this.calculateSubtotal() + this.shippingFee - this.discount;
        },
        applyCoupon() {
            if (!this.couponCode.trim()) {
                this.couponError = "Vui lòng nhập mã giảm giá";
                return;
            }

            const userInfo = JSON.parse(localStorage.getItem('user_info'));
            const token = localStorage.getItem('token_khach_hang');

            if (!userInfo || !token) {
                toaster.error('Vui lòng đăng nhập để áp dụng mã giảm giá!');
                return;
            }

            // Apply the discount code
            axios.post('/api/user/chi-tiet-don-hang/ap-dung-ma-giam-gia', null, {
                params: {
                    maGiamGia: this.couponCode,
                    tongTien: this.calculateTotal()
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    if (res.data.status) {
                        const discountData = res.data.data;
                        this.discountPercent = discountData.phanTramGiamGia;
                        this.maxDiscountAmount = discountData.giaTriGiamToiDa;

                        // Tính toán số tiền giảm giá
                        const discountAmount = (this.calculateSubtotal() * this.discountPercent) / 100;
                        this.discount = Math.min(discountAmount, this.maxDiscountAmount);

                        this.couponError = "";
                        toaster.success('Áp dụng mã giảm giá thành công!');
                    } else {
                        this.couponError = res.data.message || 'Mã giảm giá không hợp lệ!';
                        toaster.error(this.couponError);
                    }
                })
                .catch(error => {
                    console.error(error);
                    this.couponError = error.response?.data?.message || 'Có lỗi xảy ra khi kiểm tra mã giảm giá!';
                    toaster.error(this.couponError);
                });
        },
        placeOrder() {
            if (!this.isFormValid) {
                toaster.error('Vui lòng điền đầy đủ thông tin đơn hàng!');
                return;
            }

            const userInfo = JSON.parse(localStorage.getItem('user_info'));
            const token = localStorage.getItem('token_khach_hang');

            if (!userInfo || !token) {
                toaster.error('Vui lòng đăng nhập để đặt hàng!');
                return;
            }

            const orderData = {
                idKhachHang: userInfo.id,
                tenNguoiNhan: this.tenNguoiNhan,
                sdtNguoiNhan: this.sdtNguoiNhan,
                diaChiGiao: this.deliveryAddress,
                phuongThucThanhToan: this.paymentMethod,
                tongTien: this.calculateTotal(),
                maGiamGia: this.couponCode || null,
                chiTietDonHang: this.cartItems.map(item => ({
                    productId: item.idSanPham || item.id,
                    soLuong: item.soLuong,
                    giaSanPham: item.giaSanPham
                }))
            };

            axios.post('/api/user/chi-tiet-don-hang/tao-don-hang', orderData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                if (res.data.status) {
                    toaster.success('Đặt hàng thành công!');
                    // Xóa giỏ hàng sau khi đặt hàng thành công
                    localStorage.removeItem('cart_items');
                    // Chuyển hướng đến trang chi tiết đơn hàng
                    this.$router.push('/lich-su-don-hang');
                } else {
                    toaster.error(res.data.message || 'Có lỗi xảy ra khi đặt hàng!');
                }
            })
            .catch(error => {
                console.error(error);
                const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra khi đặt hàng!';
                toaster.error(errorMessage);
            });
        },
        async processPayment(order) {
            try {
                const paymentDto = {
                    orderId: order.id,
                    amount: order.tongTien,
                    paymentMethod: order.phuongThucThanhToan,
                    idKhachHang: userInfo.id,
                    trangThai: 'success',
                };

                const response = await axios.post('/api/user/payment', paymentDto);
                
                if (response.data.status) {
                    toaster.success('Thanh toán thành công!');
                    // Cập nhật lại trạng thái đơn hàng
                    this.loadOrders();
                } else {
                    toaster.error(response.data.message || 'Có lỗi xảy ra khi thanh toán');
                }
            } catch (error) {
                console.error('Payment error:', error);
                toaster.error('Có lỗi xảy ra khi xử lý thanh toán');
            }
        },

        async handleOrder(order) {
            if (order.trangThai == 'pending') {
                // Nếu đơn hàng đang chờ xử lý, thực hiện thanh toán
                await this.processPayment(order);
            } else {
                // Nếu đơn hàng đã thanh toán, chuyển đến trang chi tiết
                this.$router.push(`/chi-tiet-don-hang/${order.id}`);
            }
        }
    }
};
</script>

<style scoped>
.order-page {
    padding: 20px 0;
}

.page-title {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
}

.order-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.order-list {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.order-header {
    background: #f8f9fa;
    padding: 15px;
    border-bottom: 1px solid #dee2e6;
}

.order-row {
    display: flex;
    padding: 15px;
    border-bottom: 1px solid #dee2e6;
}

.col-product {
    flex: 2;
}

.col-price,
.col-quantity,
.col-total {
    flex: 1;
    text-align: center;
}

.product-info {
    display: flex;
    align-items: center;
    gap: 15px;
}

.product-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
}

.product-details {
    flex: 1;
}

.product-name {
    margin: 0;
    font-size: 16px;
    color: #333;
}

.product-meta {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
}

.meta-item {
    margin-right: 10px;
}

.order-form {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #333;
}

.form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.payment-methods {
    display: flex;
    gap: 20px;
}

.payment-method {
    display: flex;
    align-items: center;
    gap: 8px;
}

.order-summary {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.summary-content {
    max-width: 400px;
    margin: 0 auto;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    color: #666;
}

.summary-total {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #dee2e6;
    font-size: 18px;
    font-weight: 500;
    color: #333;
}

.btn-checkout {
    width: 100%;
    padding: 12px;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    margin-top: 20px;
}

.btn-checkout:hover {
    background: #0056b3;
}

.btn-checkout:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.btn-continue-shopping {
    display: block;
    text-align: center;
    margin-top: 15px;
    color: #007bff;
    text-decoration: none;
}

.btn-continue-shopping:hover {
    text-decoration: underline;
}

.empty-cart {
    text-align: center;
    padding: 50px 0;
}

.empty-cart-content {
    max-width: 400px;
    margin: 0 auto;
}

.empty-cart-content i {
    font-size: 48px;
    color: #ccc;
    margin-bottom: 20px;
}

.empty-cart-content h3 {
    margin-bottom: 10px;
    color: #333;
}

.empty-cart-content p {
    color: #666;
    margin-bottom: 20px;
}

.coupon-section {
    margin: 15px 0;
}

.coupon-input {
    display: flex;
    gap: 10px;
}

.coupon-input input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.coupon-input input:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
}

.btn-apply-coupon {
    padding: 8px 16px;
    background: #28a745;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
}

.btn-apply-coupon:hover:not(:disabled) {
    background: #218838;
}

.btn-apply-coupon:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.coupon-error {
    margin-top: 8px;
    color: #dc3545;
    font-size: 14px;
}
</style>
