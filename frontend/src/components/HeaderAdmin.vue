<template>
    <div id="header">
        <LogoHeader/>
        <nav>
            <router-link to="/article" class="link">Liste des publications</router-link>
            <router-link to="/login" @click="deco()" class="link"><fa icon="arrow-right-from-bracket" class="IconDeco"/></router-link>
        </nav>
    </div>
</template>

<script>
import LogoHeader from '@/components/LogoHeader.vue'

export default {
  name: 'ForumDiscussion',
  components: {
    LogoHeader,
  },
  data() {
    return {
      token : localStorage.getItem("token"),
    }
  },
}
</script>

<style scoped lang="scss">
#header{
    display: flex;
    height: 100px;
.logo{
    width: 20%;
    object-fit: contain;
    position: relative;
    left: 10%;
}
    nav{
        width: 70%;
        display: flex;
        justify-content: right;
        align-items: center;
        margin-right: 5%;
    }
    .link{
    font-weight: bold;
    font-size: 1.5em;
    color: #2c3e50;
    padding: 6% 2% 2% 2%;
    text-decoration: none;
        &.router-link-exact-active {
            color: #ff0000cc;
        }
    }
    .link:hover{
        text-decoration: underline;
    }
    .IconDeco {
        margin-right: 5px;
        font-size: 22px;
        color: #000000c4;
    }
}

</style>