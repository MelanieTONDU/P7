<template>
    <div>
		<form id="formulaire">
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
					<input v-model="password" id="password" placeholder="Mot de passe"  type="password" required />
				</label>
			</div>
			<p class="message">{{msg}}</p>
			<button :disabled="email && password && lastName && firstName == ''" @click="createAccount()" type="button">S'inscrire</button>
			<div>
				<p class="textUnderButton">Vous avez déjà un compte ? <router-link to="/login" class="link">Se connecter</router-link></p>
			</div>
		</form>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: 'SignUp',
	data(){
		return {
			lastName:'',
			firstName:'',
			email:'',
			password:'',
			msg:''
		}
	},
	methods:{
		createAccount: function() {
			let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
			if ((passwordRegex.test(this.password)) == false){
				this.msg = `Le mot de passe doit inclure : minimum 8 caractères, 1 Majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.`
			}
			else {
				const user = { lastName: this.lastName, firstName : this.firstName, email: this.email, password: this.password };
				axios.post("http://localhost:3000/api/auth/signup", user)
				.then(response => {
					localStorage.setItem("token", response.data.token);
					localStorage.setItem('userId', response.data.userId);
					this.$router.push('/article/text' );
				})
				.catch(error => { 
					if (error.response.status == 401) {
						this.msg = 'Utilisateur déjà existant !'
					}
				})
			}
		}
	}
}
</script>

<style scoped lang="scss">
</style>