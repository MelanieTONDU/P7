<template>
  <div id="forum">
    <div id="bandeau">
      <div id="articleList">
        <div id="link">
          <InfoUser/>
          <div>
            <input id="addPost" v-model="title" type="text" placeholder="Titre de la publication"/>
            <input v-model="text" type="text" placeholder="Ecrivez quelque chose..."/>
            <button @click="addPost()" type="button">Publier</button>
            <p>{{msg}}</p>
          </div>
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
          <p class="content">{{article.content}}</p>
          <p class="commentLength">{{article.Comments.length}} commentaire(s)</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import InfoUser from '@/components/InfoUser.vue'

export default {
  data() {
    return {
      token : localStorage.getItem("token"),
      articles : [],
      articleId : "",
      title : "",
      text : "",
      msg : "",
      dayjs
    }
  },
  components : {
    InfoUser
  },
  created() { 
    this.getPosts();
  },
  methods : { 
    getPosts: function (){
      axios.get("http://localhost:3000/api/article?type=text ",{
      headers: {Authorization: "Bearer " + this.token}})
        .then(response => {
          this.articles = response.data;
          console.log(this.articles)
        })
        .catch(error => { 
					if (error.response.status == 401) {
            this.$router.push('/login' );
            localStorage.clear();
					}
				})
    },
    addPost: function() {
      const formData = new FormData();
        formData.append("title", this.title);
        formData.append("content", this.text);
        if(this.title == null || this.title == "") {
						this.msg = 'Titre vide'
        }
        else if (this.text == null || this.text == "") {
          this.msg = 'article vide'
        }
        else {
      axios.post("http://localhost:3000/api/article", formData,{
        headers: {Authorization: "Bearer " + this.token}})
        .then(response => {
          this.getPosts();
            console.log("response" + response)
        })  }      
    },
  }
}
</script>

<style scoped lang="scss">
</style>