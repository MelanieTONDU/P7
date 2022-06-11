<template>
  <div>
    <HeaderAdmin/>
    <div class="forum center">
      <div class="bandeau">
        <div id="publicationAdmin">
          <PostContentAdmin />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderAdmin from '@/components/admin/HeaderAdmin.vue';
import PostContentAdmin from '@/components/admin/PostContentAdmin.vue';

export default {
  components : {
    HeaderAdmin,
    PostContentAdmin,
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
  height: 100vh;
}
#publication {
  box-shadow: #c4c4c4 1px 1px 3px;
  border-radius: 10px;
  width: 95%;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  color: black;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>