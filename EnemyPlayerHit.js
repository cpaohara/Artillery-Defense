
import { GetEnemies } from "./Enemies.js";
import { GetPlayerProjectiles } from "./Projectiles.js";


const canvas = document.getElementById('screen');
let ctx = canvas.getContext('2d');
const playerPosition = {x: 10, y: 380, width: 80, height: 20};
let playerHealth = 3;

function PlayerHitEnemy(){
    const enemies = GetEnemies();
    const playerProjectiles = GetPlayerProjectiles();
    let xCheck = false;
    let yCheck = false;

    for(const proj of playerProjectiles){
        for(const enemy of enemies){
            if(proj.x >= enemy.x && proj.x <= enemy.x + 50 && proj.shell != 'tracer' && enemy.destroyed == false){  //checks x bounds and shell type
                xCheck = true;
            }
            if(proj.y <= 400 && proj.y >= 380){  //checks y bounds
                yCheck = true;
            }
            if(xCheck && yCheck){
                enemy.health -= 1;
                proj.ground = true;
            }
            if(enemy.health == 0){
                enemy.destroyed = true;
            }
            xCheck = false;
            yCheck = false;
        }
    }

    return enemies;
}

function EnemyHitPlayer(){
    const enemies = GetEnemies();
    
    for(const enemy of enemies){
        if(enemy.x < 90 && enemy.destroyed == false){   //90 is where edge of player base is
            playerHealth -= 1;
            enemy.destroyed = true;
        }
    }

    if(playerHealth == 0){
        return true;
    }
    else{
        return false;
    }

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

export {PlayerHitEnemy, EnemyHitPlayer}