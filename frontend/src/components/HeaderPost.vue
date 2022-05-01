<template>
    <div id="header">
        <router-link to="/article/text"><LogoHeader/></router-link>
      <nav>
        <router-link to="/article/text" class="link">Forum Discussion</router-link>
        <router-link to="/article/image" class="link">Forum Multimédia</router-link>
        <router-link to="/profil" class="link">Profil</router-link>
        <router-link to="/login" @click="deco()" class="link">Se déconnecter</router-link>
      </nav>
    </div>
</template>

<script>
import LogoHeader from '@/components/LogoHeader.vue'

export default {
    name: 'HeaderPost',
    components: {
        LogoHeader
    },
    methods: {
        deco: function(){
            localStorage.clear();
        }
    }
}
</script>

<style scoped lang="scss">
#header{
    display: flex;
    .logo{
        width: 70%;
    }
    nav{
        width: 70%;
        display: flex;
        justify-content: right;
        align-items: center;
    }
    .link{
    font-weight: bold;
    font-size: 1.3em;
    color: #2c3e50;
    padding: 3%;
    text-decoration: none;
        &.router-link-exact-active {
            color: #ff00009d;
        }
    }
    .link:hover{
        text-decoration: underline;
    }
}
</style>