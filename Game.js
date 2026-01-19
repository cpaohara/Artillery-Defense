import { UpdateElevation, DrawCannon, CannonControl, GetElevation, GetBarrelLength } from "/Cannon.js";
import { ProjectileControl, FireCannon } from "/Projectiles.js";

//Context and Canvas//
const canvas = document.getElementById('screen');
let ctx = canvas.getContext('2d');
canvas.width = document.body.clientWidth;

//Cannon Variables//
let elevationAngle = Math.PI / 4;

function Frame(){

    ctx.reset();

    //Grass and Cannon base//
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 400, document.body.clientWidth, 100)

    // UpdateElevation();
    // DrawCannon();
    // UpdateProjectiles();
    // DrawProjectiles();
    CannonControl();
    ProjectileControl();
    requestAnimationFrame(Frame);
}

window.addEventListener('keydown', ev =>{
    switch(ev.key){
        case ' ':
            FireCannon(GetElevation(), GetBarrelLength());
            break;
    }
})

requestAnimationFrame(Frame);