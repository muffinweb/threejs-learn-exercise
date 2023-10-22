/**
 * SimpleInitializer makes three.js wrapped like unity boilerplate start(), update functions
 */

import * as THREE from 'three'

const SimpleInitializer = (initialConfig: {
    widthCanvas: number,
    heightCanvas: number,
    fov: number,
    near: number,
    far: number,
    rendererDOM: string
}, ) => {
    return {
        start: async (callback: CallableFunction ) => {

            var resourceObjects = new Map();
        

            //set Width, Height values dependent on window.* values
            const width = initialConfig.widthCanvas
            const height = initialConfig.heightCanvas
    
            //Initial WEBGL Renderer
            const renderer = await new THREE.WebGLRenderer({
                canvas: document.getElementById(initialConfig.rendererDOM) as HTMLCanvasElement
            })
    
            // Set Renderer's Size
            await renderer.setSize(width, height)
        
            // Create Camera with PerspectiveCamera which takes 4 args
            // 1=Camera Frustum Verticel Field - Half Life Fov Setting
            // 2=Aspect Ratio 
            // 3= Min Distance Limit to show up objects on scene
            // 4= Max Distance Limit to show up objects on scene
            const camera = await new THREE.PerspectiveCamera(60, width/height, initialConfig.near, initialConfig.far)
        
            // Create new Scene
            const scene = await new THREE.Scene()

            callback({camera, scene, renderer, resourceObjects})

            renderer.render(scene, camera)

            return {camera, scene, renderer, resourceObjects}
        },

        update: (sourcesByInstance: {
                    camera: THREE.PerspectiveCamera;
                    scene: THREE.Scene;
                    renderer: THREE.WebGLRenderer;
        }, callback: CallableFunction ) => {

            //Framer
            const FrameInterval = setInterval(() => {
                requestAnimationFrame( callback );
                sourcesByInstance.renderer.render( sourcesByInstance.scene, sourcesByInstance.camera );
            },60)

        }
    }
}

export {
    SimpleInitializer
}