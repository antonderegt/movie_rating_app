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
   import axios from 'axios';
   export default {
     name: 'Movies',
     data() {
       return {
         movies: [],
}; },
     mounted() {
       this.fetchMovies();
}, methods: {
       async fetchMovies() {
         return axios({
           method: 'get',
           url: '/api/movies',
         })
           .then((response) => {
             this.movies = response.data.movies;
           })
           .catch(() => {
             }); },
}, };
</script>
