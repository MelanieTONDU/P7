<template>
  <div id="article">
    <div class="topPost">
      <div class="infoUser">
        <img  v-if="(this.userArticle.imageUrl  != null)" alt="Photo de profil" class="avatar_post" :src=" this.userArticle.imageUrl  " />
        <img v-else  class="avatar_post" src="../assets/avatar.png" alt="Photo de profil" />
        <div class="info">
          <div class="infoLeft">
            <p class="name" >{{this.userArticle.firstName}} {{this.userArticle.lastName}}</p>
            <p class="job"><fa icon="briefcase" class="briefcase"/>{{this.userArticle.job}}</p>
          </div>
        </div>
      </div>
    <div  class="buttonList">
      <p class="dateArticle"><time >Publié le {{dayjs(article.createdAt).locale("fr").format("DD/MM/YY [à] HH[h]mm")}}</time></p>
      <button v-if="(this.userId == this.article.users_id)" class="modify" @click="modifyPost()" type="button"><fa icon="pen" class="pen"/></button>
      <button v-if="(this.userId == this.article.users_id)" @click="deletePost()" type="button" class="delete"><fa icon="trash" class="trash"/></button>
    </div>
    </div>
    <form id="content">
      <div id="titleOnePost">
        <input v-if=" (this.modify == true)" v-model="title" type="text" id="title" :placeholder= article.title />
        <h3 v-else id="title">{{this.article.title}}</h3>
      </div>
      <div v-if="this.article.imageUrl != null " class="contentImg ">
        <input v-if="(this.modify == true) && (this.article.imageUrl != null)" name="image" type="file" @change="selectFile()" class="imageArticle" ref="image" />
        <p v-else class="imageContent justify"><img  class="imageArticle" :src=" this.article.imageUrl " alt="Image de la publication"/></p>
      </div>
      <div v-else id="contentText">
        <textarea  v-if="((this.modify == true)  && (this.content != null))" v-model="content" type="text" ></textarea>
        <p v-else class="content" >{{this.article.content}}</p>
      </div>
      <button v-if=" (this.modify == true)" @click="changePost(article.id)" type="button" class="buttonPublier">Modifier</button>
    </form>
    <div class="like">
      <div v-if="(this.userLike == true)" >
          <button class="buttonLike blue">{{this.article.likes}}<fa @click="addLike()"  icon="thumbs-up" class="thumbs up"/></button>
      </div>
      <div v-else >
          <button class="buttonLike">{{this.article.likes}}<fa @click="addLike()" icon="thumbs-up" class="thumbs up"/></button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs"
import "dayjs/locale/fr"

export default {
  name: 'POstContent',
  data() {
    return {
      token : localStorage.getItem("token"),
      userId : localStorage.getItem("userId"),
      userArticle : "",
      user: "",
      userLike : false,
      likes: "0",
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
    axios.get("http://localhost:3000/api/auth/" + this.userId, {
    headers: {Authorization: "Bearer " + this.token}})
    .then(response => {
      this.user = response.data;
    })
  },
  methods : { 
    getPost(){
      this.article_id = window.location.href.split("/")[4];
      axios.get("http://localhost:3000/api/article/" + this.article_id, {
      headers: {Authorization: "Bearer " + this.token}})
      .then(response => {
        this.article = response.data;
        this.userArticle = this.article.User;
        this.userLiked = this.article.usersLiked.find(p => p == this.userId);
        if (this.userLiked != undefined){
          this.userLike = true;
        }
        else {
          this.userLike = false;
        }
      })
      .catch(error => { 
        if (error.response.status == 401) {
          this.$router.push('/login' );
          localStorage.clear();
        }
      })
    },
    selectFile() {
      this.image = this.$refs.image.files[0];
    },
    deletePost() {
        axios.delete("http://localhost:3000/api/article/"  + this.article_id,{
        headers: {Authorization: "Bearer " + this.token}})
        .then(() => {
					this.$router.push('/article/text' );
        })
    },
    modifyPost() {
      this.modify = true;
      this.content = this.article.content;
      this.title = this.article.title;
    },
    changePost() {
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
    addLike(){
      this.like = 1;
      const formData = {like : this.like, userId : this.userId}
      axios.post("http://localhost:3000/api/article/"  + this.article_id + "/like", formData, {
      headers: {Authorization: "Bearer " + this.token}})
      .then(() => {
        this.getPost();
      })
    },
    cancel() {
        location.reload();
    }
  }
}
</script>

<style scoped lang="scss">
</style>