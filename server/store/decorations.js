const SET_DECORATIONS = 'SET_DECORATIONS'

const setDecorations = decorations => ({type: SET_DECORATIONS, decorations})

const init = {}

const decorations = (state = init, action) => {
  switch (action.type) {
    case SET_DECORATIONS:
      console.log('SETTING DECOS')
      console.log(action.decorations)
      return action.decorations
    default:
      return state
  }
}

module.exports = {decorations, setDecorations}
