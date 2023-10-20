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
// 1=Camera Frustum Verticel Field - Half Life Fov Setting
// 2=Aspect Ratio 
// 3= Min Distance Limit to show up objects on scene
// 4= Max Distance Limit to show up objects on scene
const camera = new THREE.PerspectiveCamera(60, width/height, 0.1, 100)

// Create new Scene
const scene = new THREE.Scene()

const boxGeometry = new THREE.BoxGeometry()
const material = new THREE.MeshPhongMaterial({color: 0xFFAD00})

const box = new THREE.Mesh(boxGeometry, material)
box.position.z = -5
box.position.y = 1
scene.add(box)

const light = new THREE.DirectionalLight(0xFFFFFF)

light.position.set(0, 0, 2)

scene.add(light)

function update() {
	requestAnimationFrame( update );
	renderer.render( scene, camera );

  //Rotate box by x,y

  box.rotation.x += 0.1/5
  box.rotation.y += 0.1/10
}
update();
