<template>
    <!-- them -->
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-lg-3 col-xl-2">
                            <button class="btn btn-primary mb-3 mb-lg-0" data-bs-toggle="modal"
                                data-bs-target="#taoDanhGiaModal">
                                <span class="text-nowrap"><i class="bx bxs-plus-square"></i>Thêm đánh giá</span>
                            </button>
                        </div>
                    </div>
                    <div class="modal fade" id="taoDanhGiaModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                                        Tạo Mới đánh giá
                                    </h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Khách hàng</label>
                                                <select v-model="danh_gia_create.idKhachHang" class="form-control mt-2"
                                                    required>
                                                    <option v-for="kh in danh_sach_khach_hang" :key="kh.id"
                                                        :value="kh.id">
                                                        {{ kh.hoVaTen }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Sản phẩm</label>
                                                <select v-model="danh_gia_create.idSanPham" class="form-control mt-2"
                                                    required>
                                                    <option v-for="sp in danh_sach_san_pham" :key="sp.id"
                                                        :value="sp.id">
                                                        {{ sp.tenSanPham }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="mb-2 mt-2">
                                                <label>Đánh giá</label>
                                                <textarea v-model="danh_gia_create.danhGia" class="form-control mt-2"
                                                    rows="3" required></textarea>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Hình ảnh</label>
                                                <input v-model="danh_gia_create.hinhAnh" type="text"
                                                    class="form-control mt-2" placeholder="Nhập link hình ảnh" />
                                                <img v-if="danh_gia_create.hinhAnh" :src="danh_gia_create.hinhAnh"
                                                    class="mt-2" style="max-width: 200px;" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Trạng thái</label>
                                                <select v-model="danh_gia_create.trangThai" class="form-control mt-2"
                                                    required>
                                                    <option value=true>Hiển thị</option>
                                                    <option value=false>Ẩn</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                        Close</button>
                                    <button v-on:click="themDanhGia()" type="button" data-bs-dismiss="modal"
                                        class="btn btn-primary">
                                        Thêm Mới
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- table  -->
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="mt-2">Quản lý đánh giá</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="text-center">
                                    <th>#</th>
                                    <th>Khách hàng</th>
                                    <th>Sản phẩm</th>
                                    <th>Đánh giá</th>
                                    <th>Hình ảnh</th>
                                    <th>Ngày đánh giá</th>
                                    <th>Trạng thái</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(v, k) in danh_sach_danh_gia" :key="k">
                                    <tr class="text-center align-middle">
                                        <td>{{ k + 1 }}</td>
                                        <td>{{ v.user?.hoVaTen || 'N/A' }}</td>
                                        <td>{{ v.product?.tenSanPham || 'N/A' }}</td>
                                        <td>{{ v.danhGia || 'N/A' }}</td>
                                        <td>
                                            <img v-if="v.hinhAnh" :src="v.hinhAnh" alt="Review Image" style="max-width: 50px;" />
                                            <span v-else>N/A</span>
                                        </td>
                                        <td>{{ formatDate(v.ngayDanhGia) }}</td>
                                        <td>
                                            <span :class="v.trangThai ? 'badge bg-success' : 'badge bg-danger'">
                                                {{ v.trangThai ? 'Hoạt động' : 'Không hoạt động' }}
                                            </span>
                                        </td>
                                        <td class="text-center">
                                            <button
                                                v-on:click="Object.assign(danh_gia_update, v); id_danh_gia_update = v.id"
                                                data-bs-toggle="modal" data-bs-target="#updateModal"
                                                class="btn btn-info">Cập nhật</button>
                                            <button v-on:click="id_danh_gia_delete = v.id" data-bs-toggle="modal"
                                                data-bs-target="#deleteModal" class="btn btn-danger ms-2">Xoá</button>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- update Modal -->
    <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật đánh giá</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Khách hàng</label>
                                <select v-model="danh_gia_update.idKhachHang" class="form-control mt-2" required>
                                    <option v-for="kh in danh_sach_khach_hang" :key="kh.id" :value="kh.id">
                                        {{ kh.hoVaTen }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Sản phẩm</label>
                                <select v-model="danh_gia_update.idSanPham" class="form-control mt-2" required>
                                    <option v-for="sp in danh_sach_san_pham" :key="sp.id" :value="sp.id">
                                        {{ sp.tenSanPham }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="mb-2 mt-2">
                                <label>Đánh giá</label>
                                <textarea v-model="danh_gia_update.danhGia" class="form-control mt-2" rows="3"
                                    required></textarea>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Hình ảnh</label>
                                <input v-model="danh_gia_update.hinhAnh" type="text" class="form-control mt-2"
                                    placeholder="Nhập link hình ảnh" />
                                <img v-if="danh_gia_update.hinhAnh" :src="danh_gia_update.hinhAnh" class="mt-2"
                                    style="max-width: 200px;" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Trạng thái</label>
                                <select v-model="danh_gia_update.trangThai" class="form-control mt-2" required>
                                    <option value=true>Hiển thị</option>
                                    <option value=false>Ẩn</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="capNhatDanhGia()" data-bs-dismiss="modal" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!-- delete Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xoá đánh giá</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert">
                        Bạn có thực sự muốn xoá!
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="xoaDanhGia()" type="button" data-bs-dismiss="modal"
                        class="btn btn-primary">Save</button>
                </div>
            </div>
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
            danh_sach_danh_gia: [],
            danh_sach_khach_hang: [],
            danh_sach_san_pham: [],
            danh_gia_create: {
                trangThai: true
            },
            danh_gia_update: {},
            id_danh_gia_update: "",
            id_danh_gia_delete: "",
        };
    },
    mounted() {
        this.layDanhGia();
        this.layKhachHang();
        this.laySanPham();
    },
    methods: {
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN');
        },
        getKhachHangName(id) {
            const khachHang = this.danh_sach_khach_hang.find(kh => kh.id === id);
            return khachHang ? khachHang.hoVaTen : '';
        },
        getSanPhamName(id) {
            const sanPham = this.danh_sach_san_pham.find(sp => sp.id === id);
            return sanPham ? sanPham.tenSanPham : '';
        },
        layDanhGia() {
            axios
                .get("/api/admin/danh-gia", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
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
        layKhachHang() {
            axios
                .get("/api/admin/khach-hang", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        this.danh_sach_khach_hang = res.data.data;
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    toaster.error('Có lỗi xảy ra khi lấy danh sách khách hàng!');
                    console.error('Error fetching customers:', error);
                });
        },
        laySanPham() {
            axios
                .get("/api/admin/san-pham", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        this.danh_sach_san_pham = res.data.data;
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    toaster.error('Có lỗi xảy ra khi lấy danh sách sản phẩm!');
                    console.error('Error fetching products:', error);
                });
        },
        themDanhGia() {
            // Kiểm tra các trường bắt buộc
            if (!this.danh_gia_create.idKhachHang || !this.danh_gia_create.idSanPham || !this.danh_gia_create.danhGia) {
                toaster.error('Vui lòng điền đầy đủ thông tin bắt buộc!');
                return;
            }

            const data = {
                idKhachHang: this.danh_gia_create.idKhachHang,
                idSanPham: this.danh_gia_create.idSanPham,
                danhGia: this.danh_gia_create.danhGia,
                hinhAnh: this.danh_gia_create.hinhAnh || null,
                ngayDanhGia: new Date().toISOString(),
                trangThai: this.danh_gia_create.trangThai
            };

            axios
                .post('/api/admin/danh-gia', data, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layDanhGia();
                        this.danh_gia_create = {
                            trangThai: true
                        };
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    if (error.response?.data?.message) {
                        toaster.error(error.response.data.message);
                    } else {
                        toaster.error('Có lỗi xảy ra khi thêm đánh giá!');
                    }
                    console.error('Error creating review:', error);
                });
        },
        xoaDanhGia() {
            axios
                .delete("/api/admin/danh-gia/" + this.id_danh_gia_delete, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layDanhGia();
                    }
                });
        },
        capNhatDanhGia() {
            axios
                .put("/api/admin/danh-gia/" + this.id_danh_gia_update, this.danh_gia_update, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layDanhGia();
                        this.danh_gia_update = {};
                    } else {
                        toaster.error(res.data.message)
                    }
                })
                .catch((error) => {
                    toaster.error('Có lỗi xảy ra khi cập nhật!')
                });
        }
    },
}
</script>

<style></style>
