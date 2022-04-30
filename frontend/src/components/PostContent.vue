<template>
  <div id="article">
    <div class="infoUser">
      <img class="avatar_post" src="../assets/avatar.png"/>
      <div class="info">
        <p id="name">{{this.user}}</p>
        <p class="date"><time >{{dayjs(this.article.createdAt).locale("fr").format("DD/MM/YY [à] HH[h]mm")}}</time></p>
      </div>
      <div v-if="this.userId == this.article.users_id "> 
        <button @click="deletePost()" type="button">Supprimer</button>
        <button id="modify" @click="modifyPost()" type="button">Modifier</button>
      </div>
    </div>
    <input v-if=" (this.modify == true)" v-model="newTitle" type="text" id="title" placeholder="Titre"/>
    <h2 v-else id="title">{{this.article.title}}</h2>
    <div >
      <p v-if="this.article.imageUrl != null " class="image"><img  id="image" :src=" this.article.imageUrl " /></p>
      <input v-if=" (this.modify == true)" v-model="newText" type="text" class="content"/>
      <p class="content" v-else>{{this.article.content}}</p>
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
      user : "",
      title : "",
      newTitle : "",
      content : "",
      newText: "",
      article: "",
      article_id : "",
      modify : false,
      dayjs
    }
  },
  created() { 
    this.getPost();
    },
  methods : { 
    getPost: function (){
    this.article_id = window.location.href.split("/")[4];
    axios.get("http://localhost:3000/api/article/" + this.article_id, {
      headers: {Authorization: "Bearer " + this.token}})
      .then(response => {
        this.article = response.data;
        this.user = this.article.User.firstName + this.article.User.lastName;
      });
    },
    deletePost: function() {
        axios.delete("http://localhost:3000/api/article/"  + this.article_id,{
        headers: {Authorization: "Bearer " + this.token}})
        .then(response => {
					this.$router.push('/article/text' );
        console.log(response)
        })
    },
    modifyPost: function() {
        this.modify = true;},
    changePost: function() {
        const newArticle = {title: this.newTitle, content: this.newText}
        axios.put("http://localhost:3000/api/article/"  + this.article_id, newArticle, {
            headers: {Authorization: "Bearer " + this.token}})
            .then((response => {
                this.modify = false;
                this.getPost();
                console.log(response)
            }))
        }
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