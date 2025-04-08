<template>
    <!-- them -->
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-lg-3 col-xl-2">
                            <button class="btn btn-primary mb-3 mb-lg-0" data-bs-toggle="modal"
                                data-bs-target="#taoSanPhamModal">
                                <span class="text-nowrap"><i class="bx bxs-plus-square"></i>Thêm sản phẩm</span>
                            </button>
                        </div>
                    </div>
                    <div class="modal fade" id="taoSanPhamModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                                        Tạo Mới sản phẩm
                                    </h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Tên sản phẩm</label>
                                                <input v-model="san_pham_create.tenSanPham" type="text"
                                                    class="form-control mt-2" required />
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Danh mục</label>
                                                <select v-model="san_pham_create.idDanhMuc" class="form-control mt-2" required>
                                                    <option v-for="dm in danh_sach_danh_muc" :key="dm.id" :value="dm.id">
                                                        {{ dm.name }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Thương hiệu</label>
                                                <select v-model="san_pham_create.idThuongHieu" class="form-control mt-2" required>
                                                    <option v-for="th in danh_sach_thuong_hieu" :key="th.id" :value="th.id">
                                                        {{ th.tenThuongHieu }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Giảm giá</label>
                                                <select v-model="san_pham_create.idGiamGia" class="form-control mt-2">
                                                    <option v-for="gg in danh_sach_giam_gia" :key="gg.id" :value="gg.id">
                                                        {{ gg.maCode }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Nhà cung cấp</label>
                                                <select v-model="san_pham_create.idNhaCungCap" class="form-control mt-2" required>
                                                    <option v-for="ncc in danh_sach_nha_cung_cap" :key="ncc.id" :value="ncc.id">
                                                        {{ ncc.tenNhaCungCap }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Giá sản phẩm</label>
                                                <input v-model="san_pham_create.giaSanPham" type="number"
                                                    class="form-control mt-2" required />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Số lượng tồn kho</label>
                                                <input v-model="san_pham_create.soLuongTonKho" type="number"
                                                    class="form-control mt-2" required />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Kích cỡ</label>
                                                <input v-model="san_pham_create.kichCo" type="text"
                                                    class="form-control mt-2" required />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Màu sắc</label>
                                                <input v-model="san_pham_create.mauSac" type="text"
                                                    class="form-control mt-2" required />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Chất liệu</label>
                                                <input v-model="san_pham_create.chatLieu" type="text"
                                                    class="form-control mt-2" required />
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="mb-2 mt-2">
                                                <label>Mô tả</label>
                                                <textarea v-model="san_pham_create.moTa" class="form-control mt-2" rows="3"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Hình ảnh</label>
                                                <input v-model="san_pham_create.hinhAnh" type="text" class="form-control mt-2" placeholder="Nhập link hình ảnh" />
                                                <img v-if="san_pham_create.hinhAnh" :src="san_pham_create.hinhAnh" class="mt-2" style="max-width: 200px;" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Trạng thái</label>
                                                <select v-model="san_pham_create.trangThai" class="form-control mt-2" required>
                                                    <option value=true>Hoạt động</option>
                                                    <option value="false">Không hoạt động</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                        Close</button>
                                    <button v-on:click="themSanPham()" type="button" data-bs-dismiss="modal"
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
                    <h5 class="mt-2">Quản lý sản phẩm</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="text-center">
                                    <th>#</th>
                                    <th>Hình ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Danh mục</th>
                                    <th>Thương hiệu</th>
                                    <th>Nhà cung cấp</th>
                                    <th>Giá</th>
                                    <th>Tồn kho</th>
                                    <th>Kích cỡ</th>
                                    <th>Màu sắc</th>
                                    <th>Chất liệu</th>
                                    <th>Mô tả</th>
                                    <th>Trạng thái</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(v, k) in danh_sach_san_pham" :key="k">
                                    <tr class="text-center align-middle">
                                        <td>{{ k + 1 }}</td>
                                        <td>
                                            <img :src="v.hinhAnh" alt="Product Image" style="max-width: 50px;" />
                                        </td>
                                        <td>{{ v.tenSanPham }}</td>
                                        <td>{{ v.danhMuc?.name || 'N/A' }}</td>
                                        <td>{{ v.thuongHieu?.tenThuongHieu || 'N/A' }}</td>
                                        <td>{{ v.nhaCungCap?.tenNhaCungCap || 'N/A' }}</td>
                                        <td>{{ v.giaSanPham ? formatCurrency(v.giaSanPham) : 'N/A' }}</td>
                                        <td>{{ v.soLuongTonKho || 'N/A' }}</td>
                                        <td>{{ v.kichCo || 'N/A' }}</td>
                                        <td>{{ v.mauSac || 'N/A' }}</td>
                                        <td>{{ v.chatLieu || 'N/A' }}</td>
                                        <td>{{ v.moTa || 'N/A' }}</td>
                                        <td>
                                            <span :class="v.trangThai ? 'badge bg-success' : 'badge bg-danger'">
                                                {{ v.trangThai ? 'Hoạt động' : 'Không hoạt động' }}
                                            </span>
                                        </td>
                                        <td class="text-center">
                                            <button v-on:click="Object.assign(san_pham_update,v); id_san_pham_update = v.id"
                                                data-bs-toggle="modal" data-bs-target="#updateModal"
                                                class="btn btn-info">Cập nhật</button>
                                            <button v-on:click="id_san_pham_delete = v.id"
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
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật sản phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Tên sản phẩm</label>
                                <input v-model="san_pham_update.tenSanPham" type="text" class="form-control mt-2" required />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Danh mục</label>
                                <select v-model="san_pham_update.idDanhMuc" class="form-control mt-2" required>
                                    <option v-for="dm in danh_sach_danh_muc" :key="dm.id" :value="dm.id">
                                        {{ dm.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Thương hiệu</label>
                                <select v-model="san_pham_update.idThuongHieu" class="form-control mt-2" required>
                                    <option v-for="th in danh_sach_thuong_hieu" :key="th.id" :value="th.id">
                                        {{ th.tenThuongHieu }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Giảm giá</label>
                                <select v-model="san_pham_update.idGiamGia" class="form-control mt-2">
                                    <option value="">Không có giảm giá</option>
                                    <option v-for="gg in danh_sach_giam_gia" :key="gg.id" :value="gg.id">
                                        {{ gg.maCode }} - {{ gg.phamTramGiamGia }}%
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Nhà cung cấp</label>
                                <select v-model="san_pham_update.idNhaCungCap" class="form-control mt-2" required>
                                    <option v-for="ncc in danh_sach_nha_cung_cap" :key="ncc.id" :value="ncc.id">
                                        {{ ncc.tenNhaCungCap }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Giá sản phẩm</label>
                                <input v-model="san_pham_update.giaSanPham" type="number" class="form-control mt-2" required />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Số lượng tồn kho</label>
                                <input v-model="san_pham_update.soLuongTonKho" type="number" class="form-control mt-2" required />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Kích cỡ</label>
                                <input v-model="san_pham_update.kichCo" type="text" class="form-control mt-2" required />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Màu sắc</label>
                                <input v-model="san_pham_update.mauSac" type="text" class="form-control mt-2" required />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Chất liệu</label>
                                <input v-model="san_pham_update.chatLieu" type="text" class="form-control mt-2" required />
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="mb-2 mt-2">
                                <label>Mô tả</label>
                                <textarea v-model="san_pham_update.moTa" class="form-control mt-2" rows="3"></textarea>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Hình ảnh</label>
                                <input v-model="san_pham_update.hinhAnh" type="text" class="form-control mt-2" placeholder="Nhập link hình ảnh" />
                                <img v-if="san_pham_update.hinhAnh" :src="san_pham_update.hinhAnh" class="mt-2" style="max-width: 200px;" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Trạng thái</label>
                                <select v-model="san_pham_update.trangThai" class="form-control mt-2" required>
                                    <option value="1">Hoạt động</option>
                                    <option value="0">Không hoạt động</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="capNhatSanPham()" data-bs-dismiss="modal" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!-- delete Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xoá sản phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert">
                        Bạn có thực sự muốn xoá!
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="xoaSanPham()" type="button" data-bs-dismiss="modal"
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
            danh_sach_san_pham: [],
            danh_sach_danh_muc: [],
            danh_sach_thuong_hieu: [],
            danh_sach_giam_gia: [],
            danh_sach_nha_cung_cap: [],
            san_pham_create: {},
            san_pham_update: {},
            id_san_pham_update: "",
            id_san_pham_delete: "",
        };
    },
    computed: {
        getDanhMucName() {
            return (id) => {
                const danhMuc = this.danh_sach_danh_muc.find(dm => dm.id === id);
                return danhMuc ? danhMuc.name : '';
            }
        },
        getThuongHieuName() {
            return (id) => {
                const thuongHieu = this.danh_sach_thuong_hieu.find(th => th.id === id);
                return thuongHieu ? thuongHieu.tenThuongHieu : '';
            }
        },
        getNhaCungCapName() {
            return (id) => {
                const nhaCungCap = this.danh_sach_nha_cung_cap.find(ncc => ncc.id === id);
                return nhaCungCap ? nhaCungCap.tenNhaCungCap : '';
            }
        }
    },
    mounted() {
        this.laySanPham();
        this.layDanhMuc();
        this.layThuongHieu();
        this.layGiamGia();
        this.layNhaCungCap();
    },
    methods: {
        formatCurrency(amount) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
        },
        laySanPham() {
            axios
                .get("/api/admin/san-pham", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    this.danh_sach_san_pham = res.data.data;
                });
        },
        layDanhMuc() {
            axios
                .get("/api/admin/danh-muc", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        this.danh_sach_danh_muc = res.data.data;
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    toaster.error('Có lỗi xảy ra khi lấy danh sách danh mục!');
                    console.error('Error fetching categories:', error);
                });
        },
        layThuongHieu() {
            axios
                .get("/api/admin/thuong-hieu", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        this.danh_sach_thuong_hieu = res.data.data;
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    toaster.error('Có lỗi xảy ra khi lấy danh sách thương hiệu!');
                    console.error('Error fetching brands:', error);
                });
        },
        layGiamGia() {
            axios
                .get("/api/admin/giam-gia", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        this.danh_sach_giam_gia = res.data.data;
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    toaster.error('Có lỗi xảy ra khi lấy danh sách giảm giá!');
                    console.error('Error fetching discounts:', error);
                });
        },
        layNhaCungCap() {
            axios
                .get("/api/admin/nha-cung-cap", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        this.danh_sach_nha_cung_cap = res.data.data;
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    toaster.error('Có lỗi xảy ra khi lấy danh sách nhà cung cấp!');
                    console.error('Error fetching suppliers:', error);
                });
        },
        themSanPham() {
            axios
                .post('/api/admin/san-pham', this.san_pham_create, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.laySanPham();
                        console.log(this.san_pham_create);
                        
                        this.san_pham_create = {};
                    }
                });
        },
        xoaSanPham() {
            axios
                .delete("/api/admin/san-pham/" + this.id_san_pham_delete, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.laySanPham();
                    }
                });
        },
        capNhatSanPham() {
            axios
                .put("/api/admin/san-pham/" + this.id_san_pham_update, this.san_pham_update, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.laySanPham();
                        this.san_pham_update = {};
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
