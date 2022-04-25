<template>
  <div id="discussion">
    <HeaderPost/>
    <div id="container">
      <div id="publication">
        <PostContent />
        <CommentList/>
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
#container {
  background-color:rgb(248, 248, 248);
  padding: 20px 30px 20px 30px;
  min-height: 100vh;}
#publication {
  box-shadow: #c4c4c4 1px 1px 3px;
  border-radius: 10px;
  margin: 20px 20% 20px 20%;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  color: black;
  background-color: white;
}
</style>