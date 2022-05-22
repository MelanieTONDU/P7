<template>
  <div>
    <HeaderPost/>
    <div class="forum">
      <div class="bandeau">
        <div class="publication">
          <PostContent />
          <CommentList/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderPost from '@/components/HeaderPost.vue';
import PostContent from '@/components/PostContent.vue';
import CommentList from '@/components/CommentList.vue';

export default {
  components : {
    HeaderPost,
    PostContent,
    CommentList
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