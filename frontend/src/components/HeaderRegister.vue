<template>
  <div id="page">
    <div class="header">
      <LogoHeader/>
      <nav class="navRegister">
        <router-link to="/login" class="link">Connexion</router-link>
        <router-link to="/" class="link">Inscription</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
import LogoHeader from '@/components/LogoHeader.vue'

export default {
  name: 'HeaderRegister',
    components: {
    LogoHeader
  }
}
</script>

<style scoped lang="scss">
</style>