<template>
	<div class="nav-container primary-menu mt-3">
		<div class="mobile-topbar-header">
			<div>
				<img src="https://th.bing.com/th/id/OIP.8Py2QVfx4Kofy4KjGLersQAAAA?pid=ImgDet&w=159&h=159&c=7" class="logo-icon" alt="logo icon">
			</div>
			<div>
				<h4 class="logo-text">Rukada</h4>
			</div>
			<div class="toggle-icon ms-auto"><i class='bx bx-arrow-to-left'></i>
			</div>
		</div>
		<nav class="navbar navbar-expand-xl w-100">
			<ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
				<li class="nav-item">
					<router-link to="/admin/danh-muc">
						<a class="nav-link" href="/admin/danh-muc">
							<div class="parent-icon"><i class="fas fa-th-list"></i>
							</div>
							<div class="menu-title">Danh Mục</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/nha-cung-cap">
						<a class="nav-link" href="/admin/nha-cung-cap">
							<div class="parent-icon"><i class="fas fa-industry"></i>
							</div>
							<div class="menu-title">Nhà Cung Cấp</div>
						</a>
					</router-link>
				</li>	
				<li class="nav-item">
					<router-link to="/admin/thuong-hieu">
						<a class="nav-link" href="/admin/thuong-hieu">
							<div class="parent-icon"><i class="fas fa-crown"></i>
							</div>
							<div class="menu-title">Thương Hiệu</div>
						</a>
					</router-link>
				</li>	
				<li class="nav-item">
					<router-link to="/admin/giam-gia">
						<a class="nav-link" href="/admin/giam-gia">
							<div class="parent-icon"><i class="fas fa-tags"></i>
							</div>
							<div class="menu-title">Giảm giá</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/san-pham">
						<a class="nav-link" href="/admin/san-pham">
							<div class="parent-icon"><i class="fas fa-box-open"></i>
							</div>
							<div class="menu-title">Sản phẩm</div>
						</a>
					</router-link>
				</li>
				<!-- <li class="nav-item">
					<router-link to="/admin/khach-hang">
						<a class="nav-link" href="/admin/khach-hang">
							<div class="parent-icon"><i class="fas fa-user-friends"></i>
							</div>
							<div class="menu-title">Khách Hàng</div>
						</a>
					</router-link>
				</li> -->
				<li class="nav-item dropdown">
					<a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret"
						data-bs-toggle="dropdown">
						<div class="parent-icon"><i class="fa-brands fa-ubuntu"></i>
						</div>
						<div class="menu-title">QL Người Dùng</div>
					</a>
					<ul class="dropdown-menu">
						<li>
							<router-link to="/admin/khach-hang">
								<a class="dropdown-item">
									<i class="bx bx-right-arrow-alt"></i>Khách Hàng</a>
							</router-link>
						</li>
						<li>
							<router-link to="/admin/nguoi-dung">
								<a class="dropdown-item">
									<i class="bx bx-right-arrow-alt"></i>Nhân Viên</a>
							</router-link>
						</li>
					</ul>
				</li>
				<li class="nav-item">
					<router-link to="/admin/danh-gia">
						<a class="nav-link" href="/admin/danh-gia">
							<div class="parent-icon"><i class="fas fa-star-half-alt"></i>
							</div>
							<div class="menu-title">Đánh Giá</div>
						</a>
					</router-link>
				</li>	
				<li class="nav-item">
					<router-link to="/admin/don-hang">
						<a class="nav-link" href="/admin/don-hang">
							<div class="parent-icon"><i class="fas fa-shopping-bag"></i>
							</div>
							<div class="menu-title">Đơn hàng</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/thong-ke">
						<a class="nav-link" href="/admin/thong-ke">
							<div class="parent-icon"><i class="fas fa-chart-bar"></i>
							</div>
							<div class="menu-title">Thống kê</div>
						</a>
					</router-link>
				</li>
				<!-- <li class="nav-item">
					<router-link to="/admin/nguoi-dung">
						<a class="nav-link" href="/admin/nguoi-dung">
							<div class="parent-icon"><i class="fas fa-users-cog"></i>
							</div>
							<div class="menu-title">Người dùng</div>
						</a>
					</router-link>
				</li> -->
				<li class="nav-item">
					<router-link to="/admin/chuc-vu">
						<a class="nav-link" href="/admin/chuc-vu">
							<div class="parent-icon"><i class="fas fa-user-tie"></i>
							</div>
							<div class="menu-title">Chức vụ</div>
						</a>
					</router-link>
				</li>
				<!-- <li class="nav-item">
					<router-link to="/admin/quyen-truy-cap">
						<a class="nav-link" href="/admin/quyen-truy-cap">
							<div class="parent-icon"><i class="fas fa-user-shield"></i>
							</div>
							<div class="menu-title">Quyền truy cập</div>
						</a>
					</router-link>
				</li> -->
				<li class="nav-item">
					<router-link to="/admin/phan-quyen">
						<a class="nav-link" href="/admin/phan-quyen">
							<div class="parent-icon"><i class="fas fa-user-lock"></i>
							</div>
							<div class="menu-title">Phân quyền</div>
						</a>
					</router-link>
				</li>	
			</ul>
		</nav>
	</div>
</template>
<script>
export default {

}
</script>
<style></style>