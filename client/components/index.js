/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'

export {default as Background} from './Background'
export {default as Lobby} from './Lobby'
export {default as Name} from './Name'

export {default as Chat} from './Chat'
export {default as Game} from './Game'
export {Login, Signup} from './auth-form'
