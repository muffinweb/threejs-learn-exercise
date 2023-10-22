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

let sourcesByInstance = await threeInstance.start((sources: any) => {
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

          // ADD REVERSE LINE
          const rLineMaterial = new THREE.LineBasicMaterial({color: "#FFFFFF"})
          const rLinePoints = [];
          rLinePoints.push(new THREE.Vector3(-3, 0, -10));
          rLinePoints.push(new THREE.Vector3(0, -3, -10));
          rLinePoints.push(new THREE.Vector3(3, 0, -10));

          const rLineGeometry = new THREE.BufferGeometry().setFromPoints(rLinePoints)

          const rLine = new THREE.Line(rLineGeometry, rLineMaterial);

          sources.resourceObjects.set('rLine', rLine);

          sources.scene.add(rLine);

          //Let's create an Axes

          const axesHelper = new THREE.AxesHelper(5)

          // Now add it to the scene

          sources.scene.add( axesHelper )


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

  //Get Speed Value From customMade Editor
let spinSpeed = (<HTMLInputElement>window.document.getElementById('spinSpeed'))?.value as unknown as number;

  //sourcesByInstance.camera.position.z += 0.1
  let box = sourcesByInstance.resourceObjects.get('box')
  if(spinningMode){
    box.rotation.x -= (spinSpeed/100)
    box.rotation.y -= (spinSpeed/100)
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