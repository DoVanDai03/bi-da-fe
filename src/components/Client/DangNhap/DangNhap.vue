<template>
    <div class="container">
        <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-2">
            <div class="col mx-auto">
                <div class="my-4 text-center">
                    <img src="assets/images/logo-img.png" width="180" alt="">
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="border p-4 rounded">
                            <div class="text-center">
                                <h3 class="">Đăng nhập</h3>
                                <p>Bạn chưa có tài khoản? <a href="">
                                    <router-link to="/dang-ky">Đăng ký tại đây</router-link>
                                </a>
                                </p>
                            </div>
                            <div class="form-body">
                                <form class="row g-3">
                                    <div class="col-12">
                                        <label for="inputEmailAddress" class="form-label">Email Address</label>
                                        <input v-model="data_dang_nhap.email" type="email" class="form-control" placeholder="example@user.com">
                                    </div>
                                    <div class="col-12">
                                        <label for="inputChoosePassword" class="form-label">Password</label>
                                        <div class="input-group" id="show_hide_password">
                                            <input v-model="data_dang_nhap.password" type="password" class="form-control border-end-0"
                                                placeholder="Enter Password">
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="d-grid">
                                            <button v-on:click.prevent="dangKy" class="btn btn-primary"><i class="bx bx-user"></i>Sign
                                                up</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--end row-->
    </div>
</template>
<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
export default {
    data() {
        return {
            data_dang_nhap: {},
        }
    },
    mounted() {

    },
    methods: {
        dangKy() {
            axios
                .post('/api/dang-nhap', this.data_dang_nhap)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.data_dang_nhap = {}; // reset form after successful registration
                        this.$router.push("/home-page");
                    } else {
                        toaster.error(res.data.message);
                    }
                })
        }

    },
}
</script>
<style></style>