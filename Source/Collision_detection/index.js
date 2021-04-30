//window.onload = () => {
	let canvas = document.querySelector("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	let ctx = canvas.getContext("2d");
	let div = document.querySelector("div");
	let size = 150;
	let x = 0, y = 0;
	function generateRandomRgba() {
		return "rgba(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256)
		 + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 100 + 20) / 100  + ")";
	}
	window.addEventListener('mousemove',function(event) {
		x1 = x;
		y1 = y;
		x = event.x;
		y = event.y;
	})
 	function dist(c1,c2)
	{
		let x = c1.x - c2.x;
		let y = c1.y - c2.y;
		return Math.sqrt(x * x + y * y);
	}
	class circle
	{
		constructor()
		{
			this.r = 15;
			this.x = (canvas.width - 2*this.r)* Math.random() + this.r;
			this.y = (canvas.height - 2*this.r)* Math.random() + this.r;
			this.dy = (Math.random() - 0.5) * 5;
			this.dx = (Math.random() - 0.5) * 5;
			this.color = Math.random() > 0.5 ? "green" : "blue";
			this.mass = 1;
			this.opacity = 0;
		}
		draw() 
		{
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.r,0,Math.PI*2,0);
			ctx.closePath();
			ctx.strokeStyle = this.color;
			ctx.stroke();
			ctx.fillStyle = this.color;
			ctx.save();
			ctx.globalAlpha = this.opacity;
			ctx.fill();
			ctx.restore();
		}
		update(particles)
		{
			this.checkForWalls()
			this.y += this.dy;
			this.x += this.dx;
			this.draw();
			this.checkForCollision(particles)
		}
		dist(c)
		{
			let x = this.x - c.x;
			let y = this.y - c.y;
			return Math.sqrt(x * x + y * y);
		}
		checkForWalls()
   		{
	        if((this.x + this.r >= canvas.width && this.dx > 0) || (this.x <= this.r && this.dx < 0))
	        {
	            this.dx = -this.dx;
	            return true;
	        }
	        if((this.y + this.r >= canvas.height) || (this.y <= this.r && this.dy < 0))
	        {
	            this.dy = -this.dy;
	            return true;
	        }
	        return false;
    	}
    	checkForCollision(particles)
    	{
    		for(let i = 0; i < particles.length; i++)
    		{
    			if(particles[i] == this) continue;
    			if(this.dist(particles[i]) <= this.r + particles[i].r)
    			{
    				//ctx.fill(); // it is only filling the current one (this).
    				//Prevent any accidental overlaps
    				//alternatively you could determine distance for next frame
    				// to check whether they are moving towards each other or 
    				// moving apart
    				let xVelDiff = this.dx - particles[i].dx;
    				let yVelDiff = this.dy - particles[i].dy;
    				let xDiff = -this.x + particles[i].x;
    				let yDiff = -this.y + particles[i].y;
    				if(xVelDiff * xDiff + yVelDiff * yDiff < 0) continue;
    				let angle = Math.atan2(this.y - particles[i].y,this.x - particles[i].x);
    				let cosQ = Math.cos(angle);
    				let sinQ = Math.sin(angle);
    				let v1 = cosQ * this.dx + sinQ * this.dy;
    				let v2 = cosQ * particles[i].dx + sinQ * particles[i].dy;
    				let vx = this.dx * sinQ * sinQ + v2 * cosQ - this.dy * cosQ * sinQ;
    				let vy = this.dy * cosQ * cosQ + v2 * sinQ - this.dx * sinQ * cosQ;
    				this.dx = vx;
    				this.dy = vy;
    				vx = particles[i].dx * sinQ * sinQ + v1 * cosQ - particles[i].dy * cosQ * sinQ;
    				vy = particles[i].dy * cosQ * cosQ + v1 * sinQ - particles[i].dx * sinQ * cosQ;
    			    particles[i].dx = vx;
    			    particles[i].dy = vy; 
    			}
    		}
    	}
	}
    let particles = [];
    for(let i = 0; i < size; i++)
    {
    	particles[i] = new circle;
    	if(i>0)
    	{
    		let check = true;
    		for(let j = 0; j < i; j++)
    		{
    			if(dist(particles[i],particles[j]) <= particles[i].r + particles[j].r)
    				check = false;
    		}
    		if(!check) i--;
    	}
    }
	function animate()
	{
		ctx.clearRect(0,0,canvas.width,canvas.height);
		for(let i = 0; i < size; i++) 
		{
			particles[i].update(particles);
		}
		let KE = 0;
		for(let i = 0; i < size; i++)
		{
			KE += 1 / 2 * particles[i].dx * particles[i].dx;
		    KE += 1 / 2 * particles[i].dy * particles[i].dy;
		}
		for(let i = 0; i < size; i++)
		{
			let obj = {x:x, y:y};
			if(dist(obj,particles[i]) <= 150 && particles[i].opacity < 0.4)
			{
				particles[i].opacity += 0.05;
			}
			else if (particles[i].opacity > 0)
			{
				particles[i].opacity -= 0.05;
				if(particles[i].opacity < 0) particles[i].opacity = 0;
			}
		}
		div.innerHTML = "Net Kinetic energy = "  + KE;
		requestAnimationFrame(animate);
	}
	ctx.fillStyle = generateRandomRgba();
	animate();
//}