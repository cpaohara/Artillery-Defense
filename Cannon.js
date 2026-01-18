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

const canvas = document.getElementById('screen');
let ctx = canvas.getContext('2d');
let elevationAngle = Math.PI / 4;
let up = false;
let down = false;
let activeExplosions = [];  //{x, y, radius, alpha}
let activeProjectiles = []; //{x, y, xspeed, yspeed, termVel, ground}
const gravity = 0.1;
let barrelLength = 60
let secondBarrel = 45
const maxElevation = 1.22;
const minElevation = 0.17
let shellType = 'kinetic' //HE, AP, kinetic, tracer
// const shellSpeeds = {kinetic: 10, HE: 15, AP: 50, tracer: 10};
// const tVelocity = {kinetic: 5, HE: 15, AP: 20, tracer: 5};
const shellData = {kinetic: {speed: 10, tVel: 5}, HE: {speed: 7, tVel: 7}, AP: {speed: 20, tVel: 7}, tracer: {speed: 10, tVel: 5}};
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
}

function FireCannon(){

    let x = (50 + Math.cos(elevationAngle) * barrelLength);
    let y = (380 - Math.sin(elevationAngle) * barrelLength);

    // ctx.beginPath();     Check proj starts at end of barrel
    // ctx.arc(x, y, 5, 0, 2*Math.PI);
    // ctx.stroke();

    // switch(shellType){
    //     case 'kinetic': //speed = 20 termVel = 10
    //         activeProjectiles.push(
    //         {x, y, xSpeed: shellSpeeds.kinetic * Math.cos(elevationAngle), ySpeed: shellSpeeds.kinetic * Math.sin(elevationAngle), termVel: tVelocity.kinetic, ground: false}
    //         )
    //         break;
    //     case 'HE': //speed = 15 termVel = 25
    //         activeProjectiles.push(
    //         {x, y, xSpeed: shellSpeeds.HE * Math.cos(elevationAngle), ySpeed: shellSpeeds.HE * Math.sin(elevationAngle), termVel: tVelocity.HE, ground: false}
    //         )
    //         break;
    //     case 'AP': //speed = 50 termVel = 20
    //         activeProjectiles.push(
    //         {x, y, xSpeed: shellSpeeds.AP * Math.cos(elevationAngle), ySpeed: shellSpeeds.AP * Math.sin(elevationAngle), termVel: tVelocity.AP, ground: false}
    //         )
    //         break;
    //     case 'tracer': //speed = 20 termVel = 10
    //         activeProjectiles.push(
    //         {x, y, xSpeed: shellSpeeds.tracer * Math.cos(elevationAngle), ySpeed: shellSpeeds.tracer * Math.sin(elevationAngle), termVel: tVelocity.tracer, ground: false}
    //         )
    //         break;
    // }

    let xSpeed;
    let ySpeed;
    let termVel

    switch(shellType){
        case 'kinetic':
            xSpeed = shellData.kinetic.speed * Math.cos(elevationAngle);
            ySpeed = shellData.kinetic.speed * Math.sin(elevationAngle);
            termVel = shellData.kinetic.tVel;
            break;
        case 'HE':
            xSpeed = shellData.HE.speed * Math.cos(elevationAngle);
            ySpeed = shellData.HE.speed * Math.sin(elevationAngle);
            termVel = shellData.HE.tVel;
            break;
        case 'AP':
            xSpeed = shellData.AP.speed * Math.cos(elevationAngle);
            ySpeed = shellData.AP.speed * Math.sin(elevationAngle);
            termVel = shellData.AP.tVel;
            break;
        case 'tracer':
            xSpeed = shellData.tracer.speed * Math.cos(elevationAngle);
            ySpeed = shellData.tracer.speed * Math.sin(elevationAngle);
            termVel = shellData.tracer.tVel;
            break;
    }

    activeProjectiles.push(
        {x, y, xSpeed, ySpeed, termVel, ground: false}
    )
}

// add flag on activeprojectiles that turns true whem hit ground
// dont display proj when true
// to stop super long list, reset list when all items in the list have hit the ground
// 

function UpdateProjectiles(){
    for(const projectile of activeProjectiles){

        if(projectile.y > 400){
            projectile.ground = true;
        }

        projectile.x += projectile.xSpeed;
        projectile.y -= projectile.ySpeed;
        projectile.ySpeed -= gravity; //Slow vertical speed thru gravity
    }
}

function DrawProjectiles(){
    for(const projectile of activeProjectiles){
        if(projectile.ground == false){
            ctx.beginPath();
            ctx.fillStyle = 'gray';
            ctx.arc(projectile.x, projectile.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            }
        }
}

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

export {UpdateElevation, DrawCannon, FireCannon, UpdateProjectiles, DrawProjectiles};


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
