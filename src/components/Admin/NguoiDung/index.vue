<template lang="">
    <div>
        <!-- them -->
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-lg-3 col-xl-2">
                                <button class="btn btn-primary mb-3 mb-lg-0" data-bs-toggle="modal"
                                    data-bs-target="#taoNguoiDungModal">
                                    <span class="text-nowrap"><i class="bx bxs-plus-square"></i>Thêm người dùng</span>
                                </button>
                            </div>
                        </div>
                        <div class="modal fade" id="taoNguoiDungModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                                            Tạo Mới Người Dùng
                                        </h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="mb-2 mt-2">
                                                    <label>Email</label>
                                                    <input v-model="nguoi_dung_create.email" type="email"
                                                        class="form-control mt-2" required />
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="mb-2 mt-2">
                                                    <label>Mật khẩu</label>
                                                    <input v-model="nguoi_dung_create.password" type="password"
                                                        class="form-control mt-2" required />
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="mb-2 mt-2">
                                                    <label>Họ và tên</label>
                                                    <input v-model="nguoi_dung_create.hoVaTen" type="text"
                                                        class="form-control mt-2" required />
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="mb-2 mt-2">
                                                    <label>Số điện thoại</label>
                                                    <input v-model="nguoi_dung_create.sdt" type="tel"
                                                        class="form-control mt-2" required />
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="mb-2 mt-2">
                                                    <label>Chức vụ</label>
                                                    <select v-model="nguoi_dung_create.chucVu" class="form-control mt-2" required>
                                                        <option value="">Chọn chức vụ</option>
                                                        <option v-for="chucVu in danh_sach_chuc_vu" 
                                                                :key="chucVu.id" 
                                                                :value="chucVu.tenChucVu">
                                                            {{ chucVu.tenChucVu }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="mb-2 mt-2">
                                                    <label>Tình trạng</label>
                                                    <select v-model="nguoi_dung_create.tinhTrang" class="form-control mt-2" required>
                                                        <option value="1">Hoạt động</option>
                                                        <option value="0">Không hoạt động</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                            Close</button>
                                        <button v-on:click="themNguoiDung()" type="button" data-bs-dismiss="modal"
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
                        <h5 class="mt-2">Quản lý người dùng</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr class="text-center">
                                        <th>#</th>
                                        <th>Email</th>
                                        <th>Họ và tên</th>
                                        <th>Số điện thoại</th>
                                        <th>Chức vụ</th>
                                        <th>Tình trạng</th>
                                        <th>Ngày tạo</th>
                                        <th>Ngày cập nhật</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(v, k) in danh_sach_nguoi_dung" :key="k">
                                        <tr class="text-center align-middle">
                                            <td>{{ k + 1 }}</td>
                                            <td>{{ v.email }}</td>
                                            <td>{{ v.hoVaTen }}</td>
                                            <td>{{ v.sdt }}</td>
                                            <td>{{ v.chucVu }}</td>
                                            <td>{{ v.tinhTrang == 1 ? 'Hoạt động' : 'Không hoạt động' }}</td>
                                            <td>{{ formatDate(v.ngayTao) }}</td>
                                            <td>{{ formatDate(v.ngayCapNhat) }}</td>
                                            <td class="text-center">
                                                <button v-on:click="Object.assign(nguoi_dung_update,v); id_nguoi_dung_update = v.id"
                                                    data-bs-toggle="modal" data-bs-target="#updateModal"
                                                    class="btn btn-info">Cập nhật</button>
                                                <button v-on:click="id_nguoi_dung_delete = v.id"
                                                    data-bs-toggle="modal" data-bs-target="#deleteModal"
                                                    class="btn btn-danger ms-2">Xoá</button>
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
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật người dùng</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="mb-2 mt-2">
                                    <label>Email</label>
                                    <input v-model="nguoi_dung_update.email" type="email" class="form-control mt-2" required />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-2 mt-2">
                                    <label>Mật khẩu</label>
                                    <input v-model="nguoi_dung_update.password" type="password" class="form-control mt-2" />
                                    <small class="text-muted">Để trống nếu không muốn thay đổi mật khẩu</small>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-2 mt-2">
                                    <label>Họ và tên</label>
                                    <input v-model="nguoi_dung_update.hoVaTen" type="text" class="form-control mt-2" required />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-2 mt-2">
                                    <label>Số điện thoại</label>
                                    <input v-model="nguoi_dung_update.sdt" type="tel" class="form-control mt-2" required />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-2 mt-2">
                                    <label>Chức vụ</label>
                                    <select v-model="nguoi_dung_update.chucVu" class="form-control mt-2" required>
                                        <option value="">Chọn chức vụ</option>
                                        <option v-for="chucVu in danh_sach_chuc_vu" 
                                                :key="chucVu.id" 
                                                :value="chucVu.tenChucVu">
                                            {{ chucVu.tenChucVu }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-2 mt-2">
                                    <label>Tình trạng</label>
                                    <select v-model="nguoi_dung_update.tinhTrang" class="form-control mt-2" required>
                                        <option value="1">Hoạt động</option>
                                        <option value="0">Không hoạt động</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button v-on:click="capNhatNguoiDung()" data-bs-dismiss="modal" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- delete Modal -->
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Xoá người dùng</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger" role="alert">
                            Bạn có thực sự muốn xoá!
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button v-on:click="xoaNguoiDung()" type="button" data-bs-dismiss="modal"
                            class="btn btn-primary">Save</button>
                    </div>
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
            danh_sach_nguoi_dung: [],
            danh_sach_chuc_vu: [],
            nguoi_dung_create: {},
            nguoi_dung_update: {},
            id_nguoi_dung_update: "",
            id_nguoi_dung_delete: "",
        };
    },
    mounted() {
        this.layNguoiDung();
        this.layChucVu();
    },
    methods: {
        formatDate(date) {
            if (!date) return "";
            return new Date(date).toLocaleDateString("vi-VN");
        },
        async layNguoiDung() {
            try {
                const response = await axios.get(`/api/admin/nguoi-dung`);
                if (response.data.status) {
                    this.danh_sach_nguoi_dung = response.data.data;
                } else {
                    toaster.error(response.data.message);
                }
            } catch (error) {
                toaster.error(error.response.data.message);
            }
        },
        async layChucVu() {
            try {
                const response = await axios.get("/api/admin/chuc-vu", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                });
                if (response.data.status) {
                    this.danh_sach_chuc_vu = response.data.data;
                } else {
                    toaster.error(response.data.message);
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách chức vụ:", error);
                toaster.error("Có lỗi xảy ra khi lấy danh sách chức vụ!");
            }
        },
        async themNguoiDung() {
            try {
                const response = await axios.post(`/api/admin/nguoi-dung/them-moi`, this.nguoi_dung_create);
                if (response.data.status) {
                    toaster.success(response.data.message);
                    this.layNguoiDung();
                    this.nguoi_dung_create = {};
                } else {
                    toaster.error(response.data.message);
                }
            } catch (error) {
                toaster.error(error.response.data.message);
            }
        },
        async capNhatNguoiDung() {
            try {
                const response = await axios.put(
                    `/api/admin/nguoi-dung/${this.id_nguoi_dung_update}`,
                    this.nguoi_dung_update
                );
                if (response.data.status) {
                    toaster.success(response.data.message);
                    this.layNguoiDung();
                    this.nguoi_dung_update = {};
                    this.id_nguoi_dung_update = "";
                } else {
                    toaster.error(response.data.message);
                }
            } catch (error) {
                toaster.error(error.response.data.message);
            }
        },
        async xoaNguoiDung() {
            try {
                const response = await axios.delete(
                    `/api/admin/nguoi-dung/${this.id_nguoi_dung_delete}`
                );
                if (response.data.status) {
                    toaster.success(response.data.message);
                    this.layNguoiDung();
                    this.id_nguoi_dung_delete = "";
                } else {
                    toaster.error(response.data.message);
                }
            } catch (error) {
                toaster.error(error.response.data.message);
            }
        },
    },
};
</script>
<style lang="">
    
</style>