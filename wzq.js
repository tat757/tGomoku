var wzq = {
	data : {
		turn : 0,
		moves : [],
		moveColor : [],
		win : false,
		winner : 0,
		lastMove : {
			active : false,
			position : '',
			player : 0
		}
	},
	start : function(){
		wzq.init();
		wzq.undo();
		wzq.restart();
	},
	init : function(){
		wzq.data.turn = 0;
		wzq.data.moves = [];
		wzq.data.moveColor = [];
		wzq.data.win = false;
		wzq.data.winner = 0;
		wzq.data.lastMove.active = false;
		wzq.data.lastMove.position = '';
		wzq.data.lastMove.player = 0;
		wzq.createBoard();
	},
	setStyle : function(id, styles){
		if(id.style){
			for(style in styles){
				id.style[style] = styles[style];
			}
		}
	},
	createBoard : function(){
		var container = document.getElementById('container');
		var containerStyle = {
			backgroundColor : '#63B8FF',
			height : '460px',
			width : '460px',
			padding : '5px'
		}
		wzq.setStyle(container, containerStyle);

		var board = document.createElement('div');
		var boardStyle = {
			height : '451px',
			width : '451px',
			backgroundColor : 'red',
			marginLeft : '5px',
			marginRight : '4px',
			marginTop : '5px'
		}
		wzq.setStyle(board, boardStyle);
		container.appendChild(board);

		//建立所有下子的地方
		for(var i = 0; i < 15 * 15; i++){
			var cell = document.createElement('div');
			cell.id = 'p' + i;
			var cellStyle = {
				float : 'left',
				position : 'relative',
				width : '29px',
				height : '29px',
				backgroundColor : 'orange',
				marginLeft : '1px',
				marginTop : '1px',
				padding : '0px'
			};
			if(i % 15 === 14){
				cellStyle.marginRight = '1px';
			}
			if(i >= 15 * 14){
				cellStyle.marginBottom = '1px';
			}
			wzq.setStyle(cell, cellStyle);
			wzq.mouseOver(cell);
			wzq.mouseOut(cell);
			wzq.mouseClick(cell);
			board.appendChild(cell);
		}
		wzq.player(cell);
	},
	mouseOver : function(cell){
		cell.addEventListener('mouseover', function(e){
			var c = e.target.style.backgroundColor;
			if(c !== '#FFFFFF' && c !== '#000000' && c !== 'rgb(255, 255, 255)' && c !== 'rgb(0, 0, 0)'){
				e.target.style.backgroundColor = '#63B8FF';
			}
		}, false);

	},
	mouseOut : function(cell){
		cell.addEventListener('mouseout', function(e){
			var c = e.target.style.backgroundColor;
			if(c !== '#FFFFFF' && c !== '#000000' && c !== 'rgb(255, 255, 255)' && c !== 'rgb(0, 0, 0)'){
				e.target.style.backgroundColor = 'orange';
			}
		}, false);
	},
	mouseClick : function(cell){
		cell.addEventListener('click', function(e){
			var c = e.target.style.backgroundColor;
			var position = +e.target.id.split('p')[1];
			//检测当前状态是否为胜利的状态以及当前位置是否有棋子
			if(c !== '#FFFFFF' && c !== '#000000' && c !== 'rgb(255, 255, 255)' && c !== 'rgb(0, 0, 0)' && !wzq.data.win){
				if(wzq.data.turn % 2 === 0){
					e.target.style.backgroundColor = '#000000';
					wzq.data.moveColor[position] = 'b';
					wzq.data.lastMove.player = 1;
				}
				else{
					e.target.style.backgroundColor = '#FFFFFF';
					wzq.data.moveColor[position] = 'w';
					wzq.data.lastMove.player = 2;
				}
				wzq.data.lastMove.active = true;
				wzq.data.lastMove.position = e.target.id;
				document.getElementById('undo').innerHTML = '悔棋';
				wzq.data.moves.push(e.target.id);
				wzq.checkWin(e.target.id, wzq.data.turn);
				wzq.data.turn++;
				if(wzq.data.win){
					console.log(wzq.data.winner);
				}
				//更新页面上的信息
				wzq.player();
			}
		}, false);
	},
	checkWin : function(move, turn){
		var count = 0;
		var player;
		var check = 0;
		if(turn%2 === 0){
			player = 1;
		}
		else{
			player = 2;
		}
		position = +move.split('p')[1];
		//检测是否平局
		if(wzq.data.turn >= 225){
			wzq.data.win = true;
			wzq.data.winner = 3;
		}
		//检测竖排
		check = position - 60;
		for(var i = 0; i < 9; i++){
			if(check >= 0 && check <= 224 && !wzq.data.win){
				if(player === 1){
					if(wzq.data.moveColor[check] === 'b'){
						count++;
					}
					else{
						count = 0;
					}
				}
				else{
					if(wzq.data.moveColor[check] === 'w'){
						count++;
					}
					else{
						count = 0;
					}
				}
				if(count === 5){
					wzq.data.win = true;
					wzq.data.winner = player;
				}
			}
			check += 15;
		}

		//检测横行
		check = position - 4;
		count = 0;
		for(var i = 0; i < 9; i++){
			if(check >= 0 && check <= 224 && Math.floor(check/15) === Math.floor(position/15) && !wzq.data.win){
				if(player === 1){
					if(wzq.data.moveColor[check] === 'b'){
						count++;
					}
					else{
						count = 0;
					}
				}
				else{
					if(wzq.data.moveColor[check] === 'w'){
						count++;
					}
					else{
						count = 0;
					}
				}
				if(count === 5){
					wzq.data.win = true;
					wzq.data.winner = player;
				}
			}
			check += 1;
		}

		//检测左斜
		check = position - 60 - 4;
		count = 0;
		for(var i = 0; i < 9; i++){
			if(check >= 0 && check <= 224 && !wzq.data.win){
				if(player === 1){
					if(wzq.data.moveColor[check] === 'b'){
						count++;
					}
					else{
						count = 0;
					}
				}
				else{
					if(wzq.data.moveColor[check] === 'w'){
						count++;
					}
					else{
						count = 0;
					}
				}
				if(count === 5){
					wzq.data.win = true;
					wzq.data.winner = player;
				}
			}
			check += 15 + 1;
		}
		//检测右斜
		check = position - 60 + 4;
		count = 0;
		for(var i = 0; i < 9; i++){
			if(check >= 0 && check <= 224 && !wzq.data.win){
				if(player === 1){
					if(wzq.data.moveColor[check] === 'b'){
						count++;
					}
					else{
						count = 0;
					}
				}
				else{
					if(wzq.data.moveColor[check] === 'w'){
						count++;
					}
					else{
						count = 0;
					}
				}
				if(count === 5){
					wzq.data.win = true;
					wzq.data.winner = player;
				}
			}
			check += 15 - 1;
		}
	},
	player : function(){
		var player = document.getElementById('player');
		if(!wzq.data.win){
			player.innerHTML = wzq.data.turn % 2 === 0 ? '黑子回合' : '白子回合';
		}
		else{
			player.innerHTML = wzq.data.winner === 1 ? '黑子胜' : '白子胜';
			if(wzq.data.winner === 1){
				player.innerHTML = '黑子胜';
			}
			else if(wzq.data.winner === 2){
				player.innerHTML = '白子胜';
			}
			else if(wzq.data.winner === 3){
				player.innerHTML = '平局';
			}
		}
	},
	undo : function(){
		var undo = document.getElementById('undo');
		undo.addEventListener('click', function(e){
			console.log(wzq.data);
			//如果当前没有悔棋,点击悔棋将执行悔棋操作.如果当前为悔棋状态,将执行撤销操作.
			if(wzq.data.lastMove.active && !wzq.data.win){
				document.getElementById(wzq.data.lastMove.position).style.backgroundColor = 'orange';
				wzq.data.turn--;
				wzq.data.moveColor[+wzq.data.lastMove.position.split('p')[1]] = undefined;
				wzq.data.moves.pop();
				wzq.data.lastMove.active = false;
				document.getElementById('undo').innerHTML = '撤销';
			}
			else if(wzq.data.lastMove.player !== 0){
				if(wzq.data.lastMove.player === 1){
					document.getElementById(wzq.data.lastMove.position).style.backgroundColor = 'black';
					wzq.data.moveColor[+wzq.data.lastMove.position.split('p')[1]] = 'b';
				}
				else{
					document.getElementById(wzq.data.lastMove.position).style.backgroundColor = 'white';
					wzq.data.moveColor[+wzq.data.lastMove.position.split('p')[1]] = 'w';
				}
				wzq.data.turn++;
				wzq.data.moves.push(wzq.data.lastMove.position);
				wzq.data.lastMove.active = true;
				document.getElementById('undo').innerHTML = '悔棋';
			}
			wzq.player();
		}, false);
	},
	restart : function(){
		//重置棋盘
		var restart = document.getElementById('restart');
		restart.addEventListener('click', function(e){
			document.getElementById('container').innerHTML = '';
			wzq.init();
		}, false);
	}
};

wzq.start();