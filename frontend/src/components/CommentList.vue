<template>
    <div class="oneComment">
        <div class="top">
            <p v-if="comments.length > 1" id="nummberComment">{{comments.length}} Commentaires</p>
            <p v-else id="nummberComment" >{{comments.length}} Commentaire</p>
        </div>
        <div>
            <input id="addComment" v-model="text" type="text" placeholder="Ajouter un commentaire"/>
            <button @click="addComment()" type="button">Publier</button>
        </div>
        <div v-for="comment in comments" :key="comment.id" id="discussion">
            <img id="avatarComment" src="../assets/avatar.png"/>
            <div id="commentaire" >
                <p id="name">{{comment.User.firstName}} {{comment.User.lastName}}</p>
                <p class="comment">{{comment.text}}</p>
            <div v-if="this.userId == comment.User.id "> 
                <button id="delete" @click="deleteComment(comment.id)" type="button">Supprimer</button>
                <button id="modify" @click="modifyComment(comment.id)" type="button">Modifier</button>
                <div v-if=" (commentId == comment.id) && (this.modify == true)">
                    <input v-model="newText" type="text"/>
                    <button @click="changeComment(comment.id)" type="button">Publier</button>
                </div>

            </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            token : localStorage.getItem("token"),
            article_id : "",
            users : "",
            userId : localStorage.getItem("userId"),
            comments : [],
            comment : "",
            commentId : "",
            text : "",
            newText : "",
            modify : false,
        }
    },
    created() { 
        this.getComments()
    },
    methods : { 
        getComments : function () {
            this.article_id = window.location.href.split("/")[4];
            axios.get("http://localhost:3000/api/article/" + this.article_id + "/comment/",{
            headers: {Authorization: "Bearer " + this.token}})
                .then(response => {
                    this.comments = response.data.filter(p => p.articles_id == this.article_id);
                })
        },
        addComment: function() {
            const comment = { text: this.text};
            axios.post("http://localhost:3000/api/article/"  + this.article_id + "/comment", comment,{
                headers: {Authorization: "Bearer " + this.token}})
                .then((response => {
                    this.getComments();
                    this.commentId = response.data;
                }))
        },
        deleteComment : function(id) {
            const commentId = id;
                axios.delete("http://localhost:3000/api/article/"  + this.article_id + "/comment/" + commentId,{
                headers: {Authorization: "Bearer " + this.token}})
                .then((response => {
                    this.getComments();
                    console.log(response)
                }))
        },
        modifyComment: function(id) {
            this.commentId = id;
            this.modify = true;},
        changeComment: function(id) {
            const commentId = id;
            const newComment = {text: this.newText}
            axios.put("http://localhost:3000/api/article/"  + this.article_id + "/comment/" + commentId, newComment, {
                headers: {Authorization: "Bearer " + this.token}})
                .then((response => {
                    this.modify = false;
                    this.getComments();
                    console.log(response)
                }))
        }
    }
}
</script>

<style scoped lang="scss">
#discussion{
    display: flex;
    #avatarComment {
    width: 80px;
    object-fit: contain;
    padding: 0 15px 0 15px;
    }
    #commentaire{
        background-color:rgb(240, 240, 240);
        border-radius: 10px;
        padding: 15px;
        margin: 15px 25px 15px 0;
        .comment{
            margin: 0;
        }
        #name{
            font-weight: bold;
            margin: 0 0 10px 0;
            text-align: start;
        }
    }
}
.top {
    border-top: 1px solid rgba(0, 0, 0, 0.171);
}
.oneComment {
    width: 100%;
}
#addComment {
      background-color: white;
  width: 30%;
  border-radius: 26px;
}
</style>