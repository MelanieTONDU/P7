<template>
  <div id="forum">
    <div id="bandeau">
      <div v-for="article in articles" :key="article.id" id="articleList">
        <a :href = "article.id"  id="link">
          <div class="infoUser">
            <img class="avatar_post" src="../assets/avatar.png"/>
            <div class="info">
              <p id="name">{{article.User.firstName}} {{article.User.lastName}}</p>
              <p class="date"><time >{{dayjs(article.createdAt).locale("fr").format("DD/MM/YY [à] HH[h]mm")}}</time></p>
            </div>
          </div>
          <p id="title">{{article.title}}</p>
          <p class="content">{{article.content}}</p>
          <p class="commentLength">{{article.Comments.length}} commentaire(s)</p>
        </a>
      </div>
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
      articles : "",
      dayjs
    }
  },
  created() { 
    axios.get("http://localhost:3000/api/article?type=text ",{
    headers: {Authorization: "Bearer " + this.token}})
      .then(response => {
        this.articles = response.data;
      })
    },
  }
</script>

<style scoped lang="scss">

</style>