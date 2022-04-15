<template>
<div>
	<div>
		<HeaderComp />
		<BannerComp />
	</div>
	<div class="form">
		<form >
			<h1>Créer un compte</h1>
			<div class="form-group">
				<label>
					<input id="name" type="text" placeholder="Nom" required />
				</label>
			</div>
			<div class="form-group">
				<label>
					<input id="name" type="text" placeholder="Prénom" required />
				</label>
			</div>
			<div class="form-group">
				<label>
					<input id="email" placeholder="email" type="email" required />
				</label>
			</div>
			<div class="form-group">
				<label>
					<input id="email" placeholder="Mot de passe" type="text" required />
				</label>
			</div>
			<button type="submit">S'inscrire</button>
			<div>
				<p>Vous avez déjà un compte ? <router-link to="/login" class="link">Se connecter</router-link></p>
			</div>
		</form>
	</div>
</div>
</template>


<script>
import HeaderComp from '@/components/HeaderComp.vue'
import BannerComp from '@/components/BannerComp.vue'

export default {
  name: 'SignUp',
  components: {
    HeaderComp,
	BannerComp
  }
}
</script>

<style scoped lang="scss">

</style>