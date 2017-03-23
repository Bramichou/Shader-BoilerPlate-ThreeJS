import * as THREE from 'three'

export default class Sphere extends THREE.Object3D{
    constructor(options) {
        super(options)
        this.scene = options.scene
        this.radius = options.radius || 50
        this.widthSegments = options.widthSegments || 100
        this.heightSegments = options.heightSegments || 100
        this.uniforms = options.uniforms || {}
        this.vertexShader = options.vertexShader
        this.fragmentShader = options.fragmentShader

        this.geometry = options.geometry || new THREE.SphereBufferGeometry(this.radius, this.widthSegments, this.heightSegments);

        this.material = options.material || new THREE.RawShaderMaterial( {
                uniforms: this.uniforms,
                vertexShader: document.getElementById( 'vertexShader' ).textContent,
                fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
                wireframe: true
            } );

        let plane = new THREE.Mesh(this.geometry, this.material)

        plane.rotation.x = (Math.PI / 2) + 10;

        this.scene.add(plane)
    }

    update(){
        this.uniforms.u_time.value += .01
    }
}