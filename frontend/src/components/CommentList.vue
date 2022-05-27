<template>
    <div class="allComment">
        <p v-if=" this.totalComment > 1" class="commentNumber">{{this.totalComment}} Commentaires</p>
        <p v-else class="commentNumber" >{{comments.length}} Commentaire</p>
        <form class="addComment center">
            <img  v-if="(this.user.imageUrl != null)" class="avatar_comment" :src=" user.imageUrl " alt="Photo de profil"/>
            <img v-else  class="avatar_comment" src="../assets/avatar.png" alt="Photo de profil"/>
            <textarea class="addCommentText noBorder" v-model="text" placeholder="Ajouter un commentaire..." required></textarea>
            <button class="buttonPublier noBorder" @click="addComment()" type="submit">Publier</button>
        </form>
        <p class="messageComment">{{msg}}</p>
        <div class="commentsList">
            <div v-for="comment in comments" :key="comment.id" class="oneComment">
                <div class="oneCommentTop center">
                    <img  v-if="(comment.User.imageUrl != null)" class="avatar_comment" :src=" comment.User.imageUrl " alt="Photo de profil"/>
                    <img v-else  class="avatar_comment" src="../assets/avatar.png" alt="Photo de profil"/>
                    <div class="commentaire" >
                        <div class="commentTop">
                            <p class="name">{{comment.User.firstName}} {{comment.User.lastName}}</p>
                            <div v-if="(this.userId == comment.User.id)" class="buttonListComment"> 
                                <button class="modify noBorder" @click="modifyComment(comment.id)" type="button"><fa icon="pen" class="penComment"/></button>
                                <button class="delete noBorder" @click="deleteComment(comment.id)" type="button"><fa icon="trash" class="trashComment"/></button>
                            </div>
                        </div>
                        <div class="contentComment">
                            <textarea v-if="(commentId == comment.id) && (this.modify == true)" v-model= this.newText ></textarea>
                            <p v-else class="comment">{{comment.text}}</p>
                            <button v-if="(commentId == comment.id) &&  (this.modify == true)" @click="changeComment(comment.id)" type="button" class="buttonPublier noBorder">Modifier</button>
                        </div>
                    </div>
                </div>
                <p class="dateComment"><time >Publié le {{dayjs(comment.createdAt).locale("fr").format("DD/MM/YY")}}</time></p>
            </div>
            <div v-if="(this.comments.length < this.totalComment)" class="paginationContainer">
                <button @click="updateMore()" class="buttonPaginationComment noBorder">Affichez plus de commentaires</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs"
import "dayjs/locale/fr"

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
            msg:"",
            totalPages: "",
            size : 3,
            page : 0,
            dayjs
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
        getComments() {
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
        addComment(){
            if(this.text == null || this.text == "") {
                this.msg = 'Commentaire vide';
            }
            else {
                axios.post("http://localhost:3000/api/article/"  + this.article_id + "/comment", {"text" : this.text},{
                headers: {Authorization: "Bearer " + this.token}})
                .then(() => {
                    location.reload();
                })
            }
        },
        deleteComment : function(id) {
            axios.delete("http://localhost:3000/api/article/"  + this.article_id + "/comment/" + id,{
            headers: {Authorization: "Bearer " + this.token}})
            .then(() => {
                location.reload();
            })
        },
        modifyComment(id) {
            this.commentId = id;
            this.modify = true;
            axios.get("http://localhost:3000/api/article/" + this.article_id + "/comment/" + id ,{
            headers: {Authorization: "Bearer " + this.token}})
            .then(response => {
                this.newText = response.data.text;
            })
        },
        changeComment(id) {
            axios.put("http://localhost:3000/api/article/"  + this.article_id + "/comment/" + id, {text: this.newText}, {
            headers: {Authorization: "Bearer " + this.token}})
            .then(() => {
                this.modify = false;
                location.reload();
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