<template>
  <div class="login">
    <HeaderRegister />
    <LoginForm />
  </div>
</template>

<script>
import HeaderRegister from '@/components/HeaderRegister.vue'
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'LoginView',
  components: {
    HeaderRegister,
    LoginForm
  },
}
</script>

<style scoped lang="scss">
</style>