<template>
    <!-- them -->
    <div class="row" v-if="permissions.canView">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-lg-3 col-xl-2">
                            <button v-if="permissions.canCreate" class="btn btn-primary mb-3 mb-lg-0" data-bs-toggle="modal"
                                data-bs-target="#taoGiamGiaModal">
                                <i class="bx bxs-plus-square"></i>Thêm giảm giá
                            </button>
                        </div>
                    </div>
                    <div class="modal fade" id="taoGiamGiaModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                                        Tạo Mới mã giảm giá
                                    </h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Mã code</label>
                                                <input v-model="giam_gia_create.maCode" type="text"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Phần trăm giảm giá (%)</label>
                                                <input v-model="giam_gia_create.phamTramGiamGia" type="number"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Thành tiền tối thiểu</label>
                                                <input v-model="giam_gia_create.thanhTien" type="number"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Ngày bắt đầu</label>
                                                <input v-model="giam_gia_create.ngayBatDau" type="datetime-local"
                                                    :min="currentDateTime" class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Ngày kết thúc</label>
                                                <input v-model="giam_gia_create.ngayKetThuc" type="datetime-local"
                                                    :min="giam_gia_create.ngayBatDau || currentDateTime" class="form-control mt-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                        Close</button>
                                    <button v-on:click="themGiamGia()" type="button" data-bs-dismiss="modal"
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
                    <h5 class="mt-2">Quản lý giảm giá</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="text-center">
                                    <th>#</th>
                                    <th>Mã code</th>
                                    <th>Phần trăm giảm</th>
                                    <th>Thành tiền tối thiểu</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Ngày kết thúc</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(v, k) in danh_sach_giam_gia" :key="k">
                                    <tr class="text-center align-middle">
                                        <td>{{ k + 1 }}</td>
                                        <td>{{ v.maCode }}</td>
                                        <td>{{ v.phamTramGiamGia }}%</td>
                                        <td>{{ formatCurrency(v.thanhTien) }}</td>
                                        <td>{{ formatDate(v.ngayBatDau) }}</td>
                                        <td>{{ formatDate(v.ngayKetThuc) }}</td>
                                        <td class="text-center">
                                            <button v-if="permissions.canUpdate"
                                                v-on:click="Object.assign(giam_gia_update, v); id_giam_gia_update = v.id"
                                                data-bs-toggle="modal" data-bs-target="#updateModal"
                                                class="btn btn-info">Cập nhật</button>
                                            <button v-if="permissions.canDelete" v-on:click="id_giam_gia_delete = v.id"
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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật mã giảm giá</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Mã code</label>
                                <input v-model="giam_gia_update.maCode" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Phần trăm giảm giá (%)</label>
                                <input v-model="giam_gia_update.phamTramGiamGia" type="number" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Thành tiền tối thiểu</label>
                                <input v-model="giam_gia_update.thanhTien" type="number" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Ngày bắt đầu</label>
                                <input v-model="giam_gia_update.ngayBatDau" type="datetime-local"
                                    :min="currentDateTime" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Ngày kết thúc</label>
                                <input v-model="giam_gia_update.ngayKetThuc" type="datetime-local"
                                    :min="giam_gia_update.ngayBatDau || currentDateTime" class="form-control mt-2" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="capNhatGiamGia()" data-bs-dismiss="modal" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!-- delete Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xoá mã giảm giá</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert">
                        Bạn có thực sự muốn xoá!
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="xoaGiamGia()" type="button" data-bs-dismiss="modal"
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
            danh_sach_giam_gia: [],
            giam_gia_create: {},
            giam_gia_update: {},
            id_giam_gia_update: "",
            id_giam_gia_delete: "",
            currentDateTime: this.getCurrentDateTime(),
        };
    },
    async created() {
        // Check permissions when component is created
        const permissions = await checkMultiplePermissions([
            'DISCOUNT_VIEW',
            'DISCOUNT_CREATE',
            'DISCOUNT_UPDATE',
            'DISCOUNT_DELETE'
        ]);
        
        this.permissions = {
            canView: permissions.DISCOUNT_VIEW || false,
            canCreate: permissions.DISCOUNT_CREATE || false,
            canUpdate: permissions.DISCOUNT_UPDATE || false,
            canDelete: permissions.DISCOUNT_DELETE || false
        };
        
        if (this.permissions.canView) {
            // Only load data if user has view permission
            await this.layGiamGia();
        } else {
            toaster.error("Bạn không có quyền xem giảm giá!");
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
        formatCurrency(amount) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(amount);
        },
        layGiamGia() {
            axios
                .get("/api/admin/giam-gia", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    this.danh_sach_giam_gia = res.data.data;
                    console.log(this.danh_sach_giam_gia);
                });
        },
        getCurrentDateTime() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        },
        themGiamGia() {
            if (!this.validateDates(this.giam_gia_create.ngayBatDau, this.giam_gia_create.ngayKetThuc)) {
                toaster.error('Ngày kết thúc phải sau ngày bắt đầu!');
                return;
            }
            axios
                .post('/api/admin/giam-gia', this.giam_gia_create, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layGiamGia();
                        this.giam_gia_create = {};
                    }
                });
        },
        xoaGiamGia() {
            axios
                .delete("/api/admin/giam-gia/" + this.id_giam_gia_delete, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layGiamGia();
                    }
                });
        },
        validateDates(startDate, endDate) {
            if (!startDate || !endDate) return true;
            return new Date(startDate) < new Date(endDate);
        },
        capNhatGiamGia() {
            if (!this.validateDates(this.giam_gia_update.ngayBatDau, this.giam_gia_update.ngayKetThuc)) {
                toaster.error('Ngày kết thúc phải sau ngày bắt đầu!');
                return;
            }
            axios
                .put("/api/admin/giam-gia/"+ this.id_giam_gia_update, this.giam_gia_update, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layGiamGia();
                        this.giam_gia_update = {};
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