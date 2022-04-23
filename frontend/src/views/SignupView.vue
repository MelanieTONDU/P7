<template>
	<div>
		<HeaderRegister />
		<SignupForm />
	</div>
</template>

<script>
import HeaderRegister from '@/components/HeaderRegister.vue'
import SignupForm from '@/components/SignupForm.vue'

export default {
	name: 'SignUp',
	components: {
		HeaderRegister,
		SignupForm
	},
}
</script>

<style scoped lang="scss">
</style>