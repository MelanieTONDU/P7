<template>
  <div class="page">
    <div class="header">
      <LogoHeader/>
      <nav>
        <router-link to="/login">Connexion</router-link>
        <router-link to="/">Inscription</router-link>
      </nav>
    </div>
    <div id="fond">
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
  justify-content: flex-end;
  padding: 10px;
  background: white;
  gap: 10%;
}
.logo{
    width: 24%;
    object-fit: contain;
}
.page {
  background:url("../assets/architecture.webp") no-repeat;
  width: 100%;
  height: 100vh;
}
nav {
  align-self: flex-end;
  margin-right: 10%;

  a {
    font-weight: bold;
    font-size: 1.4em;
    color: #2c3e50;
    padding: 1.2em;
    text-decoration: none;

    &.router-link-exact-active {
      color: #ff0000cb;
    }
  }
}
.fond img {
  width: 100%;
  float: left;
  height: 86vh;
  object-fit: cover;
}

/* SMARTPHONE */
@media screen and (max-width:768px)
{
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0; 
}
.logo{
    width: 80%;
    padding: 10px 3px 10px 3px;
}
nav {
  display: none;
}
}
</style>