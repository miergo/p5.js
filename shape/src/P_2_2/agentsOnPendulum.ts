let joints: number = 5;
let lineLength: number = 100;
let speedRelation = 2;
let center: ReturnType<typeof createVector>;
let pendulumPath: any[] = [];
let maxAngle: number = 360;
let speed: number;
let angle: number = 0;
let showPendulum: boolean = true;
let showPendulumPath: boolean = true;

function setup(): void {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100, 100);
    noFill();
    strokeWeight(1);

    center = createVector(width / 2, height / 2);
    startDrawing();
}

const startDrawing = (): void => {

    //new empty array for each joint
    for (let i = 0; i < joints; i++) {
        pendulumPath.push([]);
        console.log(pendulumPath);

    }

    angle = 0;
    speed = (8 / pow(1.75, joints - 1) / pow(2, speedRelation - 1));
}

function draw(): void {
    background(0, 0, 100);

    angle += speed;

    //each frame, create new positions for each joint
    if (angle <= maxAngle + speed) {
        let pos: ReturnType<typeof createVector> = center.copy();

        for (let i = 0; i < joints; i++) {
            let a = angle * pow(speedRelation, i);
            if (i % 2 === 1) a = -a;
            /*@ts-ignore approach - it's cleanest and makes it clear why you're bypassing the type check. 
            The p5.Vector object exists at runtime when p5.js loads, TypeScript just doesn't know about it in global mode.
            */
            //@ts-ignore 
            let nextPos: ReturnType<typeof createVector> = p5.Vector.fromAngle(radians(a));
            nextPos.setMag((joints - i) / joints * lineLength);
            nextPos.add(pos);

            if (showPendulum) {
                noStroke();
                fill(0, 10);
                ellipse(pos.x, pos.y, 4, 4);
                noFill();
                stroke(0, 10);
                line(pos.x, pos.y, nextPos.x, nextPos.y);
            }

            pendulumPath[i].push(nextPos);
            pos = nextPos;
        }
    }

    if (showPendulumPath) {
        strokeWeight(1.6);
        for (let i = 0; i < pendulumPath.length; i++) {
            let path = pendulumPath[i];

            beginShape();
            let hue = map(i, 0, joints, 120, 360);
            stroke(hue, 100, 60, 50);
            for (let j = 0; j < path.length; j++) {
                vertex(path[j].x, path[j].y);
            }
            endShape();
        }
    }
}


function keyPressed(): void {
    if (key === 's' || key === 'S') saveSketchCanvas();
    if (key === 'a' || key === 'A') background(255);

    if (keyCode === DELETE || keyCode === BACKSPACE) {
        startDrawing();
    }

    if (keyCode === UP_ARROW) {
        lineLength += 2;
        startDrawing();
    }

    if (keyCode === DOWN_ARROW) {
        lineLength -= 2;
        startDrawing();
    }

    if (keyCode === LEFT_ARROW) {
        joints--;
        if (joints < 1) joints = 1;
        startDrawing();
    }

    if (keyCode === RIGHT_ARROW) {
        joints++;
        if (joints > 10) joints = 10;
        startDrawing();
    }

    if (key === '+') {
        speedRelation += 0.5;
        if (speedRelation > 5) speedRelation = 5;
        startDrawing();
    }

    if (key === '-') {
        speedRelation -= 0.5;
        if (speedRelation < 2) speedRelation = 2;
        startDrawing();
    }

    if (key === '1') showPendulum = !showPendulum;
    if (key === '2') showPendulumPath = !showPendulumPath;


}