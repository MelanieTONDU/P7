<template>
  <div class="forum">
    <div id="bandeauAdmin">
    <div class="listPublicationAdmin">
      <div class="listTitle">
        <p class="visibleAdmin">Visible</p>
        <p class="nameAdmin">Utilisateur</p>
        <p class="dateAdmin">Date de publication</p>
        <p class="postContentAdmin">Aperçu de la publication</p>
      </div>
      <div v-for="article in articles" :key="article.id" class="list">
        <p v-if="(article.visible == true)" class="visible"><fa icon="check" class="IconCheck"/></p>
        <p v-else class="visible"><fa icon="xmark" class="IconCross"/></p>
        <p class="nameAdmin">{{article.User.firstName}} {{article.User.lastName}}</p>
        <p class="dateAdmin"><time>{{dayjs(article.createdAt).locale("fr").format("DD/MM/YY")}}</time></p>
        <div class="postContentAdmin">
          <p class="titleAdmin">{{article.title}}</p>
          <div class="imageAdmin" v-if="(article.imageUrl)">
            <img class="image" :src = " article.imageUrl " alt="Image de la publication"/>
          </div>
          <p v-else class="contentAdmin">{{article.content}}</p>
        </div>
        <button  id="buttonAdmin" @click="getDetail(id = article.id)">Voir</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/fr";


export default {
  data() {
    return {
      token : localStorage.getItem("token"),
      articles : [],
      articleId : "",
      title : "",
      text : "",
      msg : "",
      totalPages: "",
      page : 0 ,
      dayjs
    }
  },
  created() { 
    this.getPosts();
  },
  methods : { 
    getPosts: function (){
      axios.get("http://localhost:3000/api/article?isAdmin=true", {
      headers: {Authorization: "Bearer " + this.token}})
        .then(response => {
          this.articles = response.data.articles.rows;
        })
        .catch(error => { 
					if (error.response.status == 401) {
            this.$router.push('/login' );
            localStorage.clear();
					}
				})
    },
    getDetail(id){
      this.$router.push('/article/' + id + "/admin");
    },
    coche(){
      console("test")
    }
  }}
</script>

<style scoped lang="scss">
</style>