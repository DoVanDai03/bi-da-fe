<template>
    <!-- them -->
    <div class="row" v-if="permissions.canView">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-lg-3 col-xl-2">
                            <button v-if="permissions.canCreate" class="btn btn-primary mb-3 mb-lg-0" data-bs-toggle="modal"
                                data-bs-target="#taoKhachHangModal">
                                <i class="bx bxs-plus-square"></i>Thêm khách hàng
                            </button>
                        </div>
                    </div>
                    <div class="modal fade" id="taoKhachHangModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                                        Tạo Mới khách hàng
                                    </h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Email</label>
                                                <input v-model="khach_hang_create.email" type="email"
                                                    class="form-control mt-2" required />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Mật khẩu</label>
                                                <input v-model="khach_hang_create.password" type="password"
                                                    class="form-control mt-2" required />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Họ và tên</label>
                                                <input v-model="khach_hang_create.hoVaTen" type="text"
                                                    class="form-control mt-2" required />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Số điện thoại</label>
                                                <input v-model="khach_hang_create.sdt" type="tel"
                                                    class="form-control mt-2" required />
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="mb-2 mt-2">
                                                <label>Địa chỉ</label>
                                                <input v-model="khach_hang_create.diaChi" type="text"
                                                    class="form-control mt-2" required />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Ngày sinh</label>
                                                <input v-model="khach_hang_create.ngaySinh" type="date"
                                                    class="form-control mt-2" required />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Giới tính</label>
                                                <select v-model="khach_hang_create.gioiTinh" class="form-control mt-2" required>
                                                    <option value="1">Nam</option>
                                                    <option value="0">Nữ</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                        Close</button>
                                    <button v-on:click="themKhachHang()" type="button" data-bs-dismiss="modal"
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
                    <h5 class="mt-2">Quản lý khách hàng</h5>
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
                                    <th>Địa chỉ</th>
                                    <th>Ngày sinh</th>
                                    <th>Giới tính</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(v, k) in danh_sach_khach_hang" :key="k">
                                    <tr class="text-center align-middle">
                                        <td>{{ k + 1 }}</td>
                                        <td>{{ v.email }}</td>
                                        <td>{{ v.hoVaTen }}</td>
                                        <td>{{ v.sdt }}</td>
                                        <td>{{ v.diaChi }}</td>
                                        <td>{{ formatDate(v.ngaySinh) }}</td>
                                        <td>{{ v.gioiTinh == 1 ? 'Nam' : 'Nữ' }}</td>
                                        <td class="text-center">
                                            <button v-if="permissions.canUpdate"
                                                v-on:click="Object.assign(khach_hang_update, v); id_khach_hang_update = v.id"
                                                data-bs-toggle="modal" data-bs-target="#updateModal"
                                                class="btn btn-info">Cập nhật</button>
                                            <button v-if="permissions.canDelete" v-on:click="id_khach_hang_delete = v.id"
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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật khách hàng</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Email</label>
                                <input v-model="khach_hang_update.email" type="email" class="form-control mt-2" required />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Mật khẩu</label>
                                <input v-model="khach_hang_update.password" type="password" class="form-control mt-2" />
                                <small class="text-muted">Để trống nếu không muốn thay đổi mật khẩu</small>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Họ và tên</label>
                                <input v-model="khach_hang_update.hoVaTen" type="text" class="form-control mt-2" required />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Số điện thoại</label>
                                <input v-model="khach_hang_update.sdt" type="tel" class="form-control mt-2" required />
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="mb-2 mt-2">
                                <label>Địa chỉ</label>
                                <input v-model="khach_hang_update.diaChi" type="text" class="form-control mt-2" required />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Ngày sinh</label>
                                <input v-model="khach_hang_update.ngaySinh" type="date" class="form-control mt-2" required />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Giới tính</label>
                                <select v-model="khach_hang_update.gioiTinh" class="form-control mt-2" required>
                                    <option value="1">Nam</option>
                                    <option value="0">Nữ</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="capNhatKhachHang()" data-bs-dismiss="modal" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!-- delete Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xoá khách hàng</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert">
                        Bạn có thực sự muốn xoá!
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="xoaKhachHang()" type="button" data-bs-dismiss="modal"
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
            danh_sach_khach_hang: [],
            khach_hang_create: {},
            khach_hang_update: {},
            id_khach_hang_update: "",
            id_khach_hang_delete: "",
        };
    },
    async created() {
        // Check permissions when component is created
        const permissions = await checkMultiplePermissions([
            'CUSTOMER_VIEW',
            'CUSTOMER_CREATE',
            'CUSTOMER_UPDATE',
            'CUSTOMER_DELETE'
        ]);
        
        this.permissions = {
            canView: permissions.CUSTOMER_VIEW || false,
            canCreate: permissions.CUSTOMER_CREATE || false,
            canUpdate: permissions.CUSTOMER_UPDATE || false,
            canDelete: permissions.CUSTOMER_DELETE || false
        };
        
        if (this.permissions.canView) {
            // Only load data if user has view permission
            await this.layKhachHang();
        } else {
            toaster.error("Bạn không có quyền xem khách hàng!");
        }
    },
    methods: {
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN');
        },
        layKhachHang() {
            axios
                .get("/api/admin/khach-hang", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    this.danh_sach_khach_hang = res.data.data;
                    console.log(this.danh_sach_khach_hang);
                });
        },
        themKhachHang() {
            axios
                .post('/api/admin/khach-hang', this.khach_hang_create, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layKhachHang();
                        this.khach_hang_create = {};
                    }
                });
        },
        xoaKhachHang() {
            axios
                .delete("/api/admin/khach-hang/" + this.id_khach_hang_delete, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layKhachHang();
                    }
                });
        },
        capNhatKhachHang() {
            axios
                .put("/api/admin/khach-hang/"+ this.id_khach_hang_update, this.khach_hang_update, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layKhachHang();
                        this.khach_hang_update = {};
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

<style>
</style>