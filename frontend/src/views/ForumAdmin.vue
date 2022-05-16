<template>
  <div>
    <HeaderAdmin />
    <ForumAdmin />
  </div>
</template>

<script>
import HeaderAdmin from '@/components/HeaderAdmin.vue'
import ForumAdmin from '@/components/ForumAdmin.vue'

export default {
  name: 'ForumDiscussion',
  components: {
    HeaderAdmin,
    ForumAdmin
  },
  data() {
    return {
      token : localStorage.getItem("token"),
    }
  },
}
</script>

<style scoped lang="scss">
</style>