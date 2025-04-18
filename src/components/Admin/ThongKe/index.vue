<template>
    <div class="statistics-page">
        <div class="container-fluid py-4">
            <div v-if="isLoading" class="loading-overlay">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <div v-else>
                <!-- Stats Cards Row -->
                <div class="row mb-4">
                    <div class="col-md-4 mb-4">
                        <div class="stats-card">
                            <div class="stats-icon">
                                <i class="fas fa-shopping-cart"></i>
                            </div>
                            <div class="stats-info">
                                <h5>Tổng đơn hàng</h5>
                                <h3>{{ totalOrders }}</h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="stats-card">
                            <div class="stats-icon">
                                <i class="fas fa-money-bill-wave"></i>
                            </div>
                            <div class="stats-info">
                                <h5>Tổng doanh thu</h5>
                                <h3>{{ formatPrice(totalRevenue) }}đ</h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="stats-card">
                            <div class="stats-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div class="stats-info">
                                <h5>Đơn hoàn thành</h5>
                                <h3>{{ completedOrders }}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Charts Row -->
                <div class="row">
                    <!-- Order Status Chart -->
                    <div class="col-12 col-lg-6 mb-4">
                        <div class="card h-100">
                            <div class="card-header">
                                <h4 class="card-title">Thống kê trạng thái đơn hàng</h4>
                                <div class="date-filter">
                                    <select v-model="selectedPeriod" class="form-select" @change="loadData">
                                        <option value="day">Hôm nay</option>
                                        <option value="week">Tuần này</option>
                                        <option value="month">Tháng này</option>
                                        <option value="year">Năm nay</option>
                                    </select>
                                </div>
                            </div>
                            <div class="card-body d-flex align-items-center justify-content-center">
                                <Doughnut 
                                    :data="orderStatusData"
                                    :options="orderStatusOptions"
                                    class="chart-container"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Revenue Chart -->
                    <div class="col-12 col-lg-6 mb-4">
                        <div class="card h-100">
                            <div class="card-header">
                                <h4 class="card-title">Thống kê doanh thu</h4>
                            </div>
                            <div class="card-body d-flex align-items-center justify-content-center">
                                <Line 
                                    :data="revenueData"
                                    :options="revenueOptions"
                                    class="chart-container"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler
} from 'chart.js'
import { Line, Doughnut } from 'vue-chartjs'
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement
)

const toaster = createToaster({ position: "top-right" });

// Kiểm tra nhiều quyền
const checkMultiplePermissions = async (maQuyenList) => {
    try {
        const queryString = maQuyenList.map(q => `maQuyen=${q}`).join('&');
        const response = await axios.get(
            `/api/admin/quyen/chuc-vu/kiem-tra-nhieu-quyen?${queryString}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                }
            }
        );
        return response.data.data.permissions;
    } catch (error) {
        console.error('Error checking permissions:', error);
        return {};
    }
};

export default {
    name: 'ThongKe',
    components: {
        Line,
        Doughnut
    },
    data() {
        return {
            isLoading: true,
            selectedPeriod: 'month',
            totalOrders: 0,
            totalRevenue: 0,
            completedOrders: 0,
            orderStatusData: {
                labels: ['Chờ xử lý', 'Đang xử lý', 'Đang giao', 'Hoàn thành', 'Đã hủy', 'Hoàn trả'],
                datasets: [{
                    data: [0, 0, 0, 0, 0, 0],
                    backgroundColor: [
                        '#ffc107', // yellow for pending
                        '#17a2b8', // cyan for processing
                        '#007bff', // blue for shipping
                        '#28a745', // green for completed
                        '#dc3545', // red for cancelled
                        '#6c757d'  // gray for returned
                    ]
                }]
            },
            orderStatusOptions: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.raw + ' đơn';
                            }
                        }
                    }
                }
            },
            revenueData: {
                labels: [],
                datasets: [{
                    label: 'Doanh thu',
                    data: [],
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            revenueOptions: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return new Intl.NumberFormat('vi-VN').format(Math.round(value)) + 'đ';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'Doanh thu: ' + new Intl.NumberFormat('vi-VN').format(Math.round(context.raw)) + 'đ';
                            }
                        }
                    }
                }
            },
            permissions: {
                canView: false,
                canCreate: false,
                canUpdate: false,
                canDelete: false
            }
        }
    },
    async created() {
        // Check permissions when component is created
        const permissions = await checkMultiplePermissions([
            'xem_thong_ke'
        ]);
        
        this.permissions = {
            canView: permissions.xem_thong_ke || false,
            canCreate: false, // No create permission needed for statistics
            canUpdate: false, // No update permission needed for statistics
            canDelete: false  // No delete permission needed for statistics
        };
        
        if (this.permissions.canView) {
            // Only load data if user has view permission
            await this.loadData();
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        async loadData() {
            this.isLoading = true;
            try {
                const token = localStorage.getItem('token_admin');
                const response = await axios.get(`/api/admin/thong-ke`, {
                    params: {
                        period: this.selectedPeriod
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.data.status) {
                    const data = response.data.data;
                    this.updateCharts(data);
                    this.totalOrders = data.totalOrders;
                    this.totalRevenue = data.totalRevenue;
                    this.completedOrders = data.completedOrders;
                } else {
                    toaster.error(response.data.message || 'Có lỗi xảy ra khi tải dữ liệu');
                }
            } catch (error) {
                console.error('Error loading statistics:', error);
                toaster.error(error.response?.data?.message || 'Có lỗi xảy ra khi tải dữ liệu');
            } finally {
                this.isLoading = false;
            }
        },
        updateCharts(data) {
            try {
                // Update Order Status Chart
                const orderStatusData = [
                    data.orderStatus.pending || 0,
                    data.orderStatus.processing || 0,
                    data.orderStatus.shipped || 0,
                    data.orderStatus.completed || 0,
                    data.orderStatus.cancelled || 0,
                    data.orderStatus.returned || 0
                ];
                
                this.orderStatusData.datasets[0].data = [...orderStatusData];

                // Update Revenue Chart
                if (data.revenue && Array.isArray(data.revenue)) {
                    const revenueData = data.revenue.map(item => ({
                        date: new Date(item.date).toLocaleDateString('vi-VN', {
                            day: '2-digit',
                            month: '2-digit'
                        }),
                        amount: Number(item.amount)
                    }));

                    this.revenueData.labels = revenueData.map(item => item.date);
                    this.revenueData.datasets[0].data = revenueData.map(item => item.amount);
                }
            } catch (error) {
                console.error('Error updating charts:', error);
            }
        },
        formatPrice(price) {
            if (!price) return '0';
            return new Intl.NumberFormat('vi-VN').format(Math.round(Number(price)));
        }
    }
}
</script>

<style scoped>
.statistics-page {
    padding: 20px;
    background-color: #f8f9fa;
    min-height: calc(100vh - 60px);
    position: relative;
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    margin-bottom: 20px;
    height: 100%;
}

.card-header {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.card-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
}

.card-body {
    padding: 1.5rem;
    height: 400px;
}

.chart-container {
    position: relative;
    height: 100%;
    width: 100%;
}

.date-filter {
    width: 200px;
}

.form-select {
    padding: 0.375rem 2.25rem 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

.stats-card {
    background: white;
    border-radius: 10px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    height: 100%;
    transition: transform 0.3s ease;
}

.stats-card:hover {
    transform: translateY(-5px);
}

.stats-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #e9ecef;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
}

.stats-icon i {
    font-size: 1.5rem;
    color: #495057;
}

.stats-info h5 {
    margin: 0;
    color: #6c757d;
    font-size: 0.9rem;
}

.stats-info h3 {
    margin: 0.5rem 0 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
}

@media (max-width: 768px) {
    .card-header {
        flex-direction: column;
        gap: 1rem;
    }
    
    .date-filter {
        width: 100%;
    }

    .card-body {
        height: 300px;
    }
}
</style>
