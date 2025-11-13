function setup(): void {
    createCanvas(windowWidth, windowHeight);
}


function draw(): void {


    background(255);
    translate(width / 2, height / 2);

    let circleResolution = map(mouseY, 0, height, 2, 80);
    let radius = mouseX - width / 2 + 0.5;
    const angle = TWO_PI / circleResolution;

    strokeWeight(mouseY / 20);

    beginShape();
    for (let i = 0; i <= circleResolution; i++) {
        let x = cos(angle * i) * radius;
        let y = sin(angle * i) * radius;
        line(0, 0, x, y);
    }
    endShape(CLOSE);
}

