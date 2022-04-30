<template>
  <div id="forum">
    <div id="bandeau">
      <div id="link">
        <div class="infoUser">
            <img class="avatar_post" src="../assets/avatar.png"/>
            <div class="info">
                <p id="name">{{user.firstName}} {{user.lastName}}</p>
            </div>
        </div>
        <div>
          <input id="addPost" v-model="title" type="text" placeholder="Titre"/>
          <input name="image" type="file" @change="selectFile()" id="image" ref="image" />
          <button @click="addPost()" type="button">Publier</button>
        </div>
      </div>
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
          <img class="image" :src = " article.imageUrl "/>
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
      userId : localStorage.getItem("userId"),
      user : "",
      articles : [],
      article_id : "",
      title : "",
      image: "",
      file : "",
      url : "",
      imageUrl : "",
      dayjs
    }
  },
  created() { 
    this.getPosts();
    this.getUser();
  },
  methods : {
    getPosts(){
      axios.get("http://localhost:3000/api/article?type=image ",{
      headers: {Authorization: "Bearer " + this.token}})
        .then(response => {
          this.articles = response.data;
        })
    },
    getUser() {
      axios.get("http://localhost:3000/api/auth/" + this.userId,{
      headers: {Authorization: "Bearer " + this.token}})
      .then(response => {
        this.user = response.data;
      })
    },
    selectFile() {
      this.image = this.$refs.image.files[0];
    },
    addPost() {
      const formData = new FormData();
        formData.append("title", this.title);
        formData.append("image", this.image);
        formData.append("content", this.content);
      axios.post("http://localhost:3000/api/article", formData,{
        headers: {Authorization: "Bearer " + this.token}})
        .then(response => {
          this.getPosts();
            console.log("response" + response)
        })        
    },
  }
}
</script>

<style scoped lang="scss">
.image {
  width: 80%;
  padding-bottom: 20px;
}
</style>