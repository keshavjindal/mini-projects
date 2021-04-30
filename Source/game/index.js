let c = $("canvas");
let ctx = c[0].getContext("2d");
c[0].width = window.innerWidth;
c[0].height = window.innerHeight;
let dd = $("div:nth-of-type(1)");
let d2 = $("div:nth-of-type(2)");
let d3 = $("div:nth-of-type(3)");
let z = 1;
let opsrc = $("#opsrc")[0];
let mode = $("input[type=radio]");
let newGame = $("#ng");
let label = $("label");
let mode_val = 2;

let y1 = 0, y2 = 0;
window.addEventListener("mousemove",(e) => {
	y1 = e.y;
	y2 = y1;
});

let fps = 0;
let lx = window.innerWidth / 2, ly = window.innerHeight / 2, r = 35, l = 300, b = 20;
l = ly / 2;
r = l / 6;

let dx;
let dy;
let score = 0;
let obstacles = [];
let init = () => {
	for(let i = 0; i < Math.min(5 ,window.innerWidth * 40 / 100 / (2 * r + 2 * b)); i++)
	{
		obstacles[i] = [Math.random() * (window.innerWidth / 100 * 40) + window.innerWidth / 100 * 30,(Math.random() * window.innerHeight),
			l / 2 * (Math.random() + 0.4),b / 1.5 * (Math.random() + 0.25)];
		for(let j = 0; j < i; j++)
		{
			if(Math.abs(obstacles[i][0] - obstacles[j][0]) <= 2 * r + b / 2)
			{
				i--;
				break;
			}
		}
	}
	dx = (Math.random() - 0.5) * 20;
    dy = (Math.random() * 12 + 3) * (Math.random() - 0.5 > 0 ? -1:1);
}

let animate2 = () => {
	ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
	ctx.fillRect(0,0,c[0].width,c[0].height);
	lx += dx;
	ly += dy;
	if(mode_val == 2) y1 = ly;
	else if(mode_val == 3) y1 = y2 = ly;
	if((ly + r >= window.innerHeight && dy > 0) || (ly <= r && dy < 0)) dy = -dy;
	if((b + r >= lx && dx < 0) && Math.abs(ly - y1) <= l / 2) dx = -dx;
	if((lx + r + b >= window.innerWidth && dx > 0) &&  Math.abs(ly - y2) <= l / 2) dx = -dx;
	ctx.fillStyle = "white";
	for(let i = 0; i < obstacles.length; i++)
	{
		ctx.fillRect(obstacles[i][0],obstacles[i][1],obstacles[i][3],obstacles[i][2]);
	    if(((Math.abs(lx - obstacles[i][0]) <= r && lx < obstacles[i][0] && dx > 0) || (Math.abs(lx - obstacles[i][0] - obstacles[i][3]) <= r  && lx > obstacles[i][0] && dx < 0))  && Math.abs(ly - obstacles[i][1])  <= obstacles[i][2] + r && ly + r >= obstacles[i][1]) dx = -dx;
	}
	lx = Math.floor(lx);
	ly = Math.floor(ly);
	ctx.beginPath();
	ctx.arc(lx,ly,r,Math.PI * 2,0);
	ctx.fillRect(0,y1 - l / 2,b,l);
	ctx.fillRect(window.innerWidth - b,y2 - l / 2,b,l);
	if(score > 100)
	score += score * 0.002;
	else score += 0.2;
	dd.text("Score : " + Math.floor(score));
	ctx.closePath();
	ctx.fill();
	fps++;
	if(Math.abs(dx) < 50)
	dx += 0.01 * (dx < 0?-1:1);
	if(lx < 0 || lx > window.innerWidth) {d2.text("Game Over"), d2.css("color","red"); return;}
	requestAnimationFrame(animate2);
}

function NewGame()
{
	setInterval(() => {
	d3.text("FPS : " + fps * 10);
	fps = 0;
	}, 100);
	init();
	d2.text("Play!"), d2.css("color","white");
	opsrc.style.height = "0";	
	if(mode[0].checked == 1) mode_val = 1;
	else if(mode[1].checked == 1) mode_val = 2;
	else if(mode[2].checked == 1) mode_val = 3;
	animate2();
}
let sl = 1;
for(let i = 0; i < 3; i++)
{
	mode[i].addEventListener("click",() => {
		if(i == sl) return;
		label[i].classList.add("selected");
		label[sl].classList.remove("selected");
		sl = i;
	});
}
$("#ng")[0].addEventListener("click",NewGame);
