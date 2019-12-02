import store from '../store'
import {hitTestRectangle} from './PIXIutils'

export const ifOnFishCollect = (boat, fishes) => {
  console.log('in ifonfishcollect')
  fishes.forEach(fish => {
    if (hitTestRectangle(boat.sprite, fish.sprite)) {
      console.log(`Boat ${boat.id} ended reel on fish ${fish}`)
      fish.population -= 10
      console.log('Post fished fishes: ', fish.population)
    }
  })
}
