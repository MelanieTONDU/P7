<template>
  <div id="article">
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
    axios.get("http://localhost:3000/api/article?type=text", {
        headers: {Authorization: "Bearer " + this.token}})
      .then(response => {
        let articles = response.data;
        articles.forEach(article => {
          let posts = document.getElementById('article');
          let title = document.createElement('h2');
          let post = document.createElement('a');
          post.href = "./" + article.id ;
          post.setAttribute("id", "post");
          posts.appendChild(post);
          post.appendChild(title);
          title.textContent= "Titre : " + article.title;
          let content = document.createElement('p');
          post.appendChild(content);
          content.textContent= article.content;
        axios.get("http://localhost:3000/api/auth/" + article.users_id, {        
            headers: {Authorization: "Bearer " + this.token}})
            .then(response => {
                let content = document.createElement('p');
                post.appendChild(content);
                content.textContent= response.data.firstName + " " + response.data.lastName;
            })
        })
      });
    },
  }
</script>

<style scoped lang="scss">
</style>