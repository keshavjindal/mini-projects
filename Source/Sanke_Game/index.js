let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let H = window.innerHeight;
let W = window.innerWidth ;
H = H / 100 * 90;
W = W / 100 * 90;
let blockSize = 20;
let length = 1;
let unit = blockSize + 2;
let r = Math.floor(H / unit);
let c = Math.floor(W / unit);
H = r * unit;
W = c * unit;
let dir = {x:0, y:0};
let snakeSkin = "white";
let friut, snake, x = 0, invfps = 7;
let scoreBoard = document.getElementById("score");
canvas.height = H;
canvas.width = W;
canvas.style.height = H + "px";
canvas.style.width = W + "px";
let homePage = document.querySelector("#home");

function block(x, y, size, color, ctx) {
	this.size = size;
	this.color = color;
	this.ctx = ctx;
	this.x = x;
	this.y = y;
	this.dx = 0;
	this.dy = 1;
	this.update = function() {
		this.x = (this.x + this.dx + c) % c;
		this.y = (this.y + this.dy + r) % r;
	}
	this.draw = function() {
		ctx.fillStyle = this.color;
		this.ctx.fillRect(this.x * unit, this.y * unit, this.size, this.size);
	}
	this.copy = function() {
		let obj = {};
		for(i in this)
			obj[i] = this[i];
		return obj;
	}
	this.setDir = function(dir) {
		if(this.dx != dir.x && this.dy != dir.y) // So that the snake doesn't move
			this.dx = dir.x, this.dy = dir.y;   // abruptly in opposite direction
	}
}

function randX() {
	return Math.floor(Math.random() * c);
}

function randY() {
	return Math.floor(Math.random() * r);
}

function newFood() {
	return new block(randX(), randY(),blockSize, "red", ctx);
}

function animate() {
	if(x == 0)
	{
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, W, H);
		if(snake[0].x == friut.x && snake[0].y == friut.y) {
			
			friut = newFood();
			length++;
			snake.push(null);
		}
		else friut.draw();
		snake[0].setDir(dir);
		for(let i = length - 1; i > 0; i--) {
			snake[i] = snake[i - 1].copy();
		}
		snake[0].update();
		scoreBoard.innerHTML = length - 1;
		for(let i = snake.length - 1; i > -1; i--) snake[i].draw();
		for(let i = 1; i < length; i++) {
			if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
				GameOver();
				return;
			}
		}
		x = 0;
	}
	else
	{
		for(let i = 1; i < length; i++) {
			if(friut.x === snake[i].x && friut.y === snake[i].y)
				friut = newFood();
		}
	}
	x++;
	requestAnimationFrame(animate);
	x = x % invfps;
}

document.addEventListener("keydown", function(event) {

	if(event.keyCode === 37) {
		dir.x = -1, dir.y = 0; 
	} else if(event.keyCode === 38) {
		dir.x = 0, dir.y = -1; 
	} else if(event.keyCode === 39) {
		dir.x = 1, dir.y = 0; 
	} else if(event.keyCode === 40) {
		dir.x = 0, dir.y = 1; 
	} else if(event.keyCode === 32) {
		invfps = 3;
	}
})
document.addEventListener("keyup", function(e) {
	if(e.keyCode == 32) invfps = 7;
})

function GameOver() {
	//canvas.style.opacity = "0";
}

function newGame() {

	friut = newFood();
	snake = [new block(randX(), randY(), blockSize, snakeSkin, ctx)];
	x = 0, invfps = 7;
	dir = {x:0, y:0};
	length = 1
	animate();
}

document.querySelector("#home button").addEventListener("click", function () {
	homePage.style.display = "none";
	newGame();
})