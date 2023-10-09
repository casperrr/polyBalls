const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

const synth = new Tone.PolySynth(Tone.Synth).toDestination();

canvas.width = 800;
canvas.height = 400;

// const audio = new Audio('/ding.mp3')

let n = 28;
let r = 5;
let angle = 0;
let baseAngleAmount = 0.01;
let offRange = 1.5; //if set to 2 the smallest ball with bounce twice and the largest ball will bounce once.
let dir = false;
// let angleAmount = 0.01;
// let balls = [
//     [100,0,false],[200,0,false]
// ];
let balls = [];
let notesCMaj = ["C","D","E","F","G","A","B"]
let notesCMaj7 = ["C","E","G","B"]
let notes = notesCMaj7;
let startOct = 5;


function setup(){
    for(let i = 0; i < n; i++){
        let oct = Math.floor(i/notes.length)+2;
        let note = i%notes.length;
        let strNote = `${notes[note]}${oct}`;
        // console.log(strNote);
        balls[i] = [ballRad(i),0,true,strNote];
    }

    Tone.start();

    c.fillStyle = '#181818';
    c.fillRect(0,0,canvas.width,canvas.height);

    newDraw();
}

function newDraw(){
    bg();
    for(let i = 0; i < balls.length; i++){
        increaseAngle(balls[i],i);
        let pos = ballPos(balls[i][0],balls[i][1]);
        drawBall(pos[0],pos[1],i);
    }

    requestAnimationFrame(newDraw);
}

function increaseAngle(ball,i){
    
    // let angleAmount = (Math.PI/speed)/(ball[0]);
    
    let angleAmount = lerp(baseAngleAmount*offRange,baseAngleAmount,(i/n));
    // if(ball[1] < -Math.PI || ball[1] > 0){
    //     ball[2] = !ball[2];
    //     playSynth(ball[3]);
    // }

    if(ball[1] < -Math.PI){
        ball[2] = !ball[2];
        playSynth(ball[3]);
        ball[1] = (-Math.PI - ball[1])+-Math.PI;
    }else if(ball[1] > 0){
        ball[2] = !ball[2];
        playSynth(ball[3]);
        ball[1] = -ball[1];
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
    c.fill();
    c.restore();
}

function bg(){
    c.fillStyle = '#181818';
    // c.fillStyle = '#1818180d';
    c.fillRect(0,0,canvas.width,canvas.height);
}

function playSound(){
    let audio = new Audio("/ding.mp3");

    audio.loop = false;
    audio.play();
}

function playSynth(note){
    // let now = Tone.now();
    // synth.triggerAttack("C4",now);
    // synth.triggerRelease(now +1);
    synth.triggerAttackRelease(note,"8n");
}

function lerp(a,b,t){
    return a + (b-a) * t
}

canvas.addEventListener("click",function(){
    if(Tone.context.state != "running"){
        Tone.start();
    }
    synth.triggerAttackRelease("C3","8n");
});


setup();