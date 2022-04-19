<template>
<div>
	<div class="picture">
		<HeaderComp />
		<BannerComp />
	</div>
	<div>
		<v-form ref="form" v-model="valid">
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
					<input v-model="email" :rules="emailRules" id="email" placeholder="Email" type="email" required />
				</label>
			</div>
			<div class="form-group">
				<label>
					<input v-model="password" id="password" placeholder="Mot de passe"  type="password" required />
				</label>
			</div>
			<button :disabled="email && password && lastName && firstName == ''" @click="createAccount()" type="button">S'inscrire</button>
			<div>
				<p>Vous avez déjà un compte ? <router-link to="/login" class="link">Se connecter</router-link></p>
			</div>
		</v-form>
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
			emailRules: [
				v => /.+@.+\..+/.test(v) || 'Votre E-mail doit être valide',
                ],
			password:'',
		}
	},
	components: {
		HeaderComp,
		BannerComp
	},
	methods:{
		createAccount: function() {
			this.$refs.form.validate();
			let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

			if ((passwordRegex.test(this.password)) == false){
				console.log("faux")
			}
			else {
				const user = { lastName: this.lastName, firstName : this.firstName, email: this.email, password: this.password };
				console.log(user)
				axios.post("http://localhost:3000/api/auth/signup", user)
				.then(response => {
					if(response.status === 201) {
						console.log(response.status)
						const router = this.$router;
						router.push('/article' );
					}
					else {
						console.log(response.status)
					}
				})
				.catch(error => error )
			}
		}
	}
}
</script>

<style scoped lang="scss">
</style>