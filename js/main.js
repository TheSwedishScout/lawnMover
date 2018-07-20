	var coners = [];
	var active = 1;
	var movers = [];
document.addEventListener('DOMContentLoaded', function () {
	var lawn = document.getElementById('lawn');


document.getElementById("editlawn").addEventListener('click',function (e) {e.preventDefault();active = 1;})
document.getElementById("lawnmover").addEventListener('click',function (e) {e.preventDefault();active = 2;})
document.getElementById("start").addEventListener('click',function (e) {e.preventDefault();
	for (var i = 0; i < movers.length; i++) {
		movers[i].play();
	}
 })
document.getElementById("pause").addEventListener('click',function (e) {e.preventDefault();
	for (var i = 0; i < movers.length; i++) {
		movers[i].pause();
	}
 })
	/*
		active states
		1 = lawn dots
		2 = Lawnmover
		3 = play
		4 = pause
	*/

	lawn.addEventListener('click', lawnAction);


	lawn.addEventListener('dragover', function (e) {
		e.preventDefault();
	})
	lawn.addEventListener('drop', function (e) {
		e.preventDefault();
		var data = e.dataTransfer.getData("text");
			let corner = coners[data]
			corner.dott.style.left = event.x + "px";
			corner.dott.style.top = event.y + "px";
			corner.pos.x = event.x;
			corner.pos.y = event.y;
			DrawLines()
		
	})

	function lawnAction(e) {
		if (active == 1) {
			addDotClick(e)
		}
		if (active == 2) {
			addLawnMover(e)
		}
	}

	function addLawnMover(e) {
		e.preventDefault();
		let pos = {}
		pos.x = e.x;
		pos.y = e.y;
		var hmm = new LawnMover(pos, lawn);
		hmm.create();
		movers.push(hmm);
	}

	function addDotClick(e) {

		var mousepos= {};
		mousepos.x = e.x
		mousepos.y = e.y
		

		addDot(mousepos);
	}
	function addDot(pos) {
		var dott = document.createElement('div');
		dott.classList.add('corner')
		dott.style.left = pos.x + "px";
		dott.style.top = pos.y + "px";

		dott.setAttribute('draggable', true)
		lawn.appendChild(dott);
		var corner = {dott, pos}
		var hmm = coners.push(corner);
		DrawLines();
		
		dott.addEventListener("dragstart",function (e) {
			e.dataTransfer.setData("text", hmm-1);
		});
		dott.addEventListener("drag",function (e) {
			dott.style.left = e.x + "px";
			dott.style.top = e.y + "px";
			coners[hmm-1].pos.x = e.x;
			coners[hmm-1].pos.y = e.y;
			DrawLines();
			
		});
	}
	

	function DrawLines() {
		var possitions = [];
		for (var i = 0; i < coners.length; i++) {
			possitions.push(coners[i].pos);

		}
		possitions
		if(possitions.length > 1){
			var points = ""
			var poly = document.getElementById('lawnEdges');
			for (var i = 0; i < possitions.length; i++) {
				points += possitions[i].x + ","+ possitions[i].y +" ";
				
				
			}
			poly.setAttribute('points', points);
		}
		
	}

	function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}




})

function LawnMover(startPos, lawn) {
	this.lawn = lawn
	this.name = 'clippo';
	this.charger = startPos;
	this.pos = startPos;
	this.clipperWidth = 4;
	this.size = 10;
	this.speed = 1;
	this.heading = 120;
	this.elem = ""
	this.colided = 0;
	this.play = function () {
		this.requestID = window.requestAnimationFrame(this.move.bind(this));
	}
	this.pause = function () {
		window.cancelAnimationFrame(this.requestID);
	}
	this.move = function (elem) {
		
		if(this.colided  == 0){
			let colition = this.colition();
			if (colition !== false){
				var fel = {}
				this.heading = Math.abs(this.heading - 180);
				if(this.pos.x < this.size){
					fel.x = this.size - this.pos.x
					// this.pos.x += fel.x
				}
				if( this.lawn.clientWidth - this.pos.x < this.size){
					fel.x = this.lawn.clientWidth - this.size - this.pos.x
					// this.pos.x -= fel.x
				}
				if(this.lawn.clientHeight - this.pos.y < this.size){
					fel.y = this.lawn.clientHeight- this.size - this.pos.y
					// this.pos.y -= fel.y
				}
				if( this.pos.y  < this.size){
					fel.y =  this.size - this.pos.y 
					// this.pos.y += fel.y
				}
				this.heading;
				this.colided = 10;
				debugger;
				
			}
		}else{
			
				this.heading;
				debugger;
				this.colided --;
		}

		let addToX = this.speed*Math.cos(toRadians(this.heading));
		let addToY = this.speed*Math.sin(toRadians(this.heading));
		this.pos.x += addToX;
		this.pos.y += addToY;

		this.elem.style.left = this.pos.x + "px";
		this.elem.style.top = this.pos.y + "px";
		this.requestID = window.requestAnimationFrame(this.move.bind(this));
		
	}
	this.create = function () {
		let lawn = document.getElementById('lawn');
		this.elem = document.createElement('div');
		this.elem.style.left = this.pos.x + "px";
		this.elem.style.top = this.pos.y + "px";
		this.elem.classList.add('mover');
		lawn.appendChild(this.elem);
	}
	this.colition = function () {
		var svg = document.getElementById('svg');
		console.log(this.pos);
		for (var i = 0; i < coners.length; i++) {
			let point1 = coners[i]
			var point2 = ((i+1) < coners.length ? coners[i+1] : coners[0]);
			
		}
		this.lawn
		
		if(this.pos.x < this.size || this.pos.x >  this.lawn.clientWidth - this.size ||this.pos.y < this.size || this.pos.y >this.lawn.clientHeight- this.size ) {
			return this.pos;
		}
		return false
	}

	// body...
}
function toRadians (angle) {
  return angle * (Math.PI / 180);
}