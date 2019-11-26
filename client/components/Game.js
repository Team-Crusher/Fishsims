/* eslint-disable camelcase */
import React from 'react'
import * as PIXI from 'pixi.js'

// *************************

class Game extends React.Component {
  componentDidMount() {
    let type = 'WebGL'
    if (!PIXI.utils.isWebGLSupported()) {
      type = 'canvas'
    }

    PIXI.utils.sayHello(type)

    // Aliases for DRY code
    let Application = PIXI.Application,
      app = new Application({width: 768, height: 640}),
      loader = app.loader,
      resources = loader.resources,
      Sprite = PIXI.Sprite

    document.getElementById('PIXIapp').appendChild(app.view)

    const spritePath = 'assets'
    loader
      .add([`${spritePath}/island_scene.gif`])
      .on('progress', loadProgressHandler)
      .load(setup)

    function loadProgressHandler() {
      // this can be leveraged for a loading progress bar
    }

    let island_scene

    function setup() {
      // create a Sprite from a texture
      island_scene = new Sprite(
        resources[`${spritePath}/island_scene.gif`].texture
      )

      app.stage.addChild(island_scene)
    }
  }

  render() {
    return <div id="PIXIapp" />
  }
}

export default Game
