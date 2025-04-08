<template>
    <div class="container">
        <div class="section-title">
            MÁY CHẠY BỘ ĐIỆN
        </div>
        <div id="sanpham" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="row g-4">
                        <template v-for="(value, index) in danh_sach_san_pham" :key="index">
                            <div v-if="value.danhMuc.id==9" class="col-12 col-sm-6 col-md-3">
                                <div class="product-card">
                                    <img :src="value.hinhAnh" class="card-img-top" :alt="value.tenSanPham">
                                    <div class="discount-badge" v-if="value.giamGia">
                                        <span class="badge">-{{ value.giamGia.phamTramGiamGia }}%</span>
                                        </div>
                                    <div class="view-details">
                                        <a @click="redirectToDetail(value.id)" href="javascript:void(0)">Xem chi tiết</a>
                                    </div>
                                    <div class="card-body">
                                        <h6 class="card-title">{{ value.tenSanPham }}</h6>
                                        <div class="product-details">
                                            <!-- <div class="specs">
                                                <span class="badge">Kích cỡ: {{ value.kichCo }}</span>
                                                <span class="badge">Màu sắc: {{ value.mauSac }}</span>
                                                <span class="badge">Chất liệu: {{ value.chatLieu }}</span>
                                            </div> -->
                                            <div class="price-section">
                                                <p class="stock-status" :class="value.soLuongTonKho > 0 ? 'text-success' : 'text-danger'">
                                                    <i class="bx bx-package"></i>
                                                    {{ value.soLuongTonKho > 0 ? 'Còn hàng' : 'Hết hàng' }}
                                                    ({{ value.soLuongTonKho }})
                                                </p>
                                                <p class="mb-0">
                                                    <span v-if="value.giamGia" class="original-price">
                                                        {{ formatCurrency(value.giaSanPham) }}
                                                    </span>
                                                    <span class="discounted-price">
                                                        {{ formatCurrency(value.giaSanPham * (1 - (value.giamGia?.phamTramGiamGia || 0) / 100)) }}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#sanpham" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#sanpham" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>

    <div class="container">
        <div class="mb-3" style="font-size: 20px;">
            <b>MÁY CHẠY BỘ ĐIỆN</b>
        </div>
        <hr>
        <div id="sanpham" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="row">
                        <div class="col">
                            <div class="card">
                                <img src="https://www.thethaodaiviet.vn/upload/may-chay-bo/ava-may-chay-zasami-cp-x1-dv.png?v=1.0.0"
                                    class="card-img-top" alt="...">
                                <div class="">
                                    <div class="position-absolute top-0 end-0 m-3 product-discount"><span
                                            class="">-10%</span></div>
                                </div>
                                <div class="card-body">
                                    <h6 class="card-title cursor-pointer">Nest Shaped Chair</h6>
                                    <div class="clearfix">
                                        <p class="mb-0 float-start"><strong>134</strong> Sales</p>
                                        <p class="mb-0 float-end fw-bold"><span
                                                class="me-2 text-decoration-line-through text-secondary">$350</span><span>$240</span>
                                        </p>
                                    </div>
                                    <div class="d-flex align-items-center mt-3 fs-6">
                                        <div class="cursor-pointer">
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-secondary"></i>
                                        </div>
                                        <p class="mb-0 ms-auto">4.2(182)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card">
                                <img src="https://www.thethaodaiviet.vn/upload/may-chay-bo/ava-may-chay-zasami-cp-x1-dv.png?v=1.0.0"
                                    class="card-img-top" alt="...">
                                <div class="">
                                    <div class="position-absolute top-0 end-0 m-3 product-discount"><span
                                            class="">-10%</span></div>
                                </div>
                                <div class="card-body">
                                    <h6 class="card-title cursor-pointer">Nest Shaped Chair</h6>
                                    <div class="clearfix">
                                        <p class="mb-0 float-start"><strong>134</strong> Sales</p>
                                        <p class="mb-0 float-end fw-bold"><span
                                                class="me-2 text-decoration-line-through text-secondary">$350</span><span>$240</span>
                                        </p>
                                    </div>
                                    <div class="d-flex align-items-center mt-3 fs-6">
                                        <div class="cursor-pointer">
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-secondary"></i>
                                        </div>
                                        <p class="mb-0 ms-auto">4.2(182)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card">
                                <img src="https://www.thethaodaiviet.vn/upload/may-chay-bo/ava-may-chay-zasami-cp-x1-dv.png?v=1.0.0"
                                    class="card-img-top" alt="...">
                                <div class="">
                                    <div class="position-absolute top-0 end-0 m-3 product-discount"><span
                                            class="">-10%</span></div>
                                </div>
                                <div class="card-body">
                                    <h6 class="card-title cursor-pointer">Nest Shaped Chair</h6>
                                    <div class="clearfix">
                                        <p class="mb-0 float-start"><strong>134</strong> Sales</p>
                                        <p class="mb-0 float-end fw-bold"><span
                                                class="me-2 text-decoration-line-through text-secondary">$350</span><span>$240</span>
                                        </p>
                                    </div>
                                    <div class="d-flex align-items-center mt-3 fs-6">
                                        <div class="cursor-pointer">
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-secondary"></i>
                                        </div>
                                        <p class="mb-0 ms-auto">4.2(182)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card">
                                <img src="https://www.thethaodaiviet.vn/upload/may-chay-bo/ava-may-chay-zasami-cp-x1-dv.png?v=1.0.0"
                                    class="card-img-top" alt="...">
                                <div class="">
                                    <div class="position-absolute top-0 end-0 m-3 product-discount"><span
                                            class="">-10%</span></div>
                                </div>
                                <div class="card-body">
                                    <h6 class="card-title cursor-pointer">Nest Shaped Chair</h6>
                                    <div class="clearfix">
                                        <p class="mb-0 float-start"><strong>134</strong> Sales</p>
                                        <p class="mb-0 float-end fw-bold"><span
                                                class="me-2 text-decoration-line-through text-secondary">$350</span><span>$240</span>
                                        </p>
                                    </div>
                                    <div class="d-flex align-items-center mt-3 fs-6">
                                        <div class="cursor-pointer">
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-secondary"></i>
                                        </div>
                                        <p class="mb-0 ms-auto">4.2(182)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="carousel-item">
                    <div class="row">
                        <div class="row">
                            <div class="col">
                                <div class="card">
                                    <img src="https://www.thethaodaiviet.vn/upload/may-chay-bo/ava-may-chay-zasami-cp-x1-dv.png?v=1.0.0"
                                        class="card-img-top" alt="...">
                                    <div class="">
                                        <div class="position-absolute top-0 end-0 m-3 product-discount"><span
                                                class="">-10%</span></div>
                                    </div>
                                    <div class="card-body">
                                        <h6 class="card-title cursor-pointer">Nest Shaped Chair</h6>
                                        <div class="clearfix">
                                            <p class="mb-0 float-start"><strong>134</strong> Sales</p>
                                            <p class="mb-0 float-end fw-bold"><span
                                                    class="me-2 text-decoration-line-through text-secondary">$350</span><span>$240</span>
                                            </p>
                                        </div>
                                        <div class="d-flex align-items-center mt-3 fs-6">
                                            <div class="cursor-pointer">
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-secondary"></i>
                                            </div>
                                            <p class="mb-0 ms-auto">4.2(182)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card">
                                    <img src="https://www.thethaodaiviet.vn/upload/may-chay-bo/ava-may-chay-zasami-cp-x1-dv.png?v=1.0.0"
                                        class="card-img-top" alt="...">
                                    <div class="">
                                        <div class="position-absolute top-0 end-0 m-3 product-discount"><span
                                                class="">-10%</span></div>
                                    </div>
                                    <div class="card-body">
                                        <h6 class="card-title cursor-pointer">Nest Shaped Chair</h6>
                                        <div class="clearfix">
                                            <p class="mb-0 float-start"><strong>134</strong> Sales</p>
                                            <p class="mb-0 float-end fw-bold"><span
                                                    class="me-2 text-decoration-line-through text-secondary">$350</span><span>$240</span>
                                            </p>
                                        </div>
                                        <div class="d-flex align-items-center mt-3 fs-6">
                                            <div class="cursor-pointer">
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-secondary"></i>
                                            </div>
                                            <p class="mb-0 ms-auto">4.2(182)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card">
                                    <img src="https://www.thethaodaiviet.vn/upload/may-chay-bo/ava-may-chay-zasami-cp-x1-dv.png?v=1.0.0"
                                        class="card-img-top" alt="...">
                                    <div class="">
                                        <div class="position-absolute top-0 end-0 m-3 product-discount"><span
                                                class="">-10%</span></div>
                                    </div>
                                    <div class="card-body">
                                        <h6 class="card-title cursor-pointer">Nest Shaped Chair</h6>
                                        <div class="clearfix">
                                            <p class="mb-0 float-start"><strong>134</strong> Sales</p>
                                            <p class="mb-0 float-end fw-bold"><span
                                                    class="me-2 text-decoration-line-through text-secondary">$350</span><span>$240</span>
                                            </p>
                                        </div>
                                        <div class="d-flex align-items-center mt-3 fs-6">
                                            <div class="cursor-pointer">
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-secondary"></i>
                                            </div>
                                            <p class="mb-0 ms-auto">4.2(182)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card">
                                    <img src="https://www.thethaodaiviet.vn/upload/may-chay-bo/ava-may-chay-zasami-cp-x1-dv.png?v=1.0.0"
                                        class="card-img-top" alt="...">
                                    <div class="">
                                        <div class="position-absolute top-0 end-0 m-3 product-discount"><span
                                                class="">-10%</span></div>
                                    </div>
                                    <div class="card-body">
                                        <h6 class="card-title cursor-pointer">Nest Shaped Chair</h6>
                                        <div class="clearfix">
                                            <p class="mb-0 float-start"><strong>134</strong> Sales</p>
                                            <p class="mb-0 float-end fw-bold"><span
                                                    class="me-2 text-decoration-line-through text-secondary">$350</span><span>$240</span>
                                            </p>
                                        </div>
                                        <div class="d-flex align-items-center mt-3 fs-6">
                                            <div class="cursor-pointer">
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-secondary"></i>
                                            </div>
                                            <p class="mb-0 ms-auto">4.2(182)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="row">
                        <div class="row">
                            <div class="col">
                                <div class="card">
                                    <img src="https://www.thethaodaiviet.vn/upload/may-chay-bo/ava-may-chay-zasami-cp-x1-dv.png?v=1.0.0"
                                        class="card-img-top" alt="...">
                                    <div class="">
                                        <div class="position-absolute top-0 end-0 m-3 product-discount"><span
                                                class="">-10%</span></div>
                                    </div>
                                    <div class="card-body">
                                        <h6 class="card-title cursor-pointer">Nest Shaped Chair</h6>
                                        <div class="clearfix">
                                            <p class="mb-0 float-start"><strong>134</strong> Sales</p>
                                            <p class="mb-0 float-end fw-bold"><span
                                                    class="me-2 text-decoration-line-through text-secondary">$350</span><span>$240</span>
                                            </p>
                                        </div>
                                        <div class="d-flex align-items-center mt-3 fs-6">
                                            <div class="cursor-pointer">
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-secondary"></i>
                                            </div>
                                            <p class="mb-0 ms-auto">4.2(182)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card">
                                    <img src="https://www.thethaodaiviet.vn/upload/may-chay-bo/ava-may-chay-zasami-cp-x1-dv.png?v=1.0.0"
                                        class="card-img-top" alt="...">
                                    <div class="">
                                        <div class="position-absolute top-0 end-0 m-3 product-discount"><span
                                                class="">-10%</span></div>
                                    </div>
                                    <div class="card-body">
                                        <h6 class="card-title cursor-pointer">Nest Shaped Chair</h6>
                                        <div class="clearfix">
                                            <p class="mb-0 float-start"><strong>134</strong> Sales</p>
                                            <p class="mb-0 float-end fw-bold"><span
                                                    class="me-2 text-decoration-line-through text-secondary">$350</span><span>$240</span>
                                            </p>
                                        </div>
                                        <div class="d-flex align-items-center mt-3 fs-6">
                                            <div class="cursor-pointer">
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-secondary"></i>
                                            </div>
                                            <p class="mb-0 ms-auto">4.2(182)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card">
                                    <img src="https://www.thethaodaiviet.vn/upload/may-chay-bo/ava-may-chay-zasami-cp-x1-dv.png?v=1.0.0"
                                        class="card-img-top" alt="...">
                                    <div class="">
                                        <div class="position-absolute top-0 end-0 m-3 product-discount"><span
                                                class="">-10%</span></div>
                                    </div>
                                    <div class="card-body">
                                        <h6 class="card-title cursor-pointer">Nest Shaped Chair</h6>
                                        <div class="clearfix">
                                            <p class="mb-0 float-start"><strong>134</strong> Sales</p>
                                            <p class="mb-0 float-end fw-bold"><span
                                                    class="me-2 text-decoration-line-through text-secondary">$350</span><span>$240</span>
                                            </p>
                                        </div>
                                        <div class="d-flex align-items-center mt-3 fs-6">
                                            <div class="cursor-pointer">
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-secondary"></i>
                                            </div>
                                            <p class="mb-0 ms-auto">4.2(182)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card">
                                    <img src="https://www.thethaodaiviet.vn/upload/may-chay-bo/ava-may-chay-zasami-cp-x1-dv.png?v=1.0.0"
                                        class="card-img-top" alt="...">
                                    <div class="">
                                        <div class="position-absolute top-0 end-0 m-3 product-discount"><span
                                                class="">-10%</span></div>
                                    </div>
                                    <div class="card-body">
                                        <h6 class="card-title cursor-pointer">Nest Shaped Chair</h6>
                                        <div class="clearfix">
                                            <p class="mb-0 float-start"><strong>134</strong> Sales</p>
                                            <p class="mb-0 float-end fw-bold"><span
                                                    class="me-2 text-decoration-line-through text-secondary">$350</span><span>$240</span>
                                            </p>
                                        </div>
                                        <div class="d-flex align-items-center mt-3 fs-6">
                                            <div class="cursor-pointer">
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-warning"></i>
                                                <i class="bx bxs-star text-secondary"></i>
                                            </div>
                                            <p class="mb-0 ms-auto">4.2(182)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#sanpham" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#sanpham" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    <hr>
    <div class="container">
        <div class="mt-3 mb-3" style="font-size: 20px;">
            <b class="align-middle">Khách hàng nói về Đại Việt</b>
        </div>
        <div class="row">
            <template v-for="(value, index) in danh_sach_danh_gia" :key="index">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex flex-column align-items-center ">
                                <img src="https://i.pinimg.com/originals/03/19/e7/0319e75748160709ceefa7398a4a7070.jpg"
                                    alt="Admin" class="rounded-circle p-1 bg-primary " width="110">
                                <div class="mt-3">
                                    <h4 class="text-center">{{ value.user.hoVaTen }}</h4>
                                    <p class="text-secondary mb-1">
                                        {{ value.danhGia }}
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
    data() {
        return {
            danh_sach_san_pham: [],
            san_pham_moi: [],
            san_pham_ban_chay: [],
            san_pham_giam_gia: [],
            danh_sach_danh_gia: [],
            danh_sach_danh_muc: [],
            danh_sach_thuong_hieu: [],
            tuKhoaTimKiem: ''
        };
    },
    methods: {
        formatCurrency(amount) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
        },
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN');
        },
        // Lấy danh sách sản phẩm
        layDanhSachSanPham() {
            axios
                .get('/api/user/san-pham/home-page')
                .then((res) => {
                    if (res.data.status) {
                        this.danh_sach_san_pham = res.data.data;
                    }
                    console.log(this.danh_sach_san_pham);
                })
                .catch((error) => {
                    toaster.error('Có lỗi xảy ra khi lấy danh sách sản phẩm!');
                });
        },
        layDanhGia() {
            axios
                .get("/api/user/danh-gia/home-page")
                .then((res) => {
                    if (res.data.status == true) {
                        this.danh_sach_danh_gia = res.data.data;
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    toaster.error('Có lỗi xảy ra khi lấy danh sách đánh giá!');
                    console.error('Error fetching reviews:', error);
                });
        },
        redirectToDetail(id) {
            this.$router.push(`/chi-tiet-san-pham/${id}`);
        },
        // // Lấy sản phẩm mới nhất
        // laySanPhamMoi() {
        //     axios
        //         .get('/api/client/san-pham-moi')
        //         .then((res) => {
        //             if (res.data.status) {
        //                 this.san_pham_moi = res.data.data;
        //             }
        //         })
        //         .catch((error) => {
        //             toaster.error('Có lỗi xảy ra khi lấy sản phẩm mới!');
        //         });
        // },
        // // Lấy sản phẩm bán chạy
        // laySanPhamBanChay() {
        //     axios
        //         .get('/api/client/san-pham-ban-chay')
        //         .then((res) => {
        //             if (res.data.status) {
        //                 this.san_pham_ban_chay = res.data.data;
        //             }
        //         })
        //         .catch((error) => {
        //             toaster.error('Có lỗi xảy ra khi lấy sản phẩm bán chạy!');
        //         });
        // },
        // // Lấy sản phẩm giảm giá
        // laySanPhamGiamGia() {
        //     axios
        //         .get('/api/admin/san-pham-giam-gia')
        //         .then((res) => {
        //             if (res.data.status) {
        //                 this.san_pham_giam_gia = res.data.data;
        //             }
        //         })
        //         .catch((error) => {
        //             toaster.error('Có lỗi xảy ra khi lấy sản phẩm giảm giá!');
        //         });
        // },
        // // Lấy danh sách đánh giá mới nhất
        // layDanhGiaMoi() {
        //     axios
        //         .get('/api/client/danh-gia-moi')
        //         .then((res) => {
        //             if (res.data.status) {
        //                 this.danh_sach_danh_gia = res.data.data;
        //             }
        //         })
        //         .catch((error) => {
        //             toaster.error('Có lỗi xảy ra khi lấy đánh giá mới!');
        //         });
        // },
        // // Lấy danh sách danh mục
        // layDanhSachDanhMuc() {
        //     axios
        //         .get('/api/client/danh-muc')
        //         .then((res) => {
        //             if (res.data.status) {
        //                 this.danh_sach_danh_muc = res.data.data;
        //             }
        //         })
        //         .catch((error) => {
        //             toaster.error('Có lỗi xảy ra khi lấy danh sách danh mục!');
        //         });
        // },
        // // Lấy danh sách thương hiệu
        // layDanhSachThuongHieu() {
        //     axios
        //         .get('/api/client/thuong-hieu')
        //         .then((res) => {
        //             if (res.data.status) {
        //                 this.danh_sach_thuong_hieu = res.data.data;
        //             }
        //         })
        //         .catch((error) => {
        //             toaster.error('Có lỗi xảy ra khi lấy danh sách thương hiệu!');
        //         });
        // },
        // // Xem chi tiết sản phẩm
        // xemChiTietSanPham(id) {
        //     this.$router.push(`/chi-tiet-san-pham/${id}`);
        // },
        // // Tìm kiếm sản phẩm
        // timKiemSanPham() {
        //     if (!this.tuKhoaTimKiem) {
        //         toaster.warning('Vui lòng nhập từ khóa tìm kiếm!');
        //         return;
        //     }
        //     this.$router.push(`/tim-kiem?q=${this.tuKhoaTimKiem}`);
        // },
        // // Lọc sản phẩm theo danh mục
        // locTheoDanhMuc(id) {
        //     this.$router.push(`/danh-muc/${id}`);
        // },
        // // Lọc sản phẩm theo thương hiệu
        // locTheoThuongHieu(id) {
        //     this.$router.push(`/thuong-hieu/${id}`);
        // }
    },
    mounted() {
        this.layDanhSachSanPham();
        // this.laySanPhamMoi();
        // this.laySanPhamBanChay();
        // this.laySanPhamGiamGia();
        this.layDanhGia();
        // this.layDanhSachDanhMuc();
        // this.layDanhSachThuongHieu();
    }
}
</script>
<style scoped>
/* Container styles */
.container {
    padding: 20px 0;
}

.section-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 30px;
    position: relative;
    padding-bottom: 10px;
}

.section-title::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 3px;
    background: #dc3545;
}

/* Product card styles */
.product-card {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
    height: 100%;
    position: relative;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

/* Product image */
.product-card .card-img-top {
    height: 280px;
    background: #f8f9fa;
    transition: transform 0.3s ease;
}

.product-card:hover .card-img-top {
    transform: scale(1.05);
}

/* Card body */
.product-card .card-body {
    padding: 20px;
}

.product-card .card-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 15px;
    height: 48px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: center;
}

/* Specifications */
.specs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-bottom: 15px;
}

.specs .badge {
    font-size: 12px;
    font-weight: 500;
    padding: 6px 12px;
    border-radius: 4px;
    background-color: #f8f9fa;
    color: #666;
}

/* Price section */
.price-section {
    text-align: center;
    padding-top: 15px;
    border-top: 1px solid #eee;
}

.stock-status {
    font-size: 14px;
    margin-bottom: 10px;
}

.stock-status i {
    margin-right: 5px;
}

.price-section .original-price {
    color: #999;
    text-decoration: line-through;
    font-size: 14px;
    margin-right: 8px;
}

.price-section .discounted-price {
    color: #dc3545;
    font-size: 18px;
    font-weight: 700;
}

/* Discount badge */
.discount-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2;
}

.discount-badge .badge {
    font-size: 14px;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 4px;
    background: #dc3545;
}

/* View details overlay */
.view-details {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: all 0.3s ease;
}

.view-details a {
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    padding: 12px 24px;
    border: 2px solid #fff;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.view-details a:hover {
    background: #fff;
    color: #333;
}

.product-card:hover .view-details {
    opacity: 1;
}

/* Carousel controls */
.carousel-control-prev,
.carousel-control-next {
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: all 0.3s ease;
}

.carousel:hover .carousel-control-prev,
.carousel:hover .carousel-control-next {
    opacity: 1;
}

.carousel-control-prev {
    left: -20px;
}

.carousel-control-next {
    right: -20px;
}

/* Responsive styles */
@media (max-width: 768px) {
    .product-card .card-img-top {
        height: 200px;
    }

    .product-card .card-title {
        font-size: 14px;
        height: 42px;
    }

    .specs .badge {
        font-size: 11px;
        padding: 4px 8px;
    }

    .price-section .discounted-price {
        font-size: 16px;
    }
}
</style>