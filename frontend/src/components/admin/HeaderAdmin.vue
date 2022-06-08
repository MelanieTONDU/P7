<template>
    <div id="headerAdmin">
        <LogoHeader class="logoAdmin"/>
        <nav class="navAdmin">
            <router-link to="/admin" class="linkAdmin">Liste des publications</router-link>
            <router-link to="/login" @click="deco()" class="linkAdmin"><fa icon="arrow-right-from-bracket" class="IconDeco"/></router-link>
        </nav>
    </div>
</template>

<script>
import LogoHeader from '@/components/LogoHeader.vue'

export default {
    name: 'HeaderAdmin',
    components: {
        LogoHeader,
    },
    data() {
        return {
        token : localStorage.getItem("token"),
        }
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