const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

// const audio = new Audio('/ding.mp3')

let n = 30;
let r = 5;
let angle = 0;
let speed = 5;
let dir = false;
let angleAmount = 0.05;
// let balls = [
//     [100,0,false],[200,0,false]
// ];
let balls = [];


function setup(){
    for(let i = 0; i < n; i++){
        balls[i] = [ballRad(i),0,false];
    }

    c.fillStyle = '#181818';
    c.fillRect(0,0,canvas.width,canvas.height);

    newDraw();
}

function draw(){
    bg();
    // drawBall(400,400);
    for(let i = 0; i < n; i++){
        let r = ballRad(i);
        let pos = ballPos(r);
        drawBall(pos[0], pos[1]);
        angle -= angleAmount/r;
        console.log(r)    

    }

    // if(angle < -Math.PI){
    //     dir = false;
    // }else if(angle > 0){
    //     dir = true;
    // }

    // if(dir){
    //     angle -= angleAmount;
    // }else{
    //     angle += angleAmount;
    // }

    requestAnimationFrame(draw);
}

function newDraw(){
    bg();
    for(let i = 0; i < balls.length; i++){
        increaseAngle(balls[i]);
        let pos = ballPos(balls[i][0],balls[i][1]);
        drawBall(pos[0],pos[1],i);
    }

    requestAnimationFrame(newDraw);
}

function increaseAngle(ball){
    let angleAmount = (Math.PI/speed)/ball[0];
    if(ball[1] < -Math.PI || ball[1] > 0){
        ball[2] = !ball[2];
        playSound();
    }

    if(ball[2]){
        ball[1] -= angleAmount;
    }else{
        ball[1] += angleAmount;
    }
    // ball[1] -= angleAmount;
}

function ballPos(r,ang){
    let x = Math.cos(ang) * r;
    let y = Math.sin(ang) * r;
    return [x,y];
}

function ballRad(i){
    let width = canvas.width/2;
    let xPos = (width/(n+8))*(i+8);
    return xPos;
}


function drawBall(x,y,i){
    c.fillStyle = '#181818';
    // c.strokeStyle = '#ffffff';
    let deg = 360/n * i;
    c.strokeStyle = 'hsla('+deg+',99%,43%,100%)';
    c.lineWidth = 2;
    c.save();
    c.translate(canvas.width/2, canvas.height - 20);
    c.beginPath();
    c.ellipse(x,y,r,r,0,0,2*Math.PI);
    c.stroke();
    c.restore();
}

function bg(){
    c.fillStyle = '#1818180d';
    c.fillRect(0,0,canvas.width,canvas.height);
}

function playSound(){
    let audio = new Audio("/ding.mp3");

    audio.loop = false;
    audio.play();
}


setup();