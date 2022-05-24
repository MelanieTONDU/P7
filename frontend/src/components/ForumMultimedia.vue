<template>
  <div class="forum">
    <div class="bandeau">
      <div class="articleList">
        <div class="lien">
          <div class="topAddPost center">
            <h2>Créer une publication</h2>
          </div>
          <InfoUser/>
          <div class="addPost center">
            <form id="addPostContent">
              <input id="addPostTitle" v-model="title" type="text" placeholder="Titre de la publication" maxlength="70" required/>
              <input name="image" type="file" @change="selectFile()" id="addPostImage" ref="image" />
              <p>{{msg}}</p>
              <button class="buttonPublier" @click="addPost()" type="submit">Publier</button>
            </form>
          </div>
        </div>
      </div>
      <div v-for="article in articles" :key="article.id" class="articleList">
        <a :href = "article.id"  class="lien">
          <div class="infoUser">
            <img  v-if="(article.User.imageUrl != null)" class="avatar_post" :src=" article.User.imageUrl " alt="Photo de profil"/>
            <img v-else  class="avatar_post" src="../assets/avatar.png" alt="Photo de profil"/>
            <div class="info">
              <div class="infoLeft">
                <p class="name" >{{article.User.firstName}} {{article.User.lastName}}</p>
                <p class="job"><fa icon="briefcase" class="briefcase"/>{{article.User.job}}</p>
              </div>
              <p class="date"><time >Publié le {{dayjs(article.createdAt).locale("fr").format("DD/MM/YY [à] HH[h]mm")}}</time></p>
            </div>
          </div>
          <p class="title">{{article.title}}</p>
          <img class="image" :src = " article.imageUrl " alt="Image de la publication"/>
          <div class="like center">
            <p class="likeLength">{{article.likes}}<fa icon="thumbs-up" class="thumbsPost up"/></p>
          </div>
          <div v-if="(article.Comments.length == 0 )">
            <p class="commentNumber">0 Commentaire</p>
          </div>
          <div v-else>
            <p class="commentNumber">Commentaires récents</p>
            <div v-for="comment in article.Comments" :key="comment.id" class="oneComment">
              <div v-if="(comment.visible == true)"  class="oneCommentTop">
                  <img  v-if="(comment.User.imageUrl != null)" class="avatar_comment" :src=" comment.User.imageUrl " alt="Photo de profil"/>
                  <img v-else  class="avatar_comment" src="../assets/avatar.png" alt="Photo de profil"/>
                  <div class="commentaire" >
                      <div class="commentTop">
                          <p class="name">{{comment.User.firstName}} {{comment.User.lastName}}</p>
                      </div>
                      <div class="contentComment">
                          <p class="comment">{{comment.text}}</p>
                      </div>
                  </div>
              </div>
              <p class="dateComment"><time >Publié le {{dayjs(comment.createdAt).locale("fr").format("DD/MM/YY")}}</time></p>
            </div>
          </div>
        </a>
      </div>
        <div class="pagination">
          <div v-if="(this.page > 0 )">
            <button @click="getPosts(this.page = 0)" class="buttonPagination">&lt;&lt;</button>
            <button @click="updateLess()" class="buttonPagination">&lt;</button>
          </div>
          <p class="textPagination">Page {{this.page +1}} sur {{totalPages + 1}}</p>
          <div v-if="(this.page < this.totalPages)">
            <button @click="updateMore()" class="buttonPagination">&gt;</button>
            <button @click="getPosts(this.page = this.totalPages)" class="buttonPagination">&gt;&gt;</button>
          </div>
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
  name: 'ForumMultimedia',
  data() {
    return {
      token : localStorage.getItem("token"),
      articles : [],
      article_id : "",
      title : "",
      image: "",
      msg : "",
      totalPages: "",
      page : 0 ,
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
      axios.get("http://localhost:3000/api/article?type=image&size=5&" + "page=" + this.page ,{
      headers: {Authorization: "Bearer " + this.token}})
      .then(response => {
        this.articles = response.data.articles.rows;
        this.totalPages = response.data.totalPages - 1 ;
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
      else {
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
      }
    },
    updateMore() {
      this.page = this.page + 1; 
      axios.get("http://localhost:3000/api/article?type=image&size=5&" + "page=" + this.page ,{
      headers: {Authorization: "Bearer " + this.token}})
      .then(() => {
        this.getPosts()
      })
      .catch(error => { 
        if (error.response.status == 401) {
          this.$router.push('/login' );
          localStorage.clear();
        }
      })
    },
    updateLess() {
      this.page = this.page - 1; 
      axios.get("http://localhost:3000/api/article?type=image&size=5&" + "page=" + this.page ,{
      headers: {Authorization: "Bearer " + this.token}})
      .then(() => {
        this.getPosts()
      })
      .catch(error => { 
        if (error.response.status == 401) {
          this.$router.push('/login' );
          localStorage.clear();
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>