<template>
    <!-- them -->
    <div class="row" v-if="permissions.canView">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-lg-3 col-xl-2">
                            <button v-if="permissions.canCreate" class="btn btn-primary mb-3 mb-lg-0" data-bs-toggle="modal"
                                data-bs-target="#taoThuongHieuModal">
                                <i class="bx bxs-plus-square"></i>Thêm thương hiệu
                            </button>
                        </div>
                    </div>
                    <div class="modal fade" id="taoThuongHieuModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                                        Tạo Mới thương hiệu
                                    </h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Tên thương hiệu</label>
                                                <input v-model="thuong_hieu_create.tenThuongHieu" type="text"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Mô tả</label>
                                                <input v-model="thuong_hieu_create.moTa" type="text"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                        Close</button>
                                    <button v-on:click="themThuongHieu()" type="button" data-bs-dismiss="modal"
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
                    <h5 class="mt-2">Quản lý thương hiệu</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="text-center">
                                    <th>#</th>
                                    <th>Tên thương hiệu</th>
                                    <th>Mô tả</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(v, k) in danh_sach_thuong_hieu" :key="k">
                                    <tr class="text-center align-middle">
                                        <td>{{ k + 1 }}</td>
                                        <td>{{ v.tenThuongHieu }}</td>
                                        <td>{{ v.moTa }}</td>
                                        <td class="text-center">
                                            <button v-if="permissions.canUpdate"
                                                v-on:click="Object.assign(thuong_hieu_update, v); id_thuong_hieu_update = v.id"
                                                data-bs-toggle="modal" data-bs-target="#updateModal"
                                                class="btn btn-info">Cập nhật</button>
                                            <button v-if="permissions.canDelete" v-on:click="id_thuong_hieu_delete = v.id"
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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật thương hiệu</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Tên thương hiệu</label>
                                <input v-model="thuong_hieu_update.tenThuongHieu" type="text"
                                    class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Mô tả</label>
                                <input v-model="thuong_hieu_update.moTa" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="capNhatThuongHieu()" data-bs-dismiss="modal"
                        class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!-- delete Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xoá thương hiệu</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert">
                        Bạn có thực sự muốn xoá!
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="xoaThuongHieu()" type="button" data-bs-dismiss="modal"
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

// Kiểm tra nhiều quyền
const checkMultiplePermissions = async (maQuyenList) => {
    try {
        const queryString = maQuyenList.map(q => `maQuyen=${q}`).join('&');
        const response = await axios.get(
            `/api/admin/quyen/chuc-vu/kiem-tra-nhieu-quyen?${queryString}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                }
            }
        );
        return response.data.data.permissions;
    } catch (error) {
        console.error('Error checking permissions:', error);
        return {};
    }
};

export default {
    data() {
        return {
            permissions: {
                canView: false,
                canCreate: false,
                canUpdate: false,
                canDelete: false
            },
            danh_sach_thuong_hieu: [],
            thuong_hieu_create: {},
            thuong_hieu_update: {},
            id_thuong_hieu_update: "",
            id_thuong_hieu_delete: "",
        };
    },
    async created() {
        // Check permissions when component is created
        const permissions = await checkMultiplePermissions([
            'BRAND_VIEW',
            'BRAND_CREATE',
            'BRAND_UPDATE',
            'BRAND_DELETE'
        ]);
        
        this.permissions = {
            canView: permissions.BRAND_VIEW || false,
            canCreate: permissions.BRAND_CREATE || false,
            canUpdate: permissions.BRAND_UPDATE || false,
            canDelete: permissions.BRAND_DELETE || false
        };
        
        if (this.permissions.canView) {
            // Only load data if user has view permission
            await this.layThuongHieu();
        } else {
            toaster.error("Bạn không có quyền xem thương hiệu!");
        }
    },
    methods: {
        layThuongHieu() {
            axios
                .get("/api/admin/thuong-hieu", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    this.danh_sach_thuong_hieu = res.data.data;
                    console.log(this.danh_sach_thuong_hieu);
                });
        },
        themThuongHieu() {
            axios
                .post('/api/admin/thuong-hieu', this.thuong_hieu_create, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layThuongHieu();
                    }
                });
        },
        xoaThuongHieu() {
            axios
                .delete("/api/admin/thuong-hieu/" + this.id_thuong_hieu_delete, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layThuongHieu();
                    }
                });
        },
        capNhatThuongHieu() {
            axios
                .put("/api/admin/thuong-hieu/" + this.id_thuong_hieu_update, this.thuong_hieu_update, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layThuongHieu();
                        this.thuong_hieu_update = {};
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