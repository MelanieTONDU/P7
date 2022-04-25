<template>
    <div>
        <div v-for="article in articles" :key="article.id" id="discussion">
          <a :href = "article.id"  id="post">
            <div class="infoUser">
              <img id="avatarComment" src="../assets/avatar.png"/>
              <p id="name">{{article.User.firstName}} {{article.User.lastName}}</p>
            </div>
            <p id="title">{{article.title}}</p>
            <p class="comment">{{article.content}}</p>
          </a>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            token : localStorage.getItem("token"),
            articles : "",
            article_id : "",
            users : "",
        }
    },
    created() { 
        axios.get("http://localhost:3000/api/article?type=text ",{
        headers: {Authorization: "Bearer " + this.token}})
            .then(response => {
                this.articles = response.data;
            })
        },
    }
</script>

<style scoped lang="scss">
#discussion{
  display: flex;
  justify-content: center;
  margin: 40px 0 40px 0;
  .infoUser {
    display: flex;
  }
  #avatarComment {
  width: 80px;
  object-fit: contain;
  padding: 0 15px 0 15px;
  }
  #name {
    font-weight: bold;
  }
  #title {
    font-weight: bold;
    font-size: 1.2em;
    margin-top: 0;
  }
}

</style>