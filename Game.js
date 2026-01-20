import {  CannonControl, GetElevation, GetBarrelLength } from "/Cannon.js";
import { ProjectileControl, FireCannon, GetShellType } from "/Projectiles.js";
import { DrawEnemies } from "./Enemies.js";

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

//Clouds//
const x = Math.random() * document.body.clientWidth;
const y = Math.random() * 300


function Frame(){

    ctx.reset();

    //Grass//
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 400, document.body.clientWidth, 100);

    //Clouds//
    ctx.beginPath();
    ctx.save();
    ctx.translate(x, y)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.arc(0, 0, 10, 0, 2*Math.PI);
    ctx.fill();
    ctx.restore();

    DrawEnemies()
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
    const shell = GetShellType();
    switch(shell){
        case 'Kinetic':
            shellSelection.innerHTML = `Current Shell: ← [Kinetic] / HE / AP / Tracer →`;
            break;
        case 'HE':
            shellSelection.innerHTML = `Current Shell: ← Kinetic / [HE] / AP / Tracer →`;
            break;
        case 'AP':
            shellSelection.innerHTML = `Current Shell: ← Kinetic / HE / [AP] / Tracer →`;
            break;
        case 'Tracer':
            shellSelection.innerHTML = `Current Shell: ← Kinetic / HE / AP / [Tracer] →`;
    }
    

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
