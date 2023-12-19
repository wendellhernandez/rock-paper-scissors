const weaponBox = document.querySelector('.weaponBox');
const enemyBox = document.querySelector('.enemyBox img');
const enemyBoxH3 = document.querySelector('.enemyBox h3');
const round = document.querySelector('.lifeBox h3');
const lives = document.querySelector('.lives');
const story = document.querySelector('.story');
const body = document.querySelector('body');
const reloadButton = document.querySelector('.reloadButton');

let enemyWeapon = '';
let enemyArray = ['Centaur', 'Dwarf', 'Elf', 'Treant', 'Giant', 'Goblin', 'Mermaid', 'Ogre', 'Orc', 'Troll', 'Barbarian', 'Caveman', 'Warrior Princess', 'Dark Lord', 'Dragonslayer', 'Fairy', 'Wizard', 'Witch', 'Dragon', 'Angel', 'Demon', 'Spirit', 'Werewolf', 'Ghost', 'Zombie', 'Vampire'];
let enemyFound = enemyArray[randomNumber(0, enemyArray.length-1)];
let myWeapon = '';
let roundCount = 0;
let myLifeCount = 2;
let enemyLifeCount = randomNumber(2,9);
let xpGain = randomNumber(57, 341);
let xpLost = randomNumber(61, 171);
let xpTotal = localStorage.getItem('xpTotal') || 0;
let xpExcess = 0;
let level = 1;

function randomNumber(start, end){
    return start + Math.round(Math.random()*(end-start));
}

enemyBoxH3.textContent = enemyFound;
round.textContent = `Round: ${roundCount}`;
lives.textContent = `Your HP: ${myLifeCount} | ${enemyFound}'s HP: ${enemyLifeCount}`;

weaponBox.addEventListener('click' , e => {
    if(e.target !== weaponBox){
        reloadButton.style.display = 'none';

        pickMyWeapon(e);
        pickEnemyWeapon(e);
        startFight(e);
    }
})

function pickMyWeapon(e){
        for(let i=0; i<weaponBox.children.length; i++){
            weaponBox.children[i].classList.remove('active');
        }

        e.target.classList.add('active');

        myWeapon = e.target.id;
}

function pickEnemyWeapon(e){
        const rand = randomNumber(1, 3);
        if(rand == 1) enemyWeapon = 'rock';
        else if(rand == 2) enemyWeapon = 'paper';
        else enemyWeapon = 'scissors';

        enemyBox.attributes.src.value = `assets/${enemyWeapon}.png`;
}

function startFight(e){
        roundCount++;
        round.textContent = `Round: ${roundCount}`;

        if(myWeapon == enemyWeapon){
            story.textContent = `Two ${myWeapon} means a draw, so no lives were lost. You are getting ready to fight again`;
        }else if(myWeapon == 'rock'){
            analyzeFight('scissors');
        }else if(myWeapon == 'paper'){
            analyzeFight('rock');
        }else{
            analyzeFight('paper');
        }
}

function analyzeFight(enemWeapon){
    if(enemyWeapon == enemWeapon){
        story.textContent = `Impressive attack! The enemy lost one life, because the great power of your ${myWeapon} crushed his ${enemyWeapon}!`;

        enemyLifeCount--;
        lives.textContent = `Your Lives: ${myLifeCount} | Enemy's Lives: ${enemyLifeCount}`;

        if(enemyLifeCount == 0){
            xpTotal = Number(xpTotal) + xpGain;
            localStorage.setItem('xpTotal' , xpTotal);
            xpExcess = xpTotal%1000;
            level = Math.floor(xpTotal/1000)+1;

            body.innerHTML = setBodyInnerHtml(`You killed the ${enemyFound}`,'Win' , '+'+xpGain);
        }
    }else{
        story.textContent = `Unfortunate defeat.. You lost one life, because your ${myWeapon} lacks the power to defend against the enemy's ${enemyWeapon}!`;

        myLifeCount--;
        lives.textContent = `Your Lives: ${myLifeCount} | Enemy's Lives: ${enemyLifeCount}`;

        if(myLifeCount == 0){
            xpTotal = Number(xpTotal) - xpLost;
            if(xpTotal < 0) xpTotal = 0;
            localStorage.setItem('xpTotal' , xpTotal);
            xpExcess = xpTotal%1000;
            level = Math.floor(xpTotal/1000)+1;

            body.innerHTML = setBodyInnerHtml(`The ${enemyFound} defeated you`,'Lost' , '-'+xpLost);
        }
    }
}

function setBodyInnerHtml(message, result ,xp){
    return `
    <header>
        <div class="container">
            <h1>
                ${message} <br><span id="result${result}">${xp}xp</span>
            </h1>
        </div>
    </header>

    <main>
        <div class="container">
            <div class="result">
                <div class="xpBox">
                    <div class="lvl">lvl. ${level}</div>
                    <div class="xpBar">
                        <div class="xpLength" style="width: ${xpExcess/10}%"></div>
                    </div>
                    <div class="xpTotal">${xpExcess}/1000xp</div>
                </div>
                <button class="reloadButton" onclick="reloadPage();">
                Search for a new enemy
                </button>
            </div>
        </div>
    </main>

    <footer>
        Project by: <a href="https://github.com/wendellhernandez">Wendell Hernandez</a>
        <br>
        Tech Stack: <span>HTML, CSS, Javascript, LESS</span>
        <br><br>
        Copyright &copy; 2023
    </footer>
    
    <script src="app.js"></script>`
}

function reloadPage(){
    location.reload();
}