import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save

const routes = [
    {
        path : '/',
        component: ()=>import('../layout/wrapper/index.vue')
    },
    {
        path : '/admin/luong',
        component: ()=>import('../components/Admin/Luong/index.vue')
    },
    {
        path : '/admin/chuc-vu',
        component: ()=>import('../components/Admin/ChucVu/index.vue')
    },
    {
        path : '/admin/khach-hang',
        component: ()=>import('../components/Admin/KhachHang/index.vue')
    },
    {
        path : '/admin/phong-ban',
        component: ()=>import('../components/Admin/PhongBan/index.vue')
    },
    {
        path : '/home-page',
        component: ()=>import('../components/Client/HomePage/Homepage.vue'),
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
  
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router