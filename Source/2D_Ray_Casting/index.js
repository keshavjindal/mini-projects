let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let w = window.innerWidth;
let h = window.innerHeight;
let x = 0, y = 0, l;
canvas.width = w;
canvas.height = h;
l = Math.ceil(Math.sqrt(w * w + h * h));
window.addEventListener("mousemove",(e) => {
	x = e.x;
	y = e.y;
});

class line 
{
	constructor(x1, y1, x2, y2)
	{
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}
	draw()
	{
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(this.x1, this.y1);
		ctx.lineTo(this.x2, this.y2);
		ctx.closePath();
		ctx.stroke();
	}
}

class ray
{
	constructor(x, y, angle)
	{
		this.x = x;
		this.y = y;
		this.angle = angle;
	}
	update(x, y)
	{
		this.x = x;
		this.y = y;
	}
	check(lines)
	{
		let dist = Infinity;
		let pt;
		for(let i = 0 ; i < lines.length; i++)
		{
			let x1 = lines[i].x1;
			let y1 = lines[i].y1;
			let x2 = lines[i].x2;
			let y2 = lines[i].y2;
			let x3 = this.x;
			let y3 = this.y;
			let x4 = this.x + l * Math.cos(this.angle);
			let y4 = this.y + l * Math.sin(this.angle); 
		    let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)); 
		    let u = (-(x1 - x2) * (y1 - y3) + (y1 - y2) * (x1 - x3)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)); 
			if(t < 0 || t > 1 || u < 0 || u > 1) continue;
		    let x = x1 + t * (x2 - x1);
		    let y = y1 + t * (y2 - y1);
		    let d = (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y); 
		    if(d < dist)
		    {
		    	dist = d;
		    	let pts = {};
		    	pts.x = x;
		    	pts.y = y;
		    	pt = pts;
		    }
		}
		return pt;
	}
	draw(lines)
	{
		let pt = this.check(lines);
		if(pt)
		{
			ctx.lineWidth = 0.3;
			ctx.beginPath();
			ctx.moveTo(this.x, this.y);
			ctx.lineTo(pt.x, pt.y);
			ctx.closePath();
			ctx.stroke();
		}
	}
}

class particle
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
		this.arr = [];
		for(let i = 0; i < 360; i += 2)
		{
			this.arr.push(new ray(this.x, this.y, Math.PI * i / 180));
		}
	}
	update(x, y)
	{
		this.x = x;
		this.y = y;
		for(let i = 0; i < this.arr.length; i++) this.arr[i].update(x, y);
	}
	draw(lines)
	{
		for(let i = 0; i < this.arr.length; i++) this.arr[i].draw(lines);
	}
}
ctx.fillStyle = "black";
ctx.strokeStyle = "white";
let lines = [];

for(let i = 0; i < 5; i++)
{
	lines.push(new line(Math.random() * w,Math.random() * h,Math.random() * w,Math.random() * h));
}

lines.push(new line(-1,-1,-1,h + 1));
lines.push(new line(-1,-1,w + 1,-1));
lines.push(new line(-1,h + 1,w + 1,h + 1));
lines.push(new line(w + 1,-1,w + 1,h + 1));

let obj = new particle(canvas.width / 2,canvas.height / 2);

function animate() {
	ctx.fillRect(0, 0, w, h);
	for(let i = 0; i < lines.length; i++) lines[i].draw();
	obj.update(x,y);
	obj.draw(lines);
	requestAnimationFrame(animate);
}

animate();