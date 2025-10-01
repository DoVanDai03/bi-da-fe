<template>
    <div class="wrapper fashion-bg">
        <div class="section-authentication-signin auth-layer d-flex align-items-center justify-content-center py-5 py-lg-0">
            <div class="container-fluid">
                <div class="row row-cols-1">
                    <div class="col mx-auto" style="max-width: 460px;">
                        <div class="mb-4 text-center brand-wrap">
                            <img src="https://xbilliard.vn/wp-content/uploads/2025/02/cropped-Artboard-1-copy-2-1536x932.png" width="160" alt="" />
                        </div>
                        <div class="card glass-card">
                            <div class="card-body p-0">
                                <div class="p-4 p-md-5 rounded">
                                    <div class="text-center mb-3">
                                        <h3 class="title">Đăng nhập</h3>
                                        <p class="subtitle">Chưa có tài khoản? <router-link class="link-underline" to="/dang-ky">Đăng ký ngay</router-link></p>
                                    </div>
                                    <div class="form-body">
                                        <form class="row g-3" @submit.prevent="dangNhap">
                                            <div class="col-12">
                                                <label for="inputEmailAddress" class="form-label">Email</label>
                                                <div class="input-with-icon">
                                                    <i class='bx bx-envelope'></i>
                                                    <input v-model="dang_nhap.email" type="email" class="form-control fashion-input" id="inputEmailAddress" placeholder="email@domain.com" required>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <label for="inputChoosePassword" class="form-label">Mật khẩu</label>
                                                <div class="input-group fashion-input-group" id="show_hide_password">
                                                    <span class="input-group-text bg-transparent border-0 icon-left"><i class='bx bx-lock'></i></span>
                                                    <input v-model="dang_nhap.password" type="password" class="form-control border-0 fashion-input" id="inputChoosePassword" placeholder="Nhập mật khẩu" required>
                                                    <a href="javascript:;" class="input-group-text bg-transparent fashion-toggle"><i class='bx bx-hide'></i></a>
                                                </div>
                                            </div>
                                            <div class="col-12 text-end">
                                                <router-link class="link-underline" to="/quen-mat-khau">Quên mật khẩu?</router-link>
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
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
import axios from "axios";

export default {
    data() {
        return {
            dang_nhap: {
                email: "",
                password: "",
            },
            loading: false
        };
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
            const token = localStorage.getItem('token_khach_hang');
            if (token) {
                axios.get('/api/user/kiem-tra-token', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => {
                    if (res.data.status) {
                        this.$router.push('/home-page');
                    } else {
                        localStorage.removeItem('token_khach_hang');
                        this.$router.push('/dang-nhap');
                    }
                })
                .catch(() => {
                    localStorage.removeItem('token_khach_hang');
                });
            }
        },
        dangNhap() {          
            console.log("Dữ liệu gửi lên:", this.dang_nhap);
            axios
                .post("/api/dang-nhap", this.dang_nhap)
                .then((res) => {
                    console.log("Response từ server:", res.data);
                    if (res.data.status == true) {
                        // Lưu token và thông tin người dùng
                        localStorage.setItem("token_khach_hang", res.data.token);
                        localStorage.setItem("user_info", JSON.stringify(res.data.user));
                        
                        console.log("Đã lưu token:", localStorage.getItem("token_khach_hang"));
                        console.log("Đã lưu user info:", localStorage.getItem("user_info"));
                        
                        // Cập nhật state
                        this.$root.$emit('login-success');
                        
                        toaster.success(res.data.message);
                        
                        // Force reload MenuClient component
                        this.$nextTick(() => {
                            window.dispatchEvent(new Event('storage'));
                            setTimeout(() => {
                                this.$router.push("/home-page");
                            }, 500);
                        });
                    } else {
                        toaster.error(res.data.message || "Đăng nhập thất bại!");
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        // Server trả về lỗi
                        toaster.error(error.response.data.message || "Đăng nhập thất bại!");
                    } else if (error.request) {
                        // Không nhận được response
                        toaster.error("Không thể kết nối đến server!");
                    } else {
                        // Lỗi khi tạo request
                        toaster.error("Đã có lỗi xảy ra khi đăng nhập!");
                    }
                });
        },
    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;600&display=swap');
.wrapper { min-height: 100vh; }
.fashion-bg {
    background-image: linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.65)),
                      url('https://xbilliard.vn/wp-content/uploads/2025/07/313-web.jpg');
    background-size: cover; background-position: center; color: #eaeaea; position: relative;
}
.auth-layer { backdrop-filter: blur(0px); }
.brand-wrap img { filter: drop-shadow(0 6px 18px rgba(0,0,0,0.35)); }
.glass-card { border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.06); box-shadow: 0 20px 50px rgba(0,0,0,0.35); border-radius: 16px; backdrop-filter: blur(14px); }
.title { font-family: 'Playfair Display', Georgia, 'Times New Roman', serif; font-weight: 700; letter-spacing: .6px; color: #fff; }
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
</style>