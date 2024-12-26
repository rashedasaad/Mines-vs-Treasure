let playerName = localStorage.getItem('playerName');
let gameLevel = localStorage.getItem('gameLevel');
let attemptsRemaining = gameLevel === 'easy' ? 10 : 20;

let treasurePosition;
let minePositions = [];


document.getElementById('playerNameDisplay').innerText = playerName;
document.getElementById('attemptsRemaining').innerText = attemptsRemaining;

document.getElementById('backHome').addEventListener('click', () => window.location.href = 'index.html');
document.getElementById('quitGame').addEventListener('click', () => window.location.href = 'index.html');


function startGame() {
    minePositions = []; 
    attemptsRemaining = gameLevel === 'easy' ? 10 : 20;
    treasurePosition = Math.floor(Math.random() * 64);

    while (minePositions.length < (gameLevel === 'easy' ? 10 : 20)) {
        let minePos = Math.floor(Math.random() * 64); 
        if (minePos !== treasurePosition && !minePositions.includes(minePos)) {
            minePositions.push(minePos); 
        }
    }
    loadGameBoard(); 
}


function loadGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; 
    for (let row = 0; row < 8; row++) {
        const rowDiv = document.createElement('div'); 
        rowDiv.classList.add('row'); 
        for (let col = 0; col < 8; col++) {
            const index = row * 8 + col; 
            const button = document.createElement('button'); 
            button.id = `button-${index}`; 
            button.innerText = '?';
            button.addEventListener('click', () => handleButtonClick(index)); 
            rowDiv.appendChild(button); 
        }
        gameBoard.appendChild(rowDiv); 
    }
    document.getElementById('attemptsRemaining').innerText = attemptsRemaining;
}


function handleButtonClick(index) {
    if (minePositions.includes(index)) { 
  
        document.getElementById(`button-${index}`).innerText = '💣'; 
        playSound('explosion.mp3'); 
        endGame(false); 
    } else if (index === treasurePosition) {
      
        document.getElementById(`button-${index}`).innerText = '🏆'; 
        playSound('win.mp3'); 
        endGame(true); 
    } else {
        
        document.getElementById(`button-${index}`).innerText = '🚀';
        document.getElementById(`button-${index}`).disabled = true;
        attemptsRemaining--;
        document.getElementById('attemptsRemaining').innerText = attemptsRemaining; 

        if (attemptsRemaining === 0) {
          
            endGame(false); 
        } else {
      
            document.getElementById('message').innerText = 'You are getting closer!';
        }
    }
}

function endGame(isWin) {
    const message = isWin ? getRandomTreasureText() : getRandomMotivationalText(); // اختيار الرسالة المناسبة
    document.getElementById('message').innerText = message; 

    const gameBoardButtons = document.querySelectorAll('#gameBoard button');
    gameBoardButtons.forEach(button => {
        button.disabled = true;
    });
}

function getRandomTreasureText() {
    const treasures = [
        "A smile is a free way to brighten someone’s day.",
        "You are perfect because of your imperfections.",
        "Your story is unique. It can only be forged by you."
    ];
    return treasures[Math.floor(Math.random() * treasures.length)];
}
function getRandomMotivationalText() {
    const motivations = [
        "Complaining will not get anything done."
    ];
    return motivations[Math.floor(Math.random() * motivations.length)];
}
function playSound(soundFile) {
    const audio = new Audio(`sounds/${soundFile}`); 
    audio.play(); 
}


window.onload = startGame;
