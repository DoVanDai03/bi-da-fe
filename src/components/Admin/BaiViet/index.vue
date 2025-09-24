<template>
    <div class="row" v-if="permissions.canView">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-lg-3 col-xl-2">
                            <button v-if="permissions.canCreate" class="btn btn-primary mb-3 mb-lg-0"
                                data-bs-toggle="modal" data-bs-target="#taoBaiVietModal">
                                <i class="bx bxs-plus-square"></i>Thêm bài viết
                            </button>
                        </div>
                    </div>
                    <div class="modal fade" id="taoBaiVietModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Tạo mới bài viết</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Tiêu đề</label>
                                                <input v-model="bai_viet_create.title" type="text" class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Tác giả</label>
                                                <input v-model="bai_viet_create.author" type="text" class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Trạng thái</label>
                                                <input v-model="bai_viet_create.status" type="text" class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Ảnh (URL)</label>
                                                <input v-model="bai_viet_create.image" type="text" class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="mb-2 mt-2">
                                                <label>Nội dung ngắn</label>
                                                <textarea v-model="bai_viet_create.content_short" rows="5" class="form-control mt-2"></textarea>
                                            </div>
                                        </div>                                        
                                        <div class="col-12">
                                            <div class="mb-2 mt-2">
                                                <label>Nội dung dài</label>
                                                <textarea v-model="bai_viet_create.content_long" rows="5" class="form-control mt-2"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button v-on:click="themBaiViet()" type="button" data-bs-dismiss="modal" class="btn btn-primary">Thêm Mới</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row" v-if="permissions.canView">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="mt-2">Quản lý bài viết</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="text-center">
                                    <th>#</th>
                                    <th>Tiêu đề</th>
                                    <th>Tác giả</th>
                                    <th>Trạng thái</th>
                                    <th>Ảnh</th>
                                    <th>Nội dung ngắn</th>
                                    <th>Nội dung dài</th>
                                    <th>Ngày tạo</th>
                                    <th>Ngày cập nhật</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(v, k) in danh_sach_bai_viet" :key="k">
                                    <tr class="align-middle">
                                        <td class="text-center">{{ k + 1 }}</td>
                                        <td>{{ v.title }}</td>
                                        <td>{{ v.author }}</td>
                                        <td class="text-center">{{ v.status }}</td>
                                        <td class="text-center">
                                            <img v-if="v.image" :src="v.image" alt="image" style="max-width: 70px; max-height: 50px; object-fit: cover;" />
                                        </td>
                                        <td>{{ (v.content_short || '').slice(0, 80) }}{{ (v.content_short && v.content_short.length > 80) ? '...' : '' }}</td>
                                        <td>{{ (v.content_long || '').slice(0, 80) }}{{ (v.content_long && v.content_long.length > 80) ? '...' : '' }}</td>
                                        <td class="text-center">{{ formatDate(v.ngayTao) }}</td>
                                        <td class="text-center">{{ formatDate(v.ngayCapNhat) }}</td>
                                        <td class="text-center">
                                            <button v-if="permissions.canUpdate"
                                                v-on:click="Object.assign(bai_viet_update, v); id_bai_viet_update = v.id"
                                                data-bs-toggle="modal" data-bs-target="#updateModal" class="btn btn-info">Cập nhật</button>
                                            <button v-if="permissions.canDelete" v-on:click="id_bai_viet_delete = v.id"
                                                data-bs-toggle="modal" data-bs-target="#deleteModal" class="btn btn-danger ms-2">Xoá</button>
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

    <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật bài viết</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Tiêu đề</label>
                                <input v-model="bai_viet_update.title" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Tác giả</label>
                                <input v-model="bai_viet_update.author" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Trạng thái</label>
                                <input v-model="bai_viet_update.status" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Ảnh (URL)</label>
                                <input v-model="bai_viet_update.image" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-2 mt-2">
                                <label>Nội dung ngắn</label>
                                <textarea v-model="bai_viet_update.content_short" rows="5" class="form-control mt-2"></textarea>
                            </div>
                        </div><div class="col-12">
                            <div class="mb-2 mt-2">
                                <label>Nội dung dài</label>
                                <textarea v-model="bai_viet_update.content_long" rows="5" class="form-control mt-2"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="capNhatBaiViet()" data-bs-dismiss="modal" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xoá bài viết</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert">Bạn có thực sự muốn xoá!</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="xoaBaiViet()" type="button" data-bs-dismiss="modal" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createToaster } from "@meforma/vue-toaster";
import axios from "axios";
const toaster = createToaster({ position: "top-right" });

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
            danh_sach_bai_viet: [],
            bai_viet_create: {
                title: "",
                content_short: "",
                content_long: "",
                image: "",
                status: "",
                author: ""
            },
            bai_viet_update: {},
            id_bai_viet_update: "",
            id_bai_viet_delete: "",
        };
    },
    async created() {
        const permissions = await checkMultiplePermissions([
            'POST_VIEW',
            'POST_CREATE',
            'POST_UPDATE',
            'POST_DELETE'
        ]);

        this.permissions = {
            canView: permissions.POST_VIEW || false,
            canCreate: permissions.POST_CREATE || false,
            canUpdate: permissions.POST_UPDATE || false,
            canDelete: permissions.POST_DELETE || false
        };

        if (this.permissions.canView) {
            await this.layBaiViet();
        } else {
            toaster.error("Bạn không có quyền xem bài viết!");
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
        layBaiViet() {
            axios
                .get("/api/admin/news", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    this.danh_sach_bai_viet = res.data.data;
                })
                .catch(() => {
                    toaster.error("Lỗi khi lấy danh sách bài viết!");
                });
        },
        themBaiViet() {
            axios
                .post('/api/admin/news', this.bai_viet_create, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.layBaiViet();
                        this.bai_viet_create = {
                            title: "",
                            content_short: "",
                            content_long: "",
                            image: "",
                            status: "",
                            author: ""
                        };
                    }
                })
                .catch(() => {
                    toaster.error("Có lỗi xảy ra khi thêm bài viết!");
                });
        },
        xoaBaiViet() {
            axios
                .delete("/api/admin/news/" + this.id_bai_viet_delete, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.layBaiViet();
                    } else {
                        toaster.error(res.data.message || "Xóa bài viết thất bại!");
                    }
                })
                .catch(() => {
                    toaster.error("Có lỗi xảy ra khi xóa bài viết!");
                });
        },
        capNhatBaiViet() {
            axios
                .put("/api/admin/news/" + this.id_bai_viet_update, this.bai_viet_update, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token_admin')}`
                    },
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.layBaiViet();
                    } else {
                        toaster.error(res.data.message || "Cập nhật bài viết thất bại!");
                    }
                })
                .catch(() => {
                    toaster.error("Có lỗi xảy ra khi cập nhật bài viết!");
                });
        }
    },
};
</script>

<style>

</style>