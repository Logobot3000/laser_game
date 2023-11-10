export default class GameObject {
    constructor(scene, color, x, y, texture=null, width=null,
                height=null, radius=null) {
        this.scene = scene;
        this.ctx = this.scene.ctx;

        this.width = width;
        this.height = height;

        this.radius = radius;

        this.texture = texture;
        this.image = new Image();
        this.image.src = this.texture;

        this.enabled = true;

        this.isAnimation = false;
        this.spriteWidth = 0;
        this.spriteHeight = 0;
        this.spriteAnimations = [];
        this.animationStates = [];
        this.stagger = 0;
        this.currentFrame = 0;
        this.activeState = '';

        this.boxColliderEnabled = false;
        this.circleColliderEnabled = false;

        this.color = color;

        this.outline = false;

        this.x = x;
        this.y = y;

        this.Start();
    }

    enableAnimation(width, height, animationStates, stagger=1) {
        this.isAnimation = true;
        this.spriteWidth = width;
        this.spriteHeight = height;
        this.animationStates = animationStates;
        this.stagger = stagger;

        this.animationStates.forEach((state, index) => {
           let frames = {
               loc: [],
           };
           for (let j = 0; j < state.frames; j++) {
               let positionX = j * this.spriteWidth;
               let positionY = index * this.spriteHeight;
               frames.loc.push({x: positionX, y: positionY});
           }
           this.spriteAnimations[state.name] = frames;
        });
    }

    #animate() {
        let position = Math.floor(this.currentFrame/this.stagger)
            % this.spriteAnimations[this.activeState].loc.length;
        let frameX = this.spriteWidth * position;
        let frameY = this.spriteAnimations[this.activeState].loc[position].y;
        this.ctx.drawImage(this.image, frameX, frameY,
            this.spriteWidth, this.spriteHeight, this.x, this.y,
            this.spriteWidth, this.spriteHeight);

        this.currentFrame++;
    }

    OnBoxCollision() {}

    OnCircleCollision() {}

    Start() {}

    Update() {
        if (this.enabled) {
            if (this.texture) {
                if (this.isAnimation) {
                    this.#animate();
                }
                else {
                    this.ctx.drawImage(this.image, this.x, this.y);
                }
            }
            else {
                if (this.radius) {
                    if (this.outline) {
                        this.ctx.strokeStyle = this.color;
                        this.ctx.beginPath();
                        this.ctx.arc(this.x + 0.5, this.y + 0.5,
                            this.radius, 0, 2 * Math.PI);
                        this.ctx.stroke();
                    }
                    else {
                        this.ctx.beginPath();
                        this.ctx.arc(this.x + 0.5, this.y + 0.5,
                            this.radius, 0, 2 * Math.PI);
                        this.ctx.fillStyle = this.color;
                        this.ctx.fill();
                    }
                }
                else {
                    if (this.outline) {
                        this.ctx.strokeStyle = this.color;
                        this.ctx.strokeRect(this.x + 0.5, this.y + 0.5,
                            this.width, this.height);
                    }
                    else {
                        this.ctx.fillStyle = this.color;
                        this.ctx.fillRect(this.x, this.y,
                            this.width, this.height);
                    }
                }
            }
        }
    }
}