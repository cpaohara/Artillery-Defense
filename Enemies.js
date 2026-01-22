


const canvas = document.getElementById('screen');
let ctx = canvas.getContext('2d');
let enemies = []; //{x, y, cannon: bool, strong: bool}
const floor = 400;
let enemyDelay = 0;
const maxDelay = 400;
const groundLevel = 380; //constant for all enemies (all have 20px tall rect) & 50px long
const basicSpeed = 1;
const cannonSpeed = 0.5;

function AdvanceEnemies(){
    for(const enemy of enemies){
        enemy.x -= enemy.speed;
    }
}

function DrawEnemies(){
    for(const enemy of enemies){
        if(enemy.destroyed == false && enemy.cannon == false){
            ctx.beginPath();
            ctx.fillStyle = 'rgb(150, 150, 150)';
            ctx.fillRect(enemy.x, enemy.y+15, 50, 15);
            ctx.save();
            ctx.translate(enemy.x, enemy.y + 15);
            ctx.moveTo(5, 0);
            ctx.lineTo(10, -15);
            ctx.lineTo(40, -15);
            ctx.lineTo(45, 0);
            ctx.fillStyle = 'darkgrey';
            ctx.fill();
            ctx.restore();
        }
        else if(enemy.destroyed == false && enemy.cannon == true){
            ctx.beginPath();
            ctx.save();
            ctx.translate(enemy.x + 25, enemy.y + 20);
            ctx.moveTo(0, 0);
            ctx.strokeStyle = 'rgb(50, 50, 50)';
            ctx.lineWidth = 5;
            ctx.lineTo(-35, -10);
            ctx.stroke();
            ctx.restore();

            ctx.beginPath();
            ctx.fillStyle = 'darkgrey';
            ctx.save();
            ctx.translate(enemy.x, enemy.y + 20)
            ctx.moveTo(0, 0);
            ctx.fillRect(0, 0, 50, 10);
            ctx.arc(25, 0, 20, 0, Math.PI, true);
            ctx.fill();
            ctx.restore();
        }
    }

}

function DisplayEnemyHealth(){
    for(const enemy of enemies){
        if(enemy.destroyed == false){
            ctx.beginPath();
            ctx.font = 'bold 20px serif';
            ctx.fillStyle = 'white';
            ctx.fillText(`${enemy.health}`, enemy.x + 21, enemy.y + 40);
        }
    }
}

function SpawnEnemy(){
    let speed;

    if(enemyDelay <= 0){
        enemyDelay = maxDelay;

        //1 in 4 chance for cannon enemy
        if(Math.floor(Math.random() * 4) == 1){
            speed = Math.random() * (0.7 - 0.3 + 1) + 0.3; //Random speed between 0.3 & 0.7 px (cannon)
            enemies.push({x: document.body.clientWidth, y: 370, cannon: true, health: 2, destroyed: false, speed});
        }
        else{
            speed = Math.random() * (1.2 - 0.8 + 1) + 0.8; //Random speed between 1.2 & 0.8 px (basic)
            enemies.push({x: document.body.clientWidth, y: 370, cannon: false, health: 1, destroyed: false, speed});
        }

        //1 in 15 chance for strong enemy (add 2 to health)
        if(Math.floor(Math.random() * 15) == 1){
            enemies[enemies.length-1].health += 2;
        }
    }
    else{
        enemyDelay -= 1 //Decreases timer to next enemy spawn
    }
}

function GetEnemies(){
    return enemies;
}

function GetEnemyProjectiles(){

}

function EnemyControl(){
    SpawnEnemy();
    AdvanceEnemies();
    DrawEnemies();
}

export {EnemyControl, GetEnemies, GetEnemyProjectiles, DisplayEnemyHealth};