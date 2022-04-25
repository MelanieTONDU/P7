<template>
  <div id="articleList">
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'ForumDiscussion',
  data() {
    return {
      token : localStorage.getItem("token"),
    }
  },
  created() { 
    axios.get("http://localhost:3000/api/article?type=image", {
        headers: {Authorization: "Bearer " + this.token}})
      .then(response => {
        let articles = response.data;
        articles.forEach(article => {
          let posts = document.getElementById('articleList');
          let title = document.createElement('h2');
          let post = document.createElement('a');
          post.href = "./" + article.id ;
          post.setAttribute("id", "post");
          posts.appendChild(post);
          post.appendChild(title);
          title.textContent= "Titre : " + article.title;
          let img = document.createElement('img');
          post.appendChild(img);
          img.src = article.imageUrl;
          

        })
      });
    },
  }
</script>

<style scoped lang="scss">
</style>