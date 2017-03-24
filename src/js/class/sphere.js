import * as THREE from 'three'
import GuiOptions from './guiOptions'


export default class Sphere extends THREE.Object3D{
    constructor(options) {
        super(options)
        this.scene = options.scene
        this.radius = options.radius || 50
        this.widthSegments = options.widthSegments || 100
        this.heightSegments = options.heightSegments || 100
        this.uniforms = options.uniforms || {}

        this.amplitude = this.uniforms.amplitude
        this.time = this.uniforms.time
        this.frequency = this.uniforms.frequency

        this.options = new GuiOptions()
        this.options.displayGUI()

        this.vertexShader = options.vertexShader
        this.fragmentShader = options.fragmentShader

        this.geometry = options.geometry || new THREE.SphereBufferGeometry(this.radius, this.widthSegments, this.heightSegments);

        this.material = options.material || new THREE.RawShaderMaterial( {
                uniforms: {
                    u_time: { type: 'f', value: this.time },
                    u_amplitude : { type: 'f', value: this.options.amplitude},
                    u_frequency : { type: 'f', value: this.options.frequency}
                },
                vertexShader: document.getElementById( 'vertexShader' ).textContent,
                fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
                wireframe: this.options.wireframe
            } );

        let plane = new THREE.Mesh(this.geometry, this.material)

        plane.rotation.x = (Math.PI / 2) + 10;

        this.scene.add(plane)
    }

    update(){
        this.material.uniforms.u_amplitude.value = this.options.amplitude
        this.material.uniforms.u_frequency.value = this.options.frequency
        this.material.uniforms.u_time.value += .04
        this.material.wireframe = this.options.wireframe
        console.log()
    }
}