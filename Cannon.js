// The player will control an artillery cannon, where they need to fire at enemies that
// slowly approach the player from the right (tanks, planes, etc)
// Explosion = decreasing alpha and increasing radius
// Player can cycle through different shells to (long range, short range, AP, HE, tracer [shows arc of shell and fades after few seconds])
// Enemies could fire back? (random angle within range [further away, large range])

const canvas = document.getElementById('screen');
let ctx = canvas.getContext('2d');
let elevationAngle = Math.PI / 4;
let up = false;
let down = false;
let activeExplosions = [];  //{x, y, radius, alpha}
let activeProjectiles = []; //{x, y, xspeed, yspeed, termVel}
const gravity = 2
let barrelLength = 60
let secondBarrel = 45
const maxElevation = 1.22;
const minElevation = 0.17
//ADD MASS LATER//

function UpdateElevation(){


    if(up){
        elevationAngle += 0.01;
    }
    if(down){
        elevationAngle -= 0.01;
    }

    if(elevationAngle >= maxElevation){ //~70deg
        elevationAngle = maxElevation;
    }
    if(elevationAngle <= minElevation){ //~10deg
        elevationAngle = minElevation;
    }
}


function DrawCannon(){
    ctx.fillStyle = 'black';
    ctx.fillRect(10, 380, 80, 20);
    ctx.arc(50, 380, 30, 0, Math.PI, true);
    ctx.fill();

    ctx.save();
    ctx.translate(50, 380);
    ctx.rotate(2*Math.PI - elevationAngle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineWidth = 5;
    ctx.lineTo(barrelLength, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineWidth = 10;
    ctx.lineTo(secondBarrel, 0);
    ctx.stroke();
    ctx.restore();
    console.log(elevationAngle, barrelLength);
}

function FireCannon(){

    let x = (50 + Math.cos(elevationAngle) * barrelLength);
    let y = (50 + Math.cos(elevationAngle) * barrelLength);

    // ctx.save();
    // ctx.translate(50, 380);
    // ctx.rotate(2*Math.PI - elevationAngle);
    // ctx.beginPath();
    // ctx.moveTo(0, 0);

    activeProjectiles.push(
        {x, y, }
    )
}








    // ctx.save
    // ctx.beginPath();
    // ctx.moveTo(50, 380);
    // ctx.lineWidth = 5;
    // ctx.lineTo((50 + Math.cos(elevationAngle) * barrelLength), (380 - Math.sin(elevationAngle) * barrelLength)) // (50 + x, 400 + y)
    // ctx.stroke()
    // ctx.beginPath();
    // ctx.moveTo(50, 380);
    // ctx.lineWidth = 10;
    // ctx.lineTo((50 + Math.cos(elevationAngle) * secondBarrel), (380 - Math.sin(elevationAngle) * secondBarrel)) // (50 + x, 400 + y)
    // ctx.stroke();
    // ctx.closePath();
    // // ctx.translate(50, 380)
    // // ctx.rotate((elevationAngle));
    // // ctx.lineTo(50 + barrelLength, 380)
    // // ctx.resetTransform();
    



window.addEventListener('keydown', ev =>{
    switch(ev.key){
        case 'ArrowUp':
            up = true;
            break;
        case 'ArrowDown':
            down = true;
            break;
        case ' ':
            FireCannon();
            break;
    }
})

window.addEventListener('keyup', ev =>{
    switch(ev.key){
        case 'ArrowUp':
            up= false;
            break;
        case 'ArrowDown':
            down = false;
            break;
    }
})

export {UpdateElevation, DrawCannon};