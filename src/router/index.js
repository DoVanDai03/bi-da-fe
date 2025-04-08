import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save

const routes = [
    {
        path : '/',
        component: ()=>import('../layout/wrapper/index.vue')
    },
    {
        path : '/admin/thuong-hieu',
        component: ()=>import('../components/Admin/ThuongHieu/index.vue')
    },
    {
        path : '/admin/danh-muc',
        component: ()=>import('../components/Admin/DanhMuc/index.vue')
    },
    {
        path : '/admin/nha-cung-cap',
        component: ()=>import('../components/Admin/NhaCungCap/index.vue')
    },
    {
        path : '/admin/giam-gia',
        component: ()=>import('../components/Admin/GiamGia/index.vue')
    },
    {
        path : '/admin/san-pham',
        component: ()=>import('../components/Admin/SanPham/index.vue')
    },
    {
        path : '/admin/danh-gia',
        component: ()=>import('../components/Admin/DanhGia/index.vue')
    },
    {
        path : '/admin/khach-hang',
        component: ()=>import('../components/Admin/KhachHang/index.vue')
    },
    {
        path : '/home-page',
        component: ()=>import('../components/Client/HomePage/Homepage.vue'),
        meta: { layout: 'client' },
    },
    {
        path : '/chi-tiet-san-pham/:id',
        component: ()=>import('../components/Client/ChiTietSanPham/index.vue'),
        meta: { layout: 'client' }
    },
    {
        path : '/dang-ky',
        component: ()=>import('../components/Client/DangKy/DangKy.vue'),
        meta: { layout: 'Login' }
    },
    {
        path : '/dang-nhap',
        component: ()=>import('../components/Client/DangNhap/DangNhap.vue'),
        meta: { layout: 'Login' }
    },
    {
        path : '/admin/dang-nhap',
        component: ()=>import('../components/Admin/DangNhap/index.vue'),
        meta: { layout: 'Login' }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router