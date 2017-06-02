

var snakesAndLadders = {
	Point: function(start_point,end_point) {
		this.start = start_point;
		this.end = end_point;
	},
	init: function() {

		this.snakes = [
			new this.Point(41,20),
			//new Point(62,5),
			//new Point(98,64),
			//new Point(95,75),
			//new Point(93,73),
			new this.Point(87,15),
			new this.Point(56,53),
			new this.Point(33,6),
			new this.Point(49,9)
		];
		this.ladders= [
			new this.Point(2,37),
			new this.Point(10,32),
			new this.Point(27,46),
			new this.Point(51,68),
			new this.Point(61,79),
			new this.Point(65,84),
			new this.Point(71,91),
			new this.Point(81,100)
		];
		this.myMap = new Map();
		this.makeMap();
	},
	printMsg: function(msg, elem_id){
		document.getElementById(elem_id).innerHTML = msg;
	},

	makeMap: function(){
		
		for(i=0;i<this.snakes.length;i++){
			this.myMap.set(this.snakes[i].start, this.snakes[i]);
		}
		for(i=0;i<this.ladders.length;i++){
			this.myMap.set(this.ladders[i].start, this.ladders[i]);
		}

		

	},

	rollDice: function() {
		var x = Math.floor((Math.random() * 6) + 1);
		return x;
	},

	enableBtn: function(button_id){
		document.getElementById(button_id).disabled = false;
	},
	disableBtn: function(button_id){
		document.getElementById(button_id).disabled = true;
	},

	takeTurn: function(button_id, no, x){
		
		this.printMsg(x,"position"+no);
		var cp1 = Number(document.getElementById("pos"+no).innerHTML);
		this.printMsg(cp1,"oldpos"+no);
		var new_pos = this.findPos(cp1+x,button_id);
		this.printMsg(new_pos, "pos"+no);
		if(no == 1){

			this.enableBtn("roll"+2);

		}
		else{
			this.enableBtn("roll"+1);
		}
		this.disableBtn("roll"+no);
		this.checkForWinner(new_pos, button_id);
			
		
			
	},

	turn: function(button_id) {
		this.init();
		var x = this.rollDice();
		
		if(button_id=="roll1"){
			this.takeTurn(button_id, 1,x);
		}
		else{
			this.takeTurn(button_id,2,x);
		}
	},

	checkForWinner:function(pos, button_id) {
		
		if(pos >= 100){
			if(button_id == "roll1"){
				this.printMsg("Player 1", "winner");
				this.disableBtn("roll1");
				this.disableBtn("roll2");
			}
			else{
				this.printMsg("Player 2", "winner");
				this.disableBtn("roll1");
				this.disableBtn("roll2");
			}
		}
		
	},

	findPos: function(curr_pos,button_id){
		if(button_id == "roll1"){
			var div_id = "status1";
			
		}
		else {
			var div_id = "status2";
			
		}
		
		var found_pos = this.myMap.get(curr_pos);
		if(found_pos){
			new_pos = found_pos.end;
			if(new_pos <curr_pos){
				//snake
				this.printMsg("Snake bit you", div_id);
				
			}
			else{
				//ladder
				this.printMsg("climb up the ladder", div_id);
				
			}
			return new_pos;
		}
		this.printMsg("no snake or ladder",div_id);
		return curr_pos;


	}




};









