import {MAX_SPEED, MIN_SPEED, WINDOW_SIZE} from "@/components/apps/boids/BoidsContent";

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

    getDistanceFromBoid(otherBoid: Boid): number {
        const dx = this.x - otherBoid.x;
        const dy = this.y - otherBoid.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    normalizeSpeed() {
        const { vx, vy } = this;
        const speed = Math.sqrt(vx * vx + vy * vy);
        if (speed > MAX_SPEED) {
            this.vx = (vx / speed) * MAX_SPEED;
            this.vy = (vy / speed) * MAX_SPEED;
        }
        if (speed < MIN_SPEED) {
            this.vx = (vx / speed) * MIN_SPEED;
            this.vy = (vy / speed) * MIN_SPEED;
        }
    }

    seperation(boids:Boid[]) {

    }

    alignment(boids:Boid[]) {

    }

    cohesion(boids:Boid[]){

    }
}