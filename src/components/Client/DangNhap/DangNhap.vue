<template>
    <div class="wrapper">
        <div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
            <div class="container-fluid">
                <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                    <div class="col mx-auto">
                        <div class="mb-4 text-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FPT_logo_2010.svg/1200px-FPT_logo_2010.svg.png" width="180" alt="" />
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <div class="border p-4 rounded">
                                    <div class="text-center">
                                        <h3 class="">Đăng nhập</h3>
                                        <p>Chưa có tài khoản? 
                                            <router-link to="/dang-ky">Đăng ký ngay</router-link>
                                        </p>
                                    </div>
                                    <div class="form-body">
                                        <form class="row g-3" @submit.prevent="dangNhap">
                                            <div class="col-12">
                                                <label for="inputEmailAddress" class="form-label">Email</label>
                                                <input v-model="dang_nhap.email" type="email" class="form-control" id="inputEmailAddress" placeholder="Email" required>
                                            </div>
                                            <div class="col-12">
                                                <label for="inputChoosePassword" class="form-label">Mật khẩu</label>
                                                <div class="input-group" id="show_hide_password">
                                                    <input v-model="dang_nhap.password" type="password" class="form-control border-end-0" id="inputChoosePassword" placeholder="Nhập mật khẩu" required>
                                                    <a href="javascript:;" class="input-group-text bg-transparent"><i class='bx bx-hide'></i></a>
                                                </div>
                                            </div>
                                            <div class="col-12 text-end">
                                                <router-link to="/quen-mat-khau">Quên mật khẩu?</router-link>
                                            </div>
                                            <div class="col-12">
                                                <div class="d-grid">
                                                    <button type="submit" class="btn btn-primary"><i class="bx bxs-lock-open me-2"></i>Đăng nhập</button>
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
                axios.get('/api/kiem-tra-token', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => {
                    if (res.data.status) {
                        this.$router.push('/home-page');
                    } else {
                        localStorage.removeItem('token_khach_hang');
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

.input-group-text {
    cursor: pointer;
}

.wrapper {
    min-height: 100vh;
    background: linear-gradient(135deg, #007bff 0%, #1976d2 100%);
}
</style>