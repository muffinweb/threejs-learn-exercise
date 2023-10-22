import * as THREE from "three"
import { SimpleInitializer } from "./SimpleInitializer";

const initialConfig = {
  widthCanvas: 800,
  heightCanvas: 450,
  fov: 60,
  near: 0.1,
  far: 100,
  rendererDOM: 'app'
}

const threeInstance = SimpleInitializer(initialConfig)

let sourcesByInstance = await threeInstance.start((sources: { camera: { position: { set: (arg0: number, arg1: number, arg2: number) => void; }; lookAt: (arg0: number, arg1: number, arg2: number) => void; }; resourceObjects: { set: (arg0: string, arg1: THREE.Mesh<THREE.BoxGeometry, THREE.MeshPhongMaterial, THREE.Object3DEventMap> | THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.LineBasicMaterial>) => void; }; scene: { add: (arg0: THREE.Mesh<THREE.BoxGeometry, THREE.MeshPhongMaterial, THREE.Object3DEventMap> | THREE.DirectionalLight | THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.LineBasicMaterial>) => void; }; }) => {
          sources.camera.position.set( 0, 0, 0 );
          sources.camera.lookAt( 0, 0, 0 );
  
          //Geometry object + material = Meshable Object which is X Object
          const boxGeometry = new THREE.BoxGeometry()
          const material = new THREE.MeshPhongMaterial({color: "#FFAD00"})
          const box = new THREE.Mesh(boxGeometry, material)

          //Add box object to resources to handle this in update-Function
          sources.resourceObjects.set('box', box)

          box.position.set(0, 0, -5)
          sources.scene.add(box)
      
          //Create Light Component and set its position then add it to scene
          const light = new THREE.DirectionalLight(0xFFFFFF)
          light.position.set(0, 0, 2)
          sources.scene.add(light)

          //Let's create a line

          //Create material that will be used for line
          const lineMaterial = new THREE.LineBasicMaterial({ color: "#FFFFFF" })

          // Now create custom vectorSet to make geomery
          const points = [];
          points.push( new THREE.Vector3( - 3, 0, -10 ) );
          points.push( new THREE.Vector3( 0, 3, -10 ) );
          points.push( new THREE.Vector3( 3, 0, -10 ) );

          //Use points to create custom geometry object
          const customGeometryForLine = new THREE.BufferGeometry().setFromPoints(points)

          //Create line with custom GeometryLines with Line Material. Combine'em All
          const line = new THREE.Line(customGeometryForLine, lineMaterial)

          //add line to resources to handle update scoop
          sources.resourceObjects.set('line', line)

          sources.scene.add(line)
        })

//Action variables
let spinningMode = true;
let manuelCamMode = true;
let boxColor = '#FFAD00';

(<HTMLButtonElement>window.document.querySelector('#toggleSpin')).onclick = () => {
  spinningMode = !spinningMode
}

(<HTMLButtonElement>window.document.querySelector('#cameraZoomIn')).onclick = () => {
  manuelCamMode = false
  sourcesByInstance.camera.position.z -= 1;
}

(<HTMLButtonElement>window.document.querySelector('#cameraZoomOut')).onclick = () => {
  manuelCamMode = false
  sourcesByInstance.camera.position.z += 1;
}

(<HTMLButtonElement>window.document.getElementById('cameraPositionX')).onchange = () => {
  manuelCamMode = true
}

//Color Changing
(<HTMLInputElement>window.document.getElementById('colorPalette')).onchange = (ev: Event) => {
  let selectedColor = (<HTMLInputElement>ev.target).value;
  boxColor = selectedColor
}





//Update each-Frame Method
threeInstance.update(sourcesByInstance, () => {

  //sourcesByInstance.camera.position.z += 0.1
  let box = sourcesByInstance.resourceObjects.get('box')
  if(spinningMode){
    box.rotation.x -= 0.01
    box.rotation.y -= 0.01
  }
  box.material.color.set(boxColor)

  let cameraPositionX = (<HTMLInputElement>document.getElementById('cameraPositionX'))?.value
  let cameraPositionY = (<HTMLInputElement>document.getElementById('cameraPositionY'))?.value
  let cameraPositionZ = (<HTMLInputElement>document.getElementById('cameraPositionZ'))?.value

  document.getElementById('boxColor')

  if(manuelCamMode){
    sourcesByInstance.camera.position.set(
      Number(cameraPositionX), 
      Number(cameraPositionY), 
      Number(cameraPositionZ))
  }

})