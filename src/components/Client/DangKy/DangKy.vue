<template>
    <div class="wrapper">
        <div class="section-authentication-signup d-flex align-items-center justify-content-center my-5 my-lg-0">
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
                                        <h3 class="">Đăng ký tài khoản</h3>
                                        <p>Đã có tài khoản? 
                                            <router-link to="/dang-nhap" class="text-primary">Đăng nhập ngay</router-link>
                                        </p>
                                    </div>
                                    <div class="form-body">
                                        <form class="row g-3" @submit.prevent="dangKy">
                                            <div class="col-12">
                                                <label for="inputFullName" class="form-label">Họ và tên</label>
                                                <div class="input-group">
                                                    <span class="input-group-text bg-transparent">
                                                        <i class="bx bx-user"></i>
                                                    </span>
                                                    <input v-model="dang_ky.hoVaTen" type="text" class="form-control border-start-0" id="inputFullName" placeholder="Họ và tên" required>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <label for="inputEmailAddress" class="form-label">Email</label>
                                                <div class="input-group">
                                                    <span class="input-group-text bg-transparent">
                                                        <i class="bx bx-envelope"></i>
                                                    </span>
                                                    <input v-model="dang_ky.email" type="email" class="form-control border-start-0" id="inputEmailAddress" placeholder="Email" required>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <label for="inputPhone" class="form-label">Số điện thoại</label>
                                                <div class="input-group">
                                                    <span class="input-group-text bg-transparent">
                                                        <i class="bx bx-phone"></i>
                                                    </span>
                                                    <input v-model="dang_ky.sdt" type="tel" class="form-control border-start-0" id="inputPhone" placeholder="Số điện thoại" required>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <label for="inputChoosePassword" class="form-label">Mật khẩu</label>
                                                <div class="input-group" id="show_hide_password">
                                                    <span class="input-group-text bg-transparent">
                                                        <i class="bx bx-lock-alt"></i>
                                                    </span>
                                                    <input v-model="dang_ky.password" type="password" class="form-control border-start-0 border-end-0" id="inputChoosePassword" placeholder="Nhập mật khẩu" required>
                                                    <a href="javascript:;" class="input-group-text bg-transparent"><i class='bx bx-hide'></i></a>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <label for="inputConfirmPassword" class="form-label">Xác nhận mật khẩu</label>
                                                <div class="input-group" id="show_hide_confirm_password">
                                                    <span class="input-group-text bg-transparent">
                                                        <i class="bx bx-lock-alt"></i>
                                                    </span>
                                                    <input v-model="dang_ky.re_password" type="password" class="form-control border-start-0 border-end-0" id="inputConfirmPassword" placeholder="Nhập lại mật khẩu" required>
                                                    <a href="javascript:;" class="input-group-text bg-transparent"><i class='bx bx-hide'></i></a>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="d-grid">
                                                    <button type="submit" class="btn btn-primary"><i class="bx bx-user-plus me-2"></i>Đăng ký</button>
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
import axios from "axios";
const toaster = createToaster({ position: "top-right" });

export default {
    data() {
        return {
            dang_ky: {
                hoVaTen: "",
                email: "",
                sdt: "",
                password: "",
                re_password: ""
            },
        };
    },
    mounted() {
        this.setupPasswordToggles();
    },
    methods: {
        setupPasswordToggles() {
            setTimeout(() => {
                // Xử lý toggle cho mật khẩu
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
                
                // Xử lý toggle cho xác nhận mật khẩu
                const confirmPasswordToggle = document.querySelector('#show_hide_confirm_password a');
                if (confirmPasswordToggle) {
                    confirmPasswordToggle.addEventListener('click', (e) => {
                        e.preventDefault();
                        const confirmPasswordInput = document.querySelector('#inputConfirmPassword');
                        const icon = confirmPasswordToggle.querySelector('i');
                        
                        if (confirmPasswordInput.type === 'text') {
                            confirmPasswordInput.type = 'password';
                            icon.classList.remove('bx-show');
                            icon.classList.add('bx-hide');
                        } else {
                            confirmPasswordInput.type = 'text';
                            icon.classList.remove('bx-hide');
                            icon.classList.add('bx-show');
                        }
                    });
                }
            }, 100);
        },
        dangKy() {
            // Kiểm tra mật khẩu trùng khớp
            if (this.dang_ky.password !== this.dang_ky.re_password) {
                toaster.error("Mật khẩu xác nhận không khớp!");
                return;
            }
            
            axios
                .post("/api/dang-ky", this.dang_ky)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success("Đăng ký thành công!");
                        this.$router.push("/dang-nhap");
                    } else {
                        toaster.error(res.data.message || "Đăng ký thất bại!");
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        // Server trả về lỗi
                        toaster.error(error.response.data.errors || "Đăng ký thất bại!" || error.response.data.message);
                    } else if (error.request) {
                        // Không nhận được response
                        toaster.error("Không thể kết nối đến server!");
                    } else {
                        // Lỗi khi tạo request
                        toaster.error("Đã có lỗi xảy ra khi đăng ký!");
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