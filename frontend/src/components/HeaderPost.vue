<template>
    <div id="header">
        <LogoHeader class="logoPost"/>
      <nav class="navPost">
        <router-link to="/article/text" class="link">Forum Discussion</router-link>
        <router-link to="/article/image" class="link">Forum Multimédia</router-link>
        <router-link to="/profil" class="link">Mon compte</router-link>
        <router-link to="/login" @click="deco()" class="link"><fa icon="arrow-right-from-bracket" class="IconDeco"/></router-link>
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
</style>