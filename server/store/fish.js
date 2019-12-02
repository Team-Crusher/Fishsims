const SET_FISHES = 'SET_FISHES'
const ADD_FISH = 'ADD_FISH'
const REMOVE_FISH = 'REMOVE_FISH'

const setFishes = fishes => ({type: SET_FISHES, fishes})

const init = [{x: 3, y: 3, pop: 420}]

const fish = function(state = init, action) {
  switch (action.type) {
    case SET_FISHES:
      return action.fishes
    default:
      return state
  }
}

module.exports = {fish, setFishes}
