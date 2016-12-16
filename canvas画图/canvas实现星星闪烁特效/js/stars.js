var starObj = function() {
	this.x;
	this.y;

	// x轴速度
	this.xSpd;
	// y轴速度
	this.ySpd;

	// 动画桢数
	this.picNo;

	this.timer;

	this.beta;
}

starObj.prototype.init = function() {
	this.x = Math.random() * girlWidth + padLeft; // 返回[0,1)
	this.y = Math.random() * girlHeight + padTop;

	this.ySpd = Math.random() * 0.6 - 0.3; //[0,2) [-1, 1)
	this.xSpd = Math.random() * 0.2 - 0.1; //[0,2) [-1, 1)

	// 随机初始化桢
	this.picNo = Math.floor(Math.random() * 7);
	this.timer = 0;

	this.beta = Math.random() * Math.PI * 0.5;
}

starObj.prototype.update = function() {

	this.xSpd = Math.random() * 0.2 - 0.1; //[0,2) [-1, 1)

	this.x += this.xSpd;
	this.y += this.ySpd;

	//超出范围，就重生星星
	if (this.x > (padLeft + girlWidth) || this.x < (padLeft - 10))
		this.init();
	else if (this.y > (padTop + girlHeight) || this.y < (padTop - 10))
		this.init();

	this.timer += deltaTime;
	if (this.timer > 30) {
		this.picNo += 1;
		this.picNo %= 7;
		this.timer = 0;
	}
}

starObj.prototype.draw = function() {
	this.beta += deltaTime * 0.005;

	//save() 和 restor()一般总是成对出现的，它可以使其夹在其中的星星透明度设置，而不会影响女孩背景
	ctx.save();

	// 全局透明度(canvas上的所有图片都生效)
	ctx.globalAlpha = Math.sin(this.beta) * alive;
	//console.log(alive);
	//console.log(ctx.globalAlpha);
	// 每个星星都是7*7的像素变化
	ctx.drawImage(starPic, this.picNo * 7, 0, 7, 7, this.x, this.y, 7, 7);

	//
	ctx.restore();
}


/**
 * 绘制所有星星
 */
function drawStars() {
	for (var i = 0; i < num; i++) {
		stars[i].update();
		stars[i].draw();
	}
}

function aliveUpdate() {
	if (switchy) {
		alive += 0.03;
		if (alive > 0.7) {
			alive = 0.7;
		}
	} else {
		alive -= 0.03;
		if (alive < 0) {
			alive = 0;
		}
	}
}