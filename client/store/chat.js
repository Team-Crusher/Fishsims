/**
 * ACTION TYPES
 */
const ADD_MESSAGE = 'ADD_MESSAGE'
const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS'

export const addMessage = msg => ({type: ADD_MESSAGE, msg})
export const clearNotifications = () => ({type: CLEAR_NOTIFICATIONS})

const init = {messages: [], notification: 0}

export default function(state = init, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        messages: [...state.messages, action.msg],
        notification: state.notification + 1
      }
    case CLEAR_NOTIFICATIONS: {
      return {
        ...state,
        notification: 0
      }
    }
    default:
      return state
  }
}
