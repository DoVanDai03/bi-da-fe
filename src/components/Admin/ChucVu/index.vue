<template>
    <!-- them -->
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-lg-3 col-xl-2">
                            <button class="btn btn-primary mb-3 mb-lg-0" data-bs-toggle="modal"
                                data-bs-target="#taoChucVuModal">
                                <i class="bx bxs-plus-square"></i>Thêm chức vụ
                            </button>
                        </div>
                    </div>
                    <div class="modal fade" id="taoChucVuModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                                        Tạo Mới Chức Vụ
                                    </h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="mb-2 mt-2">
                                                <label>Tên chức vụ</label>
                                                <input v-model="chuc_vu_create.tenChucVu" type="text"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="mb-2 mt-2">
                                                <label>Tình trạng</label>
                                                <select v-model.number="chuc_vu_create.tinhTrang" class="form-select mt-2">
                                                    <option :value="1">Hoạt động</option>
                                                    <option :value="0">Không hoạt động</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                        Close</button>
                                    <button v-on:click="themChucVu()" type="button" data-bs-dismiss="modal"
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
                    <h5 class="mt-2">Quản lý chức vụ</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="text-center">
                                    <th>#</th>
                                    <th>Tên chức vụ</th>
                                    <th>Tình trạng</th>
                                    <th>Ngày tạo</th>
                                    <th>Ngày cập nhật</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(v, k) in danh_sach_chuc_vu" :key="k">
                                    <tr class="text-center align-middle">
                                        <td>{{ k + 1 }}</td>
                                        <td>{{ v.tenChucVu }}</td>
                                        <td>
                                            <span :class="v.tinhTrang == 1 ? 'badge bg-success' : 'badge bg-danger'">
                                                {{ v.tinhTrang == 1 ? 'Hoạt động' : 'Không hoạt động' }}
                                            </span>
                                        </td>
                                        <td>{{ formatDate(v.ngayTao) }}</td>
                                        <td>{{ formatDate(v.ngayCapNhat) }}</td>
                                        <td class="text-center">
                                            <button v-on:click="Object.assign(chuc_vu_update, v); id_chuc_vu_update = v.id"
                                                data-bs-toggle="modal" data-bs-target="#updateModal"
                                                class="btn btn-info">Cập nhật</button>
                                            <button v-on:click="id_chuc_vu_delete = v.id"
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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật chức vụ</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="mb-2 mt-2">
                                <label>Tên chức vụ</label>
                                <input v-model="chuc_vu_update.tenChucVu" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="mb-2 mt-2">
                                <label>Tình trạng</label>
                                <select v-model.number="chuc_vu_update.tinhTrang" class="form-select mt-2">
                                    <option :value="1">Hoạt động</option>
                                    <option :value="0">Không hoạt động</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="capNhatChucVu()" data-bs-dismiss="modal" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!-- delete Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xoá chức vụ</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert">
                        Bạn có thực sự muốn xoá!
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="xoaChucVu()" type="button" data-bs-dismiss="modal"
                        class="btn btn-primary">Save</button>
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
            danh_sach_chuc_vu: [],
            chuc_vu_create: {
                tenChucVu: "",
                tinhTrang: 1
            },
            chuc_vu_update: {},
            id_chuc_vu_update: "",
            id_chuc_vu_delete: "",
        };
    },
    mounted() {
        this.layChucVu();
    },
    methods: {
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleString('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        },
        layChucVu() {
            axios
                .get("/api/admin/chuc-vu", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    this.danh_sach_chuc_vu = res.data.data;
                })
                .catch(error => {
                    console.error("Lỗi khi lấy danh sách chức vụ:", error);
                    toaster.error("Có lỗi xảy ra khi lấy danh sách chức vụ!");
                });
        },
        themChucVu() {
            axios
                .post('/api/admin/chuc-vu', this.chuc_vu_create, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.layChucVu();
                        this.chuc_vu_create = {
                            tenChucVu: "",
                            tinhTrang: 1
                        };
                    }
                })
                .catch(error => {
                    toaster.error("Có lỗi xảy ra khi thêm chức vụ!");
                });
        },
        xoaChucVu() {
            axios
                .delete("/api/admin/chuc-vu/" + this.id_chuc_vu_delete, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.layChucVu();
                    } else {
                        toaster.error(res.data.message || "Xóa chức vụ thất bại!");
                    }
                })
                .catch(error => {
                    toaster.error("Có lỗi xảy ra khi xóa chức vụ!");
                });
        },
        capNhatChucVu() {
            const updateData = {
                ...this.chuc_vu_update,
                tinhTrang: Number(this.chuc_vu_update.tinhTrang)
            };
            axios
                .put("/api/admin/chuc-vu/" + this.id_chuc_vu_update, updateData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.layChucVu();
                    } else {
                        toaster.error(res.data.message || "Cập nhật chức vụ thất bại!");
                    }
                })
                .catch(error => {
                    toaster.error("Có lỗi xảy ra khi cập nhật chức vụ!");
                });
        }
    },
};
</script>

<style>
</style>
