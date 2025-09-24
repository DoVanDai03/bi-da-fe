<template>
    <div class="news-detail-page">
        <div class="container py-5" v-if="!isLoading && !errorMessage">
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <div class="news-detail-card p-4 p-md-5">
                        <div class="article-header mb-4">
                            <h1 class="mb-3">{{ article.title }}</h1>
                            <div class="article-meta d-flex align-items-center text-muted">
                                <i class="far fa-calendar-alt me-2"></i>
                                <span class="me-3">{{ article.ngayTao }}</span>
                                <i class="far fa-user me-2"></i>
                                <span>{{ article.author }}</span>
                            </div>
                        </div>

                        <div class="article-cover mb-4" v-if="article.image">
                            <img :src="article.image" :alt="article.title" class="img-fluid rounded shadow-sm">
                        </div>

                        <div class="article-content" v-if="article.content_long" v-html="article.content_long"></div>

                        <div v-else class="text-muted">Không có nội dung hiển thị.</div>

                        <div class="mt-4">
                            <router-link to="/tin-tuc" class="btn btn-outline-primary">
                                <i class="fas fa-arrow-left me-2"></i>Quay lại tin tức
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container py-5" v-if="isLoading">
            <div class="text-center text-muted">Đang tải bài viết...</div>
        </div>

        <div class="container py-5" v-if="!isLoading && errorMessage">
            <div class="text-center text-danger">{{ errorMessage }}</div>
            <div class="text-center mt-3">
                <router-link to="/tin-tuc" class="btn btn-outline-primary">Quay lại danh sách</router-link>
            </div>
        </div>
    </div>
    
</template>

<script>
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
    name: "ChiTietTinTuc",
    data() {
        return {
            article: {},
            isLoading: false,
            errorMessage: ""
        }
    },
    mounted() {
        this.fetchArticle();
    },
    watch: {
        '$route.params.id': function () {
            this.fetchArticle();
        }
    },
    methods: {
        fetchArticle() {
            const id = this.$route.params.id;
            if (!id) {
                this.errorMessage = "Thiếu mã bài viết.";
                return;
            }
            this.isLoading = true;
            this.errorMessage = "";
            axios
                .get(`/api/news/${id}`)
                .then((res) => {
                    if (res.data && res.data.status === true) {
                        this.article = res.data.data;
                    } else {
                        this.errorMessage = res?.data?.message || "Không thể tải bài viết.";
                        toaster.error(this.errorMessage);
                    }
                })
                .catch((err) => {
                    this.errorMessage = "Có lỗi xảy ra khi tải bài viết.";
                    toaster.error(this.errorMessage);
                    console.error(err);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        }
    }
}
</script>

<style scoped>
.news-detail-page {
    background-color: #f9f9f9;
    min-height: calc(100vh - 80px);
}

.news-detail-card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.article-header h1 {
    font-weight: 700;
}

.article-cover img {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.article-content :deep(img) {
    max-width: 100%;
    height: auto;
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
</style>