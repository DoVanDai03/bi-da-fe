<template>
    <div class="modal fade" id="themmoi" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Mới Lương</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mt-2">
                        <label>Tên Nhân Viên</label>
                        <input v-model="create.ten_nhan_vien" type="text" class="form-control">
                    </div>
                    <div class="mt-2">
                        <label>Số Ngày Công</label>
                        <input v-model="create.so_ngay_cong" type="text" class="form-control">
                    </div>
                    <div class="mt-2">
                        <label>Thưởng</label>
                        <input v-model="create.thuong" type="text" class="form-control">
                    </div>
                    <div class="mt-2">
                        <label>Phạt</label>
                        <input v-model="create.phat" type="text" class="form-control">
                    </div>
                    <div class="mt-2">
                        <label>Tổng Lương</label>
                        <input v-model="create.tong_luong" type="text" class="form-control">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click=" ThemMoi()" type="button"  data-bs-dismiss="modal" class="btn btn-primary">Thêm Mới</button>
                </div>
            </div>
        </div>
    </div>
    <div class="row" id="app">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header mt-2 d-flex justify-content-between">
                    <h5><b>Bảng Lương</b></h5>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#themmoi"> Thêm mới</button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class="text-center align-middle ">#</th>
                                    <th class="text-center align-middle ">Tên Nhân Viên</th>
                                    <th class="text-center align-middle ">Số Ngày Công</th>
                                    <th class="text-center align-middle ">Thưởng</th>
                                    <th class="text-center align-middle ">Phạt</th>
                                    <th class="text-center align-middle ">Tổng Lương</th>
                                </tr>
                            </thead>
                            <tbody>

                                <template v-for="(value, index) in luong ">
                                    <tr>
                                        <th class="text-center align-middle ">{{ index + 1 }}</th>
                                        <td class="align-middle ">{{ value.ten_nhan_vien }}</td>
                                        <td class="align-middle ">{{ value.so_ngay_cong }}</td>
                                        <td class="align-middle ">{{ fommatVND(value.thuong) }}</td>
                                        <td class="align-middle ">{{ fommatVND(value.phat) }}</td>
                                        <td class="align-middle ">{{ fommatVND(value.tong_luong) }}</td>
                                    </tr>
                                </template>



                            </tbody>
                        </table>
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
                'ten_nhan_vien': '',
                'so_ngay_cong': '',
                'thuong': '',
                'phat': '',
                'tong_luong': '',


            },
            luong: [
                {
                    'ten_nhan_vien': 'Nguyễn Văn A',
                    'so_ngay_cong': '30',
                    'thuong': '500000',
                    'phat': '0',
                    'tong_luong': '24500000',
                },
                {
                    'ten_nhan_vien': 'Nguyễn Văn B',
                    'so_ngay_cong': '28',
                    'thuong': '400000',
                    'phat': '0',
                    'tong_luong': '22400000',
                },
                {
                    'ten_nhan_vien': 'Nguyễn Văn C',
                    'so_ngay_cong': '30',
                    'thuong': '500000',
                    'phat': '0',
                    'tong_luong': '24500000',
                },
                {
                    'ten_nhan_vien': 'Nguyễn Văn D',
                    'so_ngay_cong': '20',
                    'thuong': '0',
                    'phat': '300000',
                    'tong_luong': '19700000',
                },
                {
                    'ten_nhan_vien': 'Nguyễn Văn E',
                    'so_ngay_cong': '25',
                    'thuong': '0',
                    'phat': '0',
                    'tong_luong': '20000000',
                },

            ]
        }
    },
    methods: {
        fommatVND(number){
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number,);
        },
        ThemMoi() {
            this.luong.push(this.create)
        }

    },
}
</script>
<style></style>