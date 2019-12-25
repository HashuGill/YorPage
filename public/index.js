var countdown = document.getElementById("tiles"); // get tag element
// getCountdown();
// setInterval(function () { getCountdown(); }, 1000);
//targetMin = document.getElementById('a').addEventListener('click',updateTarget); //blocking call
var target;
const onStartMin = 50;
const onStartSec = pad(0);
countdown.innerHTML =  "<span>" + onStartMin + "</span><span>" + onStartSec + "</span>"; 
var timer;
function getCountdown(target_date){

	// find the amount of "seconds" between now and target
	var current_date = new Date().getTime();
	var seconds_left = 0;
	if(target_date > current_date){
		seconds_left = (target_date - current_date) / 1000;
	    seconds_left = seconds_left % 3600;	
	}
	var minutes = pad( parseInt(seconds_left / 60) );
	var seconds = pad( parseInt( seconds_left % 60 ) );
	

	// format countdown string + set tag value
	countdown.innerHTML =  "<span>" + minutes + "</span><span>" + seconds + "</span>"; 
}
function pad(n) {
	return (n < 10 ? '0' : '') + n;
}

function stop(){
	document.getElementById("myButton2").innerHTML = "Pomodoro";
	console.log("we are here");
	clearInterval(timer);

}


function play(time){

	document.getElementById("myButton2").innerHTML = "Stop";
	target_date = new Date().getTime() + (1000*3600*time/60);
	getCountdown(target_date);
    timer = setInterval(function () { getCountdown(target_date); }, 1000);
}

function pomodoro(){
	if (document.getElementById("myButton2").innerHTML =="Stop"){
		stop();
	}
	else{
		var time = prompt("Set minutes to Pomodoro : ", "25");
  		if (time != null) {
    	play(time);
  		}
		
	}
}
function SetBreak(time)
{
	target_date = new Date().getTime() + (1000*3600*time/60);
	getCountdown(target_date);
    timer = setInterval(function () { getCountdown(target_date); }, 1000);

}

document.getElementById("loginButton").onclick = function() {
	location.href = "/auth/login";
}

document.getElementById("logoutButton").onclick = function() {
	location.href = "/auth/logout";
}