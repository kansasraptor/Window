/* global console:true, TweenLite:true, Power2:true */

//++++++++++++++++++++++++++++++++++++++++++
// VARIABLES
//++++++++++++++++++++++++++++++++++++++++++

var bg_01 = document.getElementById("bg_01"),
	bg_02 = document.getElementById("bg_02"),
	logo = document.getElementById('logo'),
	red = document.getElementById('red'),
	black = document.getElementById('black'),
	slash = document.getElementById('slash'),
	chromeCover = document.getElementById("chromeCover"),
	clickScreen = document.getElementById("clickScreen");

var copy_01 = document.getElementById("copy_01"),
    copy_02 = document.getElementById("copy_02"),
	copy_03 = document.getElementById("copy_03"),
	copy_04 = document.getElementById("copy_04"),
	copy_05 = document.getElementById("copy_05"),
	copy_06 = document.getElementById("copy_06"),
	copy_07 = document.getElementById("copy_07");

var cta = document.getElementById("cta"),
	shimmer = document.getElementById("shimmer");

var tweenDelay = 0,
	tt = TweenLite.to,
    ts = TweenLite.set,
    td = TweenLite.delayedCall;

var slow = 2,
	medium = 1,
	fast = 0.5;

//++++++++++++++++++++++++++++++++++++++++++
// BEHAVIORS & LISTENERS
//++++++++++++++++++++++++++++++++++++++++++

function cta_over(){
	console.log("shimmer");
    TweenLite.to(shimmer, 0.8, { backgroundPosition : "138px  0px", ease:Power2.easeOut});
}

function addListeners(){
	console.log("mouseover");
    clickScreen.addEventListener("mouseover", cta_over);
}

//++++++++++++++++++++++++++++++++++++++++++
// SEQUENCE
//++++++++++++++++++++++++++++++++++++++++++

function seq04(){
	tweenDelay = 0;
	console.log("seq04");

	tweenDelay += medium;
	tt(red, medium, { x: 0, delay: tweenDelay , ease: Power2.easeInOut  });
	tt([copy_04, copy_05, copy_06], fast, { autoAlpha: 0, delay: tweenDelay , ease: Power2.easeInOut  });

	tweenDelay += slow;
	tt(bg_02, 0, { autoAlpha: 0, delay: tweenDelay , ease: Power2.easeInOut  });
	tt(black, 0, { autoAlpha: 1, delay: tweenDelay , ease: Power2.easeInOut  });	
	tt(red, medium, { x: -729, delay: tweenDelay });

	tweenDelay += fast;
	tt(copy_07, fast, { autoAlpha: 1, delay: tweenDelay + 0.35 , ease: Power2.easeInOut  });

	tweenDelay += slow;
	tt([logo, cta], medium, { autoAlpha: 1, delay: tweenDelay , ease: Power2.easeInOut  });

	tweenDelay += medium;
	TweenLite.delayedCall(tweenDelay, cta_over);
}

function seq03(){
	tweenDelay = 0;
	console.log("seq03");

	tweenDelay += medium;
	tt(copy_04, fast, { autoAlpha: 1, delay: tweenDelay, ease: Power2.easeInOut });

	tweenDelay += medium;
	tt(copy_05, fast, { autoAlpha: 1, delay: tweenDelay , ease: Power2.easeInOut  });

	tweenDelay += medium;
	tt(copy_06, fast, { autoAlpha: 1, delay: tweenDelay , ease: Power2.easeInOut  });	

	tweenDelay += slow;
	TweenLite.delayedCall(tweenDelay, seq04);
}

function seq02(){
	tweenDelay = 0;
	console.log("seq02");

	tweenDelay += medium;
	tt(red, medium, { x: 0, delay: tweenDelay });
	tt([copy_01, copy_02, copy_03, slash], fast, { autoAlpha: 0, delay: tweenDelay , ease: Power2.easeInOut  });

	tweenDelay += slow;
	tt(bg_01, 0, { autoAlpha: 0, delay: tweenDelay , ease: Power2.easeInOut  });	
	tt(bg_02, 0, { autoAlpha: 1, delay: tweenDelay - 0.35 , ease: Power2.easeInOut  });
	tt(red, medium, { x: - 363, delay: tweenDelay - 0.30 , ease: Power2.easeInOut  });

	TweenLite.delayedCall(tweenDelay, seq03);
}

function seq01(){
	tweenDelay = 0;
	console.log("seq01");

	tweenDelay += medium;
	tt(copy_01, fast, { autoAlpha: 1, delay: tweenDelay , ease: Power2.easeInOut  });

	tweenDelay += medium;
	tt(copy_02, fast, { autoAlpha: 1, delay: tweenDelay , ease: Power2.easeInOut  });

	tweenDelay += medium;
	tt(copy_03, fast, { autoAlpha: 1, delay: tweenDelay , ease: Power2.easeInOut  });	

	tweenDelay += fast;
	tt(slash, 0.65, { height: "28px", autoAlpha: 1, delay: tweenDelay , ease: Power2.easeInOut  });		
	
	tweenDelay += fast;
	td(tweenDelay, seq02);
}

//++++++++++++++++++++++++++++++++++++++++++
// INITIALIZE
//++++++++++++++++++++++++++++++++++++++++++

function init(){
	console.log("Init");

	//Hide all objects, fade chromeCover out and start the sequence
	ts([bg_02, black], { autoAlpha: 0 });

	ts(red, { x: - 363 });
	
	ts(slash, { height: "0" , autoAlpha: 0 });
	ts([copy_01, copy_02, copy_03, copy_04, copy_05, copy_06, copy_07], { autoAlpha: 0 });
	ts([logo], { autoAlpha: 0 });

	ts(cta, { autoAlpha: 0 });
	tt(chromeCover, 0.3, { autoAlpha: 0 });
	addListeners();
	td(0.3, seq01);
}

window.onload = function(){
	init();
};
