<template>
<div>
	<div class="picture">
		<HeaderComp />
		<BannerComp />
	</div>
	<div class="form">
		<form >
			<h1>Créer un compte</h1>
			<div class="form-group">
				<label>
					<input v-model="lastName" id="lastName" type="text" placeholder="Nom" required />
				</label>
			</div>
			<div class="form-group">
				<label>
					<input v-model="firstName" id="firstName" type="text" placeholder="Prénom" required />
				</label>
			</div>
			<div class="form-group">
				<label>
					<input v-model="email" id="email" placeholder="Email" type="email" required />
				</label>
			</div>
			<div class="form-group">
				<label>
					<input v-model="password" id="password" placeholder="Mot de passe" type="text" required />
				</label>
			</div>
			<button @click="createAccount()" type="button">S'inscrire</button>
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
import axios from "axios";

export default {
	name: 'SignUp',
	data(){
		return {
			lastName:'',
			firstName:'',
			email:'',
			password:'',
		}
	},
	components: {
		HeaderComp,
		BannerComp
	},
	methods:{
		createAccount: function() {
			const user = { lastName: this.lastName, firstName : this.firstName, email: this.email, password: this.password };
			if(user.lastName != "" && user.firstName != "" && user.email != "" && user.password != ""){
				axios.post("http://localhost:3000/api/auth/signup", user)
				.then(response => {
					if(response.status === 201) {
						const router = this.$router;
						router.push('/article' );
					}
					else {console.log("oups")}
				})
				.catch(error => error.response.data.errors )}
			else {
				console.log("raté")
			}
		}
	}
}
</script>

<style scoped lang="scss">

</style>