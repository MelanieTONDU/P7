<template>
  <div id="article">
    <HeaderPost/>
  </div>
</template>

<script>
import axios from "axios";
import HeaderPost from '@/components/HeaderPost.vue'

export default {
  name: 'PostView',
  components : {
    HeaderPost
  },
  data() {
    return {
      token : localStorage.getItem("token"),
    }
  },
  created() { 
    const id = window.location.href.split("/")[4];
    axios.get("http://localhost:3000/api/article/" + id, {
        headers: {Authorization: "Bearer " + this.token}})
      .then(response => {
        let article = response.data;
          let posts = document.getElementById('article');
          let title = document.createElement('h2');
          let post = document.createElement('div');
          post.href = "./article/" + article.id ;
          post.setAttribute("id", "post");
          posts.appendChild(post);
          post.appendChild(title);
          title.textContent= "Titre : " + article.title;
          let content = document.createElement('p');
          post.appendChild(content);
          content.textContent= article.content;
                    console.log(article.imageUrl)
          if(article.imageUrl != null){
            let img = document.createElement('img');
            post.appendChild(img);
            img.src = article.imageUrl;
          }
        })
    axios.get("http://localhost:3000/api/article/" + id + "/comment/",{
            headers: {Authorization: "Bearer " + this.token}})
      .then(response => {
        const data = response.data;
        const comments = data.filter(p => p.articles_id == id);
          comments.forEach(comment =>{
            let posts = document.getElementById('article');
            let post = document.createElement('p');
            posts.appendChild(post);
            post.textContent = "Commentaires : " + comment.text;
          })
        })
      },
    methods: {
        deco: function(){
          localStorage.clear();
        }
    }
  }
</script>

<style scoped lang="scss">
</style>