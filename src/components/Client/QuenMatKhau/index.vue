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
                                        <form class="row g-3" @submit.prevent="handleSubmit">
                                            <!-- Email Input -->
                                            <div class="col-12">
                                                <label for="email" class="form-label">Email</label>
                                                <div class="input-with-icon">
                                                    <i class='bx bx-envelope'></i>
                                                    <input v-model="email" type="email" class="form-control fashion-input" id="email"
                                                         placeholder="Nhập email của bạn" required>
                                                </div>
                                            </div>
                                            
                                            <!-- Submit Button -->
                                            <div class="col-12 mt-2">
                                                <div class="d-grid">
                                                    <button type="submit" class="btn btn-fashion" :disabled="dangGui">
                                                        <span v-if="dangGui"><i class="fas fa-spinner fa-spin me-2"></i>Đang xử lý...</span>
                                                        <span v-else><i class="fas fa-paper-plane me-2"></i>Gửi yêu cầu đặt lại mật khẩu</span>
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <!-- Back to Login Link -->
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

export default {
    name: "QuenMatKhau",
    data() {
        return {
            email: "",
            dangGui: false
        };
    },
    mounted() {
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
        
        
        // Gửi yêu cầu reset password
        async sendForgotPasswordRequest() {
            try {
                const response = await axios.post('/api/auth/forgot-password', {
                    email: this.email
                });
                
                if (response.data.status) {
                    toaster.success(response.data.message);
                    toaster.info('Vui lòng kiểm tra email và click vào link để đặt lại mật khẩu');
                } else {
                    toaster.error(response.data.message);
                }
            } catch (error) {
                console.error('Lỗi gửi yêu cầu reset password:', error);
                const errorMessage = error.response?.data?.message || 'Không thể gửi yêu cầu reset password';
                toaster.error(errorMessage);
            }
        },
        
        
        // Xử lý submit form
        async handleSubmit() {
            this.dangGui = true;
            
            try {
                await this.sendForgotPasswordRequest();
            } catch (error) {
                console.error('Lỗi xử lý:', error);
                toaster.error('Đã xảy ra lỗi, vui lòng thử lại');
            } finally {
                this.dangGui = false;
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
/* Force white placeholder across browsers */
.fashion-input::placeholder { color: #ffffff !important; opacity: 1; }
.fashion-input::-webkit-input-placeholder { color: #ffffff !important; opacity: 1; }
.fashion-input:-ms-input-placeholder { color: #ffffff !important; opacity: 1; }
.fashion-input::-ms-input-placeholder { color: #ffffff !important; opacity: 1; }
.fashion-input::-moz-placeholder { color: #ffffff !important; opacity: 1; }
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

/* Ensure form labels are white for contrast on dark background */
.form-label { color: #ffffff; }
</style>