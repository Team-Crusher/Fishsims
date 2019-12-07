/* eslint-disable guard-for-in */
import {hitTestRectangle} from './PIXIutils'
import store, {updateFish, removeFish} from '../store'
import {stage} from './game'
import {Text} from 'pixi.js'
import socket from '../socket'
import {TILE_SIZE} from './CONSTANTS'

export const ifOnFishCollect = (boat, fishes) => {
  // check how many fishes the boat has/can take in
  let boatCurrentFishes = 0
  for (let key in boat.fishes) {
    boatCurrentFishes += boat.fishes[key]
  }
  const boatMaxIntake = boat.maxFishes - boatCurrentFishes
  if (boatMaxIntake === 0) return

  fishes.forEach(fish => {
    if (fish.population === 0) return
    if (hitTestRectangle(boat.sprite, fish.sprite)) {
      const fishToDeplete = Math.min(
        fish.population,
        Math.min(boatMaxIntake, boat.fishPerTurn)
      )

      fish.population -= fishToDeplete
      store.dispatch(updateFish(fish))
      if (fish.population <= 0) {
        stage.removeChild(fish.sprite)
        fish.sprite = null
        store.dispatch(removeFish(fish.id))
      }

      boatCurrentFishes += fishToDeplete
      boat.fishes[fish.fishType] += fishToDeplete

      // define text style for Pixi Text
      const textStyle = {
        fontFamily: 'Arial',
        fontSize: 12,
        fill: 'black',
        align: 'center',
        anchor: 0.5
      }

      // Add Pixi Text for fish collect! Woo!
      let fishCollect = new Text(`🐟 + ${fishToDeplete}`, textStyle)
      fishCollect.x += 0
      fishCollect.y -= 12
      fishCollect.resolution = 4
      boat.sprite.addChild(fishCollect)

      let fishCollectInterval
      fishCollectInterval = window.setInterval(() => {
        fishCollect.y -= 0.5
        fishCollect.alpha -= 0.025
        if (fishCollect.alpha <= 0) {
          clearInterval(fishCollectInterval)
          boat.sprite.removeChild(fishCollect)
          fishCollect = null // clearing ref is needed to garbagecollect Sprite
        }
      }, 50)

      // Add Pixi Text if the boat is at max fish capacity
      if (
        boatCurrentFishes === boat.maxFishes &&
        !boat.maxFishesText &&
        boat.ownerSocket === socket.id
      ) {
        textStyle.fill = 'red'
        const fishesMaxWarning = new Text('🐟 MAX', textStyle)
        fishesMaxWarning.x -= (fishesMaxWarning.width - TILE_SIZE) / 2
        fishesMaxWarning.y += 40
        fishesMaxWarning.resolution = 4
        boat.sprite.addChild(fishesMaxWarning)
        boat.maxFishesText = fishesMaxWarning
      }
    }
  })
}
