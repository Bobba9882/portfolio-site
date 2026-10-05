import {
    ALIGMENT_FACTOR,
    COHESION_FACTOR,
    MAX_SPEED,
    MIN_SPEED,
    VISIBLE_RANGE,
    WINDOW_SIZE
} from "@/components/apps/boids/BoidsContent";

export class Boid {

    private positionX: number;
    private positionY: number;
    private velocityX: number;
    private velocityY: number;
    constructor(positionX: number, positionY: number, velocityX: number, velocityY: number) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    draw(context: CanvasRenderingContext2D) {
        const heading = Math.atan2(this.velocityY, this.velocityX);

        context.save();
        context.translate(this.positionX, this.positionY);
        context.rotate(heading);

        context.beginPath();
        context.moveTo(5, 0);
        context.lineTo(-5, 2.5);
        context.lineTo(-5, -2.5);
        context.closePath();
        context.fill();
        context.restore();
    }

    update(){
        this.positionX += this.velocityX;
        this.positionY += this.velocityY;
    }

    teleportToOtherSide() {
        if (this.positionX > WINDOW_SIZE.width) {
            this.positionX = 0;
        } else if (this.positionX < 0) {
            this.positionX = WINDOW_SIZE.width;
        } else if (this.positionY < 0) {
            this.positionY = WINDOW_SIZE.height;
        } else if (this.positionY > WINDOW_SIZE.height) {
            this.positionY = 0;
        }
    }

    getDistanceFromBoid(otherBoid: Boid): number {
        const deltaX = this.positionX - otherBoid.positionX;
        const deltaY = this.positionY - otherBoid.positionY;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    normalizeSpeed() {
        const { velocityX, velocityY } = this;
        const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        if (speed > MAX_SPEED) {
            this.velocityX = (velocityX / speed) * MAX_SPEED;
            this.velocityY = (velocityY / speed) * MAX_SPEED;
        }
        if (speed < MIN_SPEED) {
            this.velocityX = (velocityX / speed) * MIN_SPEED;
            this.velocityY = (velocityY / speed) * MIN_SPEED;
        }
    }

    separation(boids: Boid[]) {

    }

    alignment(boids: Boid[]) {
        let averageVelocityX = 0;
        let averageVelocityY = 0;
        let neighborCount = 0;

        boids.forEach(otherBoid => {
            if (otherBoid === this){
                return;
            }

            const distance = this.getDistanceFromBoid(otherBoid);
            if (distance < VISIBLE_RANGE) {
                averageVelocityX += otherBoid.velocityX;
                averageVelocityY += otherBoid.velocityY;
                neighborCount++;
            }
        })

        if (neighborCount > 0){
            averageVelocityX /= neighborCount;
            averageVelocityY /= neighborCount;
        }

        this.velocityX += (averageVelocityX - this.velocityX) * ALIGMENT_FACTOR;
        this.velocityY += (averageVelocityY - this.velocityY) * ALIGMENT_FACTOR;
    }

    cohesion(boids: Boid[]){
        let averagePositionX = 0;
        let averagePositionY = 0;
        let neighborCount = 0;

        boids.forEach(otherBoid => {
            if (otherBoid === this){
                return;
            }

            const distance = this.getDistanceFromBoid(otherBoid);
            if (distance < VISIBLE_RANGE) {
                averagePositionX += otherBoid.positionX;
                averagePositionY += otherBoid.positionY;
                neighborCount++;
            }
        })

        if (neighborCount > 0){
            averagePositionX /= neighborCount;
            averagePositionY /= neighborCount;

            let directionX = averagePositionX - this.positionX;
            let directionY = averagePositionY - this.positionY;

            const distanceToCenter = Math.sqrt(directionX * directionX + directionY * directionY);

            if (distanceToCenter > 0) {
                directionX /= distanceToCenter;
                directionY /= distanceToCenter;

                this.velocityX += directionX * COHESION_FACTOR;
                this.velocityY += directionY * COHESION_FACTOR;
            }
        }
    }
}
