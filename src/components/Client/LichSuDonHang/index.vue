<template>
    <div class="order-history-page">
        <div class="container py-4">
            <div class="page-header mb-4">
                <h2 class="page-title">Đơn hàng đang chờ xử lý</h2>
                <p class="page-description">Danh sách các đơn hàng của bạn đang chờ xử lý</p>
            </div>

            <div v-if="!isLoggedIn" class="login-required">
                <i class="fas fa-user-lock"></i>
                <p>Vui lòng đăng nhập để xem đơn hàng</p>
                <router-link to="/dang-nhap" class="btn btn-primary">
                    <i class="fas fa-sign-in-alt"></i>
                    Đăng nhập
                </router-link>
            </div>

            <template v-else>
                <div v-if="isLoading" class="loading-container">
                    <div class="loading-spinner"></div>
                    <p>Đang tải đơn hàng...</p>
                </div>

                <div v-else-if="orders.length === 0" class="no-orders">
                    <i class="fas fa-box-open"></i>
                    <p>Bạn chưa có đơn hàng nào đang chờ xử lý</p>
                </div>

                <div v-else class="order-list">
                    <div v-for="order in orders" :key="order.id" class="order-card">
                        <div class="order-header">
                            <div class="order-id">
                                <span class="label">Mã đơn hàng:</span>
                                <span class="value">#{{ order.id }}</span>
                            </div>
                            <div class="order-date">
                                <span class="label">Ngày đặt:</span>
                                <span class="value">{{ formatDate(order.ngayTao) }}</span>
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
                                <div class="order-status">
                                    <template v-if="order.trangThai === 'pending'">
                                        <span class="status-badge pending">Đang chờ xử lý</span>
                                        <button class="btn btn-danger btn-sm ms-2" data-bs-toggle="modal"
                                            data-bs-target="#huydonmodal" @click="delete_id = order.id">
                                            <i class="bx bx-package me-1"></i>
                                            Huỷ đơn hàng
                                        </button>
                                    </template>
                                    <template v-if="order.trangThai === 'delivered'">
                                        <button class="btn btn-success btn-sm ms-2">
                                            <i class="bx bx-package me-1"></i>
                                            Đã nhận được hàng
                                        </button>
                                        <button class="btn btn-info  btn-sm ms-2" data-bs-toggle="modal"
                                            data-bs-target="#successDeliveryModal" @click="delete_id = order.id">
                                            <i class="bx bx-package me-1"></i>
                                            Đã hoàn thành đơn hàng
                                        </button>
                                    </template>
                                    <template v-if="order.trangThai === 'processing'">
                                        <button class="btn btn-success btn-sm ms-2">
                                            <i class="bx bx-package me-1"></i>
                                            Đang xử lý
                                        </button>
                                        <button class="btn btn-danger btn-sm ms-2" data-bs-toggle="modal"
                                            data-bs-target="#huydonmodal" @click="delete_id = order.id">
                                            <i class="bx bx-package me-1"></i>
                                            Huỷ đơn hàng
                                        </button>
                                    </template>
                                    <template v-if="order.trangThai === 'shipped'">
                                        <button class="btn btn-success btn-sm ms-2">
                                            <i class="bx bx-package me-1"></i>
                                            Đang vận chuyển
                                        </button>
                                        <button class="btn btn-success btn-sm ms-2" data-bs-toggle="modal"
                                            data-bs-target="#ModalConfirmDelivery">
                                            <i class="bx bx-package me-1"></i>
                                            Đã nhận được hàng
                                        </button>
                                    </template>
                                    <template v-if="order.trangThai === 'cancelled'">
                                        <button class="btn btn-danger btn-sm ms-2">
                                            <i class="bx bx-package me-1"></i>
                                            Đã huỷ
                                        </button>
                                    </template>
                                    <template v-if="order.trangThai === 'completed'">
                                        <button class="btn btn-success btn-sm ms-2">
                                            <i class="bx bx-package me-1"></i>
                                            Đã hoàn thành
                                        </button>                                       
                                    </template>
                                    <template v-if="order.trangThai === 'returned'">
                                        <button class="btn btn-danger btn-sm ms-2">
                                            <i class="bx bx-package me-1"></i>
                                            Đã hoàn trả
                                        </button>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
    <!-- Modal xác nhận đã nhận được hàng -->
    <div class="modal fade" id="ModalConfirmDelivery" tabindex="-1" aria-labelledby="ModalConfirmDelivery"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="ModalConfirmDeliveryLabel">Xác nhận đã nhận được hàng</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Bạn có chắc chắn đã nhận được hàng?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy bỏ</button>
                    <button @click="confirmDelivery(delete_id = order.id)" type="button" class="btn btn-primary">Xác nhận</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal xác nhận đã huy don hàng -->
    <div class="modal fade" id="huydonmodal" tabindex="-1" aria-labelledby="ModalConfirmDelivery" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="ModalConfirmDeliveryLabel">Xác nhận huỷ đơn hàng</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Bạn có chắc chắn huỷ đơn hàng này?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy bỏ</button>
                    <button @click="DeleteDelivery(delete_id)" data-bs-dismiss="modal" type="button" class="btn btn-primary">Xác nhận</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal xác nhận đã hoàn thành đơn hàng -->
    <div class="modal fade" id="successDeliveryModal" tabindex="-1" aria-labelledby="ModalConfirmDelivery" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="ModalConfirmDeliveryLabel">Xác nhận hoàn thành đơn hàng</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Bạn có chắc chắn hoàn thành đơn hàng này?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy bỏ</button>
                    <button @click="successDelivery(delete_id)" data-bs-dismiss="modal" type="button" class="btn btn-primary">Xác nhận</button>
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
    name: 'LichSuDonHang',
    data() {
        return {
            orders: [],
            isLoading: false,
            isLoggedIn: false,
            delete_id:""
        }
    },
    mounted() {
        this.checkLoginStatus();
    },
    methods: {
        checkLoginStatus() {
            const userInfo = JSON.parse(localStorage.getItem('user_info'));
            const token = localStorage.getItem('token_khach_hang');
            this.isLoggedIn = !!(userInfo && token);

            if (this.isLoggedIn) {
                this.loadOrders();
            }
        },
        loadOrders() {
            this.isLoading = true;
            const userInfo = JSON.parse(localStorage.getItem('user_info'));
            const token = localStorage.getItem('token_khach_hang');

            axios.get(`/api/user/chi-tiet-don-hang/khach-hang/${userInfo.id}/pending`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.orders = res.data.data;
                    } else {
                        toaster.error(res.data.message || "Có lỗi xảy ra khi tải đơn hàng");
                    }
                })
                .catch(error => {
                    console.error("Lỗi khi lấy danh sách đơn hàng:", error);
                    toaster.error("Có lỗi xảy ra khi tải đơn hàng");
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        },
        formatPrice(price) {
            return new Intl.NumberFormat('vi-VN').format(price);
        },
        getPaymentMethod(method) {
            const methods = {
                'onDelivery': 'Thanh toán khi nhận hàng',
                'bankTransfer': 'Chuyển khoản ngân hàng',
                'creditCard': 'Thẻ tín dụng'
            };
            return methods[method] || method;
        },
        confirmDelivery(orderId) {
            const token = localStorage.getItem('token_khach_hang');
            axios.put(`/api/user/chi-tiet-don-hang/don-hang/${orderId}/trang-thai`,
                {
                    trangThai: 'delivered'
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Cập nhật trạng thái đơn hàng thành công!');
                        this.loadOrders();
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    console.error('Error updating order status:', error);
                    toaster.error('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng!');
                });
        },
        DeleteDelivery(orderId) {
            const token = localStorage.getItem('token_khach_hang');
            axios.put(`/api/user/chi-tiet-don-hang/don-hang/${orderId}/trang-thai`,
                {
                    trangThai: 'cancelled'
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Cập nhật trạng thái đơn hàng thành công!');
                        this.loadOrders();
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    console.error('Error updating order status:', error);
                    toaster.error('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng!');
                });
        },
        successDelivery(orderId) {
            const token = localStorage.getItem('token_khach_hang');
            axios.put(`/api/user/chi-tiet-don-hang/don-hang/${orderId}/trang-thai`,
                {
                    trangThai: 'completed'
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Cập nhật trạng thái đơn hàng thành công!');
                        this.loadOrders();
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    console.error('Error updating order status:', error);
                    toaster.error('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng!');
                });
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

.order-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
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

.status-badge {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
}

.status-badge.pending {
    background: #fff3e0;
    color: #f57c00;
}

.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
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

.no-orders {
    text-align: center;
    padding: 3rem;
    color: #666;
}

.no-orders i {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #999;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
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
</style>
