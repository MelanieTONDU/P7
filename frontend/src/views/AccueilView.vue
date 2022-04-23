<template>
  <div id="article">
    <HeaderPost/>
    <h1>Bienvenue</h1>
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
</style>