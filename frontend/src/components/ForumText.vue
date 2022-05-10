<template>
  <div class="forum">
    <div id="bandeau">
      <div id="articleList">
        <div id="link">
          <div class="topAddPost center">
            <h2>Créer une publication</h2>
          </div>
          <InfoUser/>
          <div class="center addPost ">
            <form id="addPostContent">
              <textarea id="addPostTitle" v-model="title" type="text" placeholder="Titre de la publication" maxlength="70" required/>
              <textarea id="addPostText" v-model="text" type="text" placeholder="Ecrivez quelque chose..." required/>
              <p class="message">{{msg}}</p>
              <button id="buttonPublier" @click="addPost()" type="submit">Publier</button>
            </form>
          </div>
        </div>
      </div>
      <div v-for="article in articles" :key="article.id" id="articleList">
        <a :href = "article.id"  id="link">
          <div class="infoUser">
            <img  v-if="(article.User.imageUrl != null)" id="avatar_post" :src=" article.User.imageUrl " />
            <img v-else  id="avatar_post" src="../assets/avatar.png" />
            <div class="info">
              <p id="name">{{article.User.firstName}} {{article.User.lastName}}</p>
              <p class="date"><time >Le {{dayjs(article.createdAt).locale("fr").format("DD/MM/YY [à] HH[h]mm")}}</time></p>
            </div>
          </div>
          <p id="title">{{article.title}}</p>
          <p class="content">{{article.content}}</p>
          <div class="likeComment">
            <p class="likeLength">{{article.likes}}<fa icon="thumbs-up" class="thumbsPost up"/></p>
            <p class="likeLength">{{article.dislikes}} <fa icon="thumbs-down" class="thumbsPost down"/></p>
            <p class="commentLength">{{article.Comments.length}} Commentaire(s)</p>
          </div>
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
						this.msg = 'Vous avez oublié de donner un titre à votre publication !'
        }
        else if (this.text == null || this.text == "") {
          this.msg = 'Votre publication est incomplète !'
        }
        else {
          axios.post("http://localhost:3000/api/article", formData,{
          headers: {Authorization: "Bearer " + this.token}})
            .then(() => {
              this.getPosts();
          })
      }      
     }
   },
}
</script>

<style scoped lang="scss">
</style>