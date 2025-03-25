<template>
    <div class="row" id="app">
        <div class="col-md-3">
            <div class="card ">
                <div class="card-header mt-2">
                    <h5><b> Thêm Mới Phòng Ban </b></h5>
                </div>
                <div class="card-body">
                    <label class="form-lable">Mã Phòng Ban</label>
                    <input v-model="create.ma_phong_ban" class="form-control mt-1" type="text">
                    <label class="form-lable">Tên Phong Ban</label>
                    <input v-model="create.ten_phong_ban" class="form-control mt-1" type="text">
                    <label class="form-lable mt-2"> Tình Trạng</label>
                    <select v-model="create.tinh_trang" class="form-control">
                        <option value="1">Hiển Thị</option>
                        <option value="0">Tạm Dừng</option>
                    </select>
                </div>
                <div class="card-footer text-end">
                    <button v-on:click="ThemMoi()" class="btn btn-primary">Thêm Mới Phòng Ban</button>
                </div>
            </div>
        </div>
        <div class="col-md-9">
            <div class="card">
                <div class="card-header mt-2">
                    <h5><b>Danh Sách Phòng Ban</b></h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class="text-center align-middle text-nowrap">#</th>
                                    <th class="text-center align-middle text-nowrap">Mã phòng Ban</th>
                                    <th class="text-center align-middle text-nowrap">Tên Phòng Ban</th>
                                    <th class="text-center align-middle text-nowrap">Tình Trạng</th>
                                    <th class="text-center align-middle text-nowrap">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value, index) in phong_ban">
                                    <tr>
                                        <th class="text-center align-middle text-nowrap">{{ index + 1 }}</th>
                                        <td class="align-middle text-nowrap">{{ value.ma_phong_ban }}</td>
                                        <td class="align-middle text-nowrap">{{ value.ten_phong_ban }}</td>
                                        <td class="align-middle text-nowrap text-center">
                                            <button v-if="value.tinh_trang == 1" class="btn btn-success "
                                                style="width: 100px;">Hiển Thị</button>
                                            <button v-else class="btn btn-warning " style="width: 100px;">Tạm
                                                Tắt</button>
                                        </td>
                                        <td class="text-center align-middle text-nowrap">
                                            <button class="btn btn-info me-2">Cập Nhật</button>
                                            <button class="btn btn-danger">Xóa Bỏ</button>
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
                'ma_phong_ban': '',
                'ten_phong_ban': '',
                'tinh_trang': '',


            },
            phong_ban: [
                {
                    'ma_phong_ban': 'PB001',
                    'ten_phong_ban': 'Ban Giám Đốc',
                    'tinh_trang': '1'
                },
                {
                    'ma_phong_ban': 'PB002',
                    'ten_phong_ban': 'Ban Nhân Sự',
                    'tinh_trang': '1'
                },
                {
                    'ma_phong_ban': 'PB003',
                    'ten_phong_ban': 'Ban kế Toán',
                    'tinh_trang': '0'
                },
                {
                    'ma_phong_ban': 'PB004',
                    'ten_phong_ban': 'Ban Quản Lí',
                    'tinh_trang': '0'
                },
                {
                    'ma_phong_ban': 'PB005',
                    'ten_phong_ban': 'Ban Marketing',
                    'tinh_trang': '0'
                },
                {
                    'ma_phong_ban': 'PB006',
                    'ten_phong_ban': 'Ban Sale',
                    'tinh_trang': '1'
                }
            ]
        }
    },
    methods: {
        ThemMoi() {
            this.phong_ban.push(this.create)
        }
    },
}
</script>
<style></style>