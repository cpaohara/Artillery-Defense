
const canvas = document.getElementById('screen');
let ctx = canvas.getContext('2d');
let enemies = []; //{x, y, cannon: bool, strong: bool}
const floor = 400;

function AdvanceEnemies(){

}

function DrawEnemies(){
    ctx.beginPath();
    ctx.fillStyle = 'darkgray'
    ctx.fillRect(200, 380, 50, 20);
}

export {DrawEnemies};