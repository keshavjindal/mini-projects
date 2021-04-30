let canvas = document.querySelector("canvas");
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {x:0, y:0};
window.addEventListener("mousemove", function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
});

ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
ctx.strokeStyle = "cyan";
ctx.lineWidth = 15;
ctx.lineCap= "round";
let x = 0, y = 0;
function animate()
{	
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.beginPath();
	ctx.moveTo(x, y);
	x += (mouse.x - x) * 0.05;
	y += (mouse.y - y) * 0.05;
	ctx.lineTo(x, y);
	ctx.closePath();
	ctx.stroke();
	requestAnimationFrame(animate);
}

animate();