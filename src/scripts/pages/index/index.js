const scoreWins = document.getElementById('wins');
const scoreDraws = document.getElementById('draws');
const scoreDefeats = document.getElementById('defeats');
const output = document.getElementById('output');
const cpuChoiceIMG = document.getElementById('cpuChoiceImg');
const playerChoiceIMG = document.getElementById('playerChoiceImg');

const score = {
    wins: 0,
    draws: 0,
    defeats: 0,
};

const translation = {
    rock: 'pedra',
    paper: 'papel',
    scissors: 'tesoura',
};

let tempo = 3; 
let playerChoice = 'rock';

let isPlaying = false

document.querySelectorAll('.action').forEach(button => {
    button.addEventListener('click', (e)=>{
        if (!isPlaying) {
           // reset game interface
            const selectedElements = document.querySelector('.selected');
            if (selectedElements) selectedElements.classList.remove('selected');
            e.currentTarget.classList.add('selected');
            document.body.classList.remove('victory', 'draw', 'defeat');
            cpuChoiceIMG.setAttribute('src', 'src/assets/images/cpu/rock.webp');
            playerChoiceIMG.setAttribute('src', 'src/assets/images/player/rock.webp');

            // set a player choice
            playerChoice = e.currentTarget.id;

            // play the new round
            playRound(); 
        }
        
    });
});

function startTimer() {
    const timer = setInterval(() => {
        // update the countdown display
        document.getElementById('timer').textContent = tempo;
        tempo--;
        
        if (tempo < 0) {
            // RESTART TIMER
            clearInterval(timer);
            tempo = 3;
            
            // stop ANIMATIONS
            toggleAnimation('stop');
            
            // generate CPU choice and check the result
            const options = ['rock', 'paper', 'scissors'];
            const cpuChoice = options[Math.floor(Math.random() * 3)];
            updateScore(getResult(playerChoice, cpuChoice), playerChoice, cpuChoice);

            // SET CHOICEs IMAGEs
            cpuChoiceIMG.setAttribute('src', `src/assets/images/cpu/${cpuChoice}.webp`);
            playerChoiceIMG.setAttribute('src', `src/assets/images/player/${playerChoice}.webp`);
        }
    }, 1000);
}

function toggleAnimation(state) {
    switch (state) {
        case 'play':
            playerChoiceIMG.classList.add('raffling');
            cpuChoiceIMG.classList.add('raffling'); 
            break;
        case 'stop':
            cpuChoiceIMG.classList.remove('raffling');
            playerChoiceIMG.classList.remove('raffling');
            break;
    }
}

function getResult(playerChoice, cpuChoice){
    const rules = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper',
    }

    if (playerChoice === cpuChoice) return 'draw';
    return (rules[playerChoice] === cpuChoice)  ? 'win' : 'defeat';
}

function updateScore(state, playerChoice, cpuChoice){
    // update the scoreboard 
    switch (state) {
        case 'win':
            output.innerHTML = `${capitalize(translation[playerChoice])} ganha de ${translation[cpuChoice]}. Vitória!`; 
            score.wins++;
            scoreWins.innerHTML = score.wins;
            document.body.classList.remove('victory', 'draw', 'defeat');
            document.body.classList.add('victory');
            break;
        case 'draw':
            output.innerHTML = `Ambos escolheram ${translation[cpuChoice]}. Empate!`; 
            score.draws++;
            scoreDraws.innerHTML = score.draws;
            document.body.classList.remove('victory', 'draw', 'defeat');
            document.body.classList.add('draw');
            break;
        case 'defeat':
            output.innerHTML = `${capitalize(translation[playerChoice])} perde para ${translation[cpuChoice]}. Derrota!`; 
            score.defeats++;
            scoreDefeats.innerHTML = score.defeats;
            document.body.classList.remove('victory', 'draw', 'defeat');
            document.body.classList.add('defeat');
            break;
    }
    isPlaying = false;
}

// function to start a round
function playRound(){
    isPlaying = true;
    startTimer();
    toggleAnimation('play');
}

// function to set a first letter of a string to upper case
function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}
