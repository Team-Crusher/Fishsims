/**
 * ACTION TYPES
 */
const SET_FISH = 'SET_FISH'

export const setFish = fish => ({type: SET_FISH, fish})

const init = []

export default function(state = init, action) {
  switch (action.type) {
    case SET_FISH:
      return action.fish
    default:
      return state
  }
}
