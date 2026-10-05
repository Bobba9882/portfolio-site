import {WINDOW_SIZE} from "@/components/apps/boids/BoidsContent";

export class Boid {
    private x: number;
    private y: number;
    private vx: number;
    private vy: number;
    constructor(x:number, y:number, vx:number, vy:number) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
    }

    draw(context: CanvasRenderingContext2D) {
        const angle = Math.atan2(this.vy, this.vx);

        context.save();
        context.translate(this.x, this.y);
        context.rotate(angle);

        context.beginPath();
        context.moveTo(5, 0);
        context.lineTo(-5, 2.5);
        context.lineTo(-5, -2.5);
        context.closePath();
        context.fill();
        context.restore();
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;
    }

    teleportToOtherSide() {
        if (this.x > WINDOW_SIZE.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = WINDOW_SIZE.width;
        } else if (this.y < 0) {
            this.y = WINDOW_SIZE.height;
        } else if (this.y > WINDOW_SIZE.height) {
            this.y = 0;
        }
    }

    seperation() {

    }

    alignment() {

    }

    cohesion(){

    }
}