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

let sourcesByInstance = await threeInstance.start(sources => {
          
          //Geometry object + material = Meshable Object which is X Object
          const boxGeometry = new THREE.BoxGeometry()
          const material = new THREE.MeshPhongMaterial({color: 0xFFAD00})
          const box = new THREE.Mesh(boxGeometry, material)

          //Add box object to resources to handle this in update-Function
          sources.resourceObjects.set('box', box)
          
          //Setting up position
          box.position.z = -5
          box.position.y = 1
          sources.scene.add(box)
      
      
          //Create Light Component and set its position then add it to scene
          const light = new THREE.DirectionalLight(0xFFFFFF)
          light.position.set(0, 0, 2)
          sources.scene.add(light)
})

threeInstance.update(sourcesByInstance, () => {

  //sourcesByInstance.camera.position.z += 0.1
  let box = sourcesByInstance.resourceObjects.get('box')
  box.rotation.x -= 0.01
  box.rotation.y -= 0.01

  document.onclick = (ev: MouseEvent) => toggleZoomInOut()

})

let zoomToggle = true
function toggleZoomInOut(){
  
  if(zoomToggle){
    sourcesByInstance.camera.position.z += 3;
  }else{
    sourcesByInstance.camera.position.z -= 3;
  }

  zoomToggle = !zoomToggle
}
