// Import and renaming as main component variable that helps reach core stuff
import * as THREE from 'three'

//set Width, Height values dependent on window.* values
const width = window.innerWidth
const height = window.innerHeight

//Initial WEBGL Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('app') as HTMLCanvasElement
})

// Set Renderer's Size
renderer.setSize(width, height)

// Create Camera with PerspectiveCamera which takes 4 args
// 1=Camera Frustum Verticel Field
// 2=Aspect Ratio 
// 3= Min Distance Limit to show up objects on scene
// 4= Max Distance Limit to show up objects on scene
const camera = new THREE.PerspectiveCamera(60, width/height, 0.1, 100)

// Create new Scene
const scene = new THREE.Scene()

renderer.render(scene, camera)