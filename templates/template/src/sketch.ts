//Here is an example of a p5.js sketch in TypeScript using global functions

let shapes: Shape[] = [];
const density = 2.5;
let shapeHeight = 64;
let shapeColor: ReturnType<typeof color>;

let newShape: Shape | undefined = undefined;

function setup(): void {
    createCanvas(windowWidth, windowHeight);
    noFill();
    shapeColor = color(0)
}

function draw(): void {
    background(255);

    shapes.forEach(function (shape) {
        shape.draw();
    });

    if (newShape) {
        newShape.x2 = mouseX;
        newShape.y2 = mouseY;
        newShape.h = shapeHeight;
        newShape.c = shapeColor;
        newShape.draw();
    }
}

class Shape {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    h: number;
    c: ReturnType<typeof color>;

    constructor(x1: number, y1: number, x2: number, y2: number, h: number, c: ReturnType<typeof color>) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.h = h;
        this.c = c;
    }
    draw = (): void => {
        const w = dist(this.x1, this.y1, this.x2, this.y2);
        const a = atan2(this.y2 - this.y1, this.x2 - this.x1);
        stroke(this.c);
        push();
        translate(this.x1, this.y1);
        rotate(a);
        translate(0, -this.h / 2);
        for (let i = 0; i < this.h; i += density) {
            line(0, i, w, i);
        }
        pop();
    }

}


function mousePressed(): void {
    newShape = new Shape(pmouseX, pmouseY, mouseX, mouseY, shapeHeight, shapeColor);
}

function mouseReleased(): void {
    if (newShape) {
        shapes.push(newShape);
        newShape = undefined;
    }
}

function keyPressed() {
    if (key === 's' || key === 'S') saveCanvas(new Date().getTime().toString(), 'png');

    if (key === '1') shapeColor = color(255, 0, 0);
    if (key === '2') shapeColor = color(0, 255, 0);
    if (key === '3') shapeColor = color(0, 0, 255);
    if (key === '4') shapeColor = color(0);

    if (keyCode === UP_ARROW) shapeHeight += density;
    if (keyCode === DOWN_ARROW) shapeHeight -= density;
}
