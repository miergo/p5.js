let c: ReturnType<typeof color>;
let lineModuleSize: number = 0;
let angle: number = 0;
let angleSpeed: number = 1;
let lineModule: Array<ReturnType<typeof loadImage>> = [];
let lineModuleIndex: number = 0;

let clickPosY: number = 0;
let clickPosX: number = 0;

function preload(): void {
    lineModule[1] = loadImage('src/P_2_3/data/01.svg');

}

function setup(): void {
    createCanvas(windowWidth, windowHeight);
    background(255);
    cursor(CROSS);
    strokeWeight(0.75);

    c = color(183, 148, 0)
}

function draw(): void {
    if (mouseIsPressed && mouseButton === LEFT) {
        let x: number = mouseX;
        let y: number = mouseY;

        if (keyIsPressed && keyCode === SHIFT) {
            if (abs(clickPosX - x) > abs(clickPosY - y)) {
                y = clickPosY;
            } else {
                x = clickPosX;
            }
        }

        push();
        translate(x, y);
        rotate(radians(angle));
        if (lineModuleIndex != 0) {
            tint(c);
            image(lineModule[lineModuleIndex], 0, 0, lineModuleSize, lineModuleSize);
        } else {
            stroke(c);
            line(0, 0, lineModuleSize, lineModuleSize);
        }
        angle += angleSpeed;
        pop();
    }

}

function mousePressed(): void {
    // create a new random color and line length
    lineModuleSize = random(50, 160);

    //remember the click position
    clickPosX = mouseX;
    clickPosY = mouseY;
}

function keyPressed(): void {
    if (keyCode === UP_ARROW) lineModuleSize += 5;
    if (keyCode === DOWN_ARROW) lineModuleSize -= 5;
    if (keyCode === LEFT_ARROW) angleSpeed -= 0.5;
    if (keyCode === RIGHT_ARROW) angleSpeed += 0.5;
}

function keyReleased(): void {
    if ((key as string) === 's' || (key as string) === 'S') saveSketchCanvas();
    if (keyCode === DELETE || keyCode === BACKSPACE) background(255);

    // reverse direction and mirror angle
    if ((key as string) === 'r' || (key as string) === 'R') {
        angle += 180;
        angleSpeed *= -1;
    }

    // change color
    // change color
    if (key as string == ' ') c = color(random(255), random(255), random(255), random(80, 100));
    // default colors from 1 to 4
    if (key as string == '1') c = color(181, 157, 0);
    if (key as string == '2') c = color(0, 130, 164);
    if (key as string == '3') c = color(87, 35, 129);
    if (key as string == '4') c = color(197, 0, 123);

    // load svg for line module
    if (key as string == '5') lineModuleIndex = 1;

}
