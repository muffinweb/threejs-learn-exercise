import * as THREE from "three"
import { SimpleInitializer } from "./SimpleInitializer";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const initialConfig = {
  widthCanvas: 800,
  heightCanvas: 450,
  fov: 60,
  near: 0.1,
  far: 1000,
  rendererDOM: 'app'
}

const threeInstance = SimpleInitializer(initialConfig)

let sourcesByInstance = await threeInstance.start((sources: any) => {

        
  
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
          axesHelper.position.z = -4

          // Now add it to the scene
          sources.scene.add( axesHelper )

        })

//Action variables
let spinningMode = true;
let camMode = true; 

let boxColor = '#FFAD00';

(<HTMLButtonElement>window.document.querySelector('#toggleSpin')).onclick = () => {
  spinningMode = !spinningMode
}

(<HTMLButtonElement>window.document.querySelector('#cameraZoomIn')).onclick = () => {
 
  sourcesByInstance.camera.position.z -= 1;
}

(<HTMLButtonElement>window.document.querySelector('#cameraZoomOut')).onclick = () => {
  
  sourcesByInstance.camera.position.z += 1;
}

//Color Changing
(<HTMLInputElement>window.document.getElementById('colorPalette')).onchange = (ev: Event) => {
  let selectedColor = (<HTMLInputElement>ev.target).value;
  boxColor = selectedColor
}

(<HTMLButtonElement>document.querySelector('#activateOrbit')).addEventListener('click', ev => {
  const orbits = new OrbitControls(sourcesByInstance.camera, sourcesByInstance.renderer.domElement)
  if(orbits.update()){
    alert('Orbit controls activated');
  }
})





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

  document.getElementById('boxColor')
})