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
                    <router-link to="/admin/luong">
                        <a class="nav-link" href="/admin/luong">
						<div class="parent-icon"><i class="fa-solid fa-rectangle-list"></i>
						</div>
						<div class="menu-title">Lương</div>
					</a>
                    </router-link>
					
				</li>
				<li class="nav-item">
					<router-link to="/admin/chuc-vu">
						<a class="nav-link" href="/admin/chuc-vu">
							<div class="parent-icon"><i class="fa-solid fa-boxes-stacked"></i>
							</div>
							<div class="menu-title">Chức Vụ</div>
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
					<router-link to="/admin/phong-ban">
						<a class="nav-link" href="/admin/phong-ban">
							<div class="parent-icon"><i class="fa-solid fa-users"></i>
							</div>
							<div class="menu-title">Phòng Ban</div>
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