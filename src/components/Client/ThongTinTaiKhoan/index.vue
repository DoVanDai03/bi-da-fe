<template>
    <div class="account-info-page">
        <div class="container py-4">
            <div class="page-header mb-4">
                <h2 class="page-title">Thông tin tài khoản</h2>
                <p class="page-description">Quản lý thông tin cá nhân và bảo mật tài khoản</p>
            </div>

            <div v-if="!isLoggedIn" class="login-required">
                <i class="fas fa-user-lock"></i>
                <p>Vui lòng đăng nhập để xem thông tin tài khoản</p>
                <router-link to="/dang-nhap" class="btn btn-primary">
                    <i class="fas fa-sign-in-alt"></i>
                    Đăng nhập
                </router-link>
            </div>

            <template v-else>
                <div class="account-info-container">
                    <!-- Thông tin cá nhân -->
                    <div class="info-section">
                        <div class="section-header">
                            <h3>Thông tin cá nhân</h3>
                            <button class="btn btn-edit" @click="toggleEditMode('profile')">
                                <i class="fas" :class="isEditingProfile ? 'fa-times' : 'fa-edit'"></i>
                                {{ isEditingProfile ? 'Hủy' : 'Chỉnh sửa' }}
                            </button>
                        </div>

                        <div class="info-form">
                            <div class="form-group">
                                <label>Họ và tên</label>
                                <input type="text" v-model="userInfo.hoVaTen" :disabled="!isEditingProfile">
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" v-model="userInfo.email" disabled>
                            </div>
                            <div class="form-group">
                                <label>Số điện thoại</label>
                                <input type="tel" v-model="userInfo.sdt" :disabled="!isEditingProfile">
                            </div>
                            <div class="form-group">
                                <label>Địa chỉ</label>
                                <textarea v-model="userInfo.diaChi" :disabled="!isEditingProfile" rows="3"></textarea>
                            </div>
                            <div class="form-group">
                                <label>Ngày sinh</label>
                                <input type="date" v-model="userInfo.ngaySinh" :disabled="!isEditingProfile">
                            </div>
                            <div class="form-group">
                                <label>Giới tính</label>
                                <select v-model="userInfo.gioiTinh" :disabled="!isEditingProfile">
                                    <option value="NAM">Nam</option>
                                    <option value="NU">Nữ</option>
                                    <option value="KHAC">Khác</option>
                                </select>
                            </div>

                            <div class="form-actions" v-if="isEditingProfile">
                                <button class="btn btn-primary" @click="updateProfile">
                                    <i class="fas fa-save"></i>
                                    Lưu thay đổi
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Thay đổi mật khẩu -->
                    <div class="info-section">
                        <div class="section-header">
                            <h3>Thay đổi mật khẩu</h3>
                            <button class="btn btn-edit" @click="toggleEditMode('password')">
                                <i class="fas" :class="isEditingPassword ? 'fa-times' : 'fa-key'"></i>
                                {{ isEditingPassword ? 'Hủy' : 'Đổi mật khẩu' }}
                            </button>
                        </div>

                        <div class="info-form" v-if="isEditingPassword">
                            <div class="form-group">
                                <label>Mật khẩu hiện tại</label>
                                <input type="password" v-model="password.currentPassword">
                            </div>
                            <div class="form-group">
                                <label>Mật khẩu mới</label>
                                <input type="password" v-model="password.newPassword">
                            </div>
                            <div class="form-group">
                                <label>Xác nhận mật khẩu mới</label>
                                <input type="password" v-model="password.confirmPassword">
                            </div>

                            <div class="form-actions">
                                <button class="btn btn-primary" @click="changePassword">
                                    <i class="fas fa-save"></i>
                                    Cập nhật mật khẩu
                                </button>
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

export default {
    name: 'ThongTinTaiKhoan',
    data() {
        return {
            isLoggedIn: false,
            isEditingProfile: false,
            isEditingPassword: false,
            userInfo: {
                id: null,
                email: '',
                hoVaTen: '',
                sdt: '',
                diaChi: '',
                ngaySinh: '',
                gioiTinh: ''
            },
            password: {
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }
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
                this.loadUserProfile(userInfo.id);
            }
        },
        async loadUserProfile(userId) {
            try {
                const token = localStorage.getItem('token_khach_hang');
                const response = await axios.get(`/api/user/profile/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.data.status) {
                    // Format lại ngày sinh từ ISO string sang yyyy-mm-dd
                    const userData = { ...response.data.data };
                    if (userData.ngaySinh) {
                        const date = new Date(userData.ngaySinh);
                        userData.ngaySinh = date.toISOString().split('T')[0];
                    }
                    this.userInfo = userData;
                } else {
                    toaster.error(response.data.message || 'Có lỗi xảy ra khi tải thông tin người dùng');
                }
            } catch (error) {
                console.error('Lỗi khi tải thông tin người dùng:', error);
                toaster.error(error.response?.data?.message || 'Có lỗi xảy ra khi tải thông tin người dùng');
            }
        },
        toggleEditMode(mode) {
            if (mode === 'profile') {
                this.isEditingProfile = !this.isEditingProfile;
                if (!this.isEditingProfile) {
                    // Reset form khi hủy chỉnh sửa
                    this.loadUserProfile(this.userInfo.id);
                }
            } else if (mode === 'password') {
                this.isEditingPassword = !this.isEditingPassword;
                if (!this.isEditingPassword) {
                    // Reset form khi hủy đổi mật khẩu
                    this.password = {
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    };
                }
            }
        },
        async updateProfile() {
            try {
                const token = localStorage.getItem('token_khach_hang');
                
                // Format lại ngày sinh nếu có
                let formattedNgaySinh = this.userInfo.ngaySinh;
                if (formattedNgaySinh) {
                    // Chuyển đổi từ format yyyy-mm-dd sang ISO string
                    const date = new Date(formattedNgaySinh);
                    formattedNgaySinh = date.toISOString();
                }

                const userDto = {
                    hoVaTen: this.userInfo.hoVaTen,
                    sdt: this.userInfo.sdt,
                    diaChi: this.userInfo.diaChi,
                    ngaySinh: formattedNgaySinh,
                    gioiTinh: this.userInfo.gioiTinh
                };

                // Log dữ liệu trước khi gửi
                console.log('Dữ liệu gửi đi:', userDto);

                const response = await axios.put(`/api/user/profile/${this.userInfo.id}`, userDto, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                console.log('Response từ server:', response.data);

                if (response.data.status) {
                    toaster.success(response.data.message || 'Cập nhật thông tin thành công');
                    // Cập nhật lại thông tin người dùng
                    await this.loadUserProfile(this.userInfo.id);
                    this.isEditingProfile = false;
                } else {
                    toaster.error(response.data.message || 'Có lỗi xảy ra khi cập nhật thông tin');
                }
            } catch (error) {
                console.error('Lỗi khi cập nhật thông tin:', error);
                console.error('Chi tiết lỗi:', error.response?.data);
                toaster.error(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin');
            }
        },
        async changePassword() {
            if (this.password.newPassword !== this.password.confirmPassword) {
                toaster.error('Mật khẩu mới không khớp');
                return;
            }

            if (!this.password.currentPassword || !this.password.newPassword) {
                toaster.error('Mật khẩu hiện tại và mật khẩu mới không được để trống');
                return;
            }

            try {
                const token = localStorage.getItem('token_khach_hang');
                const response = await axios.post(`/api/user/change-password/${this.userInfo.id}`, {
                    currentPassword: this.password.currentPassword,
                    newPassword: this.password.newPassword
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.data.status) {
                    toaster.success(response.data.message || 'Đổi mật khẩu thành công');
                    this.isEditingPassword = false;
                    this.password = {
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    };
                } else {
                    toaster.error(response.data.message || 'Có lỗi xảy ra khi đổi mật khẩu');
                }
            } catch (error) {
                console.error('Lỗi khi đổi mật khẩu:', error);
                toaster.error(error.response?.data?.message || 'Có lỗi xảy ra khi đổi mật khẩu');
            }
        }
    }
}
</script>

<style scoped>
.account-info-page {
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

.account-info-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.info-section {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
    overflow: hidden;
}

.section-header {
    padding: 1.5rem;
    background: #f8f9fa;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.section-header h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
    margin: 0;
}

.info-form {
    padding: 1.5rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #666;
    font-weight: 500;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
    border-color: #1976d2;
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
    outline: none;
}

.form-group input:disabled,
.form-group textarea:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
}

.form-group select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background-color: white;
}

.form-group select:focus {
    border-color: #1976d2;
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
    outline: none;
}

.form-group select:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
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
    border: none;
    cursor: pointer;
}

.btn-primary {
    background: #1976d2;
    color: white;
}

.btn-primary:hover {
    background: #1565c0;
    transform: translateY(-2px);
}

.btn-edit {
    background: transparent;
    color: #1976d2;
    border: 1px solid #1976d2;
}

.btn-edit:hover {
    background: #1976d2;
    color: white;
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .section-header {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
    }

    .form-actions {
        flex-direction: column;
    }

    .btn {
        width: 100%;
        justify-content: center;
    }
}
</style>
