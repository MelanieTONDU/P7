<template>
    <div class="infoUser">
        <img class="avatar_post" src="../assets/avatar.png"/>
        <div class="info">
            <p id="name">Prénom : {{user.firstName}}</p>
            <p id="name">Nom : {{user.lastName}}</p>
            <p>Email : {{user.email}}</p>
            <p>Poste occupé : {{user.job}}</p>
            <p>Date de création du compte : {{dayjs(user.createdAt).locale("fr").format("DD/MM/YY [à] HH[h]mm")}}</p>
        </div>
        <div> 
            <button @click="deleteUser()" type="button">Supprimer</button>
            <button id="modify" @click="modifyUser()" type="button">Modifier</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/fr";

export default {
    data() {
        return {
            token : localStorage.getItem("token"),
            userId : localStorage.getItem("userId"),
            user : "",
            dayjs
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
        deleteUser: function() {
            axios.delete("http://localhost:3000/api/auth/"  + this.userId,{
            headers: {Authorization: "Bearer " + this.token}});
            this.$router.push('/' );

        },
    }
}
</script>

<style>
</style>