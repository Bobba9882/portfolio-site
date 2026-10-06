import {
    ALIGMENT_FACTOR,
    COHESION_FACTOR,
    EDGE_MARGIN, JITTER_STRENGTH,
    MAX_SPEED,
    MIN_SPEED, REPEL_FACTOR,
    TURN_FACTOR,
    WINDOW_SIZE
} from "@/components/apps/boids/BoidsContent";


const POINTER_TIP_ANGLE = -Math.PI * 5 / 8;
const POINTER_ANGLE_STEPS = 64;
const POINTER_CELL_SIZE = 28;
export function createPointerAtlas(): HTMLCanvasElement {
    const atlas = document.createElement("canvas");
    atlas.width = POINTER_ANGLE_STEPS * POINTER_CELL_SIZE;
    atlas.height = POINTER_CELL_SIZE;

    const atlasContext = atlas.getContext("2d")!;
    atlasContext.fillStyle = "white";
    atlasContext.strokeStyle = "black";

    for (let angleIndex = 0; angleIndex < POINTER_ANGLE_STEPS; angleIndex++) {
        const heading = (angleIndex / POINTER_ANGLE_STEPS) * 2 * Math.PI;

        atlasContext.save();
        atlasContext.translate((angleIndex + 0.5) * POINTER_CELL_SIZE, POINTER_CELL_SIZE / 2);
        atlasContext.rotate(heading - POINTER_TIP_ANGLE);
        atlasContext.translate(-7, -10.5);

        atlasContext.beginPath();
        atlasContext.moveTo(1, 1);
        atlasContext.lineTo(1, 17);
        atlasContext.lineTo(5, 13);
        atlasContext.lineTo(8, 19);
        atlasContext.lineTo(10, 18);
        atlasContext.lineTo(7, 12);
        atlasContext.lineTo(12, 12);
        atlasContext.closePath();

        atlasContext.shadowColor = "rgba(0, 0, 0, 0.35)";
        atlasContext.shadowOffsetX = 1;
        atlasContext.shadowOffsetY = 1;
        atlasContext.fill();
        atlasContext.shadowColor = "transparent";
        atlasContext.stroke();
        atlasContext.restore();
    }

    return atlas;
}

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

    draw(context: CanvasRenderingContext2D, pointerAtlas: HTMLCanvasElement) {
        const heading = Math.atan2(this.velocityY, this.velocityX);
        const angleIndex = (Math.round(heading / (2 * Math.PI) * POINTER_ANGLE_STEPS) + POINTER_ANGLE_STEPS) % POINTER_ANGLE_STEPS;

        context.drawImage(
            pointerAtlas,
            angleIndex * POINTER_CELL_SIZE, 0, POINTER_CELL_SIZE, POINTER_CELL_SIZE,
            Math.round(this.positionX - POINTER_CELL_SIZE / 2), Math.round(this.positionY - POINTER_CELL_SIZE / 2),
            POINTER_CELL_SIZE, POINTER_CELL_SIZE
        );
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
