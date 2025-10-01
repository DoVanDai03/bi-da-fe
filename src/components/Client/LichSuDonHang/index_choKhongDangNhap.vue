<template>
    <div class="order-history-page">
        <div class="container py-4">
            <div class="page-header mb-4">
                <h2 class="page-title">Đơn hàng của bạn</h2>
                <p class="page-description">Thông tin đơn hàng vừa tạo (khách không đăng nhập)</p>
            </div>

            <div v-if="!order" class="login-required">
                <i class="fas fa-info-circle"></i>
                <p>Không tìm thấy thông tin đơn hàng. Vui lòng quay lại trang chủ.</p>
                <router-link to="/home-page" class="btn btn-primary">
                    <i class="fas fa-home"></i>
                    Về trang chủ
                </router-link>
            </div>

            <template v-else>
                <div class="order-list">
                    <div class="order-card">
                        <div class="order-header">
                            <div class="order-id">
                                <span class="label">Mã đơn hàng:</span>
                                <span class="value">#{{ order.id || 'N/A' }}</span>
                            </div>
                            <div class="order-date">
                                <span class="label">Ngày đặt:</span>
                                <span class="value">{{ formatDate(order.ngayTao || new Date()) }}</span>
                            </div>
                        </div>

                        <div class="order-body">
                            <div class="order-info">
                                <div class="info-item">
                                    <span class="label">Người nhận:</span>
                                    <span class="value">{{ order.tenNguoiNhan }}</span>
                                </div>
                                <div class="info-item">
                                    <span class="label">Số điện thoại:</span>
                                    <span class="value">{{ order.sdtNguoiNhan }}</span>
                                </div>
                                <div class="info-item">
                                    <span class="label">Địa chỉ giao hàng:</span>
                                    <span class="value">{{ order.diaChiGiao }}</span>
                                </div>
                                <div class="info-item">
                                    <span class="label">Phương thức thanh toán:</span>
                                    <span class="value">{{ getPaymentMethod(order.phuongThucThanhToan) }}</span>
                                </div>
                                <div class="info-item" v-if="order.maGiamGia">
                                    <span class="label">Mã giảm giá:</span>
                                    <span class="value">{{ order.maGiamGia }}</span>
                                </div>
                            </div>

                            <div class="order-summary">
                                <div class="total-amount">
                                    <span class="label">Tổng tiền:</span>
                                    <span class="value">{{ formatPrice(order.tongTien) }}đ</span>
                                </div>
                            </div>

                            <div class="mt-2 text-danger" style="font-style: italic;">
                                Quý khách lưu ý lưu lại đơn hàng do trạng thái mua hàng khi chưa đăng nhập nên chỉ lưu khi ở trang web, thoát ra sẽ mất!
                            </div>

                            <div class="product-list mt-3" v-if="Array.isArray(order.chiTietDonHang) && order.chiTietDonHang.length">
                                <h5 class="product-name mb-3">Sản phẩm trong đơn</h5>
                                <div v-for="(p, idx) in order.chiTietDonHang" :key="idx" class="product-item mb-3">
                                    <div class="detail-row">
                                        <span class="label">Mã sản phẩm</span>
                                        <span class="value">{{ p.productId }}</span>
                                    </div>
                                    <div class="detail-row">
                                        <span class="label">Số lượng</span>
                                        <span class="value">{{ p.soLuong }}</span>
                                    </div>
                                    <div class="detail-row">
                                        <span class="label">Đơn giá</span>
                                        <span class="value">{{ formatPrice(p.giaSanPham) }}đ</span>
                                    </div>
                                    <div class="detail-row total-price">
                                        <span class="label">Thành tiền</span>
                                        <span class="value">{{ formatPrice(p.giaSanPham * p.soLuong) }}đ</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-3 text-center">
                        <router-link to="/home-page" class="btn btn-info btn-sm me-2">
                            <i class="fas fa-shopping-bag me-1"></i>
                            Tiếp tục mua sắm
                        </router-link>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LichSuDonHangKhongDangNhap',
    data() {
        return {
            order: null
        };
    },
    mounted() {
        // Cố gắng lấy dữ liệu đơn hàng từ session/localStorage (handoff từ trang đặt hàng)
        const local = localStorage.getItem('oder_khong_dang_nhap');
        if (local) {
            try {
                this.order = JSON.parse(local);
            } catch (_) {
                this.order = null;
            }
        }

        // Nếu không có, thử đọc từ history state (trường hợp đẩy kèm state)
        if (!this.order && window.history && window.history.state && window.history.state.oderKhongDangNhap) {
            this.order = window.history.state.oderKhongDangNhap;
        }
    },
    methods: {
        formatDate(dateLike) {
            const date = new Date(dateLike);
            return date.toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        },
        formatPrice(price) {
            return new Intl.NumberFormat('vi-VN').format(Number(price || 0));
        },
        getPaymentMethod(method) {
            const methods = {
                onDelivery: 'Thanh toán khi nhận hàng',
                bankTransfer: 'Chuyển khoản ngân hàng',
                creditCard: 'Thẻ tín dụng',
                online: 'Thanh toán online'
            };
            return methods[method] || method || 'Không xác định';
        }
    }
}
</script>

<style scoped>
.order-history-page {
    min-height: calc(100vh - 300px);
    background-color: #f8f9fa;
    padding: 2rem 0;
}

.page-header {
    text-align: center;
    margin-bottom: 2rem;
}

.page-title {
    font-size: 2rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
}

.page-description {
    color: #666;
    font-size: 1.1rem;
}

.login-required {
    text-align: center;
    padding: 3rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
}

.login-required i {
    font-size: 3rem;
    color: #1976d2;
    margin-bottom: 1rem;
}

.login-required p {
    color: #666;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
}

.btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.3s ease;
    text-decoration: none;
}

.btn-primary {
    background: #1976d2;
    color: white;
    border: none;
}

.btn-primary:hover {
    background: #1565c0;
    transform: translateY(-2px);
}

.order-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.order-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    transition: all 0.3s ease;
}

.order-header {
    padding: 1.5rem;
    background: #f8f9fa;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.order-id,
.order-date {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.label {
    color: #666;
    font-size: 0.9rem;
}

.value {
    color: #333;
    font-weight: 500;
}

.order-body {
    padding: 1.5rem;
}

.order-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.info-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.order-summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;
}

.total-amount {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.total-amount .value {
    font-size: 1.25rem;
    color: #1976d2;
    font-weight: 600;
}

.product-list {
    padding-right: 10px;
}

.product-item {
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 12px;
    transition: all 0.3s ease;
    background: #fff;
    margin-bottom: 20px;
}

.product-name {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 1rem;
}

.detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding: 8px;
    background: #f8f9fa;
    border-radius: 6px;
}

.detail-row .label {
    color: #666;
    font-size: 1rem;
    font-weight: 500;
}

.detail-row .value {
    color: #333;
    font-weight: 500;
}

.total-price {
    margin-top: 10px;
    background: #e8f4ff !important;
}

.btn-info {
    background-color: #17a2b8;
    border-color: #17a2b8;
    color: white;
}

.btn-info:hover {
    background-color: #138496;
    border-color: #117a8b;
    color: white;
}

.btn-success {
    background-color: #28a745;
    border-color: #28a745;
    color: white;
    transition: all 0.3s ease;
}

.btn-success:hover {
    background-color: #218838;
    border-color: #1e7e34;
    transform: translateY(-2px);
}

.btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    border-radius: 0.2rem;
}

.me-2 {
    margin-right: 0.5rem;
}

@media (max-width: 768px) {
    .order-header {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
    }

    .order-summary {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
    }
}
</style>


