const OUT_OF_SPACE = 'OUT_OF_SPACE'
export const outOfSpace = bool => ({type: OUT_OF_SPACE, bool})

export default function(state = false, action) {
  switch (action.type) {
    case OUT_OF_SPACE:
      return action.bool
    default:
      return state
  }
}
