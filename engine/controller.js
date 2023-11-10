export default class Controller {
    constructor() {
        this.keys = {}

        this.clickFunc = () => {};

        window.addEventListener('keydown', (e) => {
            this.keys[e.code].pressed = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code].pressed = false;
            this.keys[e.code].upfunc();
        });

        window.addEventListener('click', (e) => {
            this.clickFunc();
        });
    }

    Update() {
        Object.values(this.keys).forEach(val => {
            if (val.pressed) val.downfunc();
        })
    }

    addKey(keycode, downfunc, upfunc=() => {}) {
        this.keys[keycode] = {pressed: false, downfunc: downfunc, upfunc: upfunc};
    }
}