import * as THREE from 'three'
import EASE from './utils/easing'
import Sphere from './class/sphere'
import OrbitControls from 'orbit-controls-es6'


let scene, camera, renderer, controls, helper, sphere, uniforms

window.addEventListener('load', () => {
    init()
})



function init(){

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 150


    renderer = new THREE.WebGLRenderer({
        antialiasing : true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)


    controls = new OrbitControls(camera, renderer.domElement)

    document.body.appendChild(renderer.domElement)

    uniforms = {
        time: 0.,
        amplitude : 5.,
        frequency : .05
    }

    // Instances
    sphere = new Sphere({
        scene : scene,
        uniforms : uniforms,
        vertexShader : document.getElementById( 'vertexShader' ).textContent,
        fragmentShader : document.getElementById( 'fragmentShader' ).textContent
    })

    window.addEventListener('resize', resize, false);
    update()
}

function update() {
    requestAnimationFrame(update)
    renderer.render(scene, camera)
    camera.updateProjectionMatrix()
    sphere.update()
}


function resize(){
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
}