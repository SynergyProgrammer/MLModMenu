//CANVAS SETTINGS
var canvas = document.createElement('canvas');
var ctx = canvas.getContext("2d");
canvas.width=ig.ua.viewport.width;
canvas.height=ig.ua.viewport.height;
canvas.style.position = "relative";
canvas.style.border = "0px solid";
var body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);

alert("WELCOME TO B'S MENU!");
alert("Controls:\nUP:ARROWUP\nDOWN:ARROWDOWN\nSELECTMOD:CTRL");
//MENU VARIABLES
IntervalMods();
var Jump = false;
var Clapping = false;
var Options = {
	Current: 1,
	Amount: 10,
};
ig.game.O5518.kill = function() {};
ig.game.O5518.fallTimer=0;
ig.game.O5518.jumping=false;

setInterval(function() { UpdateCanvas(); }, 30);

function UpdateCanvas() {
	//Clear Canvas
	ctx.clearRect(0,0,2000,2000);

    //Menu
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, 150, 250);

    //Title
    ctx.font="20px Verdana";
    ctx.fillStyle="#FFFFFF";
    ctx.fillText("B's Menu",25,20);

    //Mods
    ctx.font="12px Verdana";
    ctx.fillText("jump fly",5,40);
    ctx.fillText("gravity",5,60);
    ctx.fillText("option03",5,80);
    ctx.fillText("option04",5,100);
    ctx.fillText("option05",5,120);
    ctx.fillText("option06",5,140);
    ctx.fillText("option07",5,160);
    ctx.fillText("option08",5,180);
    ctx.fillText("option09",5,200);
    ctx.fillText("clapping",5,220);
    ctx.fillText("credits",5,240);

    //Scroller
    ctx.fillStyle = "rgba(0, 191, 255, 0.5)";
    ctx.fillRect(0, Options.Current*20 + 7, 150, 20);
}


document.onkeydown = function(e) {
	//Get Keycode
	var KeyPressed = e.which;

	//Move Scroller
	if(KeyPressed === 38 && Options.Current > 1) Options.Current--;
	if(KeyPressed === 40 && Options.Current <= Options.Amount) Options.Current++;

	//Option Selected
	if(KeyPressed === 17) {
		if(Options.Current == "1") {
			if(!Jump) Jump = true;
			else Jump = false;
		}
		else if(Options.Current == "2") Gravity();
		else if(Options.Current == "3") Blank();
		else if(Options.Current == "4") Blank();
		else if(Options.Current == "5") Blank();
		else if(Options.Current == "6") Blank();
		else if(Options.Current == "7") Blank();
		else if(Options.Current == "8") Blank();
		else if(Options.Current == "9") Blank();
		else if(Options.Current == "10") {
			if(!Clapping) Clapping = true;
			else Clapping = false;
		}
		else if(Options.Current == "11") Credits();
	}

	//Keypress mods
	if(KeyPressed == 32 && Jump) ig.game.O5518.vel.y -= 350;
}

//The Mods
function Blank() { alert("Nothing is currently set on this option!"); }
function Gravity() {
	if(ig.game.gravity != 300) ig.game.gravity = 300;
	else ig.game.gravity = 800;
}
function IntervalMods() {
	setInterval( function() {
		if(Clapping) ig.game.O4774.O733(ig.game.O5518.O1040);
	}, 150);
}


function Credits() {
	alert("MOD MENU CREATED BY B!");
	//If you read this you are gay
}
