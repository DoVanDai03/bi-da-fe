<template>
    <div class="container-fluid">
        <div class="row" v-if="permissions.canView">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Quản lý đơn hàng</h3>
                    </div>
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-lg-3 col-xl-2">
                                <button v-if="permissions.canCreate" class="btn btn-primary mb-3 mb-lg-0" data-bs-toggle="modal"
                                    data-bs-target="#taoDonHangModal">
                                    <i class="bx bxs-plus-square"></i>Thêm đơn hàng
                                </button>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>ID Khách hàng</th>
                                        <th>Mã giảm giá</th>
                                        <th>Phương thức thanh toán</th>
                                        <th>Tổng tiền</th>
                                        <th>Địa chỉ giao</th>
                                        <th>Tên người nhận</th>
                                        <th>SĐT người nhận</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="donHang in danhSachDonHang" :key="donHang.id">
                                        <td>{{ donHang.id }}</td>
                                        <td>{{ donHang.idKhachHang }}</td>
                                        <td>{{ donHang.maGiamGia || 'Không có' }}</td>
                                        <td>{{ donHang.phuongThucThanhToan }}</td>
                                        <td>{{ formatPrice(donHang.tongTien) }}</td>
                                        <td>{{ donHang.diaChiGiao }}</td>
                                        <td>{{ donHang.tenNguoiNhan }}</td>
                                        <td>{{ donHang.sdtNguoiNhan }}</td>
                                        <td>
                                            <select class="form-control" v-model="donHang.trangThai"
                                                @change="updateTrangThai(donHang.id)">
                                                <option value="pending">Chờ xử lý</option>
                                                <option value="processing">Đang xử lý</option>
                                                <option value="shipped">Đang giao hàng</option>
                                                <option value="delivered">Đã giao hàng</option>
                                                <option value="cancelled">Đã hủy</option>
                                                <option value="returned">Đã hoàn trả</option>
                                                <option value="completed">Đã hoàn thành</option>
                                            </select>
                                        </td>                                      
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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
    name: 'DonHang',
    data() {
        return {
            danhSachDonHang: [],
            donHangForm: {
                id: null,
                idKhachHang: '',
                maGiamGia: '',
                phuongThucThanhToan: 'onDelivery',
                tongTien: '',
                diaChiGiao: '',
                tenNguoiNhan: '',
                sdtNguoiNhan: '',
                trangThai: 'pending'
            },
            isEdit: false,
            permissions: {
                canView: false,
                canCreate: false,
                canUpdate: false,
                canDelete: false
            },
            id_don_hang_update: null,
            id_don_hang_delete: null
        }
    },
    async created() {
        // Check permissions when component is created
        const permissions = await checkMultiplePermissions([
            'ORDER_VIEW',
            'ORDER_UPDATE_STATUS'
        ]);
        
        this.permissions = {
            canView: permissions.ORDER_VIEW || false,
            canUpdate: permissions.ORDER_UPDATE_STATUS || false
        };
        
        if (this.permissions.canView) {
            // Only load data if user has view permission
            await this.loadDonHang();
        } else {
            toaster.error("Bạn không có quyền xem đơn hàng!");
        }
    },
    methods: {
        loadDonHang() {
            const token = localStorage.getItem('token_admin');
            axios.get('/api/admin/chi-tiet-don-hang', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.data.status) {
                        this.danhSachDonHang = response.data.data;
                    } else {
                        toaster.error(response.data.message || 'Có lỗi xảy ra khi tải danh sách đơn hàng');
                    }
                })
                .catch(error => {
                    console.error('Error loading orders:', error);
                    toaster.error('Có lỗi xảy ra khi tải danh sách đơn hàng');
                });
        },
        updateTrangThai(id) {
            const token = localStorage.getItem('token_admin');
            const donHang = this.danhSachDonHang.find(dh => dh.id === id);

            if (!donHang) {
                toaster.error('Không tìm thấy đơn hàng');
                return;
            }

            axios.put(`/api/admin/chi-tiet-don-hang/cap-nhat-trang-thai/${id}`,
                { trangThai: donHang.trangThai },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then(response => {
                    if (response.data.status) {
                        toaster.success('Cập nhật trạng thái thành công');
                        // Cập nhật lại thông tin đơn hàng trong danh sách
                        const index = this.danhSachDonHang.findIndex(dh => dh.id === id);
                        if (index !== -1) {
                            this.danhSachDonHang[index].trangThai = response.data.data.trangThai;
                            this.danhSachDonHang[index].ngayCapNhat = response.data.data.ngayCapNhat;
                        }
                    } else {
                        toaster.error(response.data.message || 'Có lỗi xảy ra khi cập nhật trạng thái');
                        // Khôi phục trạng thái cũ nếu cập nhật thất bại
                        this.loadDonHang();
                    }
                })
                .catch(error => {
                    console.error('Error updating order status:', error);
                    toaster.error('Có lỗi xảy ra khi cập nhật trạng thái');
                    // Khôi phục trạng thái cũ nếu cập nhật thất bại
                    this.loadDonHang();
                });
        },
        formatPrice(price) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(price);
        }
    }
}
</script>

<style scoped>
.card {
    margin-top: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.table th {
    background-color: #f8f9fa;
}

.form-control {
    min-width: 150px;
}

.btn-sm {
    margin-right: 5px;
}

select.form-control {
    padding: 0.375rem 0.75rem;
    font-size: 0.9rem;
}

select.form-control option {
    padding: 0.5rem;
}

/* Thêm style cho các trạng thái */
select.form-control option[value="pending"] {
    color: #ffc107;
}

select.form-control option[value="processing"] {
    color: #17a2b8;
}

select.form-control option[value="shipped"] {
    color: #007bff;
}

select.form-control option[value="delivered"] {
    color: #28a745;
}

select.form-control option[value="cancelled"] {
    color: #dc3545;
}

select.form-control option[value="returned"] {
    color: #6c757d;
}
</style>