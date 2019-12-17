import React from 'react'

const Instructions = () => {
  return (
    <div id="instructions">
      <h1>How To Play</h1>
      <br />
      <h5>1. Buy boats from the top-right menu.</h5>
      <h5>2. Click a boat to select it.</h5>
      <h5>3. Click somewhere within its range to plan its move.</h5>
      <h5>
        4. If a boat is on fishes when the turn ends & it has capacity, it will
        collect fishes!
      </h5>
      <h5>5. Return a fish-filled boat to your dock to sell fishes.</h5>
      <h5>6. When there are no turns left, the richest player wins!</h5>
      <h5>
        7. You can tell how many turns are left by [ >&lt;`,> OOPS - MISSING
        >&lt;`,> ].
      </h5>
      <br />
      <br />
      <h1>Tips</h1>
      <br />
      <h5>* Your dock is the one with the red circle around it.</h5>
      <h5>* Fishes in deeper water are more plentiful (and valuable!).</h5>
      <h5>* Bigger boats hold more fish, but can't travel as far per turn.</h5>
      <h5>
        * Faster boats hold less fish, but travel far (deep fish, anyone?).
      </h5>
      <h5>
        * Boats only move and fish are only collected and sold at the end of the
        turn.
      </h5>
      <h5>
        * If all players press 'End Turn', the turn will end before the round
        timer reaches zero.
      </h5>
    </div>
  )
}

export default Instructions
