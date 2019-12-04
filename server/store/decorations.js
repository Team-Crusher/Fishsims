const SET_DECORATIONS = 'SET_DECORATIONS'

const setDecorations = decorations => ({type: SET_DECORATIONS, decorations})

const init = {}

const decorations = (state = init, action) => {
  switch (action.type) {
    case SET_DECORATIONS:
      return action.decorations
    default:
      return state
  }
}

module.exports = {decorations, setDecorations}
