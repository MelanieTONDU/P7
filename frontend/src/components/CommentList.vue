<template>
    <div class="allComment">
        <p v-if=" this.totalComment > 1" class="numberComment">{{this.totalComment}} Commentaires</p>
        <p v-else class="numberComment" >{{comments.length}} Commentaire</p>
        <form class="addComment">
            <img  v-if="(this.user.imageUrl != null)" class="avatar_comment" :src=" user.imageUrl " alt="Photo de profil"/>
            <img v-else  class="avatar_comment" src="../assets/avatar.png" alt="Photo de profil"/>
            <textarea class="addCommentText" v-model="text" type="text" placeholder="Ajouter un commentaire..."  wrap="hard" required ></textarea>
            <button id="buttonPublier" @click="addComment()" type="submit">Publier</button>
        </form>
        <div class="commentsList">
            <div v-for="comment in comments" :key="comment.id" class="oneComment">
                <img  v-if="(comment.User.imageUrl != null)" class="avatar_comment" :src=" comment.User.imageUrl " alt="Photo de profil"/>
                <img v-else  class="avatar_comment" src="../assets/avatar.png" alt="Photo de profil"/>
                <div class="commentaire" >
                    <div>
                        <p class="name">{{comment.User.firstName}} {{comment.User.lastName}}</p>
                        <p class="comment">{{comment.text}}</p>
                    </div>
                    <div v-if="(this.userId == comment.User.id)" class="buttonListComment"> 
                        <button class="modify" @click="modifyComment(comment.id)" type="button"><fa icon="pen" class="penComment"/></button>
                        <button class="delete" @click="deleteComment(comment.id)" type="button"><fa icon="trash" class="trashComment"/></button>
                        <div v-if=" (commentId == comment.id) && (this.modify == true)">
                            <textarea v-model= this.newText type="text"></textarea>
                            <button @click="changeComment(comment.id)" type="button">Publier</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="(this.comments.length < this.totalComment)" class="paginationContainer">
                <button @click="updateMore()" class="buttonPaginationComment">Affichez plus de commentaires</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'CommetnList',
    data() {
        return {
            token : localStorage.getItem("token"),
            article_id : "",
            user: "",
            userId : localStorage.getItem("userId"),
            comments : "",
            commentId : "",
            totalComment:"",
            text : "",
            newText : "",
            modify : false,
            totalPages: "",
            size : 3,
            page : 0 ,
        }
    },
    created() { 
        this.getComments()
        axios.get("http://localhost:3000/api/auth/" + this.userId, {
        headers: {Authorization: "Bearer " + this.token}})
        .then(response => {
            this.user = response.data;
        })
    },
    methods : { 
        getComments : function () {
            this.article_id = window.location.href.split("/")[4];
            axios.get("http://localhost:3000/api/article/" + this.article_id + "/comment?size=" + this.size + "&page=" + this.page ,{
            headers: {Authorization: "Bearer " + this.token}})
            .then(response => {
                this.comments = response.data.comments.rows;
                this.totalComment = response.data.comments.count;
            })
            .catch(error => { 
                if (error.response.status == 401) {
                    this.$router.push('/login' );
                    localStorage.clear();
                }
            })
        },
        addComment: function() {
            axios.post("http://localhost:3000/api/article/"  + this.article_id + "/comment", {text: this.text},{
            headers: {Authorization: "Bearer " + this.token}})
            .then(() => {
                this.getComments();
            })
        },
        deleteComment : function(id) {
            axios.delete("http://localhost:3000/api/article/"  + this.article_id + "/comment/" + id,{
            headers: {Authorization: "Bearer " + this.token}})
            .then(() => {
                this.getComments();
            })
        },
        modifyComment: function(id) {
            this.commentId = id;
            this.modify = true;
        },
        changeComment: function(id) {
            axios.put("http://localhost:3000/api/article/"  + this.article_id + "/comment/" + id, {text: this.newText}, {
            headers: {Authorization: "Bearer " + this.token}})
            .then(() => {
                this.modify = false;
                this.getComments();
            })
        },
        updateMore() {
            axios.get("http://localhost:3000/api/article/" + this.article_id + "/comment?" + "size=" + this.size+3 + "&" + "page=" + this.page ,{
            headers: {Authorization: "Bearer " + this.token}})
            .then(response => {
                this.comments = response.data.comments.rows;
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