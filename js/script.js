/*----- Wpisanie obiektów HTML do zmiennych-----*/

// Elementy gry/strony
var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

// Przycisk "New game"
var newGameBtn = document.getElementById('js-newGameButton');

// Przyciski kamień, papier, nożyce
var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
		pickScissors = document.getElementById('js-playerPick_scissors');

// Dane graczy oraz zdobyte punkty
var playerNameElem = document.getElementById('js-playerName'),
		playerPointsElem = document.getElementById('js-playerPoints'),
		computerPointsElem = document.getElementById('js-computerPoints');

// Wybrana opcja przez gracza/komputer oraz wynik rundy
var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
		computerResultElem = document.getElementById('js-computerResult');
		remisResultElem = document.getElementById('js-remisResult');


/*----- Nasłuchiwanie kliknięcia w obiekt (akcji gracza) -----*/

// Przycisk nowa gra
newGameBtn.addEventListener('click', newGame);
		
// Wybór gracza między papierem, kamieniem i nożycami
pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });


// Początkowe wartości zmiennych: status gry, gracz, komputer

var gameState = 'notStarted',  //started // ended
    player = {
			name: '',
			score: 0
    },
    computer = {
			score: 0
		};
		

/* ----- Zmiana wyświetlanych elementów strony -----*/

// Wyświetla poszczególne elementy gry/strony zależnie od 'statusu gry' (zaczęta, skończona, nie rozpoczęta)

function setGameElements() {
  switch(gameState) {
    case 'started':
			newGameElem.style.display = 'none';
			pickElem.style.display = 'block';
			resultsElem.style.display = 'block';
      break;
    case 'ended':
			newGameBtn.innerText = 'Jeszcze raz';
    case 'notStarted':
    default:
			newGameElem.style.display = 'block';
			pickElem.style.display = 'none';
			resultsElem.style.display = 'none';
  }
}

setGameElements(); // Funkcja wykonuje się zaraz po wejściu na stronę


/*----- Rozpoczęcie gry (click.newGameBtn) -----*/
		
function newGame() {
	player.name = prompt('Please enter your name', 'imię gracza');

	if (player.name) {
		playerNameElem.innerHTML = player.name;

		player.score = computer.score = 0;
		gameState = 'started';

		setGamePoints();
		setGameElements();
	}
}

// Ustaw/wyświetl punkty. Pełni funkcje wyzerowania punktów przed kolejną rozgrywką.

function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;
}


/*----- Rozgrywka -----*/

// Wyświetl wybory graczy
		
function playerPick(playerPick) {
	var computerPick = getComputerPick(); // Wpisuje do zmiennej wybór komputera
	
	//console.log(playerPick);

	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;
	
	checkRoundWinner(playerPick, computerPick); // Sprawdza kto wygrał rundę
}

// Losowy wybór komputera

function getComputerPick() {
	var possiblePicks = ['rock', 'paper', 'scissors'];
	return possiblePicks[Math.floor(Math.random()*3)];
}

// Sprawdza kto wygrał rundę

function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';
	
	var winnerIs;

	if (playerPick == computerPick) {
		winnerIs = 'noone'; // remis
		
	} else if (
		(computerPick == 'rock' &&  playerPick == 'scissors') ||
		(computerPick == 'scissors' &&  playerPick == 'paper') ||
		(computerPick == 'paper' &&  playerPick == 'rock')) {

		winnerIs = 'computer';

	} else {
		winnerIs = 'player'
	}

	setWinner(winnerIs);
}

// Wyświetla wynik i dodaje punkty

function setWinner(winnerIs) {
	if (winnerIs == 'noone') {
		remisResultElem.innerHTML = "Remis!";

	} else if (winnerIs == 'computer') {
		computerResultElem.innerHTML = "Win!";
		computer.score++;

	}	else {
		playerResultElem.innerHTML = "Win!";
		player.score++;
	}

	consoleLog();
	setGamePoints(); // Aktualizuje liczbę zdobytych punktów
	isGameEnd();
}

// Liczy punkty

function isGameEnd(winnerIs) {
	if (player.score == 10) {
		alert('Winner is ' + player.name + '!');
		gameState = 'ended';
		setGameElements();

	} else if (computer.score == 10) {
		alert('Winner is computer!');
		gameState = 'ended';
		setGameElements();
	}
}


function consoleLog() {
	console.log(player.name + ": " + player.score + " --- Computer: " + computer.score);
}