/// <reference path="../utils/sketchHelper.ts" />

let strokeColor: ReturnType<typeof color>

function setup(): void {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100, 100);
    noFill();
    background(255);
    strokeWeight(2);
    strokeColor = color(81, 84, 84, 10);
}


function draw(): void {

    if (mouseIsPressed && mouseButton === LEFT) {
        push();
        translate(width / 2, height / 2); // Center the shape

        let circleResolution: number = int(map(mouseY + 100, 0, height, 2, 10));
        let radius: number = mouseX - width / 2;
        const angle: number = TAU / circleResolution;

        stroke(strokeColor);

        beginShape();
        for (let i = 0; i <= circleResolution; i++) {

            let x: number = cos(angle * i) * radius;
            let y: number = sin(angle * i) * radius;
            vertex(x, y);
        }
        endShape();
        pop();
    }
}

function keyPressed(): void {

    if (keyCode === BACKSPACE || keyCode === DELETE) background(255);
    if ((key as string) === 's' || (key as string) === 'S') saveSketchCanvas();

    if (key === '2') strokeColor = color(81, 84, 84, 10);
    if (key === '3') strokeColor = color(226, 84, 96, 10);
    if (key === '4') strokeColor = color(346, 84, 96, 10);


}