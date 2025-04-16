<template>
    <div class="news-page">
        <div class="container py-5">
            <h1 class="text-center mb-5">Tin Tức & Sự Kiện</h1>
            
            <!-- Tìm kiếm và bộ lọc -->
            <div class="search-filter-container mb-5">
                <div class="row">
                    <div class="col-md-8">
                        <div class="search-box">
                            <div class="input-group">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    placeholder="Tìm kiếm tin tức..." 
                                    v-model="searchQuery"
                                    @input="filterNews"
                                >
                                <button class="btn btn-primary" type="button">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <select class="form-select" v-model="selectedCategory" @change="filterNews">
                            <option value="">Tất cả danh mục</option>
                            <option value="tin-tuc">Tin tức</option>
                            <option value="su-kien">Sự kiện</option>
                            <option value="tuyen-dung">Tuyển dụng</option>
                            <option value="khuyen-mai">Khuyến mãi</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <!-- Tin tức nổi bật -->
            <div class="featured-news mb-5" v-if="!searchQuery && !selectedCategory">
                <h3 class="section-title mb-4">Tin Tức Nổi Bật</h3>
                <div class="row">
                    <div class="col-lg-8 mb-4">
                        <div class="featured-article">
                            <div class="article-img-container">
                                <img src="https://picsum.photos/id/237/800/400" alt="Tin tức nổi bật" class="img-fluid rounded shadow">
                                <div class="category-badge">Sự kiện</div>
                            </div>
                            <div class="article-content p-4">
                                <h2 class="article-title">FPT Software Academy tổ chức lễ tốt nghiệp cho sinh viên khóa 2023</h2>
                                <div class="article-meta d-flex align-items-center mb-3">
                                    <i class="far fa-calendar-alt me-2"></i>
                                    <span class="me-3">15/04/2023</span>
                                    <i class="far fa-user me-2"></i>
                                    <span>Admin</span>
                                </div>
                                <p class="article-excerpt">
                                    FPT Software Academy vừa tổ chức thành công lễ tốt nghiệp cho hơn 200 sinh viên khóa 2023, 
                                    đánh dấu chặng đường học tập và phát triển của thế hệ lập trình viên tương lai...
                                </p>
                                <router-link to="/tin-tuc/1" class="btn btn-outline-primary">Đọc tiếp <i class="fas fa-arrow-right ms-2"></i></router-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="row">
                            <div class="col-12 mb-4">
                                <div class="featured-article-small">
                                    <div class="article-img-container">
                                        <img src="https://picsum.photos/id/24/400/200" alt="Tin tức" class="img-fluid rounded shadow">
                                        <div class="category-badge">Tin tức</div>
                                    </div>
                                    <div class="article-content p-3">
                                        <h4 class="article-title">FPT Software phát động cuộc thi lập trình AI toàn quốc</h4>
                                        <div class="article-meta d-flex align-items-center mb-2">
                                            <i class="far fa-calendar-alt me-2"></i>
                                            <span>10/04/2023</span>
                                        </div>
                                        <router-link to="/tin-tuc/2" class="read-more">Đọc tiếp <i class="fas fa-arrow-right ms-1"></i></router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="featured-article-small">
                                    <div class="article-img-container">
                                        <img src="https://picsum.photos/id/29/400/200" alt="Tin tức" class="img-fluid rounded shadow">
                                        <div class="category-badge">Tuyển dụng</div>
                                    </div>
                                    <div class="article-content p-3">
                                        <h4 class="article-title">Cơ hội việc làm cho 1000+ sinh viên CNTT tại FPT Software</h4>
                                        <div class="article-meta d-flex align-items-center mb-2">
                                            <i class="far fa-calendar-alt me-2"></i>
                                            <span>05/04/2023</span>
                                        </div>
                                        <router-link to="/tin-tuc/3" class="read-more">Đọc tiếp <i class="fas fa-arrow-right ms-1"></i></router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Danh sách tin tức -->
            <div class="news-list">
                <h3 class="section-title mb-4" v-if="filteredNews.length > 0">
                    {{ searchQuery || selectedCategory ? 'Kết quả tìm kiếm' : 'Tin Tức Mới Nhất' }}
                </h3>
                <div v-if="filteredNews.length > 0" class="row">
                    <div v-for="(news, index) in filteredNews" :key="index" class="col-md-6 col-lg-4 mb-4">
                        <div class="news-card h-100">
                            <div class="article-img-container">
                                <img :src="news.image" :alt="news.title" class="img-fluid news-image">
                                <div class="category-badge">{{ news.category }}</div>
                            </div>
                            <div class="news-content p-3">
                                <h4 class="news-title">{{ news.title }}</h4>
                                <div class="news-meta d-flex align-items-center mb-3">
                                    <i class="far fa-calendar-alt me-2"></i>
                                    <span>{{ news.date }}</span>
                                </div>
                                <p class="news-excerpt">{{ news.excerpt }}</p>
                                <router-link :to="'/tin-tuc/' + news.id" class="btn btn-outline-primary btn-sm">Đọc tiếp</router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center py-5">
                    <div class="empty-state">
                        <i class="fas fa-newspaper fa-4x mb-3"></i>
                        <h4>Không tìm thấy tin tức</h4>
                        <p>Không có tin tức phù hợp với tìm kiếm của bạn.</p>
                        <button class="btn btn-primary" @click="resetFilters">Xem tất cả tin tức</button>
                    </div>
                </div>
                
                <!-- Phân trang -->
                <div class="pagination-container d-flex justify-content-center mt-5">
                    <nav>
                        <ul class="pagination">
                            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                <a class="page-link" href="#" @click.prevent="currentPage--">
                                    <i class="fas fa-chevron-left"></i>
                                </a>
                            </li>
                            <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
                                <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
                            </li>
                            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                <a class="page-link" href="#" @click.prevent="currentPage++">
                                    <i class="fas fa-chevron-right"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            
            <!-- Đăng ký nhận tin -->
            <div class="newsletter-section mt-5 p-4 rounded">
                <div class="row align-items-center">
                    <div class="col-lg-6 mb-3 mb-lg-0">
                        <h4 class="mb-2">Đăng ký nhận tin tức và khuyến mãi</h4>
                        <p class="mb-0">Cập nhật những thông tin mới nhất về sự kiện, chương trình đào tạo và ưu đãi đặc biệt.</p>
                    </div>
                    <div class="col-lg-6">
                        <div class="input-group">
                            <input type="email" class="form-control" placeholder="Nhập email của bạn">
                            <button class="btn btn-primary" type="button">Đăng ký</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TinTuc",
    data() {
        return {
            searchQuery: "",
            selectedCategory: "",
            currentPage: 1,
            itemsPerPage: 6,
            allNews: [
                {
                    id: 1,
                    title: "FPT Software Academy tổ chức lễ tốt nghiệp cho sinh viên khóa 2023",
                    category: "Sự kiện",
                    categorySlug: "su-kien",
                    date: "15/04/2023",
                    image: "https://picsum.photos/id/237/600/400",
                    excerpt: "FPT Software Academy vừa tổ chức thành công lễ tốt nghiệp cho hơn 200 sinh viên khóa 2023, đánh dấu chặng đường học tập và phát triển của thế hệ lập trình viên tương lai..."
                },
                {
                    id: 2,
                    title: "FPT Software phát động cuộc thi lập trình AI toàn quốc",
                    category: "Tin tức",
                    categorySlug: "tin-tuc",
                    date: "10/04/2023",
                    image: "https://picsum.photos/id/24/600/400",
                    excerpt: "Cuộc thi nhằm khuyến khích các tài năng trẻ phát triển các giải pháp ứng dụng AI vào thực tiễn, hướng tới mục tiêu xây dựng một cộng đồng AI mạnh mẽ tại Việt Nam..."
                },
                {
                    id: 3,
                    title: "Cơ hội việc làm cho 1000+ sinh viên CNTT tại FPT Software",
                    category: "Tuyển dụng",
                    categorySlug: "tuyen-dung",
                    date: "05/04/2023",
                    image: "https://picsum.photos/id/29/600/400",
                    excerpt: "FPT Software tuyển dụng hơn 1000 vị trí việc làm cho sinh viên ngành CNTT với nhiều ưu đãi hấp dẫn. Đây là cơ hội lớn để các bạn trẻ bắt đầu sự nghiệp trong lĩnh vực phần mềm..."
                },
                {
                    id: 4,
                    title: "Khóa học lập trình Web Frontend giảm 30% học phí",
                    category: "Khuyến mãi",
                    categorySlug: "khuyen-mai",
                    date: "01/04/2023",
                    image: "https://picsum.photos/id/26/600/400",
                    excerpt: "Nhân dịp kỷ niệm 5 năm thành lập, FPT Software Academy triển khai chương trình giảm 30% học phí cho khóa học lập trình Web Frontend. Chương trình áp dụng từ ngày 01/04 đến 30/04/2023..."
                },
                {
                    id: 5,
                    title: "FPT Software ký kết hợp tác với Microsoft về đào tạo AI",
                    category: "Tin tức",
                    categorySlug: "tin-tuc",
                    date: "28/03/2023",
                    image: "https://picsum.photos/id/42/600/400",
                    excerpt: "Thỏa thuận hợp tác giữa FPT Software và Microsoft sẽ mang đến cơ hội tiếp cận công nghệ AI tiên tiến cho sinh viên, đồng thời mở ra cơ hội việc làm rộng mở trong lĩnh vực này..."
                },
                {
                    id: 6,
                    title: "Workshop: Phát triển ứng dụng với React và TypeScript",
                    category: "Sự kiện",
                    categorySlug: "su-kien",
                    date: "25/03/2023",
                    image: "https://picsum.photos/id/48/600/400",
                    excerpt: "Workshop cung cấp kiến thức thực tế về phát triển ứng dụng web hiện đại với React và TypeScript. Sự kiện dành cho sinh viên CNTT và những người đam mê lập trình web..."
                },
                {
                    id: 7,
                    title: "Vòng chung kết hackathon FPT Edu 2023",
                    category: "Sự kiện",
                    categorySlug: "su-kien",
                    date: "20/03/2023",
                    image: "https://picsum.photos/id/63/600/400",
                    excerpt: "10 đội xuất sắc nhất đã lọt vào vòng chung kết Hackathon FPT Edu 2023. Các đội sẽ trình bày các giải pháp sáng tạo của mình trước hội đồng giám khảo gồm các chuyên gia hàng đầu..."
                },
                {
                    id: 8,
                    title: "Tuyển dụng 50 thực tập sinh Java Developer",
                    category: "Tuyển dụng",
                    categorySlug: "tuyen-dung",
                    date: "15/03/2023",
                    image: "https://picsum.photos/id/36/600/400",
                    excerpt: "FPT Software tuyển dụng 50 thực tập sinh Java Developer cho các dự án lớn. Đây là cơ hội để sinh viên được làm việc trong môi trường chuyên nghiệp và học hỏi từ các chuyên gia..."
                },
                {
                    id: 9,
                    title: "Giảm 20% học phí khóa DevOps cho nhóm từ 3 người",
                    category: "Khuyến mãi",
                    categorySlug: "khuyen-mai",
                    date: "10/03/2023",
                    image: "https://picsum.photos/id/66/600/400",
                    excerpt: "Ưu đãi đặc biệt dành cho nhóm từ 3 người đăng ký khóa học DevOps. Chương trình nhằm khuyến khích học tập theo nhóm, tạo môi trường chia sẻ và hỗ trợ lẫn nhau..."
                }
            ]
        };
    },
    computed: {
        filteredNews() {
            let result = this.allNews;
            
            if (this.selectedCategory) {
                result = result.filter(item => item.categorySlug === this.selectedCategory);
            }
            
            if (this.searchQuery) {
                const searchLower = this.searchQuery.toLowerCase();
                result = result.filter(item => 
                    item.title.toLowerCase().includes(searchLower) || 
                    item.excerpt.toLowerCase().includes(searchLower)
                );
            }
            
            // Phân trang
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            
            return result.slice(startIndex, endIndex);
        },
        totalPages() {
            let filteredItems = this.allNews;
            
            if (this.selectedCategory) {
                filteredItems = filteredItems.filter(item => item.categorySlug === this.selectedCategory);
            }
            
            if (this.searchQuery) {
                const searchLower = this.searchQuery.toLowerCase();
                filteredItems = filteredItems.filter(item => 
                    item.title.toLowerCase().includes(searchLower) || 
                    item.excerpt.toLowerCase().includes(searchLower)
                );
            }
            
            return Math.ceil(filteredItems.length / this.itemsPerPage);
        }
    },
    methods: {
        filterNews() {
            this.currentPage = 1; // Reset về trang đầu tiên khi lọc
        },
        resetFilters() {
            this.searchQuery = "";
            this.selectedCategory = "";
            this.currentPage = 1;
        }
    }
};
</script>

<style scoped>
.news-page {
    background-color: #f9f9f9;
    min-height: calc(100vh - 80px);
}

.section-title {
    position: relative;
    padding-bottom: 10px;
    margin-bottom: 20px;
}

.section-title:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 3px;
    background-color: #ff4444;
}

.search-filter-container {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.featured-article, .featured-article-small, .news-card {
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    height: 100%;
}

.featured-article:hover, .featured-article-small:hover, .news-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.article-img-container, .news-image {
    position: relative;
    overflow: hidden;
    height: 200px;
}

.featured-article .article-img-container {
    height: 300px;
}

.featured-article-small .article-img-container {
    height: 150px;
}

.article-img-container img, .news-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
}

.article-img-container:hover img, .news-card:hover .news-image {
    transform: scale(1.05);
}

.category-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #ff4444;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: 500;
}

.article-title, .news-title {
    margin-bottom: 10px;
    font-weight: 600;
    transition: color 0.3s;
}

.news-title {
    font-size: 1.1rem;
    min-height: 2.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.featured-article:hover .article-title, 
.featured-article-small:hover .article-title,
.news-card:hover .news-title {
    color: #ff4444;
}

.article-meta, .news-meta {
    color: #777;
    font-size: 0.9rem;
}

.article-excerpt, .news-excerpt {
    color: #555;
    margin-bottom: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.read-more {
    color: #ff4444;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s;
}

.read-more:hover {
    color: #cc0000;
}

.btn-outline-primary {
    color: #ff4444;
    border-color: #ff4444;
}

.btn-outline-primary:hover {
    background-color: #ff4444;
    border-color: #ff4444;
    color: white;
}

.btn-primary {
    background-color: #ff4444;
    border-color: #ff4444;
}

.btn-primary:hover {
    background-color: #cc0000;
    border-color: #cc0000;
}

.newsletter-section {
    background-color: #f0f8ff;
    border: 1px solid #ddf0ff;
}

.pagination .page-link {
    color: #ff4444;
    border-radius: 0;
}

.pagination .active .page-link {
    background-color: #ff4444;
    border-color: #ff4444;
}

.pagination .page-item:first-child .page-link {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

.pagination .page-item:last-child .page-link {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

.empty-state {
    color: #777;
    padding: 30px;
}

.empty-state i {
    color: #ddd;
}
</style> 