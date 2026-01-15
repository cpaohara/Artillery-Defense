import { UpdateElevation, DrawCannon } from "/Cannon.js";

//Context and Canvas//
const canvas = document.getElementById('screen');
let ctx = canvas.getContext('2d');
canvas.width = document.body.clientWidth;

//Cannon Variables//


function Frame(){

    ctx.reset();

    //Grass and Cannon base//
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 400, document.body.clientWidth, 100)

    UpdateElevation();
    DrawCannon();

    requestAnimationFrame(Frame);
}

requestAnimationFrame(Frame);