const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const aliensImg = ('../imagens/monster-1.png', '../imagens/monster-2.png', '../imagens/monster-3.png');
const instructionText = document.querySelector('.game-instruction');
const startButton = document.querySelector('.start-button');
let alienInterval;

//movimento e tiro da nave
function flyShip(event) {
    if(event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();
    } else if (event.key === 'ArrowDonw') {
        event.preventDefault();
        moveDonw();
    } else if (event.key === " ") {
        event.preventDefault();
        fireLaser();
    }
}

//função de subir
function moveUp() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "0px") {
        return
    } else {
        let position = parseInt(topPosition);
        position -= 50;
        yourShip.style.top = `${position}px`;
    }
}

//função de descer
function moveDonw() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "550px") {
        return
    } else {
        let position = parseInt(topPosition);
        position += 50;
        yourShip.style.top = `${position}px`;
    }
}

//funcionalidade de tiro

function fireLaser() {
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser();
}

function createLaserElement() {
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = 'C:\Users\Operação Segg\Documents\estudos js 2022\JS dio\space shooter\imagens\shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition - 10}px`;
    return newLaser;
}

function moveLaser() { //comparando se o alien foi atingindo
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');
        
        aliens.forEach(alien) => {
            if(chekLaserCollision(laser, alien)) {
                alien.src = '../imagens.exploson.png';
                alien.classList.remove(alien)
                alien.classList.add('dead-alien');
            }
        }

        if(xPosition === 340) {
            laser.remove();
        } else {
            laser.style.left = `${xPosition + 8}px`
        }
    }, 10);
}

//função para criar inimigos aleatorios
function createAliens() {
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]; //sorteio de imagens
    newAlien.scr = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-transmition');
    newAlien.style.left = '370px';
    newAlien.style.top = `${Math.floor(Math.random() * 330) +30}px`;
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}

// funcção para movimentar os aliens
function moveAlien(alien) {
    let moveAlienInterval = setInterval(() =>
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        if(xPosition <= 50) {
        if(Array.from(alien.classList).includes('dead-alien')) {
            alien.remove();
        } else {
            gameOver();
        } else {
            alien.style.left = `${position - 4}px`;
        }
    }, 30);
}

// função para colisão
function chekLaserCollision(laser, alien) {
    let laserTop = parseInt(laser.style.top)
    let laserLeft = parseInt(laser.style.left);
    let laserBotton = laserTop - 20;
    let alienTop = parseInt(alien.style.top)
    let alienLeft = parseInt(alien.style.left);
    let alienBotton = alienTop - 30;
    if(laserLeft != 340 && laserLeft + 40 >= alienLeft) {
        if(laserTop <= alienTop && laserTop >= alienBotton) {
            return true;
        } else {
        
    }
}

//Inicio de jogo

startButton.addEventListener('click', (Event) => {
    playGame();
})

function playGame() {
    startButton.style.display = 'none';
    instructionText.style.display = 'none';
    window.addEventListener('keydown', flyShip)
    alienInterval = setInterval(() => {
        createAliens();
    }, 2000);
}

//função de game over
function gameOver() {
    window.removeEventListener('keydown', flyShip);
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => alien.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());
    setTimeout(() => {
        alert('Game Over');
        yourShip.style.top = "250px";
        startButton.style.display = "block";
    })
 }










