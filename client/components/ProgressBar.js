import React from 'react'

const ProgressBar = props => {
  let precentage
  if (props.highest === 0) {
    precentage = '100%'
  } else {
    precentage = `${props.value / props.highest * 100}%`
  }
  return (
    <div
      className="progress-bar"
      style={{
        backgroundColor: props.emptyColor,
        borderColor: props.borderColor
      }}
    >
      {props.children}
      <div
        className="filler"
        style={{width: precentage, backgroundColor: props.fillColor}}
      />
    </div>
  )
}

export default ProgressBar
