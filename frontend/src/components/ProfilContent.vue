<template>
    <div class="forum profil">
        <div class="user">
            <h2 class="titlePP">Information sur le compte</h2>
            <h3 class="titlePPModify" v-if="(this.modify == true )">Veuillez compléter les champs que vous souhaitez modifier : </h3>
            <div id="photoProfil">
                <img  v-if="(this.user.imageUrl != null)" class="imagePP" :src=" this.user.imageUrl " />
                <img v-else  class="imagePP" src="../assets/avatar.png" />
                <button v-if="(this.change == false)" @click="modifyAvatar()" type="button" class="modifyPPButton">Modifier sa photo</button>
                <div v-else class="changePP">
                    <input name="image" type="file" @change="selectFile()" class="addPP" ref="image" />
                    <div>
                        <button  @click="addAvatar()" type="submit" class="buttonPP buttonSave red"> Enregistrer</button>
                        <button @click="cancel()" type="button" class="buttonPP buttonCancel grey">Annuler</button>
                    </div>
                </div>
            </div>
            <div id="infoUser">
                <div class="infoProfil">
                    <p class="infoProfilDetail">Prénom : </p>
                    <p v-if="(this.modify == false)">{{user.firstName}}</p>
                    <input v-else v-model="userEdit.firstName" type="text" id="firstName" :placeholder= user.firstName />
                </div>
                <div class="infoProfil">
                    <p class="infoProfilDetail">Nom : </p>
                    <p v-if="(this.modify == false)">{{user.lastName}}</p>
                    <input v-else v-model="userEdit.lastName" type="text" id="lastName" :placeholder= user.lastName />
                </div>
                <div class="infoProfil">
                    <p class="infoProfilDetail">Email : </p>
                    <p v-if="(this.modify == false)">{{user.email}}</p>
                    <input v-else v-model="userEdit.email" type="email" id="email" :placeholder= user.email />
                </div>
                <div v-if="(this.modify == true)" class="infoProfil">
                    <p class="infoProfilDetail">Nouveau mot de passe : </p>
                    <input v-model="userEdit.password" type="password" id="password" :placeholder= user.password />
                </div>
                <div class="infoProfil">
                    <p class="infoProfilDetail">Poste occupé : </p>
                    <p v-if="(this.modify == false)">{{user.job}}</p>
                    <input v-else v-model="userEdit.job" type="text" id="job" :placeholder= user.job />
                </div>
                <div class="infoProfil">
                    <p class="infoProfilDetail">Date de création du compte :</p>
                    <p> {{dayjs(user.createdAt).locale("fr").format("DD/MM/YY [à] HH[h]mm")}}</p>
                </div>
            </div>
            <div id="profilButton">
                <p>{{this.msg}}</p>
                <button v-if=" (this.modify == true)" @click="changeUser(userEdit)" type="button" class="profilButton buttonSave red"> Enregistrer les modifications</button>
                <button v-if=" (this.modify == true)" @click="cancel()" type="button" class="profilButton buttonCancel grey">Annuler</button>
                <div v-else > 
                    <button class="profilButton buttonModify grey" @click="modifyUser()" type="button">Modifier mes informations</button>
                    <button @click="deleteUser()" type="button" class="profilButton buttonDelete red">Supprimer le compte</button>
                </div>
            </div>
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
            firstName:"",
            lastName : "",
            email : "",
            password : "",
            job : "",
            image: "",
            formData : "",
            modify : false,
            change : false,
            msg : "",
            userEdit: new Object(),
            dayjs
        }
    },
    created() {
        this.getUser()
    },
    methods : {
        getUser() {
            axios.get("http://localhost:3000/api/auth/" + this.userId,{
            headers: {Authorization: "Bearer " + this.token}})
            .then(response => {
                this.user = response.data;
            })
        .catch(error => { 
            if (error.response.status == 401) {
                this.$router.push('/login' );
                localStorage.clear();
                }
            })
        },
        deleteUser() {
            axios.delete("http://localhost:3000/api/auth/"  + this.userId,{
            headers: {Authorization: "Bearer " + this.token}});
                this.$router.push('/' );
        },
        modifyUser() {
            this.modify = true;
        },
        changeUser() {
            const formData = {firstName: this.userEdit.firstName, lastName : this.userEdit.lastName, email : this.userEdit.email, password: this.userEdit.password, job : this.userEdit.job}
            axios.put("http://localhost:3000/api/auth/"  + this.userId, formData, {
                headers: {Authorization: "Bearer " + this.token}})
                .then(() => {
                    this.modify = false;
                    this.getUser();
                    console.log(this.user)
                })
                .catch(error => { 
                    if (error.response.status == 400) {
                        this.msg = "Cet email est déjà utilisé !"
                    }
                })
        },
        modifyAvatar(){
            this.change = true;
        },
        selectFile() {
            this.image = this.$refs.image.files[0];
        },
        addAvatar(){
            const formData = new FormData();
                formData.append("image", this.image);
                console.log(formData)
            axios.put("http://localhost:3000/api/auth/"  + this.userId, formData, {
            headers: {Authorization: "Bearer " + this.token}})
                .then((response) => {
                    console.log(response)
                    this.getUser();
                    this.change = false;
                })
                .catch(error => { 
                    if (error.response.status == 400) {
                        this.msg = "Cet email est déjà utilisé !"
                    }
                })
        },
        cancel() {
            location.reload();
        }
    }
}
</script>

<style>
</style>