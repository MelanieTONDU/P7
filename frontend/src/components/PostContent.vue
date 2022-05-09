<template>
  <div id="article">
    <div class="topPost">
      <div class="infoUser">
        <img  v-if="(this.userArticle.imageUrl  != null)" id="avatar_post" :src=" this.userArticle.imageUrl  " />
        <img v-else  id="avatar_post" src="../assets/avatar.png" />
        <div class="info">
          <p id="name">{{this.userArticle.firstName}} {{this.userArticle.lastName}}</p>
          <p class="date"><time >{{dayjs(this.article.createdAt).locale("fr").format("DD/MM/YY [à] HH[h]mm")}}</time></p>
        </div>
      </div>
      <div v-if="(this.userId == this.article.users_id) || (this.user.isAdmin == true)" class="buttonList"> 
        <button class="modify" @click="modifyPost()" type="button"><fa icon="pen" class="pen"/></button>
        <button @click="deletePost()" type="button" class="delete"><fa icon="trash" class="trash"/></button>
      </div>
    </div>
    <div id="title">
      <input v-if=" (this.modify == true)" v-model="title" type="text" id="title" :placeholder= article.title />
      <h3 v-else id="title">{{this.article.title}}</h3>
    </div>
    <div id="content">
      <div  v-if="this.article.imageUrl != null " class="contentImg">
        <input v-if="(this.modify == true) && (this.article.imageUrl != null)" name="image" type="file" @change="selectFile()" id="image" ref="image" />
        <p v-else class="image"><img  id="image" :src=" this.article.imageUrl " /></p>
      </div>
      <div v-else class="contentText">
        <textarea  v-if="(this.modify == true)  && (this.content != null) " v-model="content" type="text" class="content" :placeholder= article.content ></textarea>
        <p v-else class="content" >{{this.article.content}}</p>
      </div>
      <button v-if=" (this.modify == true)" @click="changePost(article.id)" type="button">Publier</button>
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
      userArticle : "",
      user: "",
      title : "",
      content : "",
      image : "",
      article: "",
      article_id : "",
      modify : false,
      dayjs
    }
  },
  created() { 
    this.getPost();
    this.getUser();
    },
  methods : { 
    getPost: function (){
    this.article_id = window.location.href.split("/")[4];
    axios.get("http://localhost:3000/api/article/" + this.article_id, {
      headers: {Authorization: "Bearer " + this.token}})
      .then(response => {
        this.article = response.data;
        this.userArticle = this.article.User;
      })
      .catch(error => { 
        if (error.response.status == 401) {
          this.$router.push('/login' );
          localStorage.clear();
        }
      })
    },
    getUser(){
    axios.get("http://localhost:3000/api/auth/" + this.userId, {
      headers: {Authorization: "Bearer " + this.token}})
      .then(response => {
        this.user = response.data;
      })
    },
    selectFile() {
      this.image = this.$refs.image.files[0];
    },
    deletePost: function() {
        axios.delete("http://localhost:3000/api/article/"  + this.article_id,{
        headers: {Authorization: "Bearer " + this.token}})
        .then(() => {
					this.$router.push('/article/text' );
        })
    },
    modifyPost: function() {
      this.modify = true;
    },
    changePost: function() {
        const formData = new FormData();
          formData.append("title", this.title);
          formData.append("content", this.content);
          formData.append("image", this.image);
        axios.put("http://localhost:3000/api/article/"  + this.article_id, formData, {
            headers: {Authorization: "Bearer " + this.token}})
              .then(() => {
                this.modify = false;
                this.getPost();
              })
        },
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