<template>
	<div class="topbar d-flex align-items-center shadow-sm">
		<nav class="navbar navbar-expand w-100">
			<!-- Logo -->
			<div class="topbar-logo-header d-flex align-items-center">
				<div class="logo-icon-wrapper me-2">
					<img src="../../assets/images/logo-icon.png" class="logo-icon" alt="logo icon">
				</div>
				<div class="logo-text-wrapper">
					<h4 class="logo-text fw-bold mb-0">Quản Trị Hệ Thống</h4>
				</div>
			</div>
			
			<!-- Mobile Toggle Menu -->
			<div class="mobile-toggle-menu d-lg-none"><i class='bx bx-menu fs-4'></i></div>
			
			<!-- Search Bar -->
			<div class="search-bar flex-grow-1 px-4">
				<div class="position-relative search-bar-box">
					<input type="text" class="form-control search-control rounded-pill" placeholder="Tìm kiếm...">
					<span class="position-absolute top-50 search-show translate-middle-y end-0 me-3">
						<i class='bx bx-search fs-5'></i>
					</span>
					<span class="position-absolute top-50 search-close translate-middle-y end-0 me-3 d-none">
						<i class='bx bx-x fs-5'></i>
					</span>
				</div>
			</div>
			
			<!-- User Profile Menu -->
			<div class="user-box dropdown ms-3">
				<a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret rounded-pill bg-light p-2 px-3" 
					href="javascript:;" role="button" data-bs-toggle="dropdown" aria-expanded="false">
					<img :src="adminInfo.hinhAnh || 'https://ui-avatars.com/api/?name='+ encodeURIComponent(adminInfo.hoTen || 'Admin') +'&background=4e73df&color=fff'" 
						class="user-img rounded-circle me-2" width="40" height="40" alt="user avatar">
					<div class="user-info">
						<p class="user-name fw-bold mb-0">{{ adminInfo.hoTen || 'Admin' }}</p>
						<p class="designation text-secondary mb-0 small">{{ adminInfo.chucVu || 'Quản trị viên' }}</p>
					</div>
				</a>
				<ul class="dropdown-menu dropdown-menu-end shadow-lg mt-2">
					<li>
						<router-link to="/admin/profile" class="dropdown-item">
							<div class="d-flex align-items-center">
								<div class="icon-box bg-light-primary rounded-circle me-2 text-center" style="width: 36px; height: 36px; line-height: 36px;">
									<i class="bx bx-user text-primary"></i>
								</div>
								<div>Thông tin cá nhân</div>
							</div>
						</router-link>
					</li>
					<li>
						<router-link to="/admin/settings" class="dropdown-item">
							<div class="d-flex align-items-center">
								<div class="icon-box bg-light-success rounded-circle me-2 text-center" style="width: 36px; height: 36px; line-height: 36px;">
									<i class="bx bx-cog text-success"></i>
								</div>
								<div>Cài đặt</div>
							</div>
						</router-link>
					</li>
					<li><hr class="dropdown-divider"></li>
					<li>
						<a class="dropdown-item" @click="handleLogout" href="javascript:;">
							<div class="d-flex align-items-center">
								<div class="icon-box bg-light-danger rounded-circle me-2 text-center" style="width: 36px; height: 36px; line-height: 36px;">
									<i class="bx bx-log-out text-danger"></i>
								</div>
								<div>Đăng xuất</div>
							</div>
						</a>
					</li>
				</ul>
			</div>
		</nav>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'TopRocker',
	data() {
		return {
			adminInfo: {
				hoTen: '',
				chucVu: '',
				hinhAnh: '',
				email: ''
			}
		}
	},
	mounted() {
		this.getAdminInfo();
	},
	methods: {
		getAdminInfo() {
			// Kiểm tra thông tin admin trong localStorage
			const adminData = localStorage.getItem('admin_info');
			
			if (adminData) {
				try {
					this.adminInfo = JSON.parse(adminData);
				} catch (error) {
					console.error('Lỗi khi parse dữ liệu admin từ localStorage', error);
					this.getAdminInfoFromAPI();
				}
			} else {
				this.getAdminInfoFromAPI();
			}
		},
		getAdminInfoFromAPI() {
			// Lấy thông tin admin từ API
			const token = localStorage.getItem('token_admin');
			
			if (!token) {
				console.error('Không tìm thấy token admin');
				return;
			}
			
			axios.get('/api/admin/profile', {
				headers: {
					'Authorization': `Bearer ${token}`
				},
			})
			.then(response => {
				if (response.data.status) {
					this.adminInfo = response.data.data;
					
					// Lưu thông tin vào localStorage để sử dụng sau này
					localStorage.setItem('admin_info', JSON.stringify(this.adminInfo));
				}
			})
			.catch(error => {
				console.error('Lỗi khi lấy thông tin admin từ API', error);
			});
		},
		handleLogout() {
			// Xóa token và thông tin admin từ localStorage
			localStorage.removeItem('token_admin');
			localStorage.removeItem('admin_info');
			
			// Chuyển hướng về trang đăng nhập
			this.$router.push('/admin/dang-nhap');
		}
	}
}
</script>

<style scoped>
.hover-shadow:hover {
	background-color: #f8f9fa;
	transition: all 0.3s ease;
}

.search-control {
	border: 1px solid #e9ecef;
	padding-right: 40px;
}

.search-control:focus {
	border-color: #4e73df;
	box-shadow: 0 0 0 0.25rem rgba(78, 115, 223, 0.25);
}

.user-img {
	object-fit: cover;
}

.icon-box {
	display: flex;
	align-items: center;
	justify-content: center;
}

.logo-icon {
	width: 35px;
	height: 35px;
}

.topbar {
	background-color: #fff;
	height: 70px;
}

.dropdown-menu {
	border: none;
	border-radius: 10px;
	min-width: 280px;
}
</style>