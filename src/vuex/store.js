import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
 movies: [
   {
     _id: "5a6340a6571948357ebe29c6",
     name: "The Revenant",
     description: "While exploring the uncharted wilderness in 1823, frontiersman Hugh Glass (Leonardo DiCaprio) sustains life-threatening injuries from a brutal bear attack. When a member (Tom Hardy) of his hunting team kills his young son (Forrest Goodluck) and leaves him for dead, Glass must utilize his survival skills to find a way back to civilization. Grief-stricken and fueled by vengeance, the legendary fur trapper treks through the snowy terrain to track down the man who betrayed him.",
     release_year: 2015,
     genre: "Drama/Thriller"
   },
   {
     _id: "5a6340c9571948357ebe29c7",
     name: "Dunkirk",
     description: "In May 1940, Germany advanced into France, trapping Allied troops on the beaches of Dunkirk. Under air and ground cover from British and French forces, troops were slowly and methodically evacuated from the beach using every serviceable naval and civilian vessel that could be found. At the end of this heroic mission, 330,000 French, British, Belgian and Dutch soldiers were safely evacuated.",
     release_year: 2017,
     genre: "Drama/Thriller"
   },
   {
     _id: "5a6340e8571948357ebe29c8",
     name: "Wonder Woman",
     description: "Before she was Wonder Woman (Gal Gadot), she was Diana, princess of the Amazons, trained to be an unconquerable warrior. Raised on a sheltered island paradise, Diana meets an American pilot (Chris Pine) who tells her about the massive conflict that's raging in the outside world. Convinced that she can stop the threat, Diana leaves her home for the first time. Fighting alongside men in a war to end all wars, she finally discovers her full powers and true destiny.",
     release_year: 2017,
     genre: "Fantasy/Science fiction film"
   },
   {
     _id: "5a63410d571948357ebe29c9",
     name: "Star Wars: The Last Jedi",
     description: "Luke Skywalker's peaceful and solitary existence gets upended when he encounters Rey, a young woman who shows strong signs of the Force. Her desire to learn the ways of the Jedi forces Luke to make a decision that changes their lives forever. Meanwhile, Kylo Ren and General Hux lead the First Order in an all-out assault against Leia and the Resistance for supremacy of the galaxy.",
     release_year: 2017,
     genre: "Fantasy/Science fiction film"
   }
 ]
}

export default store = new Vuex.Store({
 state,
 getters,
 mutations,
 actions
})

