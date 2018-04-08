<template>
 <v-layout row wrap>
   <v-flex xs4 v-for="movie in movies" :key="movie._id">
     <v-card>
       <v-card-title primary-title>
         <div>
           <div class="headline">{{ movie.name }}</div>
           <span class="grey--text">{{ movie.release_year }} ‧ {{ movie.genre }}</span>
         </div>
       </v-card-title>
       <v-card-text>
         {{ movie.description }}
       </v-card-text>
       <v-card-actions>
         <v-btn flat color="purple">Rate this movie</v-btn>
         <v-spacer></v-spacer>
       </v-card-actions>
     </v-card>
   </v-flex>
 </v-layout>
</template>
<script>
 import MoviesService from '@/services/MoviesService'
 export default {
   data () {
   return {
       movies: []
     }
   },
   mounted () {
      if(this.current_user.name) {
   this.fetchMovies();
 } else {
   this.$router.push({ name: 'Login' })
 }
   },
   methods: {
     async fetchMovies () {
   const token = window.localStorage.getItem('auth');
   return axios({
     method: 'get',
     url: `http://localhost:8081/movies`,
     headers: {
       'Authorization': 'JWT ' + token,
       'Content-Type': 'application/json'
     }
   })
   .then((response) => {
     this.movies = response.data.movies;
     this.current_user = response.data.current_user;
     console.log(response.data.current_user.name);
   })
   .catch((error) => {
     console.log(error);
   });
 }

   }
 }
</script>

