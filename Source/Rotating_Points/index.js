let canvas = document.querySelector("canvas");
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let num_of_particles = 15;
let radius = 3;
increasePixelDensity(1);

class particle {

	constructor(x, y, r, dx, dy)
	{
		this.x = x;
		this.y = y;
		this.r = r;
		this.dx = dx;
		this.dy = dy;
		this.color = "cyan";
		this.mass = 1;
	}

	draw() 
	{
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, 0);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}

	update()
	{
		//this.x += this.dx;
		//this.y += this.dy;
		this.draw();
	}
}

let arr = [], a = [], c = [], sp = [], dist = 0;
a[0] = 0;
sp[0] = 0.01;
let exit = false;
let cx = canvas.width / 2;
let cy = canvas.height / 2;
dist = Math.min(cx,cy) / num_of_particles;
for(let i = 0; i < num_of_particles; i++)
{
	arr[i] = new particle(0,0,radius,0,0);
	if(i > 0) a[i] = a[i-1] + dist;
	if(i > 0) sp[i] = sp[i-1] + 0.002;
	c[i] = 0;
}

function increasePixelDensity(factor)
{
	canvas.style.width = canvas.width + "px";
	canvas.style.height = canvas.height + "px";
	canvas.width = canvas.width * factor;
	canvas.height = canvas.height * factor;
	ctx.lineWidth = ctx.lineWidth * factor;
	radius = radius * factor; 
}

let animate = () => {

	if(exit) return;
	ctx.fillStyle = "rgba(0,0,0,0.05)"
	ctx.fillRect(0, 0,canvas.width, canvas.height);
	ctx.beginPath();
	ctx.strokeStyle = "white";
	for(let i = 0; i < num_of_particles; i++)
	{	
		arr[i].x = a[i] * Math.sin(c[i]) + cx;
		arr[i].y = a[i] * Math.cos(c[i]) + cy;
		if(i > 0)
		{
			ctx.moveTo(arr[i-1].x,arr[i-1].y);
			ctx.lineTo(arr[i].x,arr[i].y);
			ctx.stroke();
		}
		arr[i].update();
		c[i] += sp[i];
	}
	ctx.closePath();
	requestAnimationFrame(animate);
}
window.addEventListener("click", function() {
	exit = !exit;
	if(exit == false) animate();
});
animate();