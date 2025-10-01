<template>
    <div class="contact-page">
        <!-- Hero Section -->
        <div class="hero-section">
            <div class="container">
                <h1 class="text-center">Liên Hệ Với Chúng Tôi</h1>
                <p class="text-center lead">Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn</p>
            </div>
        </div>

        <div class="container py-5">
            <div class="row g-4">
                <!-- Thông tin liên hệ -->
                <div class="col-lg-12 mb-4">
                    <div class="contact-info card h-100 border-0 shadow-sm">
                        <div class="card-body p-4">
                            <h3 class="card-title mb-4">Thông Tin Liên Hệ</h3>

                            <div class="info-item mb-4 d-flex">
                                <div class="icon-wrapper me-3">
                                    <i class="fas fa-map-marker-alt"></i>
                                </div>
                                <div class="info-content">
                                    <h5>Địa Chỉ</h5>
                                    <p class="mb-0">
                                        <a href="https://www.google.com/maps?q=475A+%C4%90i%E1%BB%87n+Bi%C3%AAn+Ph%E1%BB%A7,+Ph%C6%B0%E1%BB%9Dng+25,+B%C3%ACnh+Th%E1%BA%A1nh,+H%E1%BB%93+Ch%C3%AD+Minh" target="_blank"
                                            class="address-link text-decoration-none">
                                            475A Điện Biên Phủ, Phường 25, Bình Thạnh, Hồ Chí Minh
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div class="info-item mb-4 d-flex">
                                <div class="icon-wrapper me-3">
                                    <i class="fas fa-phone-alt"></i>
                                </div>
                                <div class="info-content">
                                    <h5>Số Điện Thoại</h5>
                                    <p class="mb-0">
                                        <a href="tel:+84379977438" class="text-decoration-none">+84 379977438</a>
                                    </p>
                                </div>
                            </div>

                            <div class="info-item mb-4 d-flex">
                                <div class="icon-wrapper me-3">
                                    <i class="fas fa-envelope"></i>
                                </div>
                                <div class="info-content">
                                    <h5>Email</h5>
                                    <p class="mb-0">
                                        <a href="mailto:babystark16@gmail.com"
                                            class="text-decoration-none">babystark16@gmail.com</a>
                                    </p>
                                </div>
                            </div>

                            <div class="info-item mb-4 d-flex">
                                <div class="icon-wrapper me-3">
                                    <i class="fas fa-clock"></i>
                                </div>
                                <div class="info-content">
                                    <h5>Giờ Làm Việc</h5>
                                    <p class="mb-0">
                                        Thứ Hai - Thứ Bảy: 8:00 - 20:00<br>
                                        Chủ Nhật: 10:00 - 18:00
                                    </p>
                                </div>
                            </div>

                            <div class="social-media mt-4">
                                <h5 class="mb-3">Kết nối với chúng tôi</h5>
                                <div class="social-icons d-flex gap-3">
                                    <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                                    <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                                    <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                                    <a href="#" class="social-icon"><i class="fab fa-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h5 class="text-center mt-5">Vị Trí Của Chúng Tôi</h5>
            <!-- Bản đồ -->
            <div class="map-container mt-5">
                <div class="card border-0 shadow-sm">
                    <div class="card-body p-0">
                        <iframe
                            src="https://www.google.com/maps?q=475A+%C4%90i%E1%BB%87n+Bi%C3%AAn+Ph%E1%BB%A7,+Ph%C6%B0%E1%BB%9Dng+25,+B%C3%ACnh+Th%E1%BA%A1nh,+H%E1%BB%93+Ch%C3%AD+Minh&output=embed"
                            width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createToaster } from "@meforma/vue-toaster";
import emailjs from '@emailjs/browser';

// Khởi tạo toaster để hiển thị thông báo
const toaster = createToaster({ position: "top-right" });

export default {
    name: "LienHe",
    data() {
        return {
            dangGui: false,
            formData: {
                hoTen: "",
                email: "",
                soDienThoai: "",
                tieuDe: "",
                noiDung: ""
            },
            // Lưu trữ thông tin tạm thời cho việc gửi dự phòng
            thongTinDaGui: null
        };
    },
    methods: {
        async guiLienHe() {
            this.dangGui = true;

            // Kiểm tra dữ liệu cơ bản
            if (!this.formData.hoTen || !this.formData.email || !this.formData.tieuDe || !this.formData.noiDung) {
                toaster.error("Vui lòng điền đầy đủ thông tin bắt buộc");
                this.dangGui = false;
                return;
            }

            // Lưu thông tin đã nhập
            this.thongTinDaGui = { ...this.formData };

            try {
                // Chuẩn bị dữ liệu gửi email - đơn giản hóa các tham số
                const templateParams = {
                    from_name: this.formData.hoTen,
                    email: this.formData.email,
                    message: `
Tiêu đề: ${this.formData.tieuDe}
Số điện thoại: ${this.formData.soDienThoai || 'Không cung cấp'}

${this.formData.noiDung}
                    `
                };

                console.log("Đang gửi email với thông tin:", templateParams);

                // QUAN TRỌNG: Bạn cần đăng ký tài khoản EmailJS.com và thay các ID này
                // bằng ID thực tế của bạn
                const serviceID = 'service_f72rlbq'; // Thay bằng Service ID thực của bạn
                const templateID = 'template_7rgeoyx'; // Thay bằng Template ID thực của bạn
                const publicKey = 'owjsVUUNtDXnQNNJm'; // Public Key của bạn

                // Kiểm tra nếu đang dùng ID mẫu
                if ((serviceID === 'service_f72rlbq' && templateID === 'template_7rgeoyx') &&
                    window.location.hostname !== 'localhost') {
                    console.log("Sử dụng ID thực trong môi trường production");
                } else if (window.location.hostname === 'localhost') {
                    console.warn("Đang ở môi trường phát triển - có thể gặp lỗi CORS");
                }

                // Gửi email qua EmailJS
                try {
                    // Hiển thị thông báo đang gửi
                    toaster.info("Đang gửi email...");

                    // Gọi EmailJS để gửi email
                    console.log("Bắt đầu gửi email với:", { serviceID, templateID });

                    const result = await emailjs.send(
                        serviceID,
                        templateID,
                        templateParams,
                        publicKey
                    );

                    console.log("Kết quả gửi email:", result);

                    if (result.status === 200) {
                        // Hiển thị thông báo thành công
                        toaster.success("Liên hệ của bạn đã được gửi thành công! Chúng tôi sẽ phản hồi sớm nhất có thể.");

                        // Reset form
                        this.resetForm();
                    } else {
                        throw new Error(`Mã trạng thái không mong đợi: ${result.status}`);
                    }
                } catch (sendError) {
                    console.error("Lỗi cụ thể khi gửi email:", sendError);

                    if (sendError.name === 'EmailJSResponseStatus') {
                        if (sendError.status === 422) {
                            toaster.error("Lỗi 422: Định dạng dữ liệu không khớp với template EmailJS.");
                            console.error("Chi tiết lỗi 422:", sendError.text);
                        } else {
                            toaster.error(`Lỗi EmailJS: ${sendError.text}`);
                        }
                    } else if (sendError.message && sendError.message.includes('NetworkError')) {
                        toaster.error("Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.");
                    } else if (sendError.message && sendError.message.includes('CORS')) {
                        toaster.error("Lỗi CORS. Vui lòng liên hệ quản trị viên.");
                        console.error("Lỗi CORS:", sendError);

                        // Thử phương pháp gửi dự phòng nếu gặp lỗi CORS
                        this.guiLienHeDuPhong();
                    } else {
                        toaster.error("Có lỗi xảy ra khi gửi email. Mã lỗi: " + (sendError.status || 'không xác định'));
                        // Sử dụng phương pháp dự phòng nếu EmailJS không hoạt động
                        this.guiLienHeDuPhong();
                    }
                }
            } catch (error) {
                console.error("Lỗi tổng quát:", error);
                toaster.error("Có lỗi xảy ra khi xử lý form liên hệ. Vui lòng thử lại sau.");
            } finally {
                this.dangGui = false;
            }
        },

        // Phương thức gửi dự phòng nếu EmailJS không hoạt động
        guiLienHeDuPhong() {
            if (!this.thongTinDaGui) return;

            try {
                // Tạo nội dung email
                const emailBody = `
Tiêu đề: ${this.thongTinDaGui.tieuDe}
Họ tên: ${this.thongTinDaGui.hoTen}
Email: ${this.thongTinDaGui.email}
Số điện thoại: ${this.thongTinDaGui.soDienThoai || 'Không cung cấp'}

${this.thongTinDaGui.noiDung}
                `;

                // Mã hóa nội dung
                const encodedSubject = encodeURIComponent(this.thongTinDaGui.tieuDe);
                const encodedBody = encodeURIComponent(emailBody);

                // Tạo đường dẫn mailto
                const mailtoUrl = `mailto:nghiemnguyen3106@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

                // Mở ứng dụng email mặc định
                window.location.href = mailtoUrl;

                // Hiển thị thông báo
                toaster.info("Đang mở ứng dụng email của bạn. Vui lòng kiểm tra và gửi email.");

                // Reset form
                this.resetForm();
            } catch (error) {
                console.error("Lỗi khi mở ứng dụng email:", error);
            }
        },

        resetForm() {
            this.formData = {
                hoTen: "",
                email: "",
                soDienThoai: "",
                tieuDe: "",
                noiDung: ""
            };
        },

        saoChepThongTin() {
            if (!this.thongTinDaGui) return;

            try {
                // Tạo nội dung để sao chép
                const textToCopy = `
Tiêu đề: ${this.thongTinDaGui.tieuDe}
Họ tên: ${this.thongTinDaGui.hoTen}
Email: ${this.thongTinDaGui.email}
Số điện thoại: ${this.thongTinDaGui.soDienThoai || 'Không cung cấp'}

Nội dung:
${this.thongTinDaGui.noiDung}
                `;

                // Sao chép vào clipboard
                navigator.clipboard.writeText(textToCopy.trim())
                    .then(() => {
                        toaster.success("Đã sao chép thông tin liên hệ vào clipboard!");
                    })
                    .catch(err => {
                        console.error('Không thể sao chép: ', err);
                        toaster.error("Không thể sao chép thông tin. Vui lòng thử lại.");
                    });
            } catch (error) {
                console.error("Lỗi khi sao chép thông tin:", error);
                toaster.error("Không thể sao chép thông tin. Vui lòng thử lại.");
            }
        }
    }
};
</script>

<style scoped>
.contact-page {
    background-color: #f8f9fa;
}

.hero-section {
    background: linear-gradient(135deg, #530e29 0%, rgb(224, 6, 61) 100%);
    color: white;
    padding: 4rem 0;
    margin-bottom: 2rem;
}

.hero-section h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.hero-section .lead {
    font-size: 1.25rem;
    opacity: 0.9;
}

.contact-info,
.contact-form {
    background: white;
    border-radius: 1rem;
    height: 100%;
}

.icon-wrapper {
    width: 40px;
    height: 40px;
    background: rgba(13, 110, 253, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0d6efd;
}

.info-content h5 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.info-content p,
.info-content a {
    color: #6c757d;
    transition: color 0.3s ease;
}

.info-content a:hover {
    color: #0d6efd;
}

.social-icons {
    display: flex;
    gap: 1rem;
}

.social-icon {
    width: 40px;
    height: 40px;
    background: #f8f9fa;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6c757d;
    text-decoration: none;
    transition: all 0.3s ease;
}

.social-icon:hover {
    background: #0d6efd;
    color: white;
    transform: translateY(-3px);
}

.form-floating {
    margin-bottom: 1rem;
}

.form-control {
    border: 1px solid #dee2e6;
    border-radius: 0.5rem;
    padding: 1rem;
}

.form-control:focus {
    border-color: #0d6efd;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.btn-primary {
    background: linear-gradient(135deg, #0d6efd 0%, #0dcaf0 100%);
    border: none;
    border-radius: 0.5rem;
    padding: 1rem 2rem;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3);
}

.btn-primary:disabled {
    background: #6c757d;
    transform: none;
    box-shadow: none;
}

.map-container iframe {
    border-radius: 1rem;
}

@media (max-width: 768px) {
    .hero-section {
        padding: 3rem 0;
    }

    .hero-section h1 {
        font-size: 2rem;
    }

    .contact-info,
    .contact-form {
        margin-bottom: 1rem;
    }
}
</style>