import Scene from "./engine/scene.js";
import GameObject from "./engine/gameobject.js";
import Controller from "./engine/controller.js";

class Player extends GameObject {
    constructor(scene) {
        super(scene, '#FF0000', 125, 100, null,
            50,  50);
    }
}

class Game extends Scene {
    Start() {
        this.player = new Player(this);

        this.controller = new Controller();
    }

    Update() {
        this.controller.Update();
        this.player.Update();
    }
}

let scene = new Game();