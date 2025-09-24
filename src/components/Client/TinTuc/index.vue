<template>
    <div class="news-page">
        <div class="container py-5">
            <h1 class="text-center mb-5">Tin Tức & Sự Kiện</h1>

            <!-- Tin tức nổi bật + Sidebar -->
            <div class="featured-news mb-5">
                <h3 class="section-title mb-4">Tin Tức Nổi Bật</h3>
                <div class="row">
                    <div class="col-lg-12 mb-4" v-if="featuredItem">
                        <div class="featured-article">
                            <div class="article-img-container">
                                <img :src="featuredItem.image" alt="Tin tức nổi bật"
                                    class="img-fluid rounded shadow">
                                <div class="category-badge">Sự kiện</div>
                            </div>
                            <div class="article-content p-4">
                                <h2 class="article-title">{{ featuredItem.title }}</h2>
                                <div class="article-meta d-flex align-items-center mb-3">
                                    <i class="far fa-calendar-alt me-2"></i>
                                    <span class="me-3">{{ featuredItem.ngayTao }}</span>
                                    <i class="far fa-user me-2"></i>
                                    <span>{{ featuredItem.author }}</span>
                                </div>
                                <p class="article-excerpt">
                                    {{ featuredItem.content_short }}
                                </p>
                                <router-link :to="'/tin-tuc/' + featuredItem.id" class="btn btn-outline-primary">Đọc tiếp <i
                                        class="fas fa-arrow-right ms-2"></i></router-link>
                            </div>
                        </div>
                    </div>                   
                </div>
            </div>
    
               
                <div class="pagination-container d-flex justify-content-center mt-5">
                    <nav>
                        <ul class="pagination">
                            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                <a class="page-link" href="#" @click.prevent="prevPage">
                                    <i class="fas fa-chevron-left"></i>
                                </a>
                            </li>
                            <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
                                <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
                            </li>
                            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                <a class="page-link" href="#" @click.prevent="nextPage">
                                    <i class="fas fa-chevron-right"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
export default {
    name: "TinTuc",
    data() {
        return {
            searchQuery: "",
            selectedCategory: "",
            currentPage: 1,
            itemsPerPage: 1,
            allNews: []
        };
    },
    mounted() {
        this.layBaiViet();
    },
    computed: {
        filteredNews() {
            let items = this.allNews || [];

            if (this.selectedCategory) {
                items = items.filter(item => item.categorySlug === this.selectedCategory);
            }

            if (this.searchQuery) {
                const searchLower = this.searchQuery.toLowerCase();
                items = items.filter(item =>
                    (item.title || '').toLowerCase().includes(searchLower) ||
                    (item.content_short || '').toLowerCase().includes(searchLower)
                );
            }

            return items;
        },
        totalPages() {
            const pages = Math.ceil((this.filteredNews.length || 0) / this.itemsPerPage) || 1;
            return pages;
        },
        paginatedNews() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredNews.slice(start, end);
        },
        featuredItem() {
            return this.paginatedNews[0] || null;
        },
        sidebarNews() {
            const currentId = this.featuredItem ? this.featuredItem.id : null;
            const others = this.filteredNews.filter(n => n && n.id !== currentId);
            return others.slice(0, 3);
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
        },
        goToPage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.currentPage = page;
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage -= 1;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage += 1;
            }
        },
        layBaiViet() {
            axios
                .get("/api/news")
                .then((res) => {
                    if (res.data.status == true) {
                        this.allNews = res.data.data;
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    toaster.error('Có lỗi xảy ra khi lấy danh sách bài viết!');
                    console.error('Error fetching reviews:', error);
                });
        },
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

.featured-article,
.featured-article-small,
.news-card {
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    height: 100%;
}

.featured-article:hover,
.featured-article-small:hover,
.news-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.article-img-container,
.news-image {
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

.article-img-container img,
.news-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
}

.article-img-container:hover img,
.news-card:hover .news-image {
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

.article-title,
.news-title {
    margin-bottom: 10px;
    font-weight: 600;
    transition: color 0.3s;
}

.news-title {
    font-size: 1.1rem;
    min-height: 2.5rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.featured-article:hover .article-title,
.featured-article-small:hover .article-title,
.news-card:hover .news-title {
    color: #ff4444;
}

.article-meta,
.news-meta {
    color: #777;
    font-size: 0.9rem;
}

.article-excerpt,
.news-excerpt {
    color: #555;
    margin-bottom: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
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