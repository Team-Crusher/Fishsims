const SET_FISH = 'SET_FISH'
const ADD_FISH = 'ADD_FISH'
const REMOVE_FISH = 'REMOVE_FISH'

const setFish = fish => ({type: SET_FISH, fish})

const init = [{x: 3, y: 3, pop: 420}]

const fish = function(state = init, action) {
  switch (action.type) {
    case SET_FISH:
      return action.fish
    default:
      return state
  }
}

module.exports = {fish, setFish}
