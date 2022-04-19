<template>
  <div class="article">
    <h1>Publication</h1>
    <div id="title"></div>
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
          let elementItem = document.getElementById('title');
          let elementLink = document.createElement('h2');
          elementItem.appendChild(elementLink);
          elementLink.textContent= "Titre : " + article.title;
          let elementImg = document.createElement('img');
          elementItem.appendChild(elementImg);
          elementImg.src = article.imageUrl;
          let content = document.createElement('p');
          elementItem.appendChild(content);
          content.textContent= article.content;
        })
        });
    }
  }

  
</script>

<style scoped lang="scss">

</style>