export default class Vector {
    constructor(origin, [x, y], scale = 100, lineWidth = 2.2) {
        this.origin = [...origin];
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.lineWidth = lineWidth;
    }

    get head() {
        return [this.origin[0] + this.x * this.scale, this.origin[1] - this.y * this.scale];
    }

    draw(context, color = 'black', label = 'v') {
        const [endX, endY] = this.head;
        const offset = 15

        context.beginPath();
        context.moveTo(this.origin[0], this.origin[1]);
        context.lineTo(endX, endY);
        context.strokeStyle = color;
        context.lineWidth = this.lineWidth;
        context.fillText(`${label} (${this.x.toFixed(2)}, ${this.y.toFixed(2)})`, endX, endY + offset);
        context.stroke();

        this.headX = endX;
        this.headY = endY;
    }

    negate(){
        return new Vector(this.origin, [-this.x, -this.y], this.scale, this.lineWidth);
    }

    add(v){
        return new Vector([this.origin[0], this.origin[1]], [this.x + v.x, this.y + v.y], this.scale, this.lineWidth);
    }

    sub(v){
        return this.add(v.negate());
    }

    normalize(){
        const magnitude = this.magnitude();
        return new Vector(this.origin, [this.x/magnitude, this.y/magnitude], this.scale, this.lineWidth);
    }

    multiply(scalar) {
        return new Vector([this.origin[0], this.origin[1]], [this.x * scalar, this.y * scalar], this.scale, this.lineWidth);
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    projection(v) {
        const dotProduct = this.dot(v);
        const vMagnitudeSquared = v.magnitude() ** 2;
        const scalar = dotProduct / vMagnitudeSquared;
        return v.multiply(scalar);
    }

    reflection(v){
        return this.projection(v).multiply(2).sub(this);
    }

    isPointNearHead(x, y, tolerance = 15) {
        return Math.abs(x - this.headX) < tolerance && Math.abs(y - this.headY) < tolerance;
    }
}