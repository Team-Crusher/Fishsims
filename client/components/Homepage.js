import React from 'react'
import {Link} from 'react-router-dom'

const Homepage = () => {
  return (
    <div>
      <h1>Fishsims 🐡</h1>
      <div className="ui input">
        <input type="text" placeholder="Enter your name here" />
        <div>
          <button type="submit" className="ui secondary basic button">
            Submit
          </button>
          <Link to="/game">Go to Game Page</Link>
        </div>
      </div>
    </div>
  )
}

export default Homepage
