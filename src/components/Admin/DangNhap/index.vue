<template>
    <div class="wrapper fashion-bg">
        <div class="auth-layer d-flex align-items-center justify-content-center py-5 py-lg-0">
            <div class="container-fluid">
                <div class="row row-cols-1">
                    <div class="col mx-auto" style="max-width: 460px;">
                        <div class="text-center mb-4 brand-wrap">
                            <img src="https://xbilliard.vn/wp-content/uploads/2025/02/cropped-Artboard-1-copy-2-1536x932.png" width="160" alt="Logo" />
                            <div class="brand-tagline">F/W COLLECTION • ADMIN CONSOLE</div>
                        </div>
                        <div class="card glass-card">
                            <div class="card-body p-0">
                                <div class="p-4 p-md-5 rounded">
                                    <div class="text-center mb-3">
                                        <h3 class="title">Đăng nhập Quản trị</h3>
                                    </div>
                                    <div class="form-body">
                                        <form class="row g-3" @submit.prevent="dangNhap">
                                            <div class="col-12">
                                                <label for="inputEmailAddress" class="form-label">Email</label>
                                                <div class="input-with-icon">
                                                    <i class='bx bx-envelope'></i>
                                                    <input v-model="admin.email" type="email" class="form-control fashion-input" id="inputEmailAddress" placeholder="email@domain.com" required>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <label for="inputChoosePassword" class="form-label">Mật khẩu</label>
                                                <div class="input-group fashion-input-group" id="show_hide_password">
                                                    <span class="input-group-text bg-transparent border-0 icon-left"><i class='bx bx-lock'></i></span>
                                                    <input v-model="admin.password" type="password" class="form-control border-0 fashion-input" id="inputChoosePassword" placeholder="Nhập mật khẩu" required>
                                                    <a href="javascript:;" class="input-group-text bg-transparent fashion-toggle"><i class='bx bx-hide'></i></a>
                                                </div>
                                            </div>
                                            <div class="col-12 mt-2">
                                                <div class="d-grid">
                                                    <button type="submit" class="btn btn-fashion"><span class="shimmer"></span><i class="bx bxs-lock-open me-2"></i>Đăng nhập</button>
                                                </div>
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
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
    data() {
        return {
            admin: {
                email: '',
                password: ''
            }
        }
    },
    mounted() {
        this.kiemTraDangNhap();
        this.setupPasswordToggle();
    },
    methods: {
        setupPasswordToggle() {
            setTimeout(() => {
                const passwordToggle = document.querySelector('#show_hide_password a');
                if (passwordToggle) {
                    passwordToggle.addEventListener('click', (e) => {
                        e.preventDefault();
                        const passwordInput = document.querySelector('#inputChoosePassword');
                        const icon = passwordToggle.querySelector('i');
                        if (!passwordInput || !icon) return;
                        if (passwordInput.type === 'text') {
                            passwordInput.type = 'password';
                            icon.classList.remove('bx-show');
                            icon.classList.add('bx-hide');
                        } else {
                            passwordInput.type = 'text';
                            icon.classList.remove('bx-hide');
                            icon.classList.add('bx-show');
                        }
                    });
                }
            }, 100);
        },
        kiemTraDangNhap() {
            const token = localStorage.getItem('token_admin');
            if (token) {
                axios.get('/api/admin/kiem-tra-token')
                    .then(res => {
                        if (res.data.status) {
                            this.$router.push('/admin/thuong-hieu');
                        } else {
                            localStorage.removeItem('token_admin');
                            localStorage.removeItem('admin_info');
                        }
                    })
                    .catch(() => {
                        localStorage.removeItem('token_admin');
                        localStorage.removeItem('admin_info');
                        this.$router.push("/admin/dang-nhap");

                    });
            }
        },
        dangNhap() {
            axios.post("/api/admin/dang-nhap", this.admin)
                .then((res) => {
                    console.log("Response từ server:", res.data);
                    if (res.data.status) {
                        // Lưu token và thông tin admin
                        localStorage.setItem("token_admin", res.data.token);
                        localStorage.setItem("admin_info", JSON.stringify(res.data.user || res.data.data));
                        
                        toaster.success("Đăng nhập thành công!");
                        this.$router.push("/admin/thuong-hieu");
                    } else {
                        toaster.error(res.data.message || "Đăng nhập thất bại!");
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        toaster.error(error.response.data.message || "Đăng nhập thất bại!");
                    } else if (error.request) {
                        toaster.error("Không thể kết nối đến server!");
                    } else {
                        toaster.error("Đã có lỗi xảy ra khi đăng nhập!");
                    }
                });
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;600&display=swap');
.wrapper {
    min-height: 100vh;
}

.fashion-bg {
    background-image: linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.65)),
                      url('https://xbilliard.vn/wp-content/uploads/2025/07/313-web.jpg');
    background-size: cover;
    background-position: center;
    color: #eaeaea;
    position: relative;
}

.auth-layer {
    backdrop-filter: blur(0px);
}

.brand-wrap img {
    filter: drop-shadow(0 6px 18px rgba(0,0,0,0.35));
}

.brand-tagline {
    margin-top: 6px;
    font-family: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 12px;
    letter-spacing: 3px;
    color: #d9d9d9;
}

.glass-card {
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.06);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
    border-radius: 16px;
    backdrop-filter: blur(14px);
}

.title {
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
    font-weight: 700;
    letter-spacing: 0.6px;
    color: #ffffff;
}

.subtitle {
    color: #cfcfcf;
    margin: 8px 0 0;
}

.link-underline {
    color: #f5d67b;
    text-decoration: none;
    border-bottom: 1px solid rgba(245, 214, 123, 0.4);
}

.fashion-input {
    padding: 12px 14px;
    height: auto;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(0, 0, 0, 0.3);
    color: #f1f1f1;
}

/* Force white placeholder across browsers */
.fashion-input::placeholder { color: #ffffff !important; opacity: 1; }
.fashion-input::-webkit-input-placeholder { color: #ffffff !important; opacity: 1; }
.fashion-input:-ms-input-placeholder { color: #ffffff !important; opacity: 1; }
.fashion-input::-ms-input-placeholder { color: #ffffff !important; opacity: 1; }
.fashion-input::-moz-placeholder { color: #ffffff !important; opacity: 1; }

.fashion-input:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(245, 214, 123, 0.15);
    border-color: rgba(245, 214, 123, 0.6);
}

.fashion-input-group {
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.15);
}

.fashion-input-group .input-group-text {
    cursor: pointer;
    border: none;
    color: #e0e0e0;
}

.input-with-icon {
    position: relative;
}
.input-with-icon i {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #cfcfcf;
    pointer-events: none;
}
.input-with-icon .fashion-input {
    padding-left: 40px;
}
.icon-left i { color: #cfcfcf; }

.btn-fashion {
    background: linear-gradient(135deg, #f5d67b 0%, #d4af37 100%);
    color: #222;
    border: none;
    padding: 12px 18px;
    font-weight: 700;
    letter-spacing: 0.4px;
    border-radius: 12px;
    transition: transform .2s ease, box-shadow .2s ease, filter .2s ease;
    position: relative;
    overflow: hidden;
}

.btn-fashion:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(212, 175, 55, 0.35);
    filter: brightness(1.03);
}

.btn-fashion .shimmer {
    position: absolute;
    top: 0;
    left: -50%;
    width: 50%;
    height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent);
    transform: skewX(-20deg);
    animation: shimmerAnim 2.4s infinite;
}

@keyframes shimmerAnim {
    0% { left: -60%; }
    60% { left: 120%; }
    100% { left: 120%; }
}

/* Ensure form labels are white for contrast on dark background */
.form-label { color: #ffffff; }
</style>
