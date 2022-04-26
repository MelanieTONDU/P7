<template>
  <div id="article">
    <div class="infoUser">
      <img class="avatar_post" src="../assets/avatar.png"/>
      <div class="info">
        <p id="name">{{userName}}</p>
        <p class="date"><time >{{dayjs(article.createdAt).locale("fr").format("DD/MM/YY [à] HH[h]mm")}}</time></p>
      </div>
    </div>
    <h2 id="title">{{title}}</h2>
    <div >
      <p v-if="url != null " class="image"><img  id="image" :src=" url " /></p>
      <p class="content" v-else>{{content}}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs"
import "dayjs/locale/fr"

export default {
  data() {
    return {
      token : localStorage.getItem("token"),
      title : "",
      content : "",
      url : "",
      article: "",
      userName : "",
      article_id : "",
      articleCreate : "",
      dayjs
    }
  },
  created() { 
    this.article_id = window.location.href.split("/")[4];
    axios.get("http://localhost:3000/api/article/" + this.article_id, {
      headers: {Authorization: "Bearer " + this.token}})
      .then(response => {
        let article = response.data;
        this.title = article.title;
        this.userName = article.User.firstName + " " + article.User.lastName;
        this.articleCreate = article.createdAt;
        this.content = article.content;
        this.url = article.imageUrl;
      });
    }
  }
</script>

<style scoped lang="scss">
#article {
  margin-top : 20px;
  width: 100%;
}

#image{
  width: 80%;
}
</style>