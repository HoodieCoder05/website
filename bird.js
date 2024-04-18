// Daniel Shiffman
// Neuro-Evolution Flappy Bird with TensorFlow.js
// http://thecodingtrain.com
// https://youtu.be/cdUNkwXx-I4

function sigmoid(x) {
    return 1 / (1 + exp(-x));
}

class Bird {
    constructor(brain) {
        this.y = height / 2;
        this.x = 64;

        this.gravity = 0.8;
        this.lift = -12;
        this.velocity = 0;

        this.score = 0;
        this.fitness = 0;
        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(5, 8, 2);
        }
    }

    dispose() {
        this.brain.dispose();
    }

    show() {
        var heading = new p5.Vector(1, 2 * sigmoid(1e-1 * this.velocity) - 1);
        heading.setMag(40);
        //stroke(255, 0, 0);
        //line(this.x, this.y, this.x + heading.x, this.y + heading.y);
        push();
        strokeWeight(1);
        translate(this.x, this.y);
        rotate(heading.heading());
        stroke(0, 255);
        fill(255, 255, 0, 255);
        ellipse(0, 0, 48, 32);
        ellipse(-16, -8, 24, 16);
        fill(255, 0, 0, 255);
        ellipse(16, 8, 24, 8);
        fill(255, 255, 255, 255);
        ellipse(14, -6, 16, 12);
        fill(0, 0, 0, 255);
        ellipse(18, -6, 4, 4);

        pop();
    }

    up() {
        this.velocity += this.lift;
    }

    mutate() {
        this.brain.mutate(0.05);
    }

    think(pipes) {
        // Find the closest pipe
        let closest = null;
        let closestD = Infinity;
        for (let i = 0; i < pipes.length; i++) {
            let d = pipes[i].x + pipes[i].w - this.x;
            if (d < closestD && d > 0) {
                closest = pipes[i];
                closestD = d;
            }
        }

        let inputs = [];
        inputs[0] = this.y / height;
        inputs[1] = closest.top / height;
        inputs[2] = closest.bottom / height;
        inputs[3] = closest.x / width;
        inputs[4] = this.velocity / 10;
        let output = this.brain.predict(inputs);
        //if (output[0] > output[1] && this.velocity >= 0) {
        if (output[0] > output[1]) {
            this.up();
        }
    }

    offScreen() {
        return this.y > height || this.y < 0;
    }

    update() {
        this.score++;

        this.velocity += this.gravity;
        //this.velocity *= 0.9;
        this.y += this.velocity;
    }
}