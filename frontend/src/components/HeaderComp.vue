<template>
  <div class="fond">
    <img class="logo" src="../assets/icon-left-font.png"/>
    <nav>
      <router-link to="/login">Connexion</router-link>
      <router-link to="/">Inscription</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HeaderComp',
  props: {
  }
}
</script>

<style scoped lang="scss">
.fond {
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
</style>