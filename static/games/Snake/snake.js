"use strict";

var canvas, ctx, scoreBoard, applesBoard, bananasBoard, diamantsBoard;
var snake, food, delay, score, apples, bananas, diamants;
var grow = false;
var collision = false;

var cfg = {
	grid: {
		w: 30,
		h: 30
	},
	fieldSize: 20,
	snakeHeadColor: '#01DF01',
	snakeBodyColor: '#31B404',
	foodColor: '#f00',
	appleColor: '#f00',
	bananaColor: '#ff0',
	diamantColor: '#7ac5cd',
	startLength: 3,
	startSpeed: 400,
	minSpeed: 100
};

window.onload = function() {
	init();
};

window.onkeydown = function(e) {
	if (!snake) return;
	var key = e.which;

	switch (key) {
		case 37: if (snake.dir != 'r') snake.dir = 'l'; break;
		case 38: if (snake.dir != 'd') snake.dir = 'u'; break;
		case 39: if (snake.dir != 'l') snake.dir = 'r'; break;
		case 40: if (snake.dir != 'u') snake.dir = 'd'; break;
		default: break;
	}
};

function init() {
	canvas = document.getElementById('canvas');
	canvas.width = cfg.fieldSize * cfg.grid.w;
	canvas.height = cfg.fieldSize * cfg.grid.h;
	ctx = canvas.getContext('2d');

	score = 0;
	scoreBoard = document.getElementById('score');
	scoreBoard.textContent = score;

	apples = 0;
	applesBoard = document.getElementById('apples');
	applesBoard.textContent = apples;

	bananas = 0;
	bananasBoard = document.getElementById('bananas');
	bananasBoard.textContent = bananas;

	diamants = 0;
	diamantsBoard = document.getElementById('diamants');
	diamantsBoard.textContent = diamants;

	snake = {};
	snake.segments = [];
	for (var i = 0; i < cfg.startLength; i++) {
		snake.segments.push({x: Math.floor(cfg.grid.w / 2), y: Math.floor(cfg.grid.h / 2) + i});
	}
	snake.dir = 'u';
	delay = cfg.startSpeed;

	makeFood();

	render();
	setTimeout(gameLoop, delay);
}

var gameLoop = function() {
	if (!grow) snake.segments.splice(snake.segments.length - 1);
	else grow = false;
	var head = snake.segments[0];
	switch(snake.dir) {
		case 'u':
			snake.segments.unshift({x: head.x, y: head.y - 1});
			break;
		case 'd':
			snake.segments.unshift({x: head.x, y: head.y + 1});
			break;
		case 'l':
			snake.segments.unshift({x: head.x - 1, y: head.y});
			break;
		case 'r':
			snake.segments.unshift({x: head.x + 1, y: head.y});
			break;
		default: break;
	}
	head = snake.segments[0];
	if (head.x === food.x && head.y === food.y) {
		score += food.points;
		switch(food.type){
			case "apple": apples++; break;
			case "banana": bananas++; break;
			case "diamant": diamants++; break;
			default: break;
		}
		applesBoard.textContent = apples;
		bananasBoard.textContent = bananas;
		diamantsBoard.textContent = diamants;
		scoreBoard.textContent = score;

		makeFood();
		grow = true;
		if(delay-10 > cfg.minSpeed){
			delay -= 10;
		}
	}
	if (head.x < 0 || head.x >= cfg.grid.w || head.y < 0 || head.y >= cfg.grid.h){
		collision = true;
	}
	for (var i = 1; i < snake.segments.length; i++) {
		var segment = snake.segments[i];
		if (head.x == segment.x && head.y == segment.y) {
			collision = true;
			break;
		}
	}

	if (collision){
		alert('GAME OVER');
	}else{
		render();
		setTimeout(gameLoop, delay);
	}
}

function makeFood() {
	var randomNumber = Math.floor(Math.random() * 3);
	var foodType = "apple";
	var foodPoints = 10;
	switch(randomNumber){
		case 0: foodType= "apple"; foodPoints = 10; break;
		case 1: foodType= "banana"; foodPoints = 20; break;
		case 2: foodType= "diamant"; foodPoints = 50; break;
		default: console.log(randomNumber); break;
	}
	var foodX = Math.floor(Math.random() * cfg.grid.w);
	var foodY = Math.floor(Math.random() * cfg.grid.h);
	food = {type: foodType, x: foodX, y: foodY, points: foodPoints};
}

function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawSnake();
	drawFood();
}

function drawSnake() {
	var counter = 0;
	for (var segment of snake.segments) {
		if(counter == 0){
			ctx.fillStyle = cfg.snakeHeadColor;
		}else {
			ctx.fillStyle = cfg.snakeBodyColor;
		}
		ctx.fillRect(segment.x * cfg.fieldSize, segment.y * cfg.fieldSize, cfg.fieldSize, cfg.fieldSize);

		if(counter == 0){
			ctx.beginPath();
			var tongueWidth = 2, tongueHeight = 8;
			var x,y,x2,y2,xTongue, yTongue;

			switch(snake.dir){
				case 'u':
					x = segment.x * cfg.fieldSize + cfg.fieldSize/3;
					y = segment.y * cfg.fieldSize + cfg.fieldSize*2/3;
					x2 = x + cfg.fieldSize/3;
					y2 = y;
					xTongue = segment.x * cfg.fieldSize + cfg.fieldSize/2 - tongueWidth/2;
					yTongue = segment.y * cfg.fieldSize + cfg.fieldSize/5 - tongueHeight;
					break;
				case 'd':
					x = segment.x * cfg.fieldSize + cfg.fieldSize/3;
					y = segment.y * cfg.fieldSize + cfg.fieldSize/3;
					x2 = x + cfg.fieldSize/3;
					y2 = y;
					xTongue = segment.x * cfg.fieldSize + cfg.fieldSize/2 - tongueWidth/2;
					yTongue = segment.y * cfg.fieldSize + cfg.fieldSize*4/5;
					break;
				case 'l':
					x = segment.x * cfg.fieldSize + cfg.fieldSize*2/3;
					y = segment.y * cfg.fieldSize + cfg.fieldSize/3;
					x2 = x;
					y2 = y + cfg.fieldSize/3;
					var tmp = tongueHeight;
					tongueHeight = tongueWidth;
					tongueWidth = tmp;
					xTongue = segment.x * cfg.fieldSize + cfg.fieldSize/5 - tongueWidth;
					yTongue = segment.y * cfg.fieldSize + cfg.fieldSize/2 - tongueHeight;
					break;
				case 'r':
					x = segment.x * cfg.fieldSize + cfg.fieldSize/3;
					y = segment.y * cfg.fieldSize + cfg.fieldSize/3;
					x2 = x;
					y2 = y + cfg.fieldSize/3;
					var tmp = tongueHeight;
					tongueHeight = tongueWidth;
					tongueWidth = tmp;
					xTongue = segment.x * cfg.fieldSize + cfg.fieldSize*4/5;
					yTongue = segment.y * cfg.fieldSize + cfg.fieldSize/2 - tongueHeight;
					break;
				default: break;
			}
			ctx.arc( x, y, 3, 0, Math.PI*2, true);
			ctx.arc( x2, y2, 3, 0, Math.PI*2, true);
			ctx.fillStyle = '#fff';
			ctx.fill();
			ctx.beginPath();
			ctx.arc( x, y, 1, 0, Math.PI*2, true);
			ctx.arc( x2, y2, 1, 0, Math.PI*2, true);
			ctx.fillStyle = '#000';
			ctx.fill();
			ctx.fillStyle = '#f00';
			ctx.fillRect(xTongue, yTongue, tongueWidth, tongueHeight);
		}
		counter++;
	}
}

function drawFood() {
	if (!food) return;
	switch(food.type){
		case "apple": ctx.fillStyle = cfg.appleColor; break;
		case "banana": ctx.fillStyle = cfg.bananaColor; break;
		case "diamant": ctx.fillStyle = cfg.diamantColor; break;
		default: break;
	}
	//ctx.fillStyle = cfg.foodColor;
	ctx.fillRect(food.x * cfg.fieldSize, food.y * cfg.fieldSize, cfg.fieldSize, cfg.fieldSize);
}
