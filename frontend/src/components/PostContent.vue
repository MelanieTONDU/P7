<template>
    <div id="article">
      <div id="infoArticle">
        <img id="avatar" src="../assets/avatar.png"/>
        <div class="user">
          <p class="name">{{userName}}</p>
          <p class="date">{{articleCreate}}</p>
        </div>
      </div>
      <h2 id="title">{{title}}</h2>
      <p id="content">{{content}}</p>
      <img src={{src}} id="image"/>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      token : localStorage.getItem("token"),
      title : "",
      content : "",
      src : "",
      userName : "",
      article_id : "",
      articleCreate : "",
    }
  },
  created() { 
    this.article_id = window.location.href.split("/")[4];
    axios.get("http://localhost:3000/api/article/" + this.article_id, {
      headers: {Authorization: "Bearer " + this.token}})
      .then(response => {
        let article = response.data;
        this.title = article.title;
        this.userName = article.User.firstName + " " + article.User.lastName;
        this.articleCreate = article.createdAt;
        if(article.content != null){
          this.content = article.content;
          document.getElementById("article").removeChild(document.getElementById("image"))}
        else if(article.imageUrl != null){
          document.getElementById("image").src = article.imageUrl;
          document.getElementById("article").removeChild(document.getElementById("content"))}
      });
    }
  }
</script>

<style scoped lang="scss">
#article {
    margin-top : 20px;
}
#infoArticle
{
  display: flex;
  padding: 10px 0 0 20px;
  .name {
    margin: 10px 0 5px 0;
    font-weight: bold;
  }
  .date {
    font-size: 13px;
    margin: 0 0 0 10px;
  }
}
#title {
  margin: 5px;
}
#image {
  width: 80%;
}
#content{
  display: flex;
  justify-content: flex-start;
  padding: 0 0 15px 10%;
}
</style>