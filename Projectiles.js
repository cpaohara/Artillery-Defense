const canvas = document.getElementById('screen');
let ctx = canvas.getContext('2d');
const gravity = 0.1;
let activeExplosions = [];  //{x, y, radius(5), alpha}
let tracerPlots = [];   //{x, y, radius(2), timer(500), alpha, alphaDecrease(0.05)}
const tracerMax = 20;
const explosionSpeed = 2;
const fadeSpeed = 0.05; //use 0.1??
let activeProjectiles = []; //{x, y, xspeed, yspeed, termVel, ground, delay(tracer only)}   radius assigned in ctx.arc -> radius = 5
let shellTypes = ['Kinetic', 'HE', 'AP', 'Tracer']; //HE, AP, kinetic, tracer
let currentshell = 3;
const shellData = {kinetic: {speed: 10, tVel: 5}, HE: {speed: 7, tVel: 7}, AP: {speed: 20, tVel: 7}, tracer: {speed: 10, tVel: 5}};
//ADD MASS LATER//

function FireCannon(elevationAngle, barrelLength){

    let x = (50 + Math.cos(elevationAngle) * barrelLength); //End of barrel
    let y = (380 - Math.sin(elevationAngle) * barrelLength);

    let xSpeed;
    let ySpeed;
    let termVel;
    let shell;

    switch(shellTypes[currentshell]){
        case 'Kinetic':
            xSpeed = shellData.kinetic.speed * Math.cos(elevationAngle);
            ySpeed = shellData.kinetic.speed * Math.sin(elevationAngle);
            termVel = shellData.kinetic.tVel;
            shell = 'kinetic';
            break;
        case 'HE':
            xSpeed = shellData.HE.speed * Math.cos(elevationAngle);
            ySpeed = shellData.HE.speed * Math.sin(elevationAngle);
            termVel = shellData.HE.tVel;
            shell = 'HE';
            break;
        case 'AP':
            xSpeed = shellData.AP.speed * Math.cos(elevationAngle);
            ySpeed = shellData.AP.speed * Math.sin(elevationAngle);
            termVel = shellData.AP.tVel;
            shell = 'AP';
            break;
        case 'Tracer':
            xSpeed = shellData.tracer.speed * Math.cos(elevationAngle);
            ySpeed = shellData.tracer.speed * Math.sin(elevationAngle);
            termVel = shellData.tracer.tVel;
            shell = 'tracer';
            break;
    }

    activeProjectiles.push(
        {shell, x, y, xSpeed, ySpeed, termVel, ground: false, delay: 20} //only tracer uses delay
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

        if(projectile.shell == 'tracer' && projectile.delay <= 0 && projectile.ground == false){
            tracerPlots.push({x: projectile.x, y: projectile.y, radius: 2, timer: 500, alpha: 1, alphaDecrease: 0.05, finished: false});
            projectile.delay = tracerMax;
        }
        else{
            projectile.delay -= 1;
        }
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

function UpdateTracers(){
    for(const point of tracerPlots){ //{x, y, radius(2), timer(500), alpha, alphaDecrease(0.05)}
        if(point.alpha <= 0 && point.finished == false){
            point.finished = true;
        }
        if(point.timer > 0){
            point.timer -= 1;
        }
        else{
            point.alpha -= point.alphaDecrease
        }
    }
}

function DrawTracers(){
    for(const point of tracerPlots){
        ctx.fillStyle = `rbga(200, 0, 0, ${point.alpha})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, 2*Math.PI);
    }
}

function GetShellType(){
    return shellTypes[currentshell];
}

function ProjectileControl(){
    UpdateProjectiles();
    DrawProjectiles();
    UpdateExplosions();
    DrawExplosions();
    UpdateTracers();
    DrawTracers();
}

export {ProjectileControl, FireCannon, GetShellType};