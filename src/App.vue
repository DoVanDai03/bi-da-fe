<template>
  <component :is="layout">
      <router-view></router-view>
  </component>
</template>

<script>
const default_layout = "client";

export default {
  computed: {
    layout() {
      const route = this.$route.path;
      // Kiểm tra nếu route bắt đầu bằng /admin
      if (route.startsWith('/admin')) {
        return 'default-layout';
      }
      // Sử dụng layout từ meta hoặc layout mặc định
      return (this.$route.meta.layout || default_layout) + "-layout";
    },
  },
};
</script>

<style>
</style>