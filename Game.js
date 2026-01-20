import {  CannonControl, GetElevation, GetBarrelLength } from "/Cannon.js";
import { ProjectileControl, FireCannon, GetShellType } from "/Projectiles.js";
import { EnemyControl, DisplayEnemyHealth } from "./Enemies.js";
import { PlayerHitEnemy } from "./EnemyPlayerHit.js";
import { DrawScene, CreateClouds } from "./Environment.js";

//TO DO:
//player health and hitbox
//enemy health meter (red text underneath enemy)
//cannon enemy
//Point system
//list of controls
//pause -> tab (also show leaderboard)
//json leaderboard
//cluster shell (every 20 points??) -> fire up and detonate in middar with key (c? [for cluster obvs])
//better looking enemies 


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
const playButton = document.getElementById('start');
let gameLoop = false;

//Clouds//
CreateClouds(100)

function Frame(){

    ctx.reset();

    

    
    if(gameLoop){
        EnemyControl();
        CannonControl();
        ProjectileControl();
        PlayerHitEnemy();

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
    }

    //Environment//
    DrawScene();
    DisplayEnemyHealth();
    
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

playButton.addEventListener('click', () => {gameLoop = true});

requestAnimationFrame(Frame);
