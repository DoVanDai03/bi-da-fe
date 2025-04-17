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
        path : '/admin/don-hang',
        component: ()=>import('../components/Admin/DonHang/index.vue')
    },
    {
        path : '/admin/thong-ke',
        component: ()=>import('../components/Admin/ThongKe/index.vue')
    },
    {
        path : '/admin/nguoi-dung',
        component: ()=>import('../components/Admin/NguoiDung/index.vue')
    },
    {
        path : '/admin/chuc-vu',
        component: ()=>import('../components/Admin/ChucVu/index.vue')
    },
    {
        path : '/home-page',
        component: ()=>import('../components/Client/HomePage/Homepage.vue'),
        meta: { layout: 'client' },
    },
    {
        path : '/tin-tuc',
        component: ()=>import('../components/Client/TinTuc/index.vue'),
        meta: { layout: 'client' }
    },
    {
        path : '/lien-he',
        component: ()=>import('../components/Client/LienHe/index.vue'),
        meta: { layout: 'client' }
    },

    {
        path : '/chi-tiet-san-pham/:id',
        component: ()=>import('../components/Client/ChiTietSanPham/index.vue'),
        meta: { layout: 'client' }
    },
    {
        path : '/san-pham',
        component: ()=>import('../components/Client/SanPham/index.vue'),
        meta: { layout: 'client' }
    },
    {
        path : '/gio-hang',
        component: ()=>import('../components/Client/GioHang/index.vue'),
        meta: { layout: 'client' }
    },
    {
        path : '/don-hang',
        component: ()=>import('../components/Client/DonHang/index.vue'),
        meta: { layout: 'client' }
    },
    {
        path : '/lich-su-don-hang',
        component: ()=>import('../components/Client/LichSuDonHang/index.vue'),
        meta: { layout: 'client' }
    },
    {
        path : '/thong-tin-tai-khoan',
        component: ()=>import('../components/Client/ThongTinTaiKhoan/index.vue'),
        meta: { layout: 'client' }
    },
    {
        path: '/thong-tin-thanh-toan',
        name: 'thong-tin-thanh-toan',
        component: () => import('../components/Client/ThongTinThanhToan/index.vue'),
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
        path : '/dang-nhap/admin',
        component: ()=>import('../components/Admin/DangNhap/index.vue'),
        meta: { layout: 'Login' }
    },
    {
        path : '/quen-mat-khau',
        component: ()=>import('../components/Client/QuenMatKhau/index.vue'),
        meta: { layout: 'Login' }
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router