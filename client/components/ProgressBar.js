import React from 'react'

const ProgressBar = props => {
  const precentage = `${props.value / props.highest * 100}%`
  return (
    <div className="progress-bar">
      <div className="filler" style={{width: precentage}}>
        {props.children}
      </div>
    </div>
  )
}

export default ProgressBar
