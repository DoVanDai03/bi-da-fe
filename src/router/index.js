import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save

const routes = [
    {
        path : '/',
        redirect: "/home-page",
        component: ()=>import('../layout/wrapper/index.vue'),
        meta: { layout: 'home' }
    },
    {
        path : '/admin/thuong-hieu',
        component: ()=>import('../components/Admin/ThuongHieu/index.vue'),
        meta: { layout: 'home' }
    },
    {
        path : '/admin/danh-muc',
        component: ()=>import('../components/Admin/DanhMuc/index.vue'),
        meta: { layout: 'home' }
    },
    {
        path : '/admin/nha-cung-cap',
        component: ()=>import('../components/Admin/NhaCungCap/index.vue'),
        meta: { layout: 'home' }
    },
    {
        path : '/admin/giam-gia',
        component: ()=>import('../components/Admin/GiamGia/index.vue'),
        meta: { layout: 'home' }
    },
    {
        path : '/admin/san-pham',
        component: ()=>import('../components/Admin/SanPham/index.vue'),
        meta: { layout: 'home' }
    },
    {
        path : '/admin/danh-gia',
        component: ()=>import('../components/Admin/DanhGia/index.vue'),
        meta: { layout: 'home' }
    },
    {
        path : '/admin/khach-hang',
        component: ()=>import('../components/Admin/KhachHang/index.vue'),
        meta: { layout: 'home' }
    },
    {
        path : '/admin/don-hang',
        component: ()=>import('../components/Admin/DonHang/index.vue'),
        meta: { layout: 'home' }
    },
    {
        path : '/admin/thong-ke',
        component: ()=>import('../components/Admin/ThongKe/index.vue'),
        meta: { layout: 'home' }
    },
    {
        path : '/admin/nguoi-dung',
        component: ()=>import('../components/Admin/NguoiDung/index.vue'),
        meta: { layout: 'home' }
    },
    {
        path : '/admin/chuc-vu',
        component: ()=>import('../components/Admin/ChucVu/index.vue'),
        meta: { layout: 'home' }
    },
    {
        path : '/admin/quyen-truy-cap',
        component: ()=>import('../components/Admin/QuyenTruyCap/index.vue'),
        meta: { layout: 'home' }
    },
    {
        path : '/admin/phan-quyen',
        component: ()=>import('../components/Admin/PhanQuyen/index.vue'),
        meta: { layout: 'home' }
    },
    {
        path : '/admin/bai-viet',
        component: ()=>import('../components/Admin/BaiViet/index.vue'),
        meta: { layout: 'home' }
    },
    {
        path : '/admin/thong-tin-tai-khoan',
        component: ()=>import('../components/Admin/ThongTinTaiKhoan/index.vue'),
        meta: { layout: 'client' }
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
        path : '/tin-tuc/:id',
        component: ()=>import('../components/Client/TinTuc/chiTietTinTuc.vue'),
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
        path : '/lich-su-don-hang-cho-khong-dang-nhap',
        component: ()=>import('../components/Client/LichSuDonHang/index_choKhongDangNhap.vue'),
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
    {
        path : '/xac-minh',
        component: ()=>import('../components/Client/DangKy/kichHoatTaiKhoan.vue'),
        meta: { layout: 'Login' }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
