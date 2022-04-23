<template>
  <div>
    <HeaderPost/>
    <ForumText />
  </div>
</template>

<script>
import HeaderPost from '@/components/HeaderPost.vue'
import ForumText from '@/components/ForumText.vue'

export default {
  name: 'ForumDiscussion',
  components: {
    HeaderPost,
    ForumText
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