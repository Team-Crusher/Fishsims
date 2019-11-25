/**
 * ACTION TYPES
 */
const SET_ROUTE = 'SET_ROUTE'

export const setRoute = route => ({type: SET_ROUTE, route})

const init = 'HOME'

export default function(state = init, action) {
  switch (action.type) {
    case SET_ROUTE:
      return action.route
    default:
      return state
  }
}
