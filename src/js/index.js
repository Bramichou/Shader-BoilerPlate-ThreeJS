import * as THREE from 'three'
import TrackballControls from 'three-trackballcontrols'
import EASE from './utils/easing'
import Plane from './class/sphere'

let scene, camera, renderer, light, light2, controls, helper, plane

init()


function init(){

    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 150

    controls = new TrackballControls(camera)

    light = new THREE.DirectionalLight(0xffffff, 1)
    light2 = new THREE.DirectionalLight(0xffffff, 1)
    light.position.y = 100
    light2.position.y = -100

    renderer = new THREE.WebGLRenderer({
        antialiasing : true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    let uniforms = {
        u_time: { type: 'f', value: 0 },
        u_amplitude : { type: 'f', value: 5.},
        u_frequency : { type: 'f', value: .05}
    }

    // Instances
    plane = new Plane({
        scene : scene,
        uniforms : uniforms,
        vertexShader : document.getElementById( 'vertexShader' ).textContent,
        fragmentShader : document.getElementById( 'fragmentShader' ).textContent
    })

    light.target = plane
    light2.target = plane

    scene.add(light)
    scene.add(light2)

    window.addEventListener('resize', resize, false);

    update()
}

function update() {
    requestAnimationFrame(update)
    controls.update()
    renderer.render(scene, camera)
    camera.updateProjectionMatrix()
    plane.update()
}


function resize(){
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
}