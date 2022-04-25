<template>
    <div>
        <div >
            <p v-if="comments.length > 1" id="nummberComment">{{comments.length}} Commentaires</p>
            <p v-else id="nummberComment" >{{comments.length}} Commentaire</p>
        </div>
        <div v-for="comment in comments" :key="comment.id" id="discussion">
            <img id="avatarComment" src="../assets/avatar.png"/>
            <div id="commentaire" >
                <p id="name">{{comment.User.firstName}} {{comment.User.lastName}}</p>
                <p class="comment">{{comment.text}}</p>
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
            comments : "",
        }
    },
    created() { 
        this.article_id = window.location.href.split("/")[4];
        axios.get("http://localhost:3000/api/article/" + this.article_id + "/comment/",{
        headers: {Authorization: "Bearer " + this.token}})
            .then(response => {
                this.comments = response.data.filter(p => p.articles_id == this.article_id);
            })
        },
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
        margin: 15px 0 15px 0;
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
</style>