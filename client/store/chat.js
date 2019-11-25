/**
 * ACTION TYPES
 */
const ADD_MESSAGE = 'ADD_MESSAGE'

export const addMessage = msg => ({type: ADD_MESSAGE, msg})

const init = []

export default function(state = init, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      console.log('IN REDUCER:\t', action)
      return [...state, action.msg]
    default:
      return state
  }
}
