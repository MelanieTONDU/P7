<template>
  <div>
    <HeaderPost/>
    <ForumMultimedia/>
  </div>
</template>

<script>
import HeaderPost from '@/components/HeaderPost.vue'
import ForumMultimedia from '@/components/ForumMultimedia.vue'


export default {
  name: 'ForumDiscussion',
  components: {
    HeaderPost,
    ForumMultimedia
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