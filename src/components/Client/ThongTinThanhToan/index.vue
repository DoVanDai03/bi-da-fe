<template>
    <div class="payment-info">
        <div class="container">
            <div class="payment-card">
                <div v-if="isLoading" class="loading">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Đang tải...</span>
                    </div>
                </div>
                <template v-else>
                    <div class="status-banner" :class="orderDetails.trangThaiThanhToan === 'DA_THANH_TOAN' ? 'success' : 'pending'">
                        <i class="fas" :class="orderDetails.trangThaiThanhToan === 'DA_THANH_TOAN' ? 'fa-check-circle' : 'fa-clock'"></i>
                        {{ orderDetails.trangThaiThanhToan === 'DA_THANH_TOAN' ? 'Thanh toán thành công' : 'Đang xử lý' }}
                    </div>
                    
                    <div class="card-section text-center">
                        <h3 class="section-title">Thông tin đơn hàng</h3>
                        <div class="info-grid">
                            <div class="info-item">
                                <div class="info-label">Mã đơn hàng:</div>
                                <div class="info-value">#{{ orderDetails.id }}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Trạng thái:</div>
                                <div v-if="orderDetails.trangThai === 'pending'" class="info-value status-badge" :class="orderDetails.trangThai">
                                    Đang xử lý
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Tổng tiền:</div>
                                <div class="info-value amount">{{ formatCurrency(orderDetails.tongTien) }}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Ngày thanh toán:</div>
                                <div class="info-value">{{ formatDateISO(orderDetails.ngayThanhToan) }}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Phương thức:</div>
                                <div class="info-value payment-method text-center">
                                    <i class="fas fa-credit-card"></i>
                                    {{ orderDetails.phuongThucThanhToan }}
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Trạng thái thanh toán:</div>
                                <div v-if="orderDetails.trangThaiThanhToan === 'DA_THANH_TOAN'" class="info-value">Thanh toán thành công</div>
                            </div>
                        </div>
                    </div>

                    <div class="card-section">
                        <h3 class="section-title">Chi tiết giao dịch</h3>
                        <div class="info-grid text-center">
                            <div class="info-item">
                                <div class="info-label">Ngân hàng:</div>
                                <div class="info-value">{{ paymentInfo.vnp_BankCode }}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Loại thẻ:</div>
                                <div class="info-value">{{ paymentInfo.vnp_CardType }}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Mã giao dịch VNPay:</div>
                                <div class="info-value">{{ paymentInfo.vnp_TransactionNo }}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Mã giao dịch ngân hàng:</div>
                                <div class="info-value">{{ paymentInfo.vnp_BankTranNo }}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Thời gian GD:</div>
                                <div class="info-value">{{ formatDate(paymentInfo.vnp_PayDate) }}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Mã tham chiếu:</div>
                                <div class="info-value">{{ paymentInfo.vnp_TxnRef }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="card-footer">
                        <router-link to="/lich-su-don-hang" class="btn btn-primary">
                            <i class="fas fa-history"></i> Xem lịch sử đơn hàng
                        </router-link>
                        <router-link to="/home-page" class="btn btn-outline">
                            <i class="fas fa-home"></i> Về trang chủ
                        </router-link>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
    data() {
        return {
            isLoading: true,
            paymentInfo: {},
            orderDetails: {
                trangThai: '',
                tongTien: 0,
                ngayThanhToan: '',
                phuongThucThanhToan: '',
                id: '',
                trangThaiThanhToan: ''
            }
        };
    },
    computed: {
        getPaymentStatus() {
            if (!this.paymentInfo.vnp_ResponseCode) return '';
            return this.paymentInfo.vnp_ResponseCode === '00' ? 'Thanh toán thành công' : 'Thanh toán thất bại';
        },
        getStatusClass() {
            return {
                'status-success': this.paymentInfo.vnp_ResponseCode === '00',
                'status-failed': this.paymentInfo.vnp_ResponseCode !== '00'
            };
        }
    },
    mounted() {
        this.loadPaymentInfo();
    },
    methods: {
        formatCurrency(amount) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
        },
        formatDate(dateString) {
            if (!dateString) return '';
            const year = dateString.substring(0, 4);
            const month = dateString.substring(4, 6);
            const day = dateString.substring(6, 8);
            const hour = dateString.substring(8, 10);
            const minute = dateString.substring(10, 12);
            const second = dateString.substring(12, 14);
            const date = new Date(year, month - 1, day, hour, minute, second);
            return date.toLocaleString('vi-VN');
        },
        formatDateISO(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleString('vi-VN');
        },
        async loadPaymentInfo() {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const queryParams = {};
                for (const [key, value] of urlParams.entries()) {
                    queryParams[key] = value;
                }

                if (Object.keys(queryParams).length > 0) {
                    const token = localStorage.getItem('token_khach_hang');
                    const response = await axios.get('/api/user/chi-tiet-don-hang/vnpay-payment', {
                        params: queryParams,
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.data.status) {
                        this.paymentInfo = response.data.data.paymentInfo;
                        this.orderDetails = response.data.data.orderDetails;

                        if (queryParams.vnp_ResponseCode === '00') {
                            toaster.success('Thanh toán thành công!');
                            localStorage.removeItem('cart_items');
                        } else {
                            toaster.error('Thanh toán thất bại!');
                        }
                    } else {
                        toaster.error(response.data.message || 'Không thể xử lý thanh toán');
                        this.$router.push('/lich-su-don-hang');
                    }
                } else {
                    toaster.error('Không tìm thấy thông tin thanh toán');
                    this.$router.push('/lich-su-don-hang');
                }
            } catch (error) {
                console.error('Error processing payment:', error);
                toaster.error('Có lỗi xảy ra khi xử lý thanh toán');
                this.$router.push('/lich-su-don-hang');
            } finally {
                this.isLoading = false;
            }
        }
    }
};
</script>

<style scoped>
.payment-info {
    padding: 40px 0;
    min-height: calc(100vh - 200px);
    background-color: #f8f9fa;
}

.payment-card {
    max-width: 900px;
    margin: 0 auto;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
}

.status-banner {
    padding: 20px;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
}

.status-banner.success {
    background: linear-gradient(135deg, #28a745, #20c997);
}

.status-banner.pending {
    background: linear-gradient(135deg, #ffc107, #fd7e14);
}

.status-banner i {
    margin-right: 10px;
    font-size: 1.8rem;
}

.card-section {
    padding: 30px;
    border-bottom: 1px solid #eee;
}

.section-title {
    margin: 0 0 20px 0;
    color: #333;
    font-size: 1.3rem;
    font-weight: 600;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.info-item {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 12px;
    transition: all 0.3s ease;
}

.info-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.info-label {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 5px;
}

.info-value {
    color: #333;
    font-weight: 500;
    font-size: 1.1rem;
}

.amount {
    color: #28a745;
    font-weight: 600;
    font-size: 1.2rem;
}

.status-badge {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.9rem;
    text-transform: uppercase;
    background: #e9ecef;
}

.status-badge.pending {
    background: #fff3cd;
    color: #856404;
}

.status-badge.completed {
    background: #d4edda;
    color: #155724;
}

.payment-method {
    align-items: center;
    gap: 8px;
}

.payment-method i {
    color: #007bff;
}

.card-footer {
    padding: 30px;
    background: #f8f9fa;
    text-align: center;
    display: flex;
    gap: 15px;
    justify-content: center;
}

.btn {
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 500;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
}

.btn i {
    font-size: 1.1rem;
}

.btn-primary {
    background: #007bff;
    color: white;
    border: none;
}

.btn-primary:hover {
    background: #0056b3;
    transform: translateY(-2px);
}

.btn-outline {
    background: white;
    color: #007bff;
    border: 2px solid #007bff;
}

.btn-outline:hover {
    background: #f8f9fa;
    transform: translateY(-2px);
}

.loading {
    text-align: center;
    padding: 60px;
}

@media (max-width: 768px) {
    .payment-card {
        margin: 15px;
    }

    .card-section {
        padding: 20px;
    }

    .info-grid {
        grid-template-columns: 1fr;
    }

    .card-footer {
        flex-direction: column;
    }

    .btn {
        width: 100%;
        justify-content: center;
    }
}
</style>
