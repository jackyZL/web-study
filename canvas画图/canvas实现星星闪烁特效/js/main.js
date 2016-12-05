// canvas 对象
var can;
// Context对象
var ctx;

var w;
var h;

var padLeft = 100;
var padTop = 100;

var girlWidth = 600;
var girlHeight = 300;

// 两桢之间的时间间隔
var deltaTime;
// 上一桢的时间
var lastTime;

var girlPic = new Image();
var starPic = new Image();

var stars = [];
var num = 30;

var alive = 0;

var switchy = false;

function init() {
	can = document.getElementById("canvas");
	ctx = can.getContext("2d");

	w = can.width;
	h = can.height;

	document.addEventListener('mousemove', mousemove, false);

	girlPic.src = "imgs/girl.jpg";
	starPic.src = "imgs/star.png";

	// 实例化星星对象
	for (var i = 0; i < num; i++) {
		stars[i] = new starObj();
		stars[i].init();
	}

	lastTime = Date.now();
	gameLoop();
}

/**
 * 刷新canvas画布
 */
function gameLoop() {

	// 循环调用gameLoop
	window.requestAnimFrame(gameLoop); //两次执行之间的时间间隔是不固定的

	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;

	fillCanvas();
	drawGirl();

	drawStars();

	aliveUpdate();
}

/**
 * 绘制背景
 */
function fillCanvas() {
	ctx.fillStyle = "#393550";
	ctx.fillRect(0, 0, w, h);
}

/**
 * 绘制女孩
 */
function drawGirl() {
	// 参数需要去研究？？ drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
	/**
	 * img:表示要画的图片
	 * sx：表示要画的图片的起始x坐标(在图片上的x坐标)
	 * sy：表示要画的图片的起始y坐标(在图片上的y坐标)
	 * swidth:表示要画的图片的宽度
	 * sheight:表示要画的图片的高度
	 * x:表示canvas上的x坐标
	 * y:表示canvas上的y坐标
	 * width:要画在canvas上的宽度
	 * height:要画在canvas上的高度
	 */
	ctx.drawImage(girlPic, padLeft, padTop, girlWidth, girlHeight);
}

function mousemove(e) {
	if (e.offsetX || e.layerX) {

		var px = e.offsetX == undefined ? e.layerX : e.offsetX;
		var py = e.offsetY == undefined ? e.layerY : e.offsetY;

		if (px > padLeft && px < (padLeft + girlWidth) && py > padTop && py < (padTop + girlHeight)) {
			switchy = true;
		} else {
			switchy = false;
		}
	}
}