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
                                        <h3 class="">Đăng nhập Admin</h3>
                                        <p>Chưa có tài khoản? <a href="javascript:;">Liên hệ với quản trị viên</a>
                                        </p>
                                    </div>
                                    <div class="form-body">
                                        <form class="row g-3" @submit.prevent="dangNhap">
                                            <div class="col-12">
                                                <label for="inputEmailAddress" class="form-label">Email</label>
                                                <input v-model="admin.email" type="email" class="form-control" id="inputEmailAddress" placeholder="Email" required>
                                            </div>
                                            <div class="col-12">
                                                <label for="inputChoosePassword" class="form-label">Mật khẩu</label>
                                                <div class="input-group" id="show_hide_password">
                                                    <input v-model="admin.password" type="password" class="form-control border-end-0" id="inputChoosePassword" placeholder="Nhập mật khẩu" required>
                                                    <a href="javascript:;" class="input-group-text bg-transparent"><i class='bx bx-hide'></i></a>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
                                                    <label class="form-check-label" for="flexSwitchCheckChecked">Ghi nhớ đăng nhập</label>
                                                </div>
                                            </div>
                                            <div class="col-md-6 text-end">
                                                <a href="javascript:;">Quên mật khẩu?</a>
                                            </div>
                                            <div class="col-12">
                                                <div class="d-grid">
                                                    <button type="submit" class="btn btn-primary"><i class="bx bxs-lock-open"></i>Đăng nhập</button>
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
    },
    methods: {
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
