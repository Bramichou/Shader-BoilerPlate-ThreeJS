import * as THREE from 'three'
import TrackballControls from 'three-trackballcontrols'
import EASE from './utils/easing'
import Sphere from './class/sphere'

let scene, camera, renderer, light, light2, controls, helper, sphere, uniforms

window.addEventListener('load', () => {
    init()
})



function init(){

    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 150


    renderer = new THREE.WebGLRenderer({
        antialiasing : true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)

    controls = new TrackballControls(camera, renderer.domElement)

    light = new THREE.DirectionalLight(0xffffff, 1)
    light2 = new THREE.DirectionalLight(0xffffff, 1)
    light.position.y = 100
    light2.position.y = -100


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

    light.target = sphere
    light2.target = sphere

    console.log(dat)

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
    sphere.update()
}


function resize(){
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
}