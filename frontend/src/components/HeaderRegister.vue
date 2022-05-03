<template>
  <div class="page">
    <div class="header">
      <LogoHeader/>
      <nav>
        <router-link to="/login">Connexion</router-link>
        <router-link to="/">Inscription</router-link>
      </nav>
    </div>
    <div class="fond">
      <img src="../assets/fond.jpg"/>
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
.header {
  display: flex;
  padding: 10px;
}
.logo{
    width: 25%;
    position: relative;
    left: 35%;
}
nav {
  padding: 50px;
  position: absolute;
  right: 10%;

  a {
    font-weight: bold;
    font-size: 1.3em;
    color: #2c3e50;
    padding: 1.2em;
    text-decoration: none;

    &.router-link-exact-active {
      color: #ff00009d;
    }
  }
}
.fond img {
  width: 100%;
  float: left;
  height: 86vh;
  object-fit: cover;
}
</style>