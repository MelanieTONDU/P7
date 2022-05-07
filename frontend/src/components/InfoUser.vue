<template>
    <div class="infoUser">
      <img  id="avatar_post" :src=" this.user.imageUrl " />
        <div class="info">
            <p id="name">{{user.firstName}} {{user.lastName}}</p>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            token : localStorage.getItem("token"),
            userId : localStorage.getItem("userId"),
            user : "",
        }
    },
    created() {
        this.getUser()
    },
    methods : {
        getUser: function() {
            axios.get("http://localhost:3000/api/auth/" + this.userId,{
            headers: {Authorization: "Bearer " + this.token}})
            .then(response => {
                this.user = response.data;
            })
        },
    }
}
</script>

<style>
</style>