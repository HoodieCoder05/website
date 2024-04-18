// Daniel Shiffman
// Neuro-Evolution Flappy Bird with TensorFlow.js
// http://thecodingtrain.com
// https://youtu.be/cdUNkwXx-I4

class Pipe {
    constructor(difficulty) {
        this.spacing = 100 + 25 / difficulty;
        this.top = random(height / 6, (3 / 4) * height);
        this.bottom = height - (this.top + this.spacing);
        this.x = width;
        this.w = 80;
        this.speed = 6;
    }

    hits(bird) {
        if (bird.y < this.top || bird.y > height - this.bottom) {
            if (bird.x > this.x && bird.x < this.x + this.w) {
                return true;
            }
        }
        return false;
    }

    show() {
        fill("#3fbf00");
        stroke("#1f5f00");
        strokeWeight(3);
        rectMode(CORNER);
        rect(this.x, 0, this.w, this.top);
        rect(this.x - 5, this.top - 20, this.w + 10, 20);
        rect(this.x, height - this.bottom, this.w, this.bottom);
        rect(this.x - 5, height - this.bottom, this.w + 10, 20);
    }

    update() {
        this.x -= this.speed;
    }

    offscreen() {
        if (this.x < -this.w) {
            return true;
        } else {
            return false;
        }
    }
}