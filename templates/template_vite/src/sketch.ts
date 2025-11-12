//Here is an example of a p5.js sketch in TypeScript using the p5 object

import p5 from 'p5';

const UP_ARROW: number = 38;
const DOWN_ARROW: number = 40;

const sketch = (p: p5): void => {
  let shapes: Shape[] = [];
  const density = 2.5;
  let shapeHeight = 64;
  let shapeColor: ReturnType<typeof p.color>;

  let newShape: Shape | undefined = undefined;

  p.setup = function (): void {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noFill();
    shapeColor = p.color(0);
  };

  p.draw = function (): void {
    p.background(255);

    shapes.forEach(function (shape) {
      shape.draw();
    });

    if (newShape) {
      newShape.x2 = p.mouseX;
      newShape.y2 = p.mouseY;
      newShape.h = shapeHeight;
      newShape.c = shapeColor;
      newShape.draw();
    }
  };

  class Shape {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    h: number;
    c: ReturnType<typeof p.color>;

    constructor(x1: number, y1: number, x2: number, y2: number, h: number, c: ReturnType<typeof p.color>) {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      this.h = h;
      this.c = c;
    }
    draw = (): void => {
      const w = p.dist(this.x1, this.y1, this.x2, this.y2);
      const a = p.atan2(this.y2 - this.y1, this.x2 - this.x1);
      p.stroke(this.c);
      p.push();
      p.translate(this.x1, this.y1);
      p.rotate(a);
      p.translate(0, -this.h / 2);
      for (let i = 0; i < this.h; i += density) {
        p.line(0, i, w, i);
      }
      p.pop();
    };
  }

  p.mousePressed = function (): void {
    newShape = new Shape(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY, shapeHeight, shapeColor);
  };

  p.mouseReleased = function (): void {
    if (newShape) {
      shapes.push(newShape);
      newShape = undefined;
    }
  };

  p.keyPressed = function () {
    if ((p.key as string) === 's' || (p.key as string) === 'S') p.saveCanvas(new Date().getTime().toString(), 'png');

    if ((p.key as string) === '1') shapeColor = p.color(255, 0, 0);
    if ((p.key as string) === '2') shapeColor = p.color(0, 255, 0);
    if ((p.key as string) === '3') shapeColor = p.color(0, 0, 255);
    if ((p.key as string) === '4') shapeColor = p.color(0);

    if ((p.keyCode as number) === UP_ARROW) shapeHeight += density;
    if ((p.keyCode as number) === DOWN_ARROW) shapeHeight -= density;
  };
};

const myp5 = new p5(sketch);
