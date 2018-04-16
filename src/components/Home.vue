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
 import store from './../vuex/store'
 import { mapGetters, mapActions } from 'vuex'
 import MoviesService from '@/services/MoviesService'
 import axios from 'axios'
 export default {
   store,
   computed: mapGetters([
     'getMovies'
   ]),
   data () {
   return {
       movies: [],
       current_user: {}
     }
   },
   mounted () {
     this.fetchMovies();
   },
    methods: mapActions([
     'updateMovies'
   ]),
 }
</script>

