<template>
    <div class="oneComment">
        <div class="likeandComment">
                <p>{{this.likes}}</p>
            <button @click="addLike()" class="buttonLike">
                <div v-if="(this.userLike == true)">
                    <fa  icon="thumbs-up" class="thumbsBlue"/>
                </div>
                <div v-else>
                    <fa icon="thumbs-down" class="thumbs"/>
                </div>
            </button>
            <button @click="addDislike()">
                <p>{{this.dislikes}}</p>
                <div v-if="(this.userDislike == true)">
                    <fa icon="thumbs-down" class="thumbsBlue"/>
                </div>
                <div v-else>
                    <fa icon="thumbs-down" class="thumbs"/>
                </div>            </button>
            <p v-if="comments.length > 1" id="nummberComment">{{comments.length}} Commentaires</p>
            <p v-else id="nummberComment" >{{comments.length}} Commentaire</p>
        </div>
        <div v-for="comment in comments" :key="comment.id" id="discussion">
            <img  v-if="(comment.User.imageUrl != null)" id="avatar_comment" :src=" comment.User.imageUrl " />
            <img v-else  id="avatar_comment" src="../assets/avatar.png" />
            <div id="commentaire" >
                <div class="commentContainer">
                    <p id="name">{{comment.User.firstName}} {{comment.User.lastName}}</p>
                    <p class="comment">{{comment.text}}</p>
                </div>
                <div v-if="(this.userId == comment.User.id) || (this.user.isAdmin == true) " class="buttonListComment"> 
                    <button class="modify" @click="modifyComment(comment.id)" type="button"><fa icon="pen" class="penComment"/></button>
                    <button class="delete" @click="deleteComment(comment.id)" type="button"><fa icon="trash" class="trashComment"/></button>
                    <div v-if=" (commentId == comment.id) && (this.modify == true)">
                        <textarea :value= this.text type="text" />
                        <button @click="changeComment(comment.id)" type="button">Publier</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="addComment">
            <img  v-if="(this.user.imageUrl != null)" id="avatar_comment" :src=" user.imageUrl " />
            <img v-else  id="avatar_comment" src="../assets/avatar.png" />
            <textarea id="addComment" v-model="text" type="text" placeholder="Ajouter un commentaire" required ></textarea>
            <button @click="addComment()" type="button">Publier</button>
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
            likes: "0",
            dislikes: "0",
            users : "",
            user: "",
            userDislike : false,
            userLike : false,
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
        this.getUser();
    },
    methods : { 
        getComments : function () {
            this.article_id = window.location.href.split("/")[4];
            axios.get("http://localhost:3000/api/article/" + this.article_id + "/comment/",{
            headers: {Authorization: "Bearer " + this.token}})
                .then(response => {
                    this.comments = response.data.filter(p => p.articles_id == this.article_id);
                    console.log(this.comments)
                })
                .catch(error => { 
					if (error.response.status == 401) {
                        this.$router.push('/login' );
                        localStorage.clear();
					}
				})
        },
        getUser(){
            axios.get("http://localhost:3000/api/auth/" + this.userId, {
            headers: {Authorization: "Bearer " + this.token}})
                .then(response => {
                    this.user = response.data;
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
                .then(() => {
                    this.getComments();
                })
        },
        modifyComment: function(id) {
            this.commentId = id;
            this.modify = true;
            },
        changeComment: function(id) {
            const commentId = id;
            const newComment = {text: this.newText}
            axios.put("http://localhost:3000/api/article/"  + this.article_id + "/comment/" + commentId, newComment, {
                headers: {Authorization: "Bearer " + this.token}})
                .then(() => {
                    this.modify = false;
                    this.getComments();
                })
        },
        addLike(){
            this.like = 1;
            const formData = {like : this.like, userId : this.userId}
            axios.post("http://localhost:3000/api/article/"  + this.article_id + "/like", formData, {
                headers: {Authorization: "Bearer " + this.token}})
                .then((response) => {
                    this.likes = response.data.likes;
                    this.dislikes = response.data.dislikes;
                    this.usersLiked = response.data.usersLiked;
                    this.usersDisliked = response.data.usersDisliked;
                    this.userLiked = this.usersLiked.find(p => p == this.userId);
                    if (this.userLiked != undefined){
                        this.userLike = true;
                        this.userDisliked = this.usersDisliked.find(p => p == this.userId);
                            if(this.userDisliked != undefined){
                                this.userDislike = false
                            }
                    }
                    else {
                        this.userLike = false;
                    }
                    this.getComments();
                })
        },
        addDislike(){
            this.dislike = 1;
            const formData = {dislike : this.dislike, userId : this.userId}
            axios.post("http://localhost:3000/api/article/"  + this.article_id + "/dislike", formData, {
                headers: {Authorization: "Bearer " + this.token}})
                .then((response) => {
                    this.dislikes = response.data.dislikes;
                    this.likes = response.data.likes;
                    this.usersDisliked = response.data.usersDisliked;
                    this.userDisliked = this.usersDisliked.find(p => p == this.userId);
                    if (this.userDisliked != undefined){
                        this.userDislike = true;
                    this.getComments();
                        this.userLiked = this.usersLiked.find(p => p == this.userId);
                            if(this.userLiked != undefined){
                                this.userLike = false
                            }
                    }
                    else {
                        this.userDislike = false;
                    }
                    this.getComments();
                })
        },
    }
}
</script>

<style scoped lang="scss">

</style>