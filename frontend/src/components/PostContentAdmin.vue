<template>
    <div id="article">
        <div class="publicationStatusContainer">
            <div class="publicationStatus">
                <p>Publication visible : </p>
                <div>
                    <p v-if="(this.article.visible == true)" class="visible"><fa icon="check" class="IconCheck"/></p>
                    <p v-else class="visible"><fa icon="xmark" class="IconCross"/></p>
                </div>
            </div>
            <button v-if="(this.article.visible == true)" @click="hidden()" class="buttonVisible red"><fa icon="eye-slash" class="IconEye"/>Masquer cette publication</button>
            <button v-else @click="visible()" class="buttonVisible green"><fa icon="eye" class="IconEye"/>Rendre visible cette publication</button>
        </div>
        <h3 id="title">{{this.article.title}}</h3>
        <div id="content">
            <p v-if="this.article.imageUrl != null " class="image"><img  id="image" :src=" this.article.imageUrl " alt="Image de la publication"/></p>
            <p v-else class="content" >{{this.article.content}}</p>
        </div>
        <div class="allCommentAdmin">
            <p v-if=" this.totalComment > 1" class="numberCommentAdmin">{{this.totalComment}} Commentaires</p>
            <p v-else class="numberCommentAdmin" >{{this.totalComment}} Commentaire</p>
            <div v-for="comment in comments" :key="comment.id" class="commentContainerAdmin">
                <p v-if="(comment.visible == true)" class="visible"><fa icon="check" class="IconCheck"/></p>
                <p v-else class="visible"><fa icon="xmark" class="IconCross"/></p>
                <p class="nameAdmin">{{comment.User.firstName}} {{comment.User.lastName}}</p>
                <p class="commentAdmin">{{comment.text}}</p>
                <button v-if="(comment.visible == true)" @click="hiddenComment(comment.id)" class="buttonVisible red"><fa icon="eye-slash" class="IconEye"/>Masquer ce commentaire</button>
                <button v-else @click="visibleComment(comment.id)" class="buttonVisible green"><fa icon="eye" class="IconEye"/>Rendre visible le commentaire</button>
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
      userArticle : "",
      user: "",
      title : "",
      content : "",
      image : "",
      article: "",
      article_id : "",
      comments:"",
      totalComment: "",
      dayjs
    }
  },
  created() { 
    this.getPost();
    this.getUser();
    this.getComments();
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
    getComments : function () {
        axios.get("http://localhost:3000/api/article/" + this.article_id + "/comment?isAdmin=true" ,{
        headers: {Authorization: "Bearer " + this.token}})
            .then(response => {
                console.log(response.data)
                this.comments = response.data.comments.rows;
                this.totalComment = response.data.comments.count;
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
    hidden(){
        const formData = {visible : false};
        axios.put("http://localhost:3000/api/article/" + this.article_id, formData, {
        headers: {Authorization: "Bearer " + this.token}})
        .then(response => {
            this.article = response.data;
            this.getPost()
        })
    },
    visible(){
        const formData = {visible : true};
        axios.put("http://localhost:3000/api/article/" + this.article_id, formData, {
        headers: {Authorization: "Bearer " + this.token}})
        .then(response => {
            this.article = response.data;
            this.getPost()
        })
    },
    hiddenComment(id){
        const formData = {visible : false};
        axios.put("http://localhost:3000/api/article/" + this.article_id + "/comment/" + id, formData, {
        headers: {Authorization: "Bearer " + this.token}})
        .then(() => {
            this.getComments();
        })
    },
    visibleComment(id){
        const formData = {visible : true};
        axios.put("http://localhost:3000/api/article/" + this.article_id + "/comment/" + id, formData, {
        headers: {Authorization: "Bearer " + this.token}})
        .then(() => {
            this.getComments();
        })
    },
    }
  }
</script>

<style scoped lang="scss">

</style>