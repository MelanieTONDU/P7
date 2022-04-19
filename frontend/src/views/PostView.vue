<template>
  <div id="article">
    <div id="header">
      <h1>Publication</h1>
      <nav>
        <router-link to="/login" @click="deco()">Se déconnecter</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'PostView',
  data() {
    return {
      token : localStorage.getItem("token"),
    }
  },
  created() { 
    axios.get("http://localhost:3000/api/article", {
        headers: {Authorization: "Bearer " + this.token}})
      .then(response => {
        let articles = response.data;
        articles.forEach(article => {
          let posts = document.getElementById('article');
          let title = document.createElement('h2');
          let post = document.createElement('a');
          post.href = "./article/" + article.id ;
          post.setAttribute("id", "post");
          posts.appendChild(post);
          post.appendChild(title);
          title.textContent= "Titre : " + article.title;
          let img = document.createElement('img');
          post.appendChild(img);
          img.src = article.imageUrl;
          let content = document.createElement('p');
          post.appendChild(content);
          content.textContent= article.content;
        })
      });
    },
    methods: {
        deco: function(){
          localStorage.clear();
        }
    }
  }

  
</script>

<style scoped lang="scss">
#header{
  display : flex; 
  align-items: center;
  justify-content: center;
  h1 {
    padding-left: 25%;
  }
  nav {
    padding-left: 20%;
  }
}
</style>