<template>
  <div id="article">
    <HeaderPost/>
    <div class="container">
      <h1>Bienvenue</h1>
    </div>
  </div>
</template>

<script>
import HeaderPost from '@/components/HeaderPost.vue'

export default {
  name: 'PostView',
  components: {
    HeaderPost,
  },
  data() {
    return {
      token : localStorage.getItem("token"),
    }
  },
}
</script>

<style scoped lang="scss">
.container {
  background : url("../assets/article_fond.jpg");
  height: 100vh;
}
</style>