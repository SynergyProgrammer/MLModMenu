var canvas = document.createElement('canvas');
var body = document.getElementsByTagName("body")[0].appendChild(canvas);
var ctx = canvas.getContext("2d");
canvas.style.position = "relative";
canvas.width  = ig.ua.viewport.width;
canvas.height = 200;
ig.game.O6307.kill = function(){}

var menu = {
	open: false,
	width: 150,
	height: 150,
	opening: false,
	name: "B'S MENU v1.0",
	inmenu: 0,
	onoption: 1
};

var scroller = {
	anim: false,
	width: 150,
	height: 20
};

var title = {
	x: 0,
	y: 15,
	size: "15px",
	font: "Arial Black"
}

var mods = {
	gravity: false,
	noclip: false
};

setInterval(function() {
	if(menu.open) UpdateCanvas();
	if(menu.opening) MenuAnim("open");
}, 30);

setInterval(function() {
	if(menu.opening == "complete") {
		if(menu.name != "B'S MENU v1.0") menu.name = "B'S MENU v1.0";
		else menu.name = "B'S MENU";
	}
}, 500);

function UpdateCanvas() {
	ctx.clearRect(0,0, canvas.width,canvas.height);
	Draw("solid","rgba(0, 0, 0, 0.5)",0,0,menu.width,menu.height);
	Draw("solid","rgba(135,206,235,.5)",0,menu.onoption*20 + 6.5,scroller.width,scroller.height);
	Draw("write","rgba(255, 255, 255, 1)",title.x,20,0,0,"15px","Arial Black",menu.name);
	if(menu.inmenu == 0 && menu.opening == "complete") {
		Draw("write","rgba(255, 255, 255, 1)",0,40,0,0, "15px","Arial","Main Mods");
		Draw("write","rgba(255, 255, 255, 1)",0,60,0,0, "15px","Arial","Spamming");
		Draw("write","rgba(255, 255, 255, 1)",0,80,0,0, "15px","Arial","Bodys");
		Draw("write","rgba(255, 255, 255, 1)",0,100,0,0,"15px","Arial","Player");
		Draw("write","rgba(255, 255, 255, 1)",0,120,0,0,"15px","Arial","Misc");
		Draw("write","rgba(255, 255, 255, 1)",0,140,0,0,"15px","Arial","Credits");
	}
	if(menu.inmenu == 1 && menu.opening == "complete") {
		Draw("write","rgba(255, 255, 255, 1)",0,40,0,0, "15px","Arial","Gravity");
		Draw("write","rgba(255, 255, 255, 1)",0,60,0,0, "15px","Arial","No-Clip");
		Draw("write","rgba(255, 255, 255, 1)",0,80,0,0, "15px","Arial","Friction");
		Draw("write","rgba(255, 255, 255, 1)",0,100,0,0,"15px","Arial","4");
		Draw("write","rgba(255, 255, 255, 1)",0,120,0,0,"15px","Arial","5");
		Draw("write","rgba(255, 255, 255, 1)",0,140,0,0,"15px","Arial","Crash Game");
	}
}

document.onkeydown = function(e) {
	if(e.which == 27) {
		if(menu.inmenu == 0) {
			if(menu.open) MenuActions("close");
			else if(!menu.open) MenuActions("open");
		}
		else
		{
			scroller.width = 0;
			scroller.anim = true;
			MenuAnim("select");
			menu.inmenu = 0;
			menu.onoption = 1;
		}
	}
	if(menu.open) {
		if(e.which == 38 && menu.onoption > 1) menu.onoption--;
		if(e.which == 40 && menu.onoption < 6) menu.onoption++;
		if(e.which == 17) {
			scroller.width = 0;
			scroller.anim = true;
			MenuAnim("select");
			if(menu.inmenu == 0) {
				menu.inmenu = menu.onoption;
				menu.onoption = 1;
			}
			else {
				CheckMod();
			}
		}
	}
	if(mods.noclip) {
		mods.gravity = false;
		ig.game.gravity = 0;
		if(e.which == 37) ig.game.O6307.pos.x -= 5;
		if(e.which == 39) ig.game.O6307.pos.x += 5;
		if(e.which == 40) ig.game.O6307.pos.y += 5;
		if(e.which == 38) ig.game.O6307.pos.y -= 5;
	}
}

function Draw(type, color, x, y, width, height, size, font, text) {
	if(type == "solid") {
		ctx.fillStyle = color;
		ctx.fillRect(x,y,width,height);
	}
	if(type == "write") {
		ctx.fillStyle = color;
		ctx.font = size + " " + font;
    	ctx.fillText(text,x,y);
	}
}

function MenuActions(action) {
	if(action == "close") {
		ctx.clearRect(0,0, canvas.width,canvas.height);
		menu.open = false;
	}
	if(action == "open") {
		menu.onoption = 1;
		menu.open = true;
		menu.width = 0;
		title.x = -200;
		menu.opening = true;
	}
}

function MenuAnim(anim) {
	if(anim == "open") {
		if(menu.width < 150) menu.width += 10;
		if(title.x < 5) title.x += 10;
		else menu.opening = "complete";
	}
}

setInterval(function () {
	if(scroller.anim) {
		if(scroller.width < 150) scroller.width = scroller.width + 10;
		else scroller.anim = false;
	}
}, 20);

function CheckMod() {
	if(menu.inmenu != 0) {
		//gravity
		if(menu.onoption == 1) {
			if(!mods.gravity) {
				mods.gravity = true;
				ig.game.gravity = 300;
			}
			else {
				mods.gravity = false;
				ig.game.gravity = 800;
			}
		}
		//noclip
		if(menu.onoption == 2) {
			if(!mods.noclip) mods.noclip = true;
			else {
				ig.game.gravity = 800; 
				mods.noclip = false;
			}
		}
		//friction
		if(menu.onoption == 3) {
			ig.game.O6307.friction = 0;
		}
		//gamecrash
		if(menu.onoption == 6) {
			ig.game.O6307.bounciness = Infinity;
		}
	}
}
