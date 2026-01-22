
import { GetEnemies } from "./Enemies.js";
import { GetPlayerProjectiles } from "./Projectiles.js";


const canvas = document.getElementById('screen');
let ctx = canvas.getContext('2d');
const playerPosition = {x: 10, y: 380, width: 80, height: 20};
let playerHealth = 3;
let score = 0;

function PlayerHitEnemy(){
    let enemies = GetEnemies();
    const playerProjectiles = GetPlayerProjectiles();
    let xCheck = false;
    let yCheck = false;

    for(const proj of playerProjectiles){
        for(const enemy of enemies){
            if(proj.x >= enemy.x && proj.x <= enemy.x + 50 && proj.shell != 'tracer' && enemy.destroyed == false){  //checks x bounds and shell type 50px width
                xCheck = true;
            }
            if(proj.y <= 400 && proj.y >= enemy.y){  //checks y bounds 30px height
                yCheck = true;
            }
            if(xCheck && yCheck){
                enemy.health -= 1;
                proj.ground = true;

                if(enemy.health == 0){
                    score += (enemy.cannon) ? 2 : 1;
                    enemy.destroyed = true;
                }
            }
            xCheck = false;
            yCheck = false;
        }

        enemies = enemies.filter(enemy => enemy.destroyed);
    }

    return enemies;
}

function EnemyHitPlayer(){
    let enemies = GetEnemies();
    
    for(const enemy of enemies){
        if(enemy.x < 90 && enemy.destroyed == false){   //90 is where edge of player base is
            playerHealth -= 1;
            enemy.destroyed = true;
        }
    }

    enemies = enemies.filter(enemy => !enemy.destroyed);

    if(playerHealth == 0){
        return true;
    }
    else{
        return false;
    }


}

function DisplayScore(){
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.font = 'bold 25px serif'
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function CheckLose(){
    if(playerHealth == 0){
        return true;
    }
    else{
        return false
    }
}

function CheckHits(){

}

function GetPlayerHealth(){
    return playerHealth;
}

export {PlayerHitEnemy, EnemyHitPlayer, GetPlayerHealth, DisplayScore}