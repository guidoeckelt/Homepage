"use strict";
//================Init=======================
function initTetris(){
	var nextBlockBox = document.getElementById("next");
	
	tetris = new Tetris();
	tetris.nextBlockBox = nextBlockBox;
	window.onkeypress = tetris.onkeyinput;
	
	console.log("GameLoop starts");
	tetris.decideNewBlock();
	tetris.createFallingBlock();
	tetris.decideNewBlock();
	tetris.gameLoop();
}
//================END-Init===================
var tetris;
//================Game=======================
function Tetris(){
	var self = this;
	self.config = new Config();
	self.view = new View(self.config);
	self.nextBlockBox;
	self.blocks = new Array();
	self.fallingBlock;
	self.nextBlockType;
	
	//============Game-Methods===============
	self.gameLoop = function(){
		console.log("GameLoop continues");
		var didFall = self.fallingBlock.fall(self);
		if(didFall == false){
			self.checkForFullRow();
			self.createFallingBlock();
			self.decideNewBlock();
		}
		self.view.render(self.blocks);
		setTimeout(self.gameLoop, self.config.delay);
	};
	self.decideNewBlock = function(){
		self.nextBlockType = getRandomInt(1,7);
		self.nextBlockBox.setAttribute("data-block-type", self.nextBlockType);
		var nextBlock;
		switch(self.nextBlockType){
			case 1: nextBlock = "I"; break;
			case 2: nextBlock = "T"; break;
			case 3: nextBlock = "Z"; break;
			case 4: nextBlock = "S"; break;
			case 5: nextBlock = "O"; break;
			case 6: nextBlock = "L"; break;
			case 7:	nextBlock = "reverseL"; break;
			default: console.log(self.nextBlockType);
			
		}
		console.log("New Block is a "+nextBlock+" - Block");
		
	};
	self.createFallingBlock = function(){
		var newBlock;
		switch(self.nextBlockType){
			case 1: newBlock = self.createI(); break;
			case 2: newBlock = self.createT(); break;
			case 3: newBlock = self.createZ(); break;
			case 4: newBlock = self.createS(); break;
			case 5: newBlock = self.createO(); break;
			case 6: newBlock = self.createL(); break;
			case 7: newBlock = self.createReverseL(); break;
			default: console.log(self.nextBlockType);
		}
		self.blocks.push(newBlock);
		self.fallingBlock = newBlock;
		console.log("New Falling Block Created");
	};
	self.checkForFullRow = function(){
		console.log("Check for Full Row");
		var bottomRow = self.config.grid.height;
		var blockList = Array.from(self.blocks);
		var rowList = new Array();
		for(let row = bottomRow;row >=1;row--){
			var rowState = createArrayWithValue(self.config.grid.width, false);
			for(var block of blockList){
				var segmentList = Array.from(block.segments);
				for(var segment of segmentList){
					if(segment.position.Y == row){
						rowState[segment.position.X-1] = true;
					}
				}
			}
			var isRowStateNotFull = contains(rowState, false);
			if(isRowStateNotFull == false){
				rowList.push(row);
			}
		}
		for(let row of rowList){
			self.deleteRow(row);
		}
		self.letAllBlocksFall(rowList);
	};
	self.deleteRow = function(row){
		for(var block of self.blocks){
			for(var segment of block.segments){
				if(segment.position.Y == row){
					var index = block.segments.indexOf(segment);
					block.segments.splice(index, 1);
				}
			}
		}
		self.view.render(self.blocks);
		console.log("Row "+row+" is full and gets deleted");
	};
	self.letAllBlocksFall = function(rowList){
		for(var block of self.blocks){
			if(block.segments.length > 0){
				for(var segment of block.segments){
					var shallFall = true;
					for(var row of rowList){
						if(segment.position.Y  > row){
							shallFall = false;
							break;
						}
					}
					if(shallFall == true){
						segment.position.Y += rowList.length;
					}
				}
			}else{
				var index = self.blocks.indexOf(block);
				self.blocks.splice(index, 1);
			}
		}
	};
	self.moveFallingBlock = function(goRight){
		self.fallingBlock.move(goRight, self);
		self.view.render(self.blocks);
	};
	self.letFallingBlockFall = function(){
		console.log("Falling Block falls");
		var didFall = self.fallingBlock.fall(self);
		if(didFall == false){
			self.checkForFullRow();
			self.createFallingBlock();
			self.decideNewBlock();
		}
		self.view.render(self.blocks);
	};
	self.onkeyinput = function(event){
		var key = event.which;
		var keyCode = event.keyCode;
		switch(keyCode){
			case 37: self.moveFallingBlock(false); break;
			case 39: self.moveFallingBlock(true); break;
			case 40: self.letFallingBlockFall(); break;
			//default: console.log("keyCode:"+keyCode);
		}
		switch(key){
			case  32: self.fallingBlock.rotate(true); break;
			case  97: self.moveFallingBlock(false); break;
			case 100: self.moveFallingBlock(true); break;
			case 115: self.letFallingBlockFall(); break;
			//default: console.log("key:"+key);
		}
		event.preventDefault();
	}
	//============END-Concrete Blocks========	
	//============Concrete Blocks============
	self.createI = function(){
		var color = self.config.blockColors.red;
		var newBlock = new Block("I", color);
		
		var X = getRandomInt(1, self.config.grid.width);
		var bufferY = 1;//getRandomInt(1, self.config.grid.height);
		for(var Y = bufferY;Y > bufferY-4;Y--){
			newBlock.segments.push(new Segment(X, Y, self.config.fieldSize));
		}
		return newBlock;
	};
	self.createT = function(){
		var color = self.config.blockColors.green;
		var newBlock = new Block("T", color);
		
		var X = getRandomInt(2, self.config.grid.width-1);
		var Y = 1;//getRandomInt(1, self.config.grid.height);
		newBlock.segments.push(new Segment(X  , Y  , self.config.fieldSize));
		newBlock.segments.push(new Segment(X-1, Y-1, self.config.fieldSize));
		newBlock.segments.push(new Segment(X  , Y-1, self.config.fieldSize));
		newBlock.segments.push(new Segment(X+1, Y-1, self.config.fieldSize));
		return newBlock;
	};
	self.createZ = function(){
		var color = self.config.blockColors.blue;
		var newBlock = new Block("Z", color);
		
		var X = getRandomInt(1, self.config.grid.width-1);
		var Y = 1;//getRandomInt(1, self.config.grid.height);
		newBlock.segments.push(new Segment(X  , Y  , self.config.fieldSize));
		newBlock.segments.push(new Segment(X  , Y-1, self.config.fieldSize));
		newBlock.segments.push(new Segment(X+1, Y-1, self.config.fieldSize));
		newBlock.segments.push(new Segment(X+1, Y-2, self.config.fieldSize));
		return newBlock;
	};
	self.createS = function(){
		var color = self.config.blockColors.teal;
		var newBlock = new Block("S", color, self.config.fieldSize);
		
		var X = getRandomInt(2, self.config.grid.width);
		var Y = 1;//getRandomInt(1, self.config.grid.height);
		newBlock.segments.push(new Segment(X  , Y  , self.config.fieldSize));
		newBlock.segments.push(new Segment(X  , Y-1, self.config.fieldSize));
		newBlock.segments.push(new Segment(X-1, Y-1, self.config.fieldSize));
		newBlock.segments.push(new Segment(X-1, Y-2, self.config.fieldSize));
		return newBlock;
	};
	self.createO = function(){
		var color = self.config.blockColors.orange;
		var newBlock = new Block("O", color, self.config.fieldSize);
		
		var X = getRandomInt(1, self.config.grid.width-1);
		var Y = 1;//getRandomInt(1, self.config.grid.height);
		newBlock.segments.push(new Segment(X  , Y  , self.config.fieldSize));
		newBlock.segments.push(new Segment(X+1, Y  , self.config.fieldSize));
		newBlock.segments.push(new Segment(X  , Y-1, self.config.fieldSize));
		newBlock.segments.push(new Segment(X+1, Y-1, self.config.fieldSize));
		return newBlock;
	};
	self.createL = function(){
		var color = self.config.blockColors.yellow;
		var newBlock = new Block("L", color, self.config.fieldSize);
		
		var X = getRandomInt(1, self.config.grid.width-1);
		var Y = 1;//getRandomInt(1, self.config.grid.height);
		newBlock.segments.push(new Segment(X  , Y  , self.config.fieldSize));
		newBlock.segments.push(new Segment(X+1, Y  , self.config.fieldSize));
		newBlock.segments.push(new Segment(X  , Y-1, self.config.fieldSize));
		newBlock.segments.push(new Segment(X  , Y-2, self.config.fieldSize));
		return newBlock;
	};
	self.createReverseL = function(){
		var color = self.config.blockColors.purple;
		var newBlock = new Block("reverseL", color, self.config.fieldSize);
		
		var X = getRandomInt(1, self.config.grid.width-1);
		var Y = 1;//getRandomInt(1, self.config.grid.height);
		newBlock.segments.push(new Segment(X  , Y  , self.config.fieldSize));
		newBlock.segments.push(new Segment(X+1, Y  , self.config.fieldSize));
		newBlock.segments.push(new Segment(X+1, Y-1, self.config.fieldSize));
		newBlock.segments.push(new Segment(X+1, Y-2, self.config.fieldSize));
		return newBlock;
	};
	//============END-Concrete Blocks========
}
//================View=======================
function View(config){
	var self = this;
	self.config = config;
	self.scene = document.getElementById("scene");
	self.context = self.scene.getContext("2d");
	self.nextBlockType = null;
	
	self.borderSize = 5;
	self.blockstart = self.borderSize/self.config.fieldSize;
	
	self.render = function(blocks){
		console.log("Tetris-Board is rendering");
		self.context.clearRect(0,0,self.scene.width, self.scene.height);
		self.drawBackground();
		self.drawBoard(blocks);
		self.drawNextBlock();
	};
	self.drawBackground = function(){
		self.context.fillStyle = self.config.backgroundColor;
		self.context.fillRect(0,0,self.scene.width, self.scene.height);
	};
	self.drawBoard = function(blocks){
		var width = self.scene.width;
		var height = self.scene.height;
		self.context.fillStyle = self.config.boardColor;
		self.context.fillRect(0,0,width,height);
		
		self.drawBlocks(blocks);
		
		self.context.strokeStyle = self.config.boardBorderColor;
		self.context.lineWidth = self.borderSize*2;
		self.context.strokeRect(0,0,self.scene.width,self.scene.height);
	};
	self.drawBlocks = function(blocks){
		self.context.lineWidth = 2;
		self.context.strokeStyle = "#000000";
		var blockList =  Array.from(blocks);
		for(var block of blockList){
			var segmentList = Array.from(block.segments);
			for(var segment of segmentList){
				var x = ((segment.position.X-1)*segment.size)+self.borderSize;
				var y = ((segment.position.Y-1)*segment.size)+self.borderSize;
				self.context.fillStyle = block.color;
				
				self.context.fillRect(x, y, segment.size, segment.size);
				self.context.strokeRect(x, y, segment.size, segment.size);
			}
		}
	};
	self.drawNextBlock = function(){
		
	};
	self.OnNewNextBlock = function(blockType){
		self.nextBlockType = blockType;
	};

	self.scene.width = (self.config.fieldSize*self.config.grid.width)+(self.borderSize*2);
	self.scene.height = (self.config.fieldSize*self.config.grid.height)+(self.borderSize*2);
}	
//================END-View=================== 
function Config(){
	var self = this;
	self.grid = {width: 15,height: 25};
	self.fieldSize = 25;
	self.backgroundColor = "#BBBBBB";
	self.boardColor = "#1f820b";
	self.boardBorderColor = "#000000";
	self.blockColors = {red : "#ff0000", green : "#00ff00",
						blue : "#0000ff", teal : "#2EFEF7",
					    yellow : "#F4FA58", orange : "#FFBF00", purple : "#4B088A"};	
    self.delay = 500;
	
	self.moveLeft = [37,65];
	self.moveRight = [39, 68];
	self.letFall = [40, 115];
	self.rotateClockwise = 32;
	self.rotateAntiClockwise = 0;
	
}
//================END-Game===================
//================Classes====================
function Block(type, color){
	var self = this;
	self.type = type;
	self.direction = "";
	self.segments = new Array();
	self.color = color;
	
	self.move = function(goRight, game){
		var segmentList = Array.from(self.segments);
		var canMove = true;
		if(goRight == true){
			if(self.canMove(goRight, game) == true){
				console.log("Block is moving right");
				for(var segment of segmentList){
					segment.position = segment.position.add(new Vector2D(1,0));
				}
			}	
		}else{
			if(self.canMove(goRight, game) == true){
				console.log("Block is moving left");
				for(var segment of segmentList){
					segment.position = segment.position.add(new Vector2D(-1,0));
				}
			}
		}
	};
	self.canMove = function(goRight, game){
		var segmentList = Array.from(self.segments);
		if(goRight == true){
			for(var segment of segmentList){
				if(segment.position.add(new Vector2D(1,0)).X > game.config.grid.width){
					return false;
				}
			}
		}else{
			for(var segment of segmentList){
				if(segment.position.add(new Vector2D(-1,0)).X < 1){
					return false;
				}
			}
		}
		return true;
	}
	self.rotate = function(clockwise){
		if(clockwise == true){
			for(var segment of self.segments){
				var X = segment.position.Y;
				var Y = -1*segment.position.X;
				segment.position = new Vector2D(X, Y);
			}
			console.log("Block rotates clockwise");
		}else{
			console.log("Block rotates anticlockwise");
		}
	};
	self.fall = function(game){
		if(self.canFall(game) == true){
			for(var segment of self.segments){
				segment.position = segment.position.add(new Vector2D(0,1));
			}
			console.log("Block is falling");
			return true;
		}else{
			console.log("Block is grounded");
			return false;
		}
	};
	self.canFall = function(game){
		var segmentList = Array.from(self.segments);
		var blockList = Array.from(game.blocks);
		var isFalling = true;
		var dummyBlock = self.clone(new Vector2D(0,1));
		for(var block of blockList){
			if(self != block && block.intersects(dummyBlock) == true){
				isFalling = false;
				break;
			}
		}
		
		for(var segment of segmentList){
			if(segment.position.Y == game.config.grid.height){
				isFalling = false;
				break;
			}
		}
		return isFalling;
	};
	
	self.intersects = function(other){
		for(var segment of self.segments){
			for(var otherSegment of other.segments){
				if(segment.position.X == otherSegment.position.X){
					if(segment.position.Y == otherSegment.position.Y){
						console.log("Collision Detected at ("+ segment.position.X+"|"+segment.position.Y+")");
						return true;
					}
				}
			}
		}
		return false;
	};
	self.clone = function(movingDirection){
		var segmentList = Array.from(self.segments);
		var dummyBlock = new Block(self.type, self.color);
		for(var segment of segmentList){
			var dummySegment = new Segment(segment.position.X,segment.position.Y, segment.size);
			dummySegment.position = dummySegment.position.add(movingDirection);
			dummyBlock.segments.push(dummySegment);
		}
		return dummyBlock;
	};
	self.draw = function(sceneContext){
		var segmentList = Array.from(self.segments);
		for(var segment of segmentList){
			var x = (segment.position.X-1)*segment.size;
			var y = (segment.position.Y-1)*segment.size;
			sceneContext.fillStyle = self.color;
			sceneContext.fillRect(x, y, segment.size, segment.size);
		}
	};
}
function Segment(X, Y, size){
	var self = this;
	self.position = new Vector2D(X, Y);
	self.size = size;
	
	self.intersects = function(other){
		for(var otherSegment of other.segments){
			if(self.position.X == otherSegment.position.X){
				if(self.position.Y == otherSegment.position.Y){
					console.log("Collision Detected at ("+ self.position.X+"|"+segment.position.Y+")");
					return true;
				}
			}
		}
		return false;
	};
}
function Vector2D(X, Y){
	var self = this;
	self.X = X;
	self.Y = Y;
	
	self.add = function(other){
		return new Vector2D(self.X+other.X, self.Y+other.Y);
	};
	self.substract = function(other){
		return new Vector2D(self.X-other.X, self.Y+other.Y);
	};
	self.normalize = function(){
		var length = Math.sqrt(Math.pow(self.X,2)+Math.pow(self.Y,2));
		return new Vector2D(self.X/length, self.Y/length);
	};
}
//================END-Classes================
//================UTIL=======================
function getRandomInt(minimum, maximum){
	return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}
function createArrayWithValue(length, value){
	var NewArray = new Array();
	for(var i = 0; i < length;i++){
		NewArray[i] = value;
	}
	return NewArray;
}
function contains(array, value){
    var i = array.length;
    while (i--) {
        if (array[i] === value) {
            return true;
        }
    }
    return false;
}