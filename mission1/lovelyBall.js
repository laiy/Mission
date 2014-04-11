function Ball() {
  this.mleft = 0;
  this.mtop = 0;
  this.vdx = vx;
  this.vdy = vy;
}

function Location() {
  this.l = 0;
  this.t = 0;
}

function circlePoint() {
  this.x = 0;
  this.y = 0;
}

function detector() {
  this.onCollide = false;
}

var collisionLoss = 0.5;
var wrapper = document.getElementById('wrapper');
var count = 0;
var sx, sy, i, j, k;
var maxWidth = wrapper.clientWidth - 250;
var maxHeight = wrapper.clientHeight;
var balls = [];
var x1, x2, y1, y2;
var v1x, v2x, v1y, v2y;
var ballObjects = [];
var animate = true;
var airResistanceL = 0;
var airResistanceT = 0;
var dataRecived = false;
var vx = parseInt(document.getElementById("vx-data").value);
var vy = parseInt(document.getElementById("vy-data").value);
var gravity = parseInt(document.getElementById("gravity-data").value);
var collisionDetector = new Array();

function move() {
  wrapper = document.getElementById('wrapper');
  maxWidth = wrapper.clientWidth - 250;
  maxHeight = wrapper.clientHeight;
  collision();
  for (i = 0; i < count; i++) {
    sx = ballObjects[i].vdx * 0.3;
    sy = ballObjects[i].vdy * 0.3;
    ballObjects[i].mleft += sx;
    ballObjects[i].mtop -= sy;
    balls[i].style.marginTop = parseInt(ballObjects[i].mtop) + "px";
    balls[i].style.marginLeft = parseInt(ballObjects[i].mleft) + "px";
    ballObjects[i].vdy -= gravity * 0.1;
    ballObjects[i].vdx += airResistanceL * 0.3;
    ballObjects[i].vdy += airResistanceT * 0.3;
  }
  if (animate) {
    setTimeout(move, 15);
  }
}

function start() {
  if (!animate) {
    animate = true;
    move();
  } else {
    animate = true;
  }
}

function stop() {
  animate = false;
}

function shuffle() {
  document.location.reload();
}

function collision() {
  for (i = 0; i < count; i++) {

    if (ballObjects[i].mleft <= 0) {
      ballObjects[i].vdx = Math.abs(ballObjects[i].vdx);
      ballObjects[i].vdx -= collisionLoss;
    }
    if (ballObjects[i].mtop <= 0) {
      ballObjects[i].vdy = -Math.abs(ballObjects[i].vdy);
      ballObjects[i].vdy += collisionLoss;
    }
    if (maxHeight - ballObjects[i].mtop - 50 <= 0) {
      ballObjects[i].vdy = Math.abs(ballObjects[i].vdy);
      ballObjects[i].vdy -= collisionLoss;
    }
    if (maxWidth - ballObjects[i].mleft - 50 <= 0) {
      ballObjects[i].vdx = -Math.abs(ballObjects[i].vdx);
      ballObjects[i].vdx += collisionLoss;
    }
  }
  //球-边框碰撞

  if (count > 1) {
    for (k = 0; k < count; k++) {
      circlePoint[k] = new circlePoint();
      circlePoint[k].x = ballObjects[k].mleft + 25;
      circlePoint[k].y = ballObjects[k].mtop + 25;
    }

    for (k = 0; k < count; k++) {
      for (j = k + 1; j < count; j++) {
        if ((circlePoint[j].x - circlePoint[k].x) * (circlePoint[j].x - circlePoint[k].x) + (circlePoint[j].y - circlePoint[k].y) * (circlePoint[j].y - circlePoint[k].y) <= 4900 && !collisionDetector[k][j].onCollide) {
          x1 = circlePoint[k].x;
          y1 = circlePoint[k].y;
          x2 = circlePoint[j].x;
          y2 = circlePoint[j].y;
          v1x = ballObjects[k].vdx;
          v1y = ballObjects[k].vdy;
          v2x = ballObjects[j].vdx;
          v2y = ballObjects[j].vdy;
          detax = x2 - x1;
          detay = y2 - y1;
          denominator = Math.pow(detax, 2) + Math.pow(detay, 2);
          ballObjects[k].vdx = (v1x * Math.pow(detay, 2) + v2x * Math.pow(detax, 2) + (v2y - v1y) * detax * detay) / denominator;
          ballObjects[k].vdy = (v1y * Math.pow(detax, 2) + v2y * Math.pow(detay, 2) + (v2x - v1x) * detax * detay) / denominator;
          ballObjects[j].vdx = (v1x * Math.pow(detax, 2) + v2x * Math.pow(detay, 2) - (v2y - v1y) * detax * detay) / denominator;
          ballObjects[j].vdy = (v1y * Math.pow(detay, 2) + v2y * Math.pow(detax, 2) - (v2x - v1x) * detax * detay) / denominator;
          if (ballObjects[k].vdx >= 0) {
            ballObjects[k].vdx -= collisionLoss;
          } else {
            ballObjects[k].vdx += collisionLoss;
          }
          if (ballObjects[k].vdy >= 0) {
            ballObjects[k].vdy -= collisionLoss;
          } else {
            ballObjects[k].vdy += collisionLoss;
          }
          if (ballObjects[j].vdx >= 0) {
            ballObjects[j].vdx -= collisionLoss;
          } else {
            ballObjects[j].vdx += collisionLoss;
          }
          if (ballObjects[j].vdy >= 0) {
            ballObjects[j].vdy -= collisionLoss;
          } else {
            ballObjects[j].vdy += collisionLoss;
          }
          collisionDetector[k][j].onCollide = true;
          collisionDetector[j][k].onCollide = true;
        }
        if ((circlePoint[j].x - circlePoint[k].x) * (circlePoint[j].x - circlePoint[k].x) + (circlePoint[j].y - circlePoint[k].y) * (circlePoint[j].y - circlePoint[k].y) > 4900) {
          collisionDetector[k][j].onCollide = false;
          collisionDetector[j][k].onCollide = false;
        }
      }
    }
  }
  //球-球碰撞

}

function addBall() {
  if (count >= 10) {
    alert("Too many balls!");
    return;
  }
  collisionDetector[count] = new Array();
  for (o = 0; o <= count; o++) {
    collisionDetector[count][o] = new Array();
    collisionDetector[count][o] = new detector();
    collisionDetector[o][count] = new Array();
    collisionDetector[o][count] = new detector();
  }
  console.log(collisionDetector)
  ballObjects[count] = new Ball();
  if (dataRecived) {
    ballObjects[count].vdx = vx;
    ballObjects[count].vdy = vy;
    ballObjects[count].a = gravity;
    dataRecived = false;
  }
  var location = [];
  for (var o = 0; o < count; o++) {
    location[o] = new Location();
    location[o].l = balls[o].style.marginLeft;
    location[o].t = balls[o].style.marginTop;
  }
  var numberAllRight = false;
  while (!numberAllRight) {
    var randomNumberl = parseInt(Math.random() * (maxWidth - 50 - 1 + 1) + 1);
    var randomNumbert = parseInt(Math.random() * (maxHeight - 50  - 1 + 1) + 1);
    var numberNotOk = false;
    for (o = 0; o < count; o++) {
      if (randomNumberl >= location[o].l && randomNumberl <= location[o].l + 50) {
        numberNotOk = true;
        break;
      }
      if (randomNumbert >= location[o].t && randomNumbert <= location[o].t + 50) {
        numberNotOk = true;
        break;
      }
    }
    if (numberNotOk) {
      break;
    } else {
      numberAllRight = true;
    }
  }
  var newNode = document.createElement("div");
  var div = wrapper.appendChild(newNode);
  div.className = 'ball';
  div.setAttribute("name", "ball");
  div.style.marginTop = randomNumbert + "px";
  div.style.marginLeft = randomNumberl + "px";
  ballObjects[count].mleft = randomNumberl;
  ballObjects[count].mtop = randomNumbert;
  count++;
  balls = document.getElementsByName('ball');
}

function deleteBall() {
  wrapper.removeChild(balls[count - 1]);
  count--;
  balls = document.getElementsByName('ball');
}

function changeData() {
  vx = document.getElementById("vx-data").value;
  vy = document.getElementById("vy-data").value;
  gravity = document.getElementById("gravity-data").value;
  collisionLoss = document.getElementById("speed-loss").value;
  airResistanceL = document.getElementById("airResistance-msg-l").value;
  airResistanceT = document.getElementById("airResistance-msg-t").value;
  if (gravity < 0 || collisionLoss < 0 || isNaN(vx) || isNaN(vy) || isNaN(gravity) || isNaN(collisionLoss) || isNaN(airResistanceT) || isNaN(airResistanceL)) {
    alert('Illegal data form!');
    shuffle();
  } else {
    dataRecived = true;
    vx = parseInt(vx);
    vy = parseInt(vy);
    gravity = parseInt(gravity);
    collisionLoss = parseInt(collisionLoss);
    airResistanceL = parseInt(airResistanceL);
    airResistanceT = parseInt(airResistanceT);
  }
}

document.getElementById("new").addEventListener('click', addBall);
document.getElementById("start").addEventListener('click', start);
document.getElementById("stop").addEventListener('click', stop);
document.getElementById("shuffle").addEventListener('click', shuffle);
document.getElementById("delete").addEventListener('click', deleteBall);
document.getElementById("change-data").addEventListener('click', changeData);

window.onload = function() {
  move();
};
