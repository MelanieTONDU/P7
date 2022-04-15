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
              <input id="email" placeholder="email" type="email" required />
            </label>
          </div>
          <div class="form-group">
            <label>
              <input id="email" placeholder="Mot de passe" type="text" required />
            </label>
          </div>
          <button type="submit">Connexion</button>
          <div>
            <p>Vous n'avez pas encore de compte ? <router-link to="/" class="link">S'inscrire</router-link></p>
        </div>
        </form>
    </div>
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue'
import BannerComp from '@/components/BannerComp.vue'

export default {
  name: 'LoginView',
  components: {
    HeaderComp,
    BannerComp
  }
}

</script>

<style scoped lang="scss">

</style>