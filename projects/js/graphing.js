const canvas = document.querySelector("#canvas");

const ctx = canvas.getContext('2d');

function drawLine(ctx, begin, end, stroke = 'white', width = 1) {
    if (stroke) {
        ctx.strokeStyle = stroke;
    }

    if (width) {
        ctx.lineWidth = width;
    }

    ctx.beginPath();
    ctx.moveTo(...begin);
    ctx.lineTo(...end);
    ctx.stroke();
}

//Transforms coordinates into increments of 10
function transCoord(value) {
    return (500/2) - 25 * value
}

function clearGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLine(ctx, [0, 500/2], [500, 500/2], 'white', 2);
    drawLine(ctx, [500/2, 0], [500/2, 500], 'white', 2);

    //draws increment coordinate lines
    for (let i = -10; i <= 10; i++) {
        drawLine(ctx, [transCoord(i), 240], [transCoord(i), 260]);
        drawLine(ctx, [240, transCoord(i)], [260, transCoord(i)]);
    }
}

clearGraph();

function graphEquation() {
    let y = document.getElementById("y").value;
    let additiveToY = 0;
    let subtractToY = 0;
    let lineCoord1 = [];
    let lineCoord2 = [];
    if(y.includes("x")) {
        console.log("Graphing a linear line");
        let newY = y.split("x")[0]  //Gets rid of the x in the equation
        if (y.split("x")[1].includes("+")) {
            additiveToY = y.split("+")[1];
        }
        if (y.split("x")[1].includes("-")) {
            subtractToY = y.split("x")[1];
        }
        console.log(additiveToY);
        console.log(subtractToY);
        console.log(newY);
        //Loops through 
        for (let i = -10; i <= 10; i++) {
            if(i == -10) {
                lineCoord1 = [transCoord(-i), transCoord(i * newY + Number(additiveToY) + Number(subtractToY))];
            }
            if (i == 10) {
                lineCoord2 = [transCoord(-i), transCoord(i * newY + Number(additiveToY) + Number(subtractToY))];
                console.log(lineCoord1 + lineCoord2);
                drawLine(ctx, lineCoord1, lineCoord2);
            }
            let y = (i * newY + additiveToY);
            console.log("If x = " + i + " Then y = " + y);
        }
    }
    //If no x is provided, draw on the y-axis
    drawLine(ctx, [0, (500/2) - 25 * y], [500, (500/2) - 25 * y]);
}
