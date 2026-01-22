import { CannonControl, GetElevation, GetBarrelLength, DisplayPlayerHealth } from "/Cannon.js";
import { ProjectileControl, FireCannon, GetShellType } from "/Projectiles.js";
import { EnemyControl, DisplayEnemyHealth } from "./Enemies.js";
import { PlayerHitEnemy, EnemyHitPlayer } from "./EnemyPlayerHit.js";
import { DrawScene, CreateClouds } from "./Environment.js";

//TO DO:
//different enemy speeds = basic have from 0.8 to 1.2px //
//filter lists of destroyed enemies/ projectiles //?
//player health and hitbox //
//enemy health meter (red text underneath enemy) //
//cannon enemy
//better basic enemies -> thin trapezium on top (dark grey??), also means all vehicles have same size hitbox (50 across, 30 tall) //
//change shell names //
//Point system -> display top left
//list of controls
//pause -> p (also show leaderboard)
//json leaderboard
//cluster shell (every 20 points??) -> fire up and detonate in middar with key (c? [for cluster obvs])
//better looking enemies //
//let player press multiple
//separate reload speeds
//special types for shells

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
let lose = false;
const cloudCover = Math.floor(Math.random() * (250 - 50 + 1) + 50)

//Clouds//
CreateClouds(cloudCover) //cloudy sky: 400 regular sky: 100

function Frame(){
    
    ctx.reset();

    // ctx.beginPath();
    // ctx.save();
    // ctx.translate(325, 390);
    // ctx.moveTo(0, 0);
    // ctx.strokeStyle = 'rgb(50, 50, 50)';
    // ctx.lineWidth = 5;
    // ctx.lineTo(-35, -10);
    // ctx.stroke();
    // ctx.restore();

    // ctx.beginPath();
    // ctx.fillStyle = 'darkgrey';
    // ctx.save();
    // ctx.translate(300, 390)
    // ctx.moveTo(0, 0);
    // ctx.fillRect(0, 0, 50, 10);
    // ctx.arc(25, 0, 20, 0, Math.PI, true);
    // ctx.fill();
    // ctx.restore();
    


    if(gameLoop && !lose){
        EnemyControl();
        CannonControl();
        ProjectileControl();
        PlayerHitEnemy();
        lose = EnemyHitPlayer();

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
                shellSelection.innerHTML = 'Current Shell: ← Short / [Medium] / Tracer / Long →';
                break;
            case 'HE':
                shellSelection.innerHTML = 'Current Shell: ← [Short] / Medium / Tracer / Long →';
                break;
            case 'AP':
                shellSelection.innerHTML = 'Current Shell: ← Short / Medium / Tracer / [Long] →';
                break;
            case 'Tracer':
                shellSelection.innerHTML = 'Current Shell: ← Short / Medium / [Tracer] / Long →';
        }
    }

    //Environment//
    DrawScene();
    if(gameLoop && !lose){
        DisplayEnemyHealth();
        DisplayPlayerHealth();
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

playButton.addEventListener('click', () => {gameLoop = true});

requestAnimationFrame(Frame);
