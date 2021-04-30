function generateRandomRgb() {
	return "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256)
	 + ", " + Math.floor(Math.random() * 256) + ")";
}

let gameOver = false, easy = false;
let squares = document.querySelectorAll(".squares"), answer;
let helpText = document.getElementById("helpText");
let color = [..."colors"];
let  btn = document.getElementsByTagName("button");
let headerh1 = document.querySelector("header div h1 + h1");
let header = document.querySelector("header div");
let headerColor = "steelblue";

helpText.textContent = "";

function fillRandColors() {
	for(let i = 0; i < (easy?3:6); ++i)
	color[i] = generateRandomRgb();
	btn[0].textContent = "New Colors"; 
}

function fillSquares() {
	for(let i = 0; i < (easy?3:6); ++i) {
		squares[i].style.backgroundColor = color[i];
	}
	answer = Math.floor(Math.random() * (easy?3:6));
    headerh1.innerHTML = color[answer];
}	

function correctAnswer(i) {
	helpText.textContent = "Correct!";
	header.style.backgroundColor = color[i];
	for(let j = 0; j < (easy?3:6); ++j) {
		squares[j].style.backgroundColor = color[i];
    }
    btn[0].textContent = "Play Again ?"; 
    gameOver = true;
}

for(let i = 0; i < squares.length; ++i) {
	squares[i].addEventListener("click",function(){
		if(gameOver == true) return;
		if(i !== answer) {
			squares[i].style.backgroundColor = "#232323";
			helpText.textContent = "Try Again :(";
		}
		else {
			correctAnswer(i);
		}
	});
}

btn[0].addEventListener('click',function() {
	gameOver = false;
	fillRandColors()
	fillSquares();
	helpText.textContent = "";
	header.style.backgroundColor = headerColor;
});

btn[1].addEventListener('click',function() {
	for(let i = 3; i < 6; i++) squares[i].style.display = "none";
	gameOver = false;
    easy = true;
    this.classList.add("selected");
    btn[2].classList.remove("selected");
	fillRandColors()
	fillSquares();
	helpText.textContent = "";
	header.style.backgroundColor = headerColor;
});

btn[2].addEventListener('click',function() {
	for(let i = 3; i < 6; i++) squares[i].style.display = "block";
	gameOver = false;
	easy = false;
	this.classList.add("selected");
	btn[1].classList.remove("selected");
	fillRandColors()
	fillSquares();
	helpText.textContent = "";
	header.style.backgroundColor = headerColor;
});

btn[2].classList.add("selected")

fillRandColors();
fillSquares();