 <template>
    <div class="modal fade" id="themmoi" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Mới Khách Hàng</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mt-2">
                        <label>Họ Và Tên</label>
                        <input v-model="create.ho_va_ten" type="text" class="form-control">
                    </div>
                    <div class="mt-2">
                        <label>Email</label>
                        <input v-model="create.email" type="text" class="form-control">
                    </div>
                    <div class="mt-2">
                        <label>Số Điện Thoại</label>
                        <input v-model="create.so_dien_thoai" type="text" class="form-control">
                    </div>
                    <div class="mt-2">
                        <label >Tình Trạng</label>
                    <select v-model="create.tinh_trang" class="form-control" >
                       <option value="1">Hiển Thị</option>
                       <option value="0">Tạm Dừng</option>
                  </select>
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
                    <h5><b>Khách Hàng</b></h5>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#themmoi"> Thêm mới</button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class="text-center align-middle ">#</th>
                                    <th class="text-center align-middle ">Họ Và Tên</th>
                                    <th class="text-center align-middle ">Email</th>
                                    <th class="text-center align-middle ">Số Điện Thoại</th>
                                    <th class="text-center align-middle ">Tình Trạng</th>
                                    <th class="text-center align-middle ">AcTion</th>
                                </tr>
                            </thead>
                            <tbody>

                                <template v-for="(value, index) in khach_hang ">
                                    <tr>
                                        <th class="text-center align-middle ">{{ index + 1 }}</th>
                                        <td class="align-middle ">{{ value.ho_va_ten }}</td>
                                        <td class="align-middle ">{{ value.email }}</td>
                                        <td class="align-middle text-center">{{ value.so_dien_thoai }}</td>
                                        <td class="align-middle text-nowrap text-center">
                                        <button v-if="value.tinh_trang == 1" class="btn btn-success " style="width: 100px;">Hiển Thị</button>
                                        <button v-else class="btn btn-warning " style="width: 100px;">Tạm Tắt</button>
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
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            create: {
                'ho_va_ten': '',
                'email': '',
                'so_dien_thoai': '',
                'tinh_trang': '',
            },
            khach_hang: [
                {
                    'ho_va_ten': 'Nguyễn Văn A',
                    'email': 'nguyenvanA@gmail.com',
                    'so_dien_thoai': '0900100912',
                    'tinh_trang': '1',
                },
                {
                    'ho_va_ten': 'Nguyễn Văn B',
                    'email': 'nguyenvanB@gmail.com',
                    'so_dien_thoai': '0900100912',
                    'tinh_trang': '0',
                },
                {
                    'ho_va_ten': 'Nguyễn Văn C',
                    'email': 'nguyenvanC@gmail.com',
                    'so_dien_thoai': '0900100912',
                    'tinh_trang': '1',
                },
                {
                   'ho_va_ten': 'Nguyễn Văn D',
                    'email': 'nguyenvanD@gmail.com',
                    'so_dien_thoai': '0900100912',
                    'tinh_trang': '0',
                },
                {'ho_va_ten': 'Nguyễn Văn E',
                    'email': 'nguyenvanE@gmail.com',
                    'so_dien_thoai': '0900100912',
                    'tinh_trang': '1',
                },

            ]
        }
    },
    methods: {
        fommatVND(number){
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number,);
        },
        ThemMoi() {
            this.khach_hang.push(this.create)
        }

    },
}
</script>
<style> 
    
</style>