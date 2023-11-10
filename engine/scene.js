export default class Scene {
    constructor() {
        this.app = document.querySelector('body');
        this.app.style.padding = '0';
        this.app.style.margin = '0';
        this.app.style.overflow = 'hidden';

        this.canvas = this.app
            .appendChild(document.createElement('canvas'));
        this.canvas.innerHTML = 'Your browser is pathetic. Get a better one.';
        this.canvas.style.width = '100vw';
        this.canvas.style.height = '100vh';

        this.ctx = this.canvas.getContext('2d');

        this.now = 0;
        this.deltaTime = 0;

        this.Start();

        requestAnimationFrame((now) =>
            this.#loop(now))
    }

    static checkCollision(obj1, obj2) {
        if (obj1.boxColliderEnabled || obj2.boxColliderEnabled) {
            if (obj1.x < obj2.x + obj2.width &&
                obj1.x + obj1.width > obj2.x &&
                obj1.y < obj2.y + obj2.height &&
                obj1.y + obj1.height > obj2.y
            ) {
                if (obj1.boxColliderEnabled) obj1.OnBoxCollision();
                if (obj2.boxColliderEnabled) obj2.OnBoxCollision();
            }
        }

        if (obj1.circleColliderEnabled || obj2.circleColliderEnabled) {
            let dx = obj2.x - obj1.x;
            let dy = obj2.y - obj1.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let sumOfRadii = obj1.radius + obj2.radius;

            if (distance < sumOfRadii) {
                if (obj1.circleColliderEnabled) obj1.OnCircleCollision();
                if (obj2.circleColliderEnabled) obj2.OnCircleCollision();
            }
        }
    }

    Start() {}

    Update() {}

    #loop(now) {
        this.deltaTime = now - this.now;
        this.now = now;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.Update();

        requestAnimationFrame((now) =>
            this.#loop(now));
    }
}