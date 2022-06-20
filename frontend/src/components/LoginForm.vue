<template>
  <div>
    <form id="formulaire">
      <h1>Se connecter</h1>
      <div class="form-group">
        <input v-model="email" id="email" placeholder="Email" type="email" required aria-label="email"/>
      </div>
      <div class="form-group">
        <input v-model="password" id="password" placeholder="Mot de passe" type="password" required autocomplete="off" aria-label="password"/>
      </div>
      <p class="message">{{msg}}</p>
      <button @click="connectAccount()" type="button" class="connexion">Connexion</button>
      <div >
        <p class="textUnderButton">Vous n'avez pas encore de compte ? <router-link to="/" class="linkForm">S'inscrire</router-link></p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'LoginForm',
  data (){
    return {
      email:'',
      password:'',
      msg:'',
    }
  },
	methods:{
		connectAccount: function() {
      const user = { email: this.email, password: this.password };
      axios.post("http://localhost:3000/api/auth/login", user)
      .then(response => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem('userId', response.data.userId);
          if (response.data.isAdmin == true){
            this.$router.push('/admin');
          }
          else {
            this.$router.push('/article/text' );
          }
        })
      .catch(error => { 
        if (error.response.status == 404) {
          this.msg = 'Utilisateur inconnu !'
        }
        else if (error.response.status == 401) {
          this.msg = "Mot de passe incorrect !"
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
</style>