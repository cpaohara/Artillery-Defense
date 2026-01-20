


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
        if(enemy.cannon){
            enemy.x -= cannonSpeed;
        }
        else{
            enemy.x -= basicSpeed;
        }
    }
}

function DrawEnemies(){
    for(const enemy of enemies){
        if(enemy.destroyed == false){
            ctx.beginPath();
            ctx.fillStyle = 'darkgrey';
            ctx.fillRect(enemy.x, enemy.y, 50, 20);
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
    if(enemyDelay <= 0){
        enemyDelay = maxDelay;

        //1 in 8 chance for cannon enemy
        if(Math.floor(Math.random() * 8) == 1){
            enemies.push({x: document.body.clientWidth, y: 380, cannon: true, health: 2, destroyed: false});
        }
        else{
            enemies.push({x: document.body.clientWidth, y: 380, cannon: false, health: 1, destroyed: false});
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