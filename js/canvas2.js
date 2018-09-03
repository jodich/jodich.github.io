var c = document.getElementById("waves"),
ctx = c.getContext("2d"),
cw = (c.width = window.innerWidth-15),
ch = (c.height = window.innerHeight),
lines = [];

class WibbleLine {
  constructor(ctx, num_points, width, vPos, anim_duration) {
    this.ctx = ctx;
    this.canvasWidth = width;
    this.vertBasis = vPos;
    this.points = [];
    this.peakMaxH = 40;
    this.peakMaxV = 100;
    this.animDuration = anim_duration;
    this.peaks = {
      va: this.peakMaxV,
      vb: -this.peakMaxV,
      ha: this.peakMaxH,
      hb: -this.peakMaxH
    };

    this.createLine(num_points);
  }

  // Create points to draw between
  createLine(num_points) {
    var gap = this.canvasWidth / num_points;

    for (var i = 0; i < num_points + 4; i++) {
      this.points.push(i * gap);
    }

    // console.log(this.points);
  }

  // Draw line along defined points
  drawLine() {
    this.ctx.beginPath();
    this.ctx.moveTo(-this.points[1], this.vertBasis);
    this.ctx.strokeStyle = "rgba(0,0,0,0)";
    this.ctx.lineWidth = 1;
    this.ctx.fillStyle = "rgba(0,0,0,0.3)";

    // Draw curves
    for (var i = 1; i < this.points.length - 1; i += 4) {
      // Curve up
      this.ctx.quadraticCurveTo(
        this.points[i],
        this.vertBasis + this.peaks.va,
        this.points[i + 1],
        this.vertBasis
      );
      // Curve down
      this.ctx.quadraticCurveTo(
        this.points[i + 2],
        this.vertBasis + this.peaks.vb,
        this.points[i + 3],
        this.vertBasis
      );
    }

    this.ctx.lineTo(this.canvasWidth, ch);
    this.ctx.lineTo(-this.points[1], ch);

    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();

  }
}
addLine(3, ch / 2 * 0.4, 3);
addLine(3, ch / 2 * 0.6, 3);
addLine(3, ch / 2 * 0.8, 3);
addLine(3, ch / 2, 3);
addLine(3, ch / 2 * 1.2, 3);
addLine(3, ch / 2 * 1.4, 3);
addLine(3, ch / 2 * 1.6, 3);
addLine(3, ch / 2 * 1.8, 3);

function addLine(segments, vy, anim) {
  var el1 = new WibbleLine(ctx, segments, cw, vy, anim);

  var tlv = new TimelineMax({ repeat: -1, yoyo: true });
  tlv.add(
    TweenMax.to(el1.peaks, anim, {
      va: -el1.peakMaxV,
      vb: el1.peakMaxV,
      ease: Quad.easeInOut
    }),
    0
  );

  lines.push(el1);
}

function drawAllLines() {
  // console.log("draw All Lines");
  ctx.clearRect(0, 0, cw, ch);
  for (var i = 0; i < lines.length; i++) {
    lines[i].drawLine();
  }
}

var render = function() {
  window.requestAnimationFrame(render, c);
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

/*************************************/

// function addLine(num_points, anim_duration) {
//   var points = [];
//   var gap = cw * 1.2 / num_points;

//   for(var i = 0; i < num_points + 4; i++) {
//     points.push(i * gap);
//   }

//   lines.push(points);
// }

// function drawLines() {
//   // this.ctx.clearRect(0,0, cw, ch);
//   for(var i = 0; i < lines.length; i++) {
//     drawLine(lines[i]);
//   }

//   // console.log(peaks.a);
// }

// function drawLine(points) {

//   ctx.beginPath();
//   ctx.moveTo(points[0], midH);
//   ctx.strokeStyle = '#5284fc';
//   ctx.lineWidth = 1;

//   // Draw curves
//   for(var i = 1; i < points.length-1; i+=4) {
//     ctx.quadraticCurveTo(points[i], midH + peaks.va, points[i+1], midH);
//     ctx.quadraticCurveTo(points[i+2], midH + peaks.vb, points[i+3], midH);
//   }

//   ctx.stroke();
//   ctx.closePath();
// }

// addLine(12, 8);
// drawLines();
