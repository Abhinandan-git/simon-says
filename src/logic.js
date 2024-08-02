let max_score = parseInt(localStorage.getItem("max_score")) || 0;
let pass = 0;
let score = 0;
let round = 1;
let simon_array = [];
let user_array = [];

const updateScoreDisplay = () => {
	document.getElementById("score").textContent = score;
	document.getElementById("game-over-score").textContent = score;
	document.getElementById("max-score").textContent = max_score;
};

const round_start = () => {
	setTimeout(() => {
		simon_array.push(Math.floor(Math.random() * 4));
		flash_sequence(simon_array);
	}, 750);
};

const handleClick = (pad) => {
	user_array.push(pad);

	if (user_array[pass] === simon_array[pass]) {
		pass++;
	} else {
		game_over();
	}

	if (user_array.length === simon_array.length) {
		user_array = [];
		pass = 0;
		score++;
		updateScoreDisplay();
		round_start();
	}
};

const game_over = () => {
	// round = 1;
	max_score = Math.max(max_score, score);
	localStorage.setItem("max_score", max_score);
	document.getElementById("game-over").classList.remove("hidden");
	
	updateScoreDisplay();
};

const flash_sequence = (sequence) => {
	sequence.forEach((pad, index) => {
		setTimeout(() => {
			const padElement = document.getElementById(pad);
			padElement.classList.add("active");
			setTimeout(() => {
				padElement.classList.remove("active");
			}, 250);
		}, 750 * index);
	});
};

const gameStart = () => {
	score = 0;
	round = 1;
	user_array = [];
	simon_array = [];
	updateScoreDisplay();
	round_start();
	document.getElementById("game-over-score").textContent = score;
	document.getElementById("game-over").classList.add("hidden");
	document.getElementById("start-button").classList.add("hidden");
};

updateScoreDisplay();