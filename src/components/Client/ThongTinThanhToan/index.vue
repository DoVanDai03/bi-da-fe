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
                    <div class="card-header">
                        <h2>Thông tin thanh toán</h2>
                    </div>
                    <div class="card-body">
                        <div class="info-row">
                            <div class="info-label">Số tiền:</div>
                            <div class="info-value">{{ formatCurrency(paymentInfo.vnp_Amount / 100) }}</div>
                        </div>
                        <div class="info-row">
                            <div class="info-label">Ngân hàng:</div>
                            <div class="info-value">{{ paymentInfo.vnp_BankCode }}</div>
                        </div>
                        <div class="info-row">
                            <div class="info-label">Mã giao dịch ngân hàng:</div>
                            <div class="info-value">{{ paymentInfo.vnp_BankTranNo }}</div>
                        </div>
                        <div class="info-row">
                            <div class="info-label">Loại thẻ:</div>
                            <div class="info-value">{{ paymentInfo.vnp_CardType }}</div>
                        </div>
                        <div class="info-row">
                            <div class="info-label">Nội dung thanh toán:</div>
                            <div class="info-value">{{ decodeURIComponent(paymentInfo.vnp_OrderInfo) }}</div>
                        </div>
                        <div class="info-row">
                            <div class="info-label">Thời gian thanh toán:</div>
                            <div class="info-value">{{ formatDate(paymentInfo.vnp_PayDate) }}</div>
                        </div>
                        <div class="info-row">
                            <div class="info-label">Mã giao dịch VNPay:</div>
                            <div class="info-value">{{ paymentInfo.vnp_TransactionNo }}</div>
                        </div>
                        <div class="info-row">
                            <div class="info-label">Trạng thái:</div>
                            <div class="info-value" :class="getStatusClass">
                                {{ getPaymentStatus }}
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <router-link to="/lich-su-don-hang" class="btn btn-primary">
                            Xem đơn hàng
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
            paymentInfo: {}
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
        async loadPaymentInfo() {
            try {
                const response = await axios.get('/api/user/payment/payment-return', {
                    params: this.$route.query,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_khach_hang')}`
                    }
                });

                if (response.data.status) {
                    this.paymentInfo = response.data.data;
                    if (this.paymentInfo.vnp_ResponseCode === '00') {
                        toaster.success('Thanh toán thành công!');
                    } else {
                        toaster.error('Thanh toán thất bại!');
                    }
                } else {
                    toaster.error(response.data.message || 'Không thể tải thông tin thanh toán');
                }
            } catch (error) {
                console.error('Error loading payment info:', error);
                toaster.error('Có lỗi xảy ra khi tải thông tin thanh toán');
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
    max-width: 800px;
    margin: 0 auto;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.card-header {
    padding: 20px;
    background: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
}

.card-header h2 {
    margin: 0;
    color: #333;
    font-size: 1.5rem;
    text-align: center;
}

.card-body {
    padding: 30px;
}

.info-row {
    display: flex;
    margin-bottom: 15px;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 8px;
}

.info-label {
    flex: 1;
    color: #666;
    font-weight: 500;
}

.info-value {
    flex: 2;
    color: #333;
    font-weight: 500;
}

.status-success {
    color: #28a745;
}

.status-failed {
    color: #dc3545;
}

.card-footer {
    padding: 20px;
    background: #f8f9fa;
    border-top: 1px solid #dee2e6;
    text-align: center;
}

.loading {
    text-align: center;
    padding: 40px;
}

.btn-primary {
    background: #007bff;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    text-decoration: none;
    display: inline-block;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background: #0056b3;
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .info-row {
        flex-direction: column;
    }

    .info-label {
        margin-bottom: 5px;
    }

    .info-value {
        padding-left: 10px;
    }
}
</style>
