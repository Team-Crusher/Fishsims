import axios from 'axios'

const SET_TITLE_TEXT = 'SET_TITLE_TEXT'

export const setTitle = title => ({type: SET_TITLE_TEXT, title})

export const getTitle = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/titles')
    dispatch(setTitle(data))
  }
}

const init = '™'

export default function(state = init, action) {
  switch (action.type) {
    case SET_TITLE_TEXT:
      return action.title
    default:
      return state
  }
}
