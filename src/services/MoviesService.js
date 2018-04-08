import Api from '@/services/Api'

export default {
   // fetch all movies
 fetchMovies () {
   return Api().get('movies')
 },

 // Add a movie
 addMovie (params) {
   return Api().post('movies', params)
 }
}

