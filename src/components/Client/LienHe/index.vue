<template>
    <div class="contact-page">
        <div class="container py-5">
            <h1 class="text-center mb-5">Liên Hệ Với Chúng Tôi</h1>
            
            <div class="row">
                <!-- Thông tin liên hệ -->
                <div class="col-lg-5 mb-4">
                    <div class="contact-info p-4 h-100">
                        <h3 class="mb-4">Thông Tin Liên Hệ</h3>
                        
                        <div class="info-item mb-3">
                            <div class="d-flex align-items-center mb-2">
                                <i class="fas fa-map-marker-alt me-3"></i>
                                <h5 class="mb-0">Địa Chỉ</h5>
                            </div>
                            <p class="ms-4">
                                <a href="https://www.google.com/maps?q=FPT+Software+Academy" target="_blank" class="address-link">
                                    Tòa nhà FPT Complex, Đ. Nam Kỳ Khởi Nghĩa, Ngũ Hành Sơn, Đà Nẵng 550000, Việt Nam
                                </a>
                            </p>
                        </div>
                        
                        <div class="info-item mb-3">
                            <div class="d-flex align-items-center mb-2">
                                <i class="fas fa-phone-alt me-3"></i>
                                <h5 class="mb-0">Số Điện Thoại</h5>
                            </div>
                            <p class="ms-4">
                                <a href="tel:+84123456789">+84 123 456 789</a>
                            </p>
                        </div>
                        
                        <div class="info-item mb-3">
                            <div class="d-flex align-items-center mb-2">
                                <i class="fas fa-envelope me-3"></i>
                                <h5 class="mb-0">Email</h5>
                            </div>
                            <p class="ms-4">
                                <a href="mailto:nghiemnguyen3106@gmail.com">nghiemnguyen3106@gmail.com</a>
                            </p>
                        </div>
                        
                        <div class="info-item">
                            <div class="d-flex align-items-center mb-2">
                                <i class="fas fa-clock me-3"></i>
                                <h5 class="mb-0">Giờ Làm Việc</h5>
                            </div>
                            <p class="ms-4">Thứ Hai - Thứ Bảy: 8:00 - 20:00<br>Chủ Nhật: 10:00 - 18:00</p>
                        </div>
                        
                        <div class="social-media mt-4">
                            <h5 class="mb-3">Kết nối với chúng tôi</h5>
                            <div class="d-flex gap-3">
                                <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                                <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                                <a href="#" class="social-icon"><i class="fab fa-youtube"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Form liên hệ -->
                <div class="col-lg-7">
                    <div class="contact-form p-4">
                        <h3 class="mb-4">Gửi Tin Nhắn Cho Chúng Tôi</h3>
                        
                        <form @submit.prevent="guiLienHe" ref="formLienHe">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="hoTen" class="form-label">Họ và tên</label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        id="hoTen" 
                                        name="hoTen"
                                        v-model="formData.hoTen" 
                                        required
                                    >
                                </div>
                                
                                <div class="col-md-6 mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        class="form-control" 
                                        id="email" 
                                        name="email"
                                        v-model="formData.email" 
                                        required
                                    >
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <label for="soDienThoai" class="form-label">Số điện thoại</label>
                                <input 
                                    type="tel" 
                                    class="form-control" 
                                    id="soDienThoai" 
                                    name="soDienThoai"
                                    v-model="formData.soDienThoai"
                                >
                            </div>
                            
                            <div class="mb-3">
                                <label for="tieuDe" class="form-label">Tiêu đề</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="tieuDe" 
                                    name="tieuDe"
                                    v-model="formData.tieuDe" 
                                    required
                                >
                            </div>
                            
                            <div class="mb-4">
                                <label for="noiDung" class="form-label">Nội dung</label>
                                <textarea 
                                    class="form-control" 
                                    id="noiDung" 
                                    name="noiDung"
                                    rows="5" 
                                    v-model="formData.noiDung" 
                                    required
                                ></textarea>
                            </div>
                            
                            <button type="submit" class="btn btn-primary btn-lg" :disabled="dangGui">
                                <span v-if="dangGui">
                                    <i class="fas fa-spinner fa-spin me-2"></i>Đang gửi email...
                                </span>
                                <span v-else>
                                    <i class="fas fa-paper-plane me-2"></i>Gửi tin nhắn
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
            <!-- Bản đồ -->
            <div class="map-container mt-5">
                <h3 class="text-center mb-4">Vị Trí Của Chúng Tôi</h3>
                <div class="map-wrapper">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.7707229451805!2d108.2594906!3d15.9791958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142111c9cc9e8c7%3A0x41e0f97d36ba0d30!2sFPT%20Software%20Academy%20-%20Trung%20t%C3%A2m%20%C4%91%C3%A0o%20t%E1%BA%A1o%20l%E1%BA%ADp%20tr%C3%ACnh%20vi%C3%AAn!5e0!3m2!1svi!2svn!4v1681022024200!5m2!1svi!2svn" 
                        width="100%" 
                        height="450" 
                        style="border:0;" 
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
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
            this.thongTinDaGui = {...this.formData};
            
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
                    console.log("Bắt đầu gửi email với:", {serviceID, templateID});
                    
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
    background-color: #f9f9f9;
    min-height: calc(100vh - 80px);
}

.contact-info, .contact-form {
    background: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    height: 100%;
}

.info-item i {
    color: #ff4444;
    font-size: 20px;
    width: 30px;
}

.info-item a {
    color: #333;
    text-decoration: none;
    transition: color 0.3s;
}

.info-item a:hover {
    color: #ff4444;
}

.social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: #f5f5f5;
    border-radius: 50%;
    color: #333;
    transition: all 0.3s;
}

.social-icon:hover {
    background: #ff4444;
    color: white;
    transform: translateY(-3px);
}

.form-control {
    padding: 12px;
    border: 1px solid #eee;
    border-radius: 8px;
}

.form-control:focus {
    box-shadow: 0 0 0 3px rgba(255, 68, 68, 0.1);
    border-color: #ff4444;
}

.btn-primary {
    background-color: #ff4444;
    border: none;
    padding: 12px 30px;
    border-radius: 8px;
    transition: all 0.3s;
}

.btn-primary:hover {
    background-color: #ff2222;
    transform: translateY(-2px);
}

.btn-primary:disabled {
    background-color: #ff7777;
}

.map-wrapper {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
    .contact-info, .contact-form {
        margin-bottom: 20px;
    }
}

.info-item a.address-link {
    color: #333;
    text-decoration: none;
    transition: color 0.3s;
    display: inline-block;
    position: relative;
}

.info-item a.address-link:hover {
    color: #ff4444;
}

.info-item a.address-link:after {
    content: "\f35d";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    margin-left: 5px;
    font-size: 0.8em;
    opacity: 0.7;
}

.success-message {
    background: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.message-content {
    white-space: pre-line;
    border-left: 3px solid #ff4444;
}

.alert-success {
    background-color: #e8f5e9;
    border-color: #66bb6a;
    color: #2e7d32;
}

.card-header {
    font-weight: 500;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style> 