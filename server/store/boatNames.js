/* eslint-disable no-case-declarations */
const ASSIGN_BOAT_NAME = 'ASSIGN_BOAT_NAME'

const assignBoatName = (nameToAssign, boatId) => ({
  type: ASSIGN_BOAT_NAME,
  nameToAssign,
  boatId
})

const init = {
  'Flying Dutchman': null,
  'HMS Fishstack': null,
  'The Jolly Fisher': null,
  Windbreaker: null,
  "Blackbeard's Revenge": null,
  "Bluebeard's Revenge": null,
  "Redbeard's Revenge": null,
  "Neckbeard's Revenge": null,
  'Coastal Clipper': null,
  'HMS Dubloon': null,
  'HMS Clapback': null,
  'The Jolly Schooner': null,
  'The Little Mermaid': null,
  "Scuttle's Delight": null,
  "Poseidon's Bounty": null,
  'Sea Stormer': null,
  'Fish Hunter': null,
  'Her Jolly Folly': null,
  'Sea Bird': null,
  'HMS Gimmefish': null,
  "Madame's Delight": null,
  "Charlie's Gambit": null,
  "Nick's Winning Fish": null,
  'The Sword of Frances': null,
  "Chris' Folly": null,
  'RIP Lil BUB': null,
  'The Black Pearl': null,
  "Queen Ursula's Revenge": null,
  'HMS Trident': null,
  'Tugboat Tom': null,
  Wavebreaker: null,
  Dawnbreaker: null,
  'Sea Treader': null,
  'Tuna Burglar': null,
  'The Salty Seahorse': null,
  'Mobile Bathtub': null,
  'The North Star': null,
  'The Gull': null,
  Sharktooth: null,
  Hammerhead: null,
  'HMS Tropics': null,
  'Shrimp Nabber': null,
  "Fynn's Gambit": null,
  'Dock Blocker': null
}

const boatNames = (state = init, action) => {
  switch (action.type) {
    case ASSIGN_BOAT_NAME:
      return {...state, [action.nameToAssign]: action.boatId}
    default:
      return state
  }
}

module.exports = {boatNames, assignBoatName}
