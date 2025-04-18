<template>
	<div class="nav-container primary-menu">
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
							<div class="parent-icon"><i class="fa-solid fa-list"></i>
							</div>
							<div class="menu-title">Danh Mục</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/nha-cung-cap">
						<a class="nav-link" href="/admin/nha-cung-cap">
							<div class="parent-icon"><i class="fa-solid fa-truck-field"></i>
							</div>
							<div class="menu-title">Nhà Cung Cấp</div>
						</a>
					</router-link>
				</li>	
				<li class="nav-item">
					<router-link to="/admin/thuong-hieu">
						<a class="nav-link" href="/admin/thuong-hieu">
							<div class="parent-icon"><i class="fa-solid fa-trademark"></i>
							</div>
							<div class="menu-title">Thương Hiệu</div>
						</a>
					</router-link>
				</li>	
				<li class="nav-item">
					<router-link to="/admin/giam-gia">
						<a class="nav-link" href="/admin/giam-gia">
							<div class="parent-icon"><i class="fa-solid fa-percent"></i>
							</div>
							<div class="menu-title">Giảm giá</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/san-pham">
						<a class="nav-link" href="/admin/san-pham">
							<div class="parent-icon"><i class="fa-solid fa-box"></i>
							</div>
							<div class="menu-title">Sản phẩm</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/khach-hang">
						<a class="nav-link" href="/admin/khach-hang">
							<div class="parent-icon"><i class="fa-solid fa-users"></i>
							</div>
							<div class="menu-title">Khách Hàng</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/danh-gia">
						<a class="nav-link" href="/admin/danh-gia">
							<div class="parent-icon"><i class="fa-solid fa-star"></i>
							</div>
							<div class="menu-title">Đánh Giá</div>
						</a>
					</router-link>
				</li>	
				<li class="nav-item">
					<router-link to="/admin/don-hang">
						<a class="nav-link" href="/admin/don-hang">
							<div class="parent-icon"><i class="fa-solid fa-shopping-cart"></i>
							</div>
							<div class="menu-title">Đơn hàng</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/thong-ke">
						<a class="nav-link" href="/admin/thong-ke">
							<div class="parent-icon"><i class="fa-solid fa-chart-line"></i>
							</div>
							<div class="menu-title">Thống kê</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/nguoi-dung">
						<a class="nav-link" href="/admin/nguoi-dung">
							<div class="parent-icon"><i class="fa-solid fa-user"></i>
							</div>
							<div class="menu-title">Người dùng</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/chuc-vu">
						<a class="nav-link" href="/admin/chuc-vu">
							<div class="parent-icon"><i class="fa-solid fa-user"></i>
							</div>
							<div class="menu-title">Chức vụ</div>
						</a>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/admin/quyen-truy-cap">
						<a class="nav-link" href="/admin/quyen-truy-cap">
							<div class="parent-icon"><i class="fa-solid fa-user"></i>
							</div>
							<div class="menu-title">Quyền truy cập</div>
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