<template>
  <div>
    <div>
        <HeaderComp />
        <BannerComp />
    </div>
        <form >
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
          <button @click="connectAccount()" type="button">Connexion</button>
          <div>
            <p>Vous n'avez pas encore de compte ? <router-link to="/" class="link">S'inscrire</router-link></p>
        </div>
        </form>
    </div>
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue'
import BannerComp from '@/components/BannerComp.vue'
import axios from "axios";

export default {
  name: 'LoginView',
  components: {
    HeaderComp,
    BannerComp
  },
  data (){
    return {
      email:'',
      password:'',
    }
  },
	methods:{
		connectAccount: function() {
      const user = { email: this.email, password: this.password };
      axios.post("http://localhost:3000/api/auth/login", user)
        .then(response => {
          if(response.status === 200) {
            localStorage.setItem("token", response.data.token);
            this.$router.push('/article' );
					}
      })
    },
}
}
</script>

<style scoped lang="scss">

</style>