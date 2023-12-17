const weaponBox = document.querySelector('.weaponBox');
const enemyBox = document.querySelector('.enemyBox img');
const round = document.querySelector('.lifeBox h3');
const lives = document.querySelector('.lives');
const story = document.querySelector('.story');
const main = document.querySelector('main');

let enemyWeapon = '';
let myWeapon = '';
let roundCount = 0;
let myLifeCount = 5;
let enemyLifeCount = 5;

round.textContent = `Round: ${roundCount}`;
lives.textContent = `Your Lives: ${myLifeCount} | Enemy's Lives: ${enemyLifeCount}`;

weaponBox.addEventListener('click' , e => {
    pickMyWeapon(e);
    pickEnemyWeapon(e);
    startFight(e);
})

function pickMyWeapon(e){
    if(e.target !== weaponBox){
        for(let i=0; i<weaponBox.children.length; i++){
            weaponBox.children[i].classList.remove('active');
        }

        e.target.classList.add('active');

        myWeapon = e.target.id;
    }
}

function pickEnemyWeapon(e){
    if(e.target !== weaponBox){
        const rand = Math.ceil(Math.random()*3);
        if(rand == 1) enemyWeapon = 'rock';
        else if(rand == 2) enemyWeapon = 'paper';
        else enemyWeapon = 'scissors';

        enemyBox.attributes.src.value = `assets/${enemyWeapon}.png`;
    }
}

function startFight(e){
    if(e.target !== weaponBox){
        roundCount++;
        round.textContent = `Round: ${roundCount}`;

        if(myWeapon == enemyWeapon){
            story.textContent = `Two ${myWeapon} means a draw, so no lives were lost. Your will to fight gets stronger`;
        }else if(myWeapon == 'rock'){
            analyzeFight('scissors');
        }else if(myWeapon == 'paper'){
            analyzeFight('rock');
        }else{
            analyzeFight('paper');
        }
    }
}

function analyzeFight(enemWeapon){
    if(enemyWeapon == enemWeapon){
        story.textContent = `Impressive attack! The enemy lost one life, because the great power of your ${myWeapon} crushed his ${enemyWeapon}!`;

        enemyLifeCount--;
        lives.textContent = `Your Lives: ${myLifeCount} | Enemy's Lives: ${enemyLifeCount}`;

        if(enemyLifeCount == 0){
            main.innerHTML = `
                <div class="resultsWin">
                    You killed an ogre <br>+25xp            
                </div>`;
        }
    }else{
        story.textContent = `Unfortunate defeat.. You lost one life, because your ${myWeapon} lacks the power to defend against the enemy's ${enemyWeapon}!`;

        myLifeCount--;
        lives.textContent = `Your Lives: ${myLifeCount} | Enemy's Lives: ${enemyLifeCount}`;

        if(myLifeCount == 0){
            main.innerHTML = `
                <div class="results">
                    You are dead            
                </div>`;
        }
    }
}

function changeScreen(){
    
}