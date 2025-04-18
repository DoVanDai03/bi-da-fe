<template lang="">
    <div>
        <!-- Create Permission Modal -->
        <div class="row" v-if="permissions.canView">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-lg-3 col-xl-2">
                                <button v-if="permissions.canCreate" class="btn btn-primary mb-3 mb-lg-0" data-bs-toggle="modal"
                                    data-bs-target="#taoQuyenModal">
                                    <span class="text-nowrap"><i class="bx bxs-plus-square"></i>Thêm quyền</span>
                                </button>
                            </div>
                        </div>
                        <div class="modal fade" id="taoQuyenModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Tạo Mới Quyền</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="mb-3">
                                            <label class="form-label">Tên Quyền</label>
                                            <input v-model="quyen_create.tenQuyen" type="text" class="form-control" required />
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Mã Quyền</label>
                                            <input v-model="quyen_create.maQuyen" type="text" class="form-control" required />
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Mô tả</label>
                                            <textarea v-model="quyen_create.moTa" class="form-control" rows="3"></textarea>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Tình trạng</label>
                                            <select v-model="quyen_create.tinhTrang" class="form-control">
                                                <option :value="true">Hoạt động</option>
                                                <option :value="false">Không hoạt động</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                        <button v-on:click="themQuyen()" type="button" class="btn btn-primary" data-bs-dismiss="modal">
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

        <!-- Permission List Table -->
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mt-2">Quản lý quyền truy cập</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr class="text-center">
                                        <th>#</th>
                                        <th>Tên quyền</th>
                                        <th>Mã quyền</th>
                                        <th>Mô tả</th>
                                        <th>Tình trạng</th>
                                        <th>Ngày tạo</th>
                                        <th>Ngày cập nhật</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(v, k) in danh_sach_quyen" :key="k">
                                        <tr class="text-center align-middle">
                                            <td>{{ k + 1 }}</td>
                                            <td>{{ v.tenQuyen }}</td>
                                            <td>{{ v.maQuyen }}</td>
                                            <td>{{ v.moTa }}</td>
                                            <td>
                                                <span :class="v.tinhTrang ? 'badge bg-success' : 'badge bg-danger'">
                                                    {{ v.tinhTrang ? 'Hoạt động' : 'Không hoạt động' }}
                                                </span>
                                            </td>
                                            <td>{{ formatDate(v.ngayTao) }}</td>
                                            <td>{{ formatDate(v.ngayCapNhat) }}</td>
                                            <td>
                                                <button v-if="permissions.canUpdate"
                                                    v-on:click="editQuyen(v)" class="btn btn-warning me-2" data-bs-toggle="modal"
                                                    data-bs-target="#editQuyenModal">
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <button v-if="permissions.canDelete" v-on:click="xoaQuyen(v.id)" class="btn btn-danger">
                                                    <i class="fa-solid fa-trash"></i>
                                                </button>
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

        <!-- Edit Permission Modal -->
        <div class="modal fade" id="editQuyenModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật Quyền</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Tên Quyền</label>
                            <input v-model="quyen_update.tenQuyen" type="text" class="form-control" required />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Mã Quyền</label>
                            <input v-model="quyen_update.maQuyen" type="text" class="form-control" required />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Mô tả</label>
                            <textarea v-model="quyen_update.moTa" class="form-control" rows="3"></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Tình trạng</label>
                            <select v-model="quyen_update.tinhTrang" class="form-control">
                                <option :value="true">Hoạt động</option>
                                <option :value="false">Không hoạt động</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button v-on:click="capNhatQuyen()" type="button" class="btn btn-primary" data-bs-dismiss="modal">
                            Cập Nhật
                        </button>
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
            danh_sach_quyen: [],
            quyen_create: {
                tenQuyen: '',
                maQuyen: '',
                moTa: '',
                tinhTrang: true
            },
            quyen_update: {
                id: 0,
                tenQuyen: '',
                maQuyen: '',
                moTa: '',
                tinhTrang: true
            }
        }
    },

    methods: {
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleString('vi-VN');
        },

        loadDanhSachQuyen() {
            axios.get('/api/admin/quyen', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                },
            })
                .then((res) => {
                    if (res.data.status) {
                        this.danh_sach_quyen = res.data.data;
                    }
                })
                .catch((err) => {
                    toaster.error("Đã có lỗi xảy ra!");
                });
        },

        themQuyen() {
            axios.post('/api/admin/quyen', this.quyen_create, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                },
            })
                .then((res) => {
                    if (res.data.status) {
                        toaster.success("Đã thêm quyền mới!");
                        this.loadDanhSachQuyen();
                        this.quyen_create = {
                            tenQuyen: '',
                            maQuyen: '',
                            moTa: '',
                            tinhTrang: true
                        };
                    }
                })
                .catch((err) => {
                    toaster.error("Đã có lỗi xảy ra!");
                });
        },

        editQuyen(quyen) {
            this.quyen_update = { ...quyen };
        },

        capNhatQuyen() {
            axios.put('/api/admin/quyen/' + this.quyen_update.id, this.quyen_update, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                },
            })
                .then((res) => {
                    if (res.data.status) {
                        toaster.success("Đã cập nhật quyền!");
                        this.loadDanhSachQuyen();
                    }
                })
                .catch((err) => {
                    toaster.error("Đã có lỗi xảy ra!");
                });
        },

        xoaQuyen(id) {
            if (confirm('Bạn có chắc chắn muốn xóa quyền này?')) {
                axios.delete('/api/admin/quyen/' + id, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                    .then((res) => {
                        if (res.data.status) {
                            toaster.success("Đã xóa quyền!");
                            this.loadDanhSachQuyen();
                        }
                    })
                    .catch((err) => {
                        toaster.error("Đã có lỗi xảy ra!");
                    });
            }
        }
    },

    async created() {
        // Check permissions when component is created
        const permissions = await checkMultiplePermissions([
            'ACCESS_VIEW',
            'ACCESS_CREATE',
            'ACCESS_UPDATE',
            'ACCESS_DELETE'
        ]);
        
        this.permissions = {
            canView: permissions.ACCESS_VIEW || false,
            canCreate: permissions.ACCESS_CREATE || false,
            canUpdate: permissions.ACCESS_UPDATE || false,
            canDelete: permissions.ACCESS_DELETE || false
        };
        
        if (this.permissions.canView) {
            // Only load data if user has view permission
            await this.loadDanhSachQuyen();
        } else {
            toaster.error("Bạn không có quyền xem danh sách quyền truy cập!");
        }
    }
}
</script>

<style lang="">
    
</style>