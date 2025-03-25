<template>
    <div class="row" id="app">
        <div class="col-md-3">
            <div class="card ">
                <div class="card-header mt-2">
                    <h5><b> Thêm Mới Chức Vụ </b></h5>
                </div>
                <div class="card-body">
                    <label class="form-lable">Tên Chức Vụ</label>
                    <input v-model="create.ten_chuc_vu" class="form-control mt-1" type="text">
                    <label class="form-lable mt-2"> Tình Trạng</label>
                    <select v-model="create.tinh_trang" class="form-control">
                        <option value="1">Hiển Thị</option>
                        <option value="0">Tạm Dừng</option>
                    </select>
                </div>
                <div class="card-footer text-end">
                    <button v-on:click="ThemMoi()" class="btn btn-primary">Thêm Mới Chức Vụ</button>
                </div>
            </div>
        </div>
        <div class="col-md-9">
            <div class="card">
                <div class="card-header mt-2">
                    <h5><b>Danh Sách Chức Vụ</b></h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class="text-center align-middle text-nowrap">#</th>
                                    <th class="text-center align-middle text-nowrap">Tên Chức Vụ</th>
                                    <th class="text-center align-middle text-nowrap">Tình Trạng</th>
                                    <th class="text-center align-middle text-nowrap">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value, index) in chuc_vu" :key="index">
                                    <tr>
                                        <th class="text-center align-middle text-nowrap">{{ index + 1 }}</th>
                                        <td class="align-middle text-nowrap">{{ value.ten_chuc_vu }}</td>
                                        <td class="align-middle text-nowrap text-center">
                                            <button v-if="value.tinh_trang == 1" class="btn btn-success "
                                                style="width: 100px;">Hiển Thị</button>
                                            <button v-else class="btn btn-warning " style="width: 100px;">Tạm
                                                Tắt</button>
                                        </td>
                                        <td class="text-center align-middle text-nowrap">
                                            <button class="btn btn-info me-2" data-bs-toggle="modal"
                                                data-bs-target="#editModal">Cập Nhật</button>
                                            <button class="btn btn-danger" data-bs-toggle="modal"
                                                data-bs-target="#deleteModal">Xóa Bỏ</button>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Xóa Chức Vụ</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Bạn có chắc chắn muốn xóa chức vụ: này không?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Xác
                                    Nhận</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Chỉnh Sửa Chức Vụ</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <label class="form-lable">Tên Chức Vụ</label>
                                <input class="form-control mt-1" type="text">
                                <label class="form-lable mt-2">Tình Trạng</label>
                                <select class="form-control">
                                    <option value="1">Hiển Thị</option>
                                    <option value="0">Tạm Dừng</option>
                                </select>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Xác Nhận</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            create: {
                'ten_chuc_vu': '',
                'tinh_trang': '',

            },
            chuc_vu: [
                {
                    'ten_chuc_vu': 'Giám đốc',
                    'tinh_trang': '1'
                },
                {
                    'ten_chuc_vu': 'Phó Giám Đốc',
                    'tinh_trang': '1'
                },
                {
                    'ten_chuc_vu': 'Trưởng Phòng',
                    'tinh_trang': '0'
                },
                {
                    'ten_chuc_vu': 'Quản Lí',
                    'tinh_trang': '0'
                },
                {
                    'ten_chuc_vu': 'Nhân Viên',
                    'tinh_trang': '1'
                },
                {
                    'ten_chuc_vu': 'Kế Toán',
                    'tinh_trang': '0'
                }
            ]
        }
    },
    methods: {
        ThemMoi() {
            this.chuc_vu.push(this.create)
        }
    },
}
</script>
<style></style>