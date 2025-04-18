<template>
    <div class="account-info-page">
        <div class="container py-4">
            <div class="page-header mb-4">
                <div class="header-content">
                    <h2 class="page-title">
                        <i class="fas fa-user-shield me-2"></i>
                        Thông tin tài khoản quản trị
                    </h2>
                    <p class="page-description">Xem và quản lý thông tin tài khoản quản trị viên của bạn</p>
                </div>
            </div>

            <div v-if="!isLoggedIn" class="login-required">
                <div class="login-card">
                    <i class="fas fa-user-lock"></i>
                    <h3>Yêu cầu đăng nhập</h3>
                    <p>Vui lòng đăng nhập để xem thông tin tài khoản</p>
                    <router-link to="/dang-nhap/admin" class="btn btn-primary">
                        <i class="fas fa-sign-in-alt me-2"></i>
                        Đăng nhập ngay
                    </router-link>
                </div>
            </div>

            <template v-else>
                <div class="account-info-container">
                    <div class="info-section">
                        <div class="profile-header">
                            <div class="avatar-section">
                                <div class="avatar">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="user-status" :class="{ 'active': adminInfo.tinhTrang === 1 }">
                                    {{ getTinhTrang }}
                                </div>
                            </div>
                            <div class="basic-info">
                                <h3>{{ adminInfo.hoVaTen || 'Chưa cập nhật' }}</h3>
                                <span class="role-badge">{{ adminInfo.chucVu || 'Chưa có chức vụ' }}</span>
                            </div>
                        </div>

                        <div class="info-grid">
                            <div class="info-item">
                                <div class="info-label">
                                    <i class="fas fa-envelope"></i>
                                    <span>Email</span>
                                </div>
                                <div class="info-value">{{ adminInfo.email || 'Chưa cập nhật' }}</div>
                            </div>

                            <div class="info-item">
                                <div class="info-label">
                                    <i class="fas fa-phone"></i>
                                    <span>Số điện thoại</span>
                                </div>
                                <div class="info-value">{{ adminInfo.sdt || 'Chưa cập nhật' }}</div>
                            </div>

                            <div class="info-item">
                                <div class="info-label">
                                    <i class="fas fa-calendar-plus"></i>
                                    <span>Ngày tạo</span>
                                </div>
                                <div class="info-value">{{ formatDate(adminInfo.ngayTao) || 'Chưa cập nhật' }}</div>
                            </div>

                            <div class="info-item">
                                <div class="info-label">
                                    <i class="fas fa-calendar-check"></i>
                                    <span>Cập nhật lần cuối</span>
                                </div>
                                <div class="info-value">{{ formatDate(adminInfo.ngayCapNhat) || 'Chưa cập nhật' }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { createToaster } from "@meforma/vue-toaster";
import axios from "axios";
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
    name: 'ThongTinTaiKhoanAdmin',
    data() {
        return {
            isLoggedIn: false,
            adminInfo: {
                id: null,
                email: '',
                hoVaTen: '',
                sdt: '',
                chucVu: '',
                chucVuId: null,
                quyenHan: null,
                tinhTrang: 1,
                ngayTao: '',
                ngayCapNhat: ''
            },
            permissions: {
                canView: false
            }
        }
    },
    computed: {
        getTinhTrang() {
            return this.adminInfo.tinhTrang === 1 ? 'Đang hoạt động' : 'Đã khóa';
        }
    },
    async mounted() {
        await this.checkPermissions();
        this.checkLoginStatus();
    },
    methods: {
        async checkPermissions() {
            const permissions = await checkMultiplePermissions([
                'ADMIN_DETAIL'
            ]);
            
            this.permissions = {
                canView: permissions.ADMIN_DETAIL || false
            };

            if (!this.permissions.canView) {
                toaster.error('Bạn không có quyền xem thông tin tài khoản admin');
                this.$router.push('/admin');
            }
        },
        checkLoginStatus() {
            const adminInfo = JSON.parse(localStorage.getItem('admin_info'));
            const token = localStorage.getItem('token_admin');
            this.isLoggedIn = !!(adminInfo && token);
            
            if (this.isLoggedIn) {
                this.loadAdminProfile(adminInfo.id);
            }
        },
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).format(date);
        },
        async loadAdminProfile(adminId) {
            try {
                const token = localStorage.getItem('token_admin');
                const response = await axios.get(`/api/admin/quan-tri-vien/${adminId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.data.status) {
                    this.adminInfo = response.data.data;
                } else {
                    toaster.error(response.data.message || 'Có lỗi xảy ra khi tải thông tin quản trị viên');
                }
            } catch (error) {
                console.error('Lỗi khi tải thông tin quản trị viên:', error);
                toaster.error(error.response?.data?.message || 'Có lỗi xảy ra khi tải thông tin quản trị viên');
            }
        }
    }
}
</script>

<style scoped>
.account-info-page {
    background-color: #f8f9fa;
    min-height: 100vh;
    padding: 20px 0;
}

.container {
    max-width: 1000px;
    margin: 0 auto;
}

.page-header {
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    margin-bottom: 30px;
}

.header-content {
    text-align: left;
}

.page-title {
    font-size: 1.8rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
}

.page-title i {
    color: #4CAF50;
    margin-right: 10px;
}

.page-description {
    color: #6c757d;
    font-size: 1rem;
    margin: 0;
}

.login-required {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
}

.login-card {
    background: white;
    border-radius: 15px;
    padding: 40px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    max-width: 400px;
    width: 100%;
}

.login-card i {
    font-size: 4rem;
    color: #4CAF50;
    margin-bottom: 1.5rem;
}

.login-card h3 {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
}

.login-card p {
    color: #6c757d;
    margin-bottom: 2rem;
}

.btn-primary {
    background-color: #4CAF50;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background-color: #45a049;
    transform: translateY(-1px);
}

.account-info-container {
    max-width: 800px;
    margin: 0 auto;
}

.info-section {
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    padding-bottom: 30px;
    border-bottom: 1px solid #eee;
}

.avatar-section {
    position: relative;
    margin-right: 30px;
}

.avatar {
    width: 100px;
    height: 100px;
    background: #e9ecef;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #4CAF50;
}

.avatar i {
    font-size: 2.5rem;
    color: #4CAF50;
}

.user-status {
    position: absolute;
    bottom: 0;
    right: 0;
    background: #dc3545;
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 500;
}

.user-status.active {
    background: #4CAF50;
}

.basic-info {
    flex: 1;
}

.basic-info h3 {
    font-size: 1.8rem;
    color: #2c3e50;
    margin-bottom: 10px;
    font-weight: 600;
}

.role-badge {
    background: #e9ecef;
    color: #495057;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
}

.info-item {
    padding: 20px;
    background: #f8f9fa;
    border-radius: 10px;
    transition: all 0.3s ease;
}

.info-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.info-label {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    color: #6c757d;
}

.info-label i {
    margin-right: 10px;
    color: #4CAF50;
    width: 20px;
}

.info-value {
    color: #2c3e50;
    font-weight: 500;
    font-size: 1.1rem;
}

@media (max-width: 768px) {
    .profile-header {
        flex-direction: column;
        text-align: center;
    }

    .avatar-section {
        margin-right: 0;
        margin-bottom: 20px;
    }

    .info-grid {
        grid-template-columns: 1fr;
    }
}
</style>
