const canvas = document.getElementById('screen');
let ctx = canvas.getContext('2d');
const gravity = 0.1;
let activeExplosions = [];  //{x, y, radius, alpha}
const explosionSpeed = 2;
const fadeSpeed = 0.05; //use 0.1??
let activeProjectiles = []; //{x, y, xspeed, yspeed, termVel, ground}
let shellType = 'kinetic' //HE, AP, kinetic, tracer
// const shellSpeeds = {kinetic: 10, HE: 15, AP: 50, tracer: 10};
// const tVelocity = {kinetic: 5, HE: 15, AP: 20, tracer: 5};
const shellData = {kinetic: {speed: 10, tVel: 5}, HE: {speed: 7, tVel: 7}, AP: {speed: 20, tVel: 7}, tracer: {speed: 10, tVel: 5}};
//ADD MASS LATER//

function FireCannon(elevationAngle, barrelLength){

    let x = (50 + Math.cos(elevationAngle) * barrelLength); //End of barrel
    let y = (380 - Math.sin(elevationAngle) * barrelLength);

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
        if(projectile.y > 395 && projectile.ground == false){
            projectile.ground = true;
            activeExplosions.push({x: projectile.x, y: projectile.y, radius: 5, alpha: 1, finished: false});
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

function UpdateExplosions(){
    for(const explosion of activeExplosions){
        explosion.alpha -= fadeSpeed;
        explosion.radius += explosionSpeed;

        if(explosion.alpha <= 0){
            explosion.finished = true;
        }
    }
} 

function DrawExplosions(){
    for(const explosion of activeExplosions){
        if(explosion.finished == false){
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 165, 0, ${explosion.alpha})`;
            ctx.arc(explosion.x, explosion.y, explosion.radius, 0, 2*Math.PI);
            ctx.fill();
        }
    }
}

function ProjectileControl(){
    UpdateProjectiles();
    DrawProjectiles();
    UpdateExplosions();
    DrawExplosions();
}

// window.addEventListener('keydown', ev =>{
//     switch(ev.key){
//         case ' ':
//             FireCannon(GetElevation(), GetBarrelLength());
//             break;
//     }
// })

export {ProjectileControl, FireCannon};