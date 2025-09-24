<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const status = ref('loading')
const message = ref('Đang xác minh tài khoản...')

onMounted(async () => {
  const token = route.query.token
  if (!token) {
    status.value = 'error'
    message.value = 'Thiếu token xác minh'
    return
  }
  
  try {
    const res = await fetch(`/api/xac-minh?token=${encodeURIComponent(token)}&redirect=false`)
    const data = await res.json()
    
    if (res.ok && data?.status) {
      status.value = 'success'
      message.value = data.message || 'Xác minh tài khoản thành công'
      setTimeout(() => router.push('/dang-nhap'), 2000)
    } else {
      status.value = 'error'
      message.value = data?.message || 'Xác minh thất bại'
      setTimeout(() => router.push('/dang-nhap'), 3000)
    }
  } catch (e) {
    status.value = 'error'
    message.value = 'Có lỗi xảy ra. Vui lòng thử lại.'
    setTimeout(() => router.push('/dang-nhap'), 3000)
  }
})
</script>

<template>
  <div class="verify-container">
    <div class="verify-wrap">
      <div class="verify-icon">
        <div v-if="status === 'loading'" class="spinner"></div>
        <div v-else-if="status === 'success'" class="success-icon">✓</div>
        <div v-else class="error-icon">✗</div>
      </div>
      
      <h2 class="verify-title">
        {{ status === 'success' ? 'Thành công' : status === 'error' ? 'Thất bại' : 'Đang xử lý' }}
      </h2>
      
      <p class="verify-message">{{ message }}</p>
      
      <div v-if="status === 'loading'" class="loading-bar">
        <div class="loading-progress"></div>
      </div>
      
      <div v-if="status !== 'loading'" class="redirect-info">
        <p class="redirect-text">
          {{ status === 'success' ? 'Đang chuyển hướng đến trang đăng nhập...' : 'Đang chuyển hướng về trang đăng nhập...' }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.verify-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.verify-wrap {
  max-width: 520px;
  width: 100%;
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.verify-icon {
  margin-bottom: 24px;
  font-size: 48px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.success-icon {
  color: #28a745;
  font-size: 48px;
  font-weight: bold;
}

.error-icon {
  color: #dc3545;
  font-size: 48px;
  font-weight: bold;
}

.verify-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

.verify-message {
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
  line-height: 1.5;
}

.loading-bar {
  width: 100%;
  height: 4px;
  background-color: #f0f0f0;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 16px;
}

.loading-progress {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
  animation: loading 2s ease-in-out infinite;
}

@keyframes loading {
  0% { width: 0%; }
  50% { width: 70%; }
  100% { width: 100%; }
}

.redirect-info {
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.redirect-text {
  font-size: 14px;
  color: #495057;
  margin: 0;
}

/* Responsive design */
@media (max-width: 576px) {
  .verify-wrap {
    padding: 24px;
    margin: 0 10px;
  }
  
  .verify-title {
    font-size: 24px;
  }
  
  .verify-icon {
    font-size: 40px;
    height: 50px;
  }
  
  .spinner {
    width: 40px;
    height: 40px;
  }
}
</style>
