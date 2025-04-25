<template>
    <div class="wrapper">
        <div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
            <div class="container-fluid">
                <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                    <div class="col mx-auto">
                        <div class="mb-4 text-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FPT_logo_2010.svg/1200px-FPT_logo_2010.svg.png"
                                width="180" alt="" />
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <div class="border p-4 rounded">
                                    <div class="text-center">
                                        <h3 class="">Quên mật khẩu</h3>
                                        <p>Vui lòng nhập email đã đăng ký của bạn</p>
                                    </div>
                                    <div class="form-body">
                                        <form class="row g-3" @submit.prevent="guiYeuCauQuenMatKhau">
                                            <div class="col-12">
                                                <label for="email" class="form-label">Email</label>
                                                <input v-model="email" type="email" class="form-control" id="email"
                                                    placeholder="Nhập email đã đăng ký" required>
                                            </div>
                                            <div class="col-12" v-if="showCodeInput">
                                                <label for="verificationCode" class="form-label">Mã xác nhận</label>
                                                <input v-model="verificationCode" type="text" class="form-control"
                                                    id="verificationCode" placeholder="Nhập mã xác nhận" required>
                                                <small class="text-muted">Mã xác nhận đã được gửi đến email của bạn (Có
                                                    hiệu lực trong 15 phút)</small>
                                            </div>
                                            <div class="col-12" v-if="showNewPassword">
                                                <label for="newPassword" class="form-label">Mật khẩu mới</label>
                                                <div class="input-group" id="show_hide_password">
                                                    <input v-model="newPassword" type="password"
                                                        class="form-control border-end-0" id="newPassword"
                                                        placeholder="Nhập mật khẩu mới" required>
                                                    <a href="javascript:;" class="input-group-text bg-transparent"><i
                                                            class='bx bx-hide'></i></a>
                                                </div>
                                            </div>
                                            <div class="col-12" v-if="showNewPassword">
                                                <label for="confirmPassword" class="form-label">Xác nhận mật khẩu
                                                    mới</label>
                                                <div class="input-group" id="show_hide_password_confirm">
                                                    <input v-model="confirmPassword" type="password"
                                                        class="form-control border-end-0" id="confirmPassword"
                                                        placeholder="Xác nhận mật khẩu mới" required>
                                                    <a href="javascript:;" class="input-group-text bg-transparent"><i
                                                            class='bx bx-hide'></i></a>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="d-grid">
                                                    <button type="button" class="btn btn-primary" :disabled="dangGui"
                                                        @click="guiYeuCauQuenMatKhau" v-if="!showNewPassword">
                                                        <span v-if="dangGui">
                                                            <i class="fas fa-spinner fa-spin me-2"></i>Đang gửi...
                                                        </span>
                                                        <span v-else>
                                                            <i class="fas fa-paper-plane me-2"></i>{{ showCodeInput ?
                                                            'Xác nhận mã' : 'Gửi mã xác nhận' }}
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-12" v-if="showNewPassword">
                                                <div class="d-grid">
                                                    <button type="button" class="btn btn-success" :disabled="dangGui"
                                                        @click="doiMatKhau">
                                                        <span v-if="dangGui">
                                                            <i class="fas fa-spinner fa-spin me-2"></i>Đang xử lý...
                                                        </span>
                                                        <span v-else>
                                                            <i class="fas fa-key me-2"></i>Đổi mật khẩu
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-12 text-center">
                                                <router-link to="/dang-nhap">Quay lại đăng nhập</router-link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
import axios from "axios";
import emailjs from '@emailjs/browser';

export default {
    name: "QuenMatKhau",
    data() {
        return {
            email: "",
            verificationCode: "",
            generatedCode: "",
            dangGui: false,
            showCodeInput: false,
            showNewPassword: false,
            newPassword: "",
            confirmPassword: "",
            emailjsConfig: {
                serviceId: 'service_f72rlbq',
                templateId: 'template_sckr3qo',
                publicKey: 'owjsVUUNtDXnQNNJm'
            }
        };
    },
    mounted() {
        // Initialize EmailJS with your public key
        emailjs.init(this.emailjsConfig.publicKey);
    },
    methods: {
        generateVerificationCode() {
            return Math.floor(100000 + Math.random() * 900000).toString();
        },
        async sendVerificationEmail() {
            try {
                // Kiểm tra email trước khi gửi
                if (!this.email || !this.email.includes('@')) {
                    toaster.error('Vui lòng nhập email hợp lệ');
                    return false;
                }

                const now = new Date();
                const expiry = new Date(now.getTime() + 15 * 60000); // +15 phút
                const expiryTime = expiry.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                this.generatedCode = this.generateVerificationCode();
                const templateParams = {
                    to_email: this.email,
                    passcode: this.generatedCode,
                    time: expiryTime
                };

                const result = await emailjs.send(
                    this.emailjsConfig.serviceId,
                    this.emailjsConfig.templateId,
                    templateParams
                );

                if (result.status === 200) {
                    console.log('SUCCESS!', result.status, result.text);
                    return true;
                } else {
                    console.error('FAILED...', result.status, result.text);
                    toaster.error('Không thể gửi email. Vui lòng thử lại sau.');
                    return false;
                }
            } catch (error) {
                console.error('Lỗi khi gửi email:', error);
                toaster.error('Không thể gửi email xác nhận. Vui lòng thử lại sau.');
                return false;
            }
        },
        async guiYeuCauQuenMatKhau() {
            this.dangGui = true;

            try {
                if (!this.email.includes('@')) {
                    toaster.error('Vui lòng nhập email hợp lệ');
                    return;
                }

                if (!this.showCodeInput) {
                    const thanhCong = await this.sendVerificationEmail();
                    if (thanhCong) {
                        this.showCodeInput = true;
                        toaster.success('Mã xác nhận đã được gửi đến email của bạn');
                    } else {
                        toaster.error('Không thể gửi mã xác nhận. Vui lòng thử lại sau.');
                    }
                } else {
                    if (this.verificationCode === this.generatedCode) {
                        this.showNewPassword = true;
                        toaster.success('Mã xác nhận đúng. Vui lòng nhập mật khẩu mới');
                    } else {
                        toaster.error('Mã xác nhận không đúng');
                    }
                }
            } catch (error) {
                console.error('Lỗi:', error);
                toaster.error('Đã xảy ra lỗi, vui lòng thử lại');
            } finally {
                this.dangGui = false;
            }
        },
        async doiMatKhau() {
            if (this.newPassword !== this.confirmPassword) {
                toaster.error("Mật khẩu xác nhận không khớp");
                return;
            }
            else {
                this.dangGui = true;
                try {
                    const response = await axios.post('/api/quen-mat-khau/doi-mat-khau', {
                        email: this.email,
                        newPassword: this.newPassword
                    });

                    if (response.data.status) {
                        toaster.success('Đổi mật khẩu thành công');
                        this.$router.push('/dang-nhap');
                    } else {
                        toaster.error(error.response.data.message || 'Đổi mật khẩu thất bại' || error.response.data.errors);
                    }
                }
                catch (error) {
                    console.error('Lỗi:', error);
                    const errors = error.response?.data?.errors;
                    if (Array.isArray(errors)) {
                        errors.forEach(err => toaster.error(err));
                    } else {
                        toaster.error(error.response?.data?.message || 'Đổi mật khẩu thất bại');
                    }
                }

                finally {
                    this.dangGui = false;
                }
            }
        }
    }
};
</script>

<style scoped>
.card {
    border: none;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.card-body {
    padding: 0;
}

.border {
    border-radius: 8px;
}

.btn-primary {
    background-color: #ff4444;
    border-color: #ff4444;
    padding: 10px;
    font-weight: 600;
    letter-spacing: 0.5px;
}

.btn-primary:hover {
    background-color: #ff2222;
    border-color: #ff2222;
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(255, 68, 68, 0.2);
    transition: all 0.3s ease;
}

.form-control {
    padding: 10px 15px;
    height: auto;
}

.form-control:focus {
    box-shadow: 0 0 0 0.25rem rgba(255, 68, 68, 0.25);
    border-color: #ff4444;
}

.wrapper {
    min-height: 100vh;
    background: linear-gradient(135deg, #007bff 0%, #1976d2 100%);
}

/* Loading spinner */
.fa-spinner {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

a {
    color: #ff4444;
    text-decoration: none;
    transition: color 0.3s;
}

a:hover {
    color: #ff2222;
}
</style>