var canvas = document.getElementById("waves");
var ctx = canvas.getContext("2d");
var canvasWidth = (canvas.width = window.innerWidth);
var canvasHeight = (canvas.height = window.innerHeight-100);

// need to draw all these
var lines = [];

// attributes of the waves

class WavyLine {

    constructor(gap, startY, maxHeight, last) {
        this.maxHeight = maxHeight;
        this.maxWidth = 100;
        this.gap = gap;
        this.startY = startY;
        this.last = last;

        this.peaks = {
            plusH: this.maxHeight,
            minusH: -this.maxHeight,
            plusW: this.maxWidth,
            minusW: -this.maxWidth
        }

        this.drawLine();
    }

    drawLine () {
        // gap must be even number
        // startY specifies the height of which the line starts from

        var period = canvasWidth / this.gap;
        var points = [];
        for(let i = 0; i < this.gap + 2; i++) {
            points.push(period * i)
        }
        // console.log(points);

        ctx.beginPath();
        ctx.moveTo(-points[1], this.startY);
        ctx.strokeStyle = "rgba(0,0,0,0)";
        ctx.lineWidth = 1;
        if (this.last == 'last') {
            ctx.fillStyle = "#EEEEEE";
        } else {
            ctx.fillStyle ="rgba(0,0,0,0.3)"
        }

        // draw 1 period and loops until finish
        for(let j = 0; j < points.length; j+= 4) {
            ctx.quadraticCurveTo(points[j], this.startY + this.peaks.plusH, points[j+1], this.startY);
            ctx.quadraticCurveTo(points[j+2], this.startY + this.peaks.minusH, points[j+3], this.startY);
        }

        ctx.lineTo(canvasWidth, canvasHeight);
        ctx.lineTo(0, canvasHeight);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        // console.log('line drawn')
    }

}

var initLine = (gap, startY, animationTime, maxHeight, last) => {
    var line = new WavyLine(gap, startY, maxHeight, last);
    var tlv = new TimelineMax({ repeat: -1, yoyo: true });
    tlv.add(
        TweenMax.to(line.peaks, animationTime, {
            minusH: line.maxHeight,
            plusH: -line.maxHeight,
            ease: Quad.easeInOut
        }),
        0
    );

    lines.push(line);
}
// initLine = (gap, startY, animationTime, maxHeight, last)
initLine(5, canvasHeight/2 * 1.7, 3, 100);
initLine(6, canvasHeight/2 * 1.5, 5, 100);
initLine(8, canvasHeight/2 * 1.3, 2, 100);
initLine(2, canvasHeight/2 * 1.1, 6, 100);
initLine(4, canvasHeight/2 * 0.9, 7, 100);
initLine(6, canvasHeight/2 * 0.7, 5, 100);
initLine(8, canvasHeight/2 * 0.5, 6, 100);
initLine(6, canvasHeight/2 * 0.3, 8, 100);

initLine(4, canvasHeight/2*1.9, 7, 40, 'last')

function drawAllLines() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let i = 0; i < lines.length; i++) {
        lines[i].drawLine();
    }
}

var render = function() {
    window.requestAnimationFrame(render, canvas);
    drawAllLines();
};
  
window.requestAnimFrame = (function() {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(a) {
            window.setTimeout(a, 1e3 / 60);
        }
    );
})();

render();