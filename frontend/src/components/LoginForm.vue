<template>
  <div>
    <form id="formulaire">
        <h1>Se connecter</h1>
        <div class="form-group">
        <label>
            <input v-model="email" id="email" placeholder="Email" type="email" required />
        </label>
        </div>
        <div class="form-group">
        <label>
            <input v-model="password" id="password" placeholder="Mot de passe" type="password" required />
        </label>
        </div>
        <p>{{msg}}</p>
        <button @click="connectAccount()" type="button">Connexion</button>
        <div>
        <p class="textUnderButton">Vous n'avez pas encore de compte ? <router-link to="/" class="link">S'inscrire</router-link></p>
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
      msg:''
    }
  },
	methods:{
		connectAccount: function() {
      const user = { email: this.email, password: this.password };
      axios.post("http://localhost:3000/api/auth/login", user)
        .then(response => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem('userId', response.data.userId);
            this.$router.push('/article/text' );})
        .catch(error => { 
          if (error.response.status == 404) {
             this.msg = 'Utilisateur inconnu !'
          }
          if (error.response.status == 401) {
              this.msg = "Mot de passe incorrect !"
          }
      })
    },
}
}
</script>

<style scoped lang="scss">
</style>