<template>
    <div class="infoUser">
      <img  v-if="(this.user.imageUrl != null)" class="avatar_post" :src=" this.user.imageUrl " alt="Photo de profil"/>
      <img v-else  class="avatar_post" src="../assets/avatar.webp" alt="Photo de profil"/>
        <div class="infoUserName">
            <p class="name">{{user.firstName}} {{user.lastName}}</p>
            <p class="job"><fa icon="briefcase" class="briefcase"/>{{user.job}}</p>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'InfoUser',
    data() {
        return {
            token : localStorage.getItem("token"),
            userId : localStorage.getItem("userId"),
            user : "",
        }
    },
    created() {
        axios.get("http://localhost:3000/api/auth/" + this.userId,{
        headers: {Authorization: "Bearer " + this.token}})
        .then(response => {
            this.user = response.data;
        })
    },
}
</script>

<style>
</style>