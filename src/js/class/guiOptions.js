export default class GuiOptions{
    constructor(){
        this.amplitude = 5.
        this.frequency = .05
        this.wireframe = false

        this.gui = new dat.GUI()
        console.log('GUI created')
    }

    displayGUI(){
        this.gui.add(this, 'amplitude', 1., 30)
        this.gui.add(this, 'frequency', .001, 2)
        this.gui.add(this, 'wireframe', true, false)
    }
}