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

    update(){
        this.x += this.vx;
        this.y += this.vy;
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
}