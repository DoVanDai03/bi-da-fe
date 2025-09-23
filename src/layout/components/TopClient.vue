<template>
    <div class="top-banner">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-12">
                    <div class="top-item">
                        <i class="fas fa-truck-fast"></i>
                        <span>Miễn phí vận chuyển</span>
                    </div>
                </div>
                <div class="col-lg-4 col-md-12">
                    <div class="top-item">
                        <i class="fas fa-shield-alt"></i>
                        <span>Bảo hành chính hãng</span>
                    </div>
                </div>
                <div class="col-lg-4 col-md-12">
                    <div class="top-item">
                        <i class="fas fa-headset"></i>
                        <span>Hỗ trợ 24/7</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopClient'
}
</script>

<style scoped>
.top-banner {
    background: linear-gradient(45deg, #26262c, #0d47a1);
    padding: 10px 0;
    color: white;
}

.top-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 8px;
}

.top-item i {
    font-size: 20px;
    color: #ffd700;
}

.top-item span {
    font-weight: 500;
    font-size: 14px;
}

@media (max-width: 768px) {
    .top-item {
        margin-bottom: 10px;
    }
}
</style>