const SET_ARROW = 'SET_ARROW'
export const setArrow = arrow => ({type: SET_ARROW, arrow})

export default function(state = [], action) {
  switch (action.type) {
    case SET_ARROW:
      return action.arrow
    default:
      return state
  }
}
