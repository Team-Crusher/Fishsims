const SET_CIRCLES = 'SET_CIRCLES'
const ADD_CIRCLE = 'ADD_CIRCLE'

export const setCircles = circles => ({
  type: SET_CIRCLES,
  circles
})

export const addCircle = (x, y) => ({
  type: ADD_CIRCLE,
  circle: {x, y}
})

export default function(state = [], action) {
  switch (action.type) {
    case SET_CIRCLES:
      return action.circles
    case ADD_CIRCLE:
      return [...state, action.circle]
    default:
      return state
  }
}
