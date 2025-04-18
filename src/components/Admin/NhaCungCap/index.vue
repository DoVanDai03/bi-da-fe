<template>
    <!-- them -->
    <div class="row" v-if="permissions.canView">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-lg-3 col-xl-2">
                            <button v-if="permissions.canCreate" class="btn btn-primary mb-3 mb-lg-0" data-bs-toggle="modal"
                                data-bs-target="#taoNCCModal">
                                <span class="text-nowrap"><i class="bx bxs-plus-square"></i>Thêm nhà cung cấp</span>
                            </button>
                        </div>
                    </div>
                    <div class="modal fade" id="taoNCCModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                                        Tạo Mới nhà cung cấp
                                    </h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Tên nhà cung cấp</label>
                                                <input v-model="ncc_create.tenNhaCungCap" type="text"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Email</label>
                                                <input v-model="ncc_create.email" type="email"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Số điện thoại</label>
                                                <input v-model="ncc_create.soDienThoai" type="text"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Địa chỉ</label>
                                                <input v-model="ncc_create.diaChi" type="text"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Người đại diện</label>
                                                <input v-model="ncc_create.nguoiDaiDien" type="text"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Trạng thái</label>
                                                <select v-model="ncc_create.trangThai" class="form-control mt-2">
                                                    <option :value="true">Hoạt động</option>
                                                    <option :value="false">Không hoạt động</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                        Close</button>
                                    <button v-on:click="themNCC()" type="button" data-bs-dismiss="modal"
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
                    <h5 class="mt-2">Quản lý nhà cung cấp</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="text-center ">
                                    <th>#</th>
                                    <th>Tên nhà cung cấp</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Địa chỉ</th>
                                    <th>Người đại diện</th>
                                    <th>Trạng thái</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(v, k) in danh_sach_ncc" :key="k">
                                    <tr class="text-center align-middle">
                                        <td>{{ k + 1 }}</td>
                                        <td>{{ v.tenNhaCungCap }}</td>
                                        <td>{{ v.email }}</td>
                                        <td>{{ v.soDienThoai }}</td>
                                        <td>{{ v.diaChi }}</td>
                                        <td>{{ v.nguoiDaiDien }}</td>
                                        <td>
                                            <span :class="v.trangThai == 1 ? 'badge bg-success' : 'badge bg-danger'">
                                                {{ v.trangThai == 1 ? 'Hoạt động' : 'Không hoạt động' }}
                                            </span>
                                        </td>
                                        <td class="text-center">
                                            <button v-if="permissions.canUpdate"
                                                v-on:click="Object.assign(ncc_update, v); id_ncc_update = v.id"
                                                data-bs-toggle="modal" data-bs-target="#updateModal"
                                                class="btn btn-info">Cập nhật</button>
                                            <button v-if="permissions.canDelete" v-on:click="id_ncc_delete = v.id"
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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật nhà cung cấp</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Tên nhà cung cấp</label>
                                <input v-model="ncc_update.tenNhaCungCap" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Email</label>
                                <input v-model="ncc_update.email" type="email" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Số điện thoại</label>
                                <input v-model="ncc_update.soDienThoai" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Địa chỉ</label>
                                <input v-model="ncc_update.diaChi" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Người đại diện</label>
                                <input v-model="ncc_update.nguoiDaiDien" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Trạng thái</label>
                                <select v-model="ncc_update.trangThai" class="form-control mt-2">
                                    <option value="true">Hoạt động</option>
                                    <option value="false">Không hoạt động</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="capNhatNCC()" data-bs-dismiss="modal" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!-- delete Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xoá nhà cung cấp</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert">
                        Bạn có thực sự muốn xoá!
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="xoaNCC()" type="button" data-bs-dismiss="modal"
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
            danh_sach_ncc: [],
            ncc_create: {
                tenNhaCungCap: "",
                email: "",
                soDienThoai: "",
                diaChi: "",
                nguoiDaiDien: "",
                trangThai: true
            },
            ncc_update: {},
            id_ncc_update: "",
            id_ncc_delete: "",
            permissions: {
                canView: false,
                canCreate: false,
                canUpdate: false,
                canDelete: false
            },
        };
    },
    async created() {
        // Check permissions when component is created
        const permissions = await checkMultiplePermissions([
            'SUPPLIER_VIEW',
            'SUPPLIER_CREATE',
            'SUPPLIER_UPDATE',
            'SUPPLIER_DELETE'
        ]);
        
        this.permissions = {
            canView: permissions.SUPPLIER_VIEW || false,
            canCreate: permissions.SUPPLIER_CREATE || false,
            canUpdate: permissions.SUPPLIER_UPDATE || false,
            canDelete: permissions.SUPPLIER_DELETE || false
        };
        
        if (this.permissions.canView) {
            // Only load data if user has view permission
            await this.layNCC();
        } else {
            toaster.error("Bạn không có quyền xem nhà cung cấp!");
        }
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
        layNCC() {
            axios
                .get("/api/admin/nha-cung-cap", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    this.danh_sach_ncc = res.data.data;
                    console.log(this.danh_sach_ncc);
                })
                .catch((error) => {
                    console.error("Lỗi khi lấy danh sách nhà cung cấp:", error);
                    toaster.error("Có lỗi xảy ra khi lấy danh sách nhà cung cấp!");
                });
        },
        themNCC() {
            axios
                .post('/api/admin/nha-cung-cap', this.ncc_create, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.layNCC();
                        // Reset form sau khi thêm thành công
                        this.ncc_create = {
                            tenNhaCungCap: "",
                            email: "",
                            soDienThoai: "",
                            diaChi: "",
                            nguoiDaiDien: "",
                            trangThai: true
                        };
                    } else {
                        toaster.error(res.data.message || "Thêm nhà cung cấp thất bại!");
                    }
                })
                .catch((error) => {
                    console.error("Lỗi khi thêm nhà cung cấp:", error);
                    toaster.error("Có lỗi xảy ra khi thêm nhà cung cấp!");
                });
        },
        xoaNCC() {
            axios
                .delete("/api/admin/nha-cung-cap/" + this.id_ncc_delete, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.layNCC();
                    } else {
                        toaster.error(res.data.message || "Xóa nhà cung cấp thất bại!");
                    }
                })
                .catch((error) => {
                    console.error("Lỗi khi xóa nhà cung cấp:", error);
                    toaster.error("Có lỗi xảy ra khi xóa nhà cung cấp!");
                });
        },
        capNhatNCC() {
            axios
                .put("/api/admin/nha-cung-cap/" + this.id_ncc_update, this.ncc_update, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.layNCC();
                        this.ncc_update = {};
                    } else {
                        toaster.error(res.data.message || "Cập nhật nhà cung cấp thất bại!");
                    }
                })
                .catch((error) => {
                    console.error("Lỗi khi cập nhật nhà cung cấp:", error);
                    toaster.error("Có lỗi xảy ra khi cập nhật nhà cung cấp!");
                });
        }
    },
}
</script>

<style></style>