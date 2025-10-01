<template>
    <div class="wrapper fashion-bg">
        <div class="section-authentication-signin auth-layer d-flex align-items-center justify-content-center py-5 py-lg-0">
            <div class="container-fluid">
                <div class="row row-cols-1">
                    <div class="col mx-auto" style="max-width: 460px;">
                        <div class="mb-4 text-center brand-wrap">
                            <img src="https://theme.hstatic.net/200000000133/1001205759/14/logo.png?v=2279"
                                width="160" alt="" />
                        </div>
                        <div class="card glass-card">
                            <div class="card-body p-0">
                                <div class="p-4 p-md-5 rounded">
                                    <div class="text-center mb-3">
                                        <h3 class="title">Quên mật khẩu</h3>
                                        <p class="subtitle">Vui lòng nhập email đã đăng ký của bạn</p>
                                    </div>
                                    <div class="form-body">
                                        <form class="row g-3" @submit.prevent="guiYeuCauQuenMatKhau">
                                            <div class="col-12">
                                                <label for="email" class="form-label">Email</label>
                                                <div class="input-with-icon">
                                                    <i class='bx bx-envelope'></i>
                                                    <input v-model="email" type="email" class="form-control fashion-input" id="email"
                                                         required>
                                                </div>
                                            </div>
                                            <div class="col-12" v-if="showCodeInput">
                                                <label for="verificationCode" class="form-label">Mã xác nhận</label>
                                                <input v-model="verificationCode" type="text" class="form-control fashion-input"
                                                    id="verificationCode" placeholder="Nhập mã xác nhận" required>
                                                <small class="text-muted">Mã xác nhận đã được gửi đến email của bạn (Có hiệu lực trong 15 phút)</small>
                                            </div>
                                            <div class="col-12" v-if="showNewPassword">
                                                <label for="newPassword" class="form-label">Mật khẩu mới</label>
                                                <div class="input-group fashion-input-group" id="show_hide_password">
                                                    <span class="input-group-text bg-transparent border-0 icon-left"><i class='bx bx-lock'></i></span>
                                                    <input v-model="newPassword" type="password" class="form-control border-0 fashion-input" id="newPassword" placeholder="Nhập mật khẩu mới" required>
                                                    <a href="javascript:;" class="input-group-text bg-transparent fashion-toggle"><i class='bx bx-hide'></i></a>
                                                </div>
                                            </div>
                                            <div class="col-12" v-if="showNewPassword">
                                                <label for="confirmPassword" class="form-label">Xác nhận mật khẩu mới</label>
                                                <div class="input-group fashion-input-group" id="show_hide_password_confirm">
                                                    <span class="input-group-text bg-transparent border-0 icon-left"><i class='bx bx-lock-alt'></i></span>
                                                    <input v-model="confirmPassword" type="password" class="form-control border-0 fashion-input" id="confirmPassword" placeholder="Xác nhận mật khẩu mới" required>
                                                    <a href="javascript:;" class="input-group-text bg-transparent fashion-toggle"><i class='bx bx-hide'></i></a>
                                                </div>
                                            </div>
                                            <div class="col-12 mt-2" v-if="!showNewPassword">
                                                <div class="d-grid">
                                                    <button type="button" class="btn btn-fashion" :disabled="dangGui" @click="guiYeuCauQuenMatKhau">
                                                        <span v-if="dangGui"><i class="fas fa-spinner fa-spin me-2"></i>Đang gửi...</span>
                                                        <span v-else><i class="fas fa-paper-plane me-2"></i>{{ showCodeInput ? 'Xác nhận mã' : 'Gửi mã xác nhận' }}</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-12" v-if="showNewPassword">
                                                <div class="d-grid">
                                                    <button type="button" class="btn btn-fashion" :disabled="dangGui" @click="doiMatKhau">
                                                        <span v-if="dangGui"><i class="fas fa-spinner fa-spin me-2"></i>Đang xử lý...</span>
                                                        <span v-else><i class="fas fa-key me-2"></i>Đổi mật khẩu</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-12 text-end">
                                                <router-link class="link-underline" to="/dang-nhap">Quay lại đăng nhập</router-link>
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
        this.setupPasswordToggle();
    },
    methods: {
        setupPasswordToggle() {
            setTimeout(() => {
                const setupToggle = (groupSelector, inputSelector) => {
                    const toggle = document.querySelector(`${groupSelector} a`);
                    if (!toggle) return;
                    toggle.addEventListener('click', (e) => {
                        e.preventDefault();
                        const input = document.querySelector(inputSelector);
                        const icon = toggle.querySelector('i');
                        if (!input || !icon) return;
                        if (input.type === 'text') {
                            input.type = 'password';
                            icon.classList.remove('bx-show');
                            icon.classList.add('bx-hide');
                        } else {
                            input.type = 'text';
                            icon.classList.remove('bx-hide');
                            icon.classList.add('bx-show');
                        }
                    });
                };
                setupToggle('#show_hide_password', '#newPassword');
                setupToggle('#show_hide_password_confirm', '#confirmPassword');
            }, 100);
        },
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
                        toaster.error(response.data.message || 'Đổi mật khẩu thất bại');
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
.wrapper { min-height: 100vh; }
.fashion-bg {
    background-image: linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.65)),
                      url('https://xbilliard.vn/wp-content/uploads/2025/07/313-web.jpg');
    background-size: cover; background-position: center; color: #eaeaea; position: relative;
}
.auth-layer { backdrop-filter: blur(0px); }
.brand-wrap img { filter: drop-shadow(0 6px 18px rgba(0,0,0,0.35)); }
.glass-card { border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.06); box-shadow: 0 20px 50px rgba(0,0,0,0.35); border-radius: 16px; backdrop-filter: blur(14px); }
.title { font-weight: 700; letter-spacing: .6px; color: #fff; }
.subtitle { color: #cfcfcf; margin: 8px 0 0; }
.link-underline { color: #f5d67b; text-decoration: none; border-bottom: 1px solid rgba(245,214,123,.4); }
.fashion-input { padding: 12px 14px; height: auto; border-radius: 12px; border: 1px solid rgba(255,255,255,.15); background: rgba(0,0,0,.3); color: #f1f1f1; }
.fashion-input::placeholder { color: #9b9b9b; }
.fashion-input:focus { outline: none; box-shadow: 0 0 0 4px rgba(245,214,123,.15); border-color: rgba(245,214,123,.6); }
.fashion-input-group { border-radius: 12px; background: rgba(0,0,0,.3); border: 1px solid rgba(255,255,255,.15); }
.fashion-input-group .input-group-text { cursor: pointer; border: none; color: #e0e0e0; }
.input-with-icon { position: relative; }
.input-with-icon i { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #cfcfcf; pointer-events: none; }
.input-with-icon .fashion-input { padding-left: 40px; }
.icon-left i { color: #cfcfcf; }
.btn-fashion { background: linear-gradient(135deg, #f5d67b 0%, #d4af37 100%); color: #222; border: none; padding: 12px 18px; font-weight: 700; letter-spacing: .4px; border-radius: 12px; transition: transform .2s ease, box-shadow .2s ease, filter .2s ease; position: relative; overflow: hidden; }
.btn-fashion:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(212,175,55,.35); filter: brightness(1.03); }
.btn-fashion .shimmer { position: absolute; top: 0; left: -50%; width: 50%; height: 100%; background: linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent); transform: skewX(-20deg); animation: shimmerAnim 2.4s infinite; }
@keyframes shimmerAnim { 0% { left: -60%; } 60% { left: 120%; } 100% { left: 120%; } }
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

/* background handled by .fashion-bg */

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