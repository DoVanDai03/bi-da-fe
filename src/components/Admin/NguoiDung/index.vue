<template >
    <div>
        <!-- them -->
        <div class="row" v-if="permissions.canView">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-lg-3 col-xl-2">
                                <button v-if="permissions.canCreate" class="btn btn-primary mb-3 mb-lg-0" data-bs-toggle="modal"
                                    data-bs-target="#taoNguoiDungModal">
                                    <i class="bx bxs-plus-square"></i>Thêm người dùng
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
                                                    <select v-model="nguoi_dung_create.chucVuId" class="form-control mt-2" required>
                                                        <option value="">Chọn chức vụ</option>
                                                        <option v-for="chucVu in danh_sach_chuc_vu" 
                                                                :key="chucVu.id" 
                                                                :value="chucVu.id">
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
        <div class="row" v-if="permissions.canView">
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
                                            <td>{{ getChucVuName(v.chucVuId) }}</td>
                                            <td>{{ v.tinhTrang == 1 ? 'Hoạt động' : 'Không hoạt động' }}</td>
                                            <td>{{ formatDate(v.ngayTao) }}</td>
                                            <td>{{ formatDate(v.ngayCapNhat) }}</td>
                                            <td class="text-center">
                                                <button v-if="permissions.canUpdate"
                                                    v-on:click="Object.assign(nguoi_dung_update, v); id_nguoi_dung_update = v.id"
                                                    data-bs-toggle="modal" data-bs-target="#updateModal"
                                                    class="btn btn-info">Cập nhật</button>
                                                <button v-if="permissions.canDelete" v-on:click="id_nguoi_dung_delete = v.id"
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
                                <select v-model="nguoi_dung_update.chucVuId" class="form-control mt-2" required>
                                    <option value="">Chọn chức vụ</option>
                                    <option v-for="chucVu in danh_sach_chuc_vu" :key="chucVu.id" :value="chucVu.id">
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
            danh_sach_nguoi_dung: [],
            danh_sach_chuc_vu: [],
            nguoi_dung_create: {},
            nguoi_dung_update: {},
            id_nguoi_dung_update: "",
            id_nguoi_dung_delete: "",
        };
    },
    async created() {
        try {
            console.log('Checking permissions...'); // Debug log
            const permissions = await checkMultiplePermissions([
                'ADMIN_VIEW',
                'ADMIN_CREATE',
                'ADMIN_UPDATE',
                'ADMIN_DELETE'
            ]);
            
            console.log('Permissions result:', permissions); // Debug log
            
            this.permissions = {
                canView: permissions.ADMIN_VIEW === true,
                canCreate: permissions.ADMIN_CREATE === true,
                canUpdate: permissions.ADMIN_UPDATE === true,
                canDelete: permissions.ADMIN_DELETE === true
            };
            
            if (this.permissions.canView) {
                await this.layNguoiDung();
                await this.layChucVu();
            } else {
                toaster.error("Bạn không có quyền xem danh sách admin!");
            }
        } catch (error) {
            console.error('Error in created hook:', error);
            toaster.error('Có lỗi xảy ra khi khởi tạo component');
        }
    },
    mounted() {
        this.layChucVu();
        this.layNguoiDung();
    },
    methods: {
        formatDate(date) {
            if (!date) return "";
            return new Date(date).toLocaleDateString("vi-VN");
        },
        async layNguoiDung() {
            try {
                const response = await axios.get(`/api/admin`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    }
                });
                console.log('API Response:', response.data); // Debug log
                if (response.data.status) {
                    // Kiểm tra cấu trúc dữ liệu
                    if (response.data.data && Array.isArray(response.data.data)) {
                        this.danh_sach_nguoi_dung = response.data.data;
                    } else if (response.data.data && response.data.data.users) {
                        this.danh_sach_nguoi_dung = response.data.data.users;
                    } else {
                        console.error('Unexpected data structure:', response.data);
                        toaster.error('Cấu trúc dữ liệu không hợp lệ');
                    }
                } else {
                    toaster.error(response.data.message || 'Không thể tải danh sách người dùng');
                }
            } catch (error) {
                console.error('Error loading users:', error);
                toaster.error(error.response?.data?.message || 'Có lỗi xảy ra khi tải danh sách người dùng');
            }
        },
        async layChucVu() {
            try {
                const response = await axios.get(`/api/admin/chuc-vu`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    }
                });
                console.log('Chuc vu Response:', response.data); // Debug log
                if (response.data.status) {
                    if (response.data.data && Array.isArray(response.data.data)) {
                        this.danh_sach_chuc_vu = response.data.data;
                    } else if (response.data.data && response.data.data.chucVus) {
                        this.danh_sach_chuc_vu = response.data.data.chucVus;
                    } else {
                        console.error('Unexpected chuc vu data structure:', response.data);
                        toaster.error('Cấu trúc dữ liệu chức vụ không hợp lệ');
                    }
                } else {
                    toaster.error(response.data.message || 'Không thể tải danh sách chức vụ');
                }
            } catch (error) {
                console.error('Error loading chuc vu:', error);
                toaster.error(error.response?.data?.message || 'Có lỗi xảy ra khi tải danh sách chức vụ');
            }
        },
        async themNguoiDung() {
            try {
                const response = await axios.post(`/api/admin/them-moi`, this.nguoi_dung_create, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    }
                });
                this.danh_sach_nguoi_dung.push(response.data.data.user);
                this.nguoi_dung_create = {};
                toaster.success("Thêm người dùng thành công!");
                this.layNguoiDung();
            } catch (error) {
                console.error('Error adding user:', error);
                toaster.error("Thêm người dùng thất bại!");
            }
        },
        async capNhatNguoiDung() {
            try {
                const response = await axios.put(`/api/admin/${this.id_nguoi_dung_update}`, this.nguoi_dung_update, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    }
                });
                const index = this.danh_sach_nguoi_dung.findIndex(u => u.id === this.id_nguoi_dung_update);
                if (index !== -1) {
                    this.danh_sach_nguoi_dung[index] = response.data.data.user;
                }
                this.nguoi_dung_update = {};
                toaster.success("Cập nhật người dùng thành công!");
                this.layNguoiDung();
            } catch (error) {
                console.error('Error updating user:', error);
                toaster.error("Cập nhật người dùng thất bại!");
            }
        },
        async xoaNguoiDung() {
            try {
                await axios.delete(`/api/admin/${this.id_nguoi_dung_delete}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    }
                });
                this.danh_sach_nguoi_dung = this.danh_sach_nguoi_dung.filter(u => u.id !== this.id_nguoi_dung_delete);
                this.id_nguoi_dung_delete = "";
                toaster.success("Xoá người dùng thành công!");
                this.layNguoiDung();
            } catch (error) {
                console.error('Error deleting user:', error);
                toaster.error("Xoá người dùng thất bại!");
            }
        },
        getChucVuName(id) {
            const chucVu = this.danh_sach_chuc_vu.find(cv => cv.id === id);
            return chucVu ? chucVu.tenChucVu : "Chưa xác định";
        }
    }
}
</script>