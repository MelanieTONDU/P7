<template>
  <div>
    <HeaderPost/>
    <ProfilContent/>
  </div>
</template>

<script>
import HeaderPost from '@/components/HeaderPost.vue'
import ProfilContent from '@/components/ProfilContent.vue'

export default {
  name: 'ForumDiscussion',
  components: {
    HeaderPost,
    ProfilContent
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