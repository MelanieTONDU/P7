<template>
    <div>
		<form id="formulaire">
			<h1>Créer un compte</h1>
			<div class="form-group">
				<input v-model="lastName" id="lastName" type="text" placeholder="Nom" required aria-label="lastname" />
			</div>
			<div class="form-group">
				<input v-model="firstName" id="firstName" type="text" placeholder="Prénom" required aria-label="firstname"/>
			</div>
			<div class="form-group">
				<input v-model="email" id="email" placeholder="Email" type="email" required aria-label="email"/>
			</div>
			<div class="form-group">
				<input v-model="password" id="password" placeholder="Mot de passe"  type="password" required autocomplete="off" aria-label="password"/>
			</div>
			<p class="message">{{msg}}</p>
			<button :disabled="email && password && lastName && firstName == ''" @click="createAccount()" type="button" class=" inscrire">S'inscrire</button>
			<div>
				<p class="textUnderButton">Vous avez déjà un compte ? <router-link to="/login" class="linkForm">Se connecter</router-link></p>
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
			valid: "",
			msg:''
		}
	},
	methods:{
		createAccount() {
			this.errorMessage();
			if (this.valid.every(element => element == true)){
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
		},
		errorMessage () {
			let regex = /^[a-zA-Z/s]{2,20}$/;
			let emailRegex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
			let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
			if ((passwordRegex.test(this.password)) == false){
				this.msg = `Le mot de passe doit inclure : minimum 8 caractères, 1 Majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.`
			}
			if ((regex.test(this.firstName)) == false){
				this.msg = "Le prénom ne doit comporter que des lettres."
			}
			if ((regex.test(this.lastName)) == false){
				this.msg = "Le nom ne doit comporter que des lettres."
			}
			if ((emailRegex.test(this.email)) == false){
				this.msg = "Email non valide."
			}
			this.valid = [
				regex.test(this.firstName),
				regex.test(this.lastName),
				emailRegex.test(this.email),
				passwordRegex.test(this.password),
			]
		}
	}
}
</script>

<style scoped lang="scss">
</style>