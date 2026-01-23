// The player will control an artillery cannon, where they need to fire at enemies that
// slowly approach the player from the right (tanks, planes, etc)
// Explosion = decreasing alpha and increasing radius
// Player can cycle through different shells to (long range, short range, AP, HE, tracer [shows arc of shell and fades after few seconds])
// Enemies could fire back? (random angle within range [further away, large range])

// Shell types:
// kinetic - regular shell
// HE (high explosive) - larger explosion radius -> splash damage but slower and heavier
// AP (armour piercing) - goes though multiple units. faster and heavier so difficult to arc
// tracer - no damage but plots journey of shell. aid with aiming. has same speed and weight as kinetic shell

import {GetPlayerHealth} from './EnemyPlayerHit.js';

const canvas = document.getElementById('screen');
let ctx = canvas.getContext('2d');
let elevationAngle = Math.PI / 4;
let up = false;
let down = false;
let barrelLength = 60
let secondBarrel = 45
const maxElevation = 1.22;
const minElevation = 0.17

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
    ctx.save();
    ctx.strokeStyle = 'rgb(100, 100, 100)'  //barrels
    ctx.translate(50, 380);
    ctx.rotate(2*Math.PI - elevationAngle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineWidth = 5;
    ctx.lineTo(barrelLength, 0);
    ctx.stroke();
    ctx.strokeStyle = 'rgb(60, 60, 60)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineWidth = 10;
    ctx.lineTo(secondBarrel, 0);
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    ctx.fillStyle = 'black';    //10 -> 80 x    350 -> 400 y
    ctx.fillRect(10, 380, 80, 20);  //base
    ctx.arc(50, 380, 30, 0, Math.PI, true); //turret arc
    ctx.fill();
}


function GetElevation(){
    return elevationAngle;
}

function GetBarrelLength(){
    return barrelLength;
}

function CannonControl(){
    UpdateElevation();
    DrawCannon();
}

function DisplayPlayerHealth(){
    ctx.beginPath();
    ctx.font = 'bold 20px serif';
    ctx.fillStyle = 'white';
    ctx.fillText(GetPlayerHealth(), 50, 420);
}

window.addEventListener('keydown', ev =>{
    switch(ev.key){
        case 'ArrowUp':
        case 'w':
            up = true;
            break;
        case 'ArrowDown':
        case 's':
            down = true;
            break;
    }
})

window.addEventListener('keyup', ev =>{
    switch(ev.key){
        case 'ArrowUp':
        case 'w':
            up= false;
            break;
        case 'ArrowDown':
        case 's':
            down = false;
            break;
    }
})

export {UpdateElevation, DrawCannon,  CannonControl, GetElevation, GetBarrelLength, DisplayPlayerHealth};


// ctx.save
// ctx.beginPath();
// ctx.moveTo(50, 380);
// ctx.lineWidth = 5;
// ctx.lineTo((50 + Math.Math.cos(elevationAngle) * barrelLength), (380 - Math.sin(elevationAngle) * barrelLength)) // (50 + x, 400 + y)
// ctx.stroke()
// ctx.beginPath();
// ctx.moveTo(50, 380);
// ctx.lineWidth = 10;
// ctx.lineTo((50 + Math.Math.cos(elevationAngle) * secondBarrel), (380 - Math.sin(elevationAngle) * secondBarrel)) // (50 + x, 400 + y)
// ctx.stroke();
// ctx.closePath();
// // ctx.translate(50, 380)
// // ctx.rotate((elevationAngle));
// // ctx.lineTo(50 + barrelLength, 380)
// // ctx.resetTransform();
