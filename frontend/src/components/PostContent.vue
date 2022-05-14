<template>
  <div id="article">
    <div class="topPost">
      <div class="infoUser">
        <img  v-if="(this.userArticle.imageUrl  != null)" alt="Photo de profil" id="avatar_post" :src=" this.userArticle.imageUrl  " />
        <img v-else  id="avatar_post" src="../assets/avatar.png" alt="Photo de profil" />
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

    <form id="content">
      <div v-if="this.article.imageUrl != null " class="contentImg">
        <input v-if="(this.modify == true) && (this.article.imageUrl != null)" name="image" type="file" @change="selectFile()" id="image" ref="image" />
        <p v-else class="image"><img  id="image" :src=" this.article.imageUrl " alt="Image de la publication"/></p>
      </div>

      <div v-else id="contentText">
        <textarea  v-if="((this.modify == true)  && (this.content != null))" v-model="content" type="text" id="test2" :placeholder= article.content ></textarea>
        <p v-else class="content" >{{this.article.content}}</p>
      </div>

      <button v-if=" (this.modify == true)" @click="changePost(article.id)" type="button">Publier</button>
    </form>

    <div class="likeandComment">
        <button @click="addLike()" >
            <div v-if="((this.userLike == true) && (this.userDislike == false))" class="buttonLike blue">
                <p >{{this.article.likes}}</p>
                <fa icon="thumbs-up" class="thumbs"/>
            </div>
            <div v-else class="buttonLike ">
                <p>{{this.article.likes}}</p>
                <fa icon="thumbs-up" class="thumbsGrey"/>
            </div>
        </button>
        <button @click="addDislike()" >
            <div v-if="((this.userDislike == true) && (this.userLike == false))" class="buttonLike blue">
              <p >{{this.article.dislikes}}</p>
              <fa icon="thumbs-down" class="thumbs"/>
            </div>
            <div v-else class="buttonLike">
              <p >{{this.article.dislikes}}</p>
              <fa icon="thumbs-down" class="thumbsGrey"/>
            </div>
        </button>
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
      userDislike : false,
      userLike : false,
      likes: "0",
      dislikes: "0",
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
        this.userLiked = this.article.usersLiked.find(p => p == this.userId);
        this.userDisliked = this.article.usersDisliked.find(p => p == this.userId);
        if ((this.userLiked != undefined) && (this.userDisliked == undefined)){
          this.userLike = true;
          this.userDislike = false;
        }
        else if ((this.userDisliked != undefined) && (this.userLiked == undefined)) {
          this.userDislike = true;
          this.userLike = false;
        }
        else {
          this.userDislike = false;
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
        addLike(){
            this.like = 1;
            const formData = {like : this.like, userId : this.userId}
            axios.post("http://localhost:3000/api/article/"  + this.article_id + "/like", formData, {
                headers: {Authorization: "Bearer " + this.token}})
                .then(() => {
                    this.getPost();
                })
        },
        addDislike(){
            this.dislike = 1;
            const formData = {dislike : this.dislike, userId : this.userId}
            axios.post("http://localhost:3000/api/article/"  + this.article_id + "/dislike", formData, {
                headers: {Authorization: "Bearer " + this.token}})
                .then(() => {
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