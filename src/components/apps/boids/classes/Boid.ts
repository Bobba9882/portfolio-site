import {
    ALIGMENT_FACTOR,
    COHESION_FACTOR,
    EDGE_MARGIN, JITTER_STRENGTH,
    MAX_SPEED,
    MIN_SPEED, REPEL_FACTOR,
    TURN_FACTOR,
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

    avoidWorldExit() {
        if (this.positionX > WINDOW_SIZE.width - EDGE_MARGIN) {
            this.velocityX -= TURN_FACTOR;
        }
        if (this.positionX < EDGE_MARGIN) {
            this.velocityX += TURN_FACTOR;
        }
        if (this.positionY > WINDOW_SIZE.height - EDGE_MARGIN) {
            this.velocityY -= TURN_FACTOR;
        }
        if (this.positionY < EDGE_MARGIN) {
            this.velocityY += TURN_FACTOR;
        }
    }

    getSquaredDistanceFromBoid(otherBoid: Boid): number {
        const deltaX = this.positionX - otherBoid.positionX;
        const deltaY = this.positionY - otherBoid.positionY;
        return deltaX * deltaX + deltaY * deltaY;
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
        let averagePositionX = 0;
        let averagePositionY = 0;

        boids.forEach(otherBoid => {
            averagePositionX += this.positionX - otherBoid.positionX;
            averagePositionY += this.positionY - otherBoid.positionY;
        })

        if (boids.length > 0) {
            this.velocityX += averagePositionX * REPEL_FACTOR;
            this.velocityY += averagePositionY * REPEL_FACTOR;
        }

    }

    alignment(boids: Boid[]) {
        let averageVelocityX = 0;
        let averageVelocityY = 0;

        boids.forEach(otherBoid => {
            averageVelocityX += otherBoid.velocityX;
            averageVelocityY += otherBoid.velocityY;
        })

        if (boids.length > 0){
            averageVelocityX /= boids.length;
            averageVelocityY /= boids.length;

            this.velocityX += (averageVelocityX - this.velocityX) * ALIGMENT_FACTOR;
            this.velocityY += (averageVelocityY - this.velocityY) * ALIGMENT_FACTOR;
        }
    }

    cohesion(boids: Boid[]){
        let averagePositionX = 0;
        let averagePositionY = 0;

        boids.forEach(otherBoid => {
            averagePositionX += otherBoid.positionX;
            averagePositionY += otherBoid.positionY;
        })

        if (boids.length > 0){
            averagePositionX /= boids.length;
            averagePositionY /= boids.length;

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

    randomJitter(){
        this.velocityX += (Math.random() - 0.5) * JITTER_STRENGTH;
        this.velocityY += (Math.random() - 0.5) * JITTER_STRENGTH;
    }
}
