const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
canvas.width = 1000
canvas.height = 600

const playerImg1 = new Image()
const playerImg2 = new Image()
const playerImg3 = new Image()
playerImg1.src = "img1.png"
playerImg2.src = "img2.png"
playerImg3.src = "img3.png"

const notes = ["C", "D", "E", "F", "G", "A", "B"]
const synths = {}
notes.forEach(note => {
    synths[note] = new Tone.Synth().toDestination();
})


class Player {
    constructor() {
        this.frames = [playerImg1, playerImg2, playerImg3]
        this.frameIndex = 0
    }
    draw() {
        if (animationId % 20 === 0) {
            this.frameIndex = (this.frameIndex + 1) % 3
        }
    }

    update() {
        this.draw()
    }
}