/* eslint-disable max-statements */
/* eslint-disable dot-notation */

import React from 'react'
import {connect} from 'react-redux'

import * as THREE from 'three'
import {Water} from 'three/examples/jsm/objects/Water.js'
import {Sky} from 'three/examples/jsm/objects/Sky.js'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {OutlineEffect} from 'three/examples/jsm/effects/OutlineEffect.js'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
    /*
      yes this has a bunch of pointless code and is ugly but
      it helps me keep track of the vars the object will have
    */
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.init = this.init.bind(this)
    this.initBoat = this.initBoat.bind(this)
    this.renderThree = this.renderThree.bind(this)
    this.resize = this.resize.bind(this)
    this.animate = this.animate.bind(this)

    this.updateSun = this.updateSun.bind(this)
    this.actualTime = this.actualTime.bind(this)
    this.speedyTime = this.speedyTime.bind(this)

    this.renderer = null
    this.camera = null
    this.cubeCamera = null

    this.scene = null
    this.water = null
    this.boat = {position: {y: 0}}
    this.light = null

    this.sky = null
    this.sunInfo = null

    this.lastTime = null
  }

  /**
   * gets all the three js stuff ready
   */
  init() {
    // set up renderer and attach the dom ele
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.mount.appendChild(this.renderer.domElement)

    // outline
    this.effect = new OutlineEffect(this.renderer)

    this.scene = new THREE.Scene()

    // camera stuff

    this.camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      1,
      20000
    )
    this.camera.position.set(30, 30, 100).multiplyScalar(10)
    this.camera.lookAt(30, 0, 0)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set(0, 10, 0)
    this.controls.update()

    // light
    this.light = new THREE.DirectionalLight(0xffffff, 20)
    this.scene.add(this.light)

    this.topLight = new THREE.DirectionalLight(0xffffff, 0.5)
    this.topLight.position.set(0, 380, 300)
    this.scene.add(this.topLight)

    // water
    var waterGeometry = new THREE.PlaneBufferGeometry(10000, 10000)
    this.water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load(
        'textures/waternormals.jpg',
        function(texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        }
      ),
      alpha: 1.0,
      sunDirection: this.light.position.clone().normalize(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: this.scene.fog !== undefined
    })
    this.water.rotation.x = -Math.PI / 2
    this.scene.add(this.water)

    // Skybox
    this.sky = new Sky()

    const uniforms = this.sky.material.uniforms

    uniforms['turbidity'].value = 10
    uniforms['rayleigh'].value = 2
    uniforms['luminance'].value = 1
    uniforms['mieCoefficient'].value = 0.005
    uniforms['mieDirectionalG'].value = 0.8

    // to control the sun in update sun
    this.sunInfo = {
      distance: 400,
      inclination: 1.75,
      azimuth: 0.205
    }

    // cube camera
    this.cubeCamera = new THREE.CubeCamera(0.1, 1, 512)
    this.cubeCamera.renderTarget.texture.generateMipmaps = true
    this.cubeCamera.renderTarget.texture.minFilter =
      THREE.LinearMipmapLinearFilter
    this.scene.background = this.cubeCamera.renderTarget

    // init the sun with default above
    this.updateSun()
    this.initBoat()
  }

  initBoat() {
    var loader = new GLTFLoader()
    loader.load('models/boat3/boat3.glb', gltf => {
      gltf.scene.position.setZ(-300)
      gltf.scene.position.setY(-30)
      gltf.scene.rotateX(Math.PI / -2)
      this.boat = gltf.scene
      console.log('BOAT1:\t', this.boat)
      this.scene.add(gltf.scene)
    })
  }

  updateSun() {
    const theta = Math.PI * (this.sunInfo.inclination - 0.5)
    const phi = 2 * Math.PI * (this.sunInfo.azimuth - 0.5)

    this.light.position.x = this.sunInfo.distance * Math.cos(phi)
    this.light.position.y =
      this.sunInfo.distance * Math.sin(phi) * Math.sin(theta)
    this.light.position.z =
      this.sunInfo.distance * Math.sin(phi) * Math.cos(theta)

    this.sky.material.uniforms['sunPosition'].value = this.light.position.copy(
      this.light.position
    )
    this.water.material.uniforms['sunDirection'].value
      .copy(this.light.position)
      .normalize()
    if (this.light.position.y <= -5) {
      this.light.intensity = 0
    } else {
      this.light.intensity = 3
    }
    this.cubeCamera.update(this.renderer, this.sky)
  }

  actualTime() {
    const date = new Date()
    const timeTotal =
      date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 360
    this.sunInfo.inclination = timeTotal / 12 + 1
    this.updateSun()
  }

  speedyTime() {
    this.sunInfo.inclination += 0.001
    this.updateSun()
  }

  renderThree() {
    // this.actualTime()
    this.speedyTime()

    this.water.material.uniforms['time'].value += 1.0 / 60.0
    this.effect.render(this.scene, this.camera)
    this.boat.position.y = Math.cos(new Date().getTime() / 100) * 100
  }

  resize(w, h) {
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
    this.renderThree()
  }

  animate() {
    requestAnimationFrame(this.animate)
    this.renderThree()
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state.name)
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      name: event.target.value
    })
  }

  componentDidMount() {
    this.init()
    this.resize(window.innerWidth, window.innerHeight)
    window.addEventListener('resize', () =>
      this.resize(window.innerWidth, window.innerHeight)
    )
    this.animate()
  }

  render() {
    return (
      <div
        id="homeback"
        ref={ref => {
          this.mount = ref
        }}
      >
        <form id="start-form" onSubmit={this.handleSubmit}>
          <input
            maxLength="20"
            onChange={this.handleChange}
            name="fishioname"
            value={this.state.name}
          />
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(Home)
