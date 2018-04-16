<template>
 <v-form v-model="valid" ref="form" lazy-validation>
   <v-text-field
     label="Email"
     v-model="email"
     :rules="emailRules"
     required
   ></v-text-field>
   <v-text-field
     label="Password"
     v-model="password"
     required
   ></v-text-field>
   <v-btn
     @click="submit"
     :disabled="!valid"
   >
     submit
   </v-btn>
   <v-btn @click="clear">clear</v-btn>
   <a href="http://127.0.0.1:8081/login/facebook">Log In with Facebook</a>
   <a href="http://127.0.0.1:8081/login/twitter">Log In with Twitter</a>
      <a href="http://127.0.0.1:8081/login/google">Log In with Google</a>
      <a href="http://127.0.0.1:8081/login/linkedin">Log In with Linkedin</a>
 </v-form>
</template>

<script>
 import axios from 'axios'
 export default {
   data: () => ({
     valid: true,
     email: '',
     password: '',
     emailRules: [
       (v) => !!v || 'E-mail is required',
       (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
     ]
   }),
   methods: {
     async submit () {
       return axios({
         method: 'post',
         data: {
           email: this.email,
           password: this.password
         },
         url: `http://localhost:8081/users/login`,
         headers: {
           'Content-Type': 'application/json'
         }
       })
       .then((response) => {
         console.log('response: ' + response.data.message)
         window.localStorage.setItem('auth', response.data.token);
//         this.$swal("Good job!", "You are ready to start!", "success")
         this.$router.push({ name: 'Home' })
       })
       .catch((error) => {
         const message = error.response.data.message;
 //        this.$swal("Oh oo!", `${message}`, "error")
         this.$router.push({ name: 'Login' })
       });
     },
     clear () {
       this.$refs.form.reset()
     }
   }
 }
</script>

