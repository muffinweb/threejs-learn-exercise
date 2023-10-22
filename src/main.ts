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
          sources.camera.position.set( 0, 0, 0 );
          sources.camera.lookAt( 0, 0, 0 );
  
          //Geometry object + material = Meshable Object which is X Object
          const boxGeometry = new THREE.BoxGeometry()
          const material = new THREE.MeshPhongMaterial({color: 0xFFAD00})
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
          const lineMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF })

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
let spinningMode = true

window.document.querySelector('#toggleSpin').onclick = () => {
  spinningMode = !spinningMode
}

window.document.querySelector('#cameraZoomIn').onclick = () => {
  sourcesByInstance.camera.position.z -= 1;
}

window.document.querySelector('#cameraZoomOut').onclick = () => {
  sourcesByInstance.camera.position.z += 1;
}

threeInstance.update(sourcesByInstance, () => {

  //sourcesByInstance.camera.position.z += 0.1
  if(spinningMode){
    let box = sourcesByInstance.resourceObjects.get('box')
    box.rotation.x -= 0.01
    box.rotation.y -= 0.01
  }
})