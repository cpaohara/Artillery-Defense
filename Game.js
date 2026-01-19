import { UpdateElevation, DrawCannon, CannonControl, GetElevation, GetBarrelLength } from "/Cannon.js";
import { ProjectileControl, FireCannon, GetShellType } from "/Projectiles.js";

//Context and Canvas//
const canvas = document.getElementById('screen');
let ctx = canvas.getContext('2d');
canvas.width = document.body.clientWidth;

//Variables//
let cannonCooldown = 0;
const cooldownMax = 50;
const cooldownDisplay = document.getElementById('cooldown');
const shellSelection = document.getElementById('shellSelection');
const elevationDisplay = document.getElementById('elevation');

function Frame(){

    ctx.reset();

    //Grass//
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 400, document.body.clientWidth, 100)

    // UpdateElevation();
    // DrawCannon();
    // UpdateProjectiles();
    // DrawProjectiles();
    CannonControl();
    ProjectileControl();

    if(cannonCooldown > 0){
        cannonCooldown -= 1;
        cooldownDisplay.innerHTML = `Reloading... (${cannonCooldown})`
    }
    else{
        cooldownDisplay.innerHTML = 'Reloaded!'
    }

    elevationDisplay.innerHTML = `Current Elevation: ↑${Math.round(GetElevation() * (180/ Math.PI))}°↓`
    shellSelection.innerHTML = `Current Shell: ←(${GetShellType()})→`
    

    requestAnimationFrame(Frame);
}

window.addEventListener('keydown', ev =>{
    switch(ev.key){
        case ' ':
            if(cannonCooldown == 0){
                FireCannon(GetElevation(), GetBarrelLength());
                cannonCooldown = cooldownMax;
            }
            break;
    }
})

requestAnimationFrame(Frame);