<template>
  <div class="forum">
    <div id="bandeau">
      <div id="articleList">
        <div id="link">
          <div class="topAddPost center">
            <h2>Créer une publication</h2>
          </div>
          <InfoUser/>
          <div class="addPost center">
            <form id="addPostContent">
              <input id="addPostTitle" v-model="title" type="text" placeholder="Titre de la publication" maxlength="70" required/>
              <input name="image" type="file" @change="selectFile()" id="addPostImage" ref="image" />
              <button id="buttonPublier" @click="addPost()" type="submit">Publier</button>
              <p>{{msg}}</p>
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
              <p class="date"><time >{{dayjs(article.createdAt).locale("fr").format("DD/MM/YY [à] HH[h]mm")}}</time></p>
            </div>
          </div>
          <p id="title">{{article.title}}</p>
          <img class="image" :src = " article.imageUrl "/>
          <div class="likeComment">
            <p class="likeLength">{{article.likes}} j'aime</p>
            <p class="likeLength">{{article.dislikes}} je n'aime pas</p>
            <p class="commentLength">{{article.Comments.length}} Commentaire(s)</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs"
import "dayjs/locale/fr"
import InfoUser from '@/components/InfoUser.vue'

export default {
  data() {
    return {
      token : localStorage.getItem("token"),
      articles : [],
      article_id : "",
      title : "",
      image: "",
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
    getPosts(){
      axios.get("http://localhost:3000/api/article?type=image ",{
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
    selectFile() {
      this.image = this.$refs.image.files[0];
    },
    addPost() {
      const formData = new FormData();
        formData.append("title", this.title);
        formData.append("image", this.image);
      if(this.title == null || this.title == "") {
        this.msg = 'Titre vide'
      }
      axios.post("http://localhost:3000/api/article", formData,{
        headers: {Authorization: "Bearer " + this.token}})
        .then(() => {
          this.getPosts();
        })  
				.catch(error => { 
					if (error.response.status == 400) {
						this.msg = 'Image vide !'
					}
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