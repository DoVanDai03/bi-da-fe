<template>
    <footer class="footer">
        <div class="footer-top">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-6">
                        <div class="footer-feature">
                            <i class="fas fa-headset"></i>
                            <div class="feature-content">
                                <h5>Tư vấn Miễn Phí</h5>
                                <p>1900.6753</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="footer-feature">
                            <i class="fas fa-tools"></i>
                            <div class="feature-content">
                                <h5>Góp ý, phản ánh</h5>
                                <p>0983 058 403</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="footer-feature">
                            <i class="fas fa-truck-fast"></i>
                            <div class="feature-content">
                                <h5>Vận chuyển - giao hàng</h5>
                                <p>Thần tốc 24h</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="footer-feature">
                            <i class="fas fa-shield-alt"></i>
                            <div class="feature-content">
                                <h5>Thương hiệu uy tín</h5>
                                <p>Hàng đầu Việt Nam</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-main">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-6">
                        <div class="footer-widget">
                            <h4>Về chúng tôi</h4>
                            <p>FPT-Sport là đơn vị cung cấp thiết bị thể thao hàng đầu Việt Nam với hơn 10 năm kinh nghiệm.</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="footer-widget">
                            <h4>Liên kết nhanh</h4>
                            <ul class="footer-links">
                                <li><a href="#">Trang chủ</a></li>
                                <li><a href="#">Sản phẩm</a></li>
                                <li><a href="#">Tin tức</a></li>
                                <li><a href="#">Liên hệ</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="footer-widget">
                            <h4>Chính sách</h4>
                            <ul class="footer-links">
                                <li><a href="#">Chính sách bảo hành</a></li>
                                <li><a href="#">Chính sách vận chuyển</a></li>
                                <li><a href="#">Chính sách đổi trả</a></li>
                                <li><a href="#">Chính sách bảo mật</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="footer-widget">
                            <h4>Kết nối với chúng tôi</h4>
                            <div class="social-links">
                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                <a href="#"><i class="fab fa-twitter"></i></a>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                                <a href="#"><i class="fab fa-youtube"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <p class="copyright">© 2024 FPT-Sport. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'BotClient'
}
</script>

<style scoped>
.footer {
    background: #1a1a1a;
    color: #fff;
}

.footer-top {
    background: #ff4444;
    padding: 30px 0;
}

.footer-feature {
    display: flex;
    align-items: center;
    gap: 15px;
}

.footer-feature i {
    font-size: 40px;
    color: #fff;
}

.feature-content h5 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
}

.feature-content p {
    margin: 5px 0 0;
    font-size: 14px;
}

.footer-main {
    padding: 60px 0 30px;
}

.footer-widget h4 {
    color: #fff;
    font-size: 18px;
    margin-bottom: 25px;
    font-weight: 600;
}

.footer-widget p {
    color: #999;
    line-height: 1.6;
}

.footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-links li {
    margin-bottom: 12px;
}

.footer-links a {
    color: #999;
    text-decoration: none;
    transition: color 0.3s;
}

.footer-links a:hover {
    color: #ff4444;
}

.social-links {
    display: flex;
    gap: 15px;
}

.social-links a {
    width: 35px;
    height: 35px;
    background: #333;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    text-decoration: none;
    transition: all 0.3s;
}

.social-links a:hover {
    background: #ff4444;
    transform: translateY(-3px);
}

.footer-bottom {
    background: #111;
    padding: 20px 0;
    text-align: center;
}

.copyright {
    margin: 0;
    color: #999;
    font-size: 14px;
}

@media (max-width: 768px) {
    .footer-feature {
        margin-bottom: 20px;
    }
    
    .footer-widget {
        margin-bottom: 30px;
    }
}
</style>