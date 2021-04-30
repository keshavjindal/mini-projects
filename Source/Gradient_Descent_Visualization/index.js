let canvas = document.getElementsByTagName("canvas")[0];
let H = canvas.height = window.innerHeight;
let W = canvas.width = window.innerWidth;
let ctx = canvas.getContext("2d");

let pts = [], x =  1, y = 12;
/*let n = 10;
for(let i = 0; i < n; i++)
{
    pts.push([Math.round(Math.random() * W / y), Math.round(Math.random() * H / x )]);
    x += 1;
    y -= 1;
}*/

ctx.lineCap = "round";
ctx.strokeStyle = "red";
let Ani = false;
let a = 0, b = 0;
// h(x) = a + b * x;
let alpha = 0.000001;
ctx.fillRect(0, 0, W, H);
ctx.fillStyle = "White";

function animate()
{
    Ani = true;
    let cost = 0;
    ctx.fillStyle = "Black";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "White";
    let da = 0, db = 0, n = pts.length;
    for(let i = 0; i < n; i++)
    {
        ctx.fillRect(pts[i][0], pts[i][1], 2, 2);
        da += (a + b * pts[i][0] - pts[i][1]);
        cost += (a + b * pts[i][0] - pts[i][1]) * (a + b * pts[i][0] - pts[i][1]);
        db += (a + b * pts[i][0] - pts[i][1]) * pts[i][0];
    }
    db = alpha * db / n;
    da = da / n;
    a -= da;
    b -= db;
    ctx.beginPath();
    ctx.moveTo(-100, a + b * (-100));
    ctx.lineTo(1500, a + b * (1500));
    ctx.closePath();
    ctx.stroke();
    if(Math.abs(da) < alpha && Math.abs(db) < alpha) return;
    console.log(a, b, cost);
    requestAnimationFrame(animate);
}

window.addEventListener("click", function(e) {  
    if(Ani == false) pts.push([e.x, e.y]), ctx.fillRect(e.x, e.y, 2, 2);
    console.log(e);
});

window.addEventListener("keypress", function(e) {
    console.log(e);
    if((e.charCode == 97 || e.charCode == 65 ) && Ani == false)
        animate();
});
