// JavaScript is capitalized using "camel case": https://en.wikipedia.org/wiki/Camel_case
// Check out the power of the classList property: https://www.w3schools.com/jsref/prop_element_classlist.asp
var removeableBox = document.getElementById("first-switch");
var shakeWrapper = document.getElementById("shake-wrapper");
var sideBarImg = document.getElementById("sidebar-img");
var sliderSpeed = "1s";
/*base saturation for the sidebar*/
var saturation = 0;
var arrowNotClicked = true;
var allStatsLoaded = false;

var chartSound = document.getElementById("chart-sound");

/*create an array of all possible random sounds from the html*/
var sfxSounds = document.getElementsByClassName("sfx-sound");

var statSounds = document.getElementsByClassName("stat-sound");

/*will alternate between the png and gif*/
var switchBoxState = true;
function switchBox() {
	if (switchBoxState) {
		removeableBox.classList.add('slide-up');
		removeableBox.classList.remove('slide-down');
	} else {
		removeableBox.classList.add('slide-down');
		removeableBox.classList.remove('slide-up');
	}
	/*store the state of the classlist in a bool for ease*/
	switchBoxState = !switchBoxState;
	console.log("Switched box image");
	console.log(switchBoxState);
}
/*this will update the box switch button/envelope position then calls the switchbox function*/
function alternateGif(elem) {
	switchBox();
	/*if its the first time getting clicked*/
	if (arrowNotClicked) {
		elem.classList.add("move-arrow-to-bottom");
		arrowNotClicked = false;
	}
	elem.classList.toggle("move-arrow-to-top");
	elem.classList.toggle("move-arrow-to-bottom");
}

/*turns the chart into a gif*/
function loadChart(elem) {
	elem.src = "images/chart2.gif";
	var sfx = chartSound.play();
	sfx.currentTime = 0;
}
/*used to set each slider. will shake the screen and increase sidebar saturation. plays a random sound. removes clickablity.*/
function setPercent(elem, type) {
	elem.style.animation = type + " " + sliderSpeed + " forwards";
	screenShake(elem);
	increaseSaturation(20);
	elem.parentElement.classList.remove("clickable");
	elem.parentElement.classList.remove("slider-preclick");
	randomStatSound();
}

/*calls a random index from the sound array*/
function randomStatSound() {
	var audioType = Math.floor(Math.random() * statSounds.length);
	statSounds[audioType].play();
	statSounds[audioType].currentTime = 0;
}
/*same as above for a different array*/
function randomSFX() {
	var audioType = Math.floor(Math.random() * sfxSounds.length);
	sfxSounds[audioType].play();
	sfxSounds[audioType].currentTime = 0;
}
/*works by adding a CSS animation to the global shrink wrapper (or restarting the animation)*/
function screenShake(elem) {
	elem.onclick = "";
	shakeWrapper.classList.remove("shake");
	//pause for one frame to allow update
	void shakeWrapper.offsetWidth;
	shakeWrapper.classList.add("shake");
}

function spinThis(elem) {
	elem.classList.remove("spin-2d");
	//pause for one frame to allow update
	void shakeWrapper.offsetWidth;
	elem.classList.add("spin-2d");
}
/*adds a crazy spin to the entire page - CSS*/
function screenSpin() {
	if (allStatsLoaded) {
		shakeWrapper.classList.remove("spin");
		//pause for one frame to allow update
		void shakeWrapper.offsetWidth;
		shakeWrapper.classList.add("spin");
	}
}

/*adds a crazy spin to every individual element - CSS*/
function everythingSpin(elem) {
	if (allStatsLoaded) {
		var spinnables = document.getElementsByClassName("will-spin");
		for (var i = 0; i < spinnables.length; i++) {
			currentElem = spinnables[i];
			currentElem.classList.remove("spin");
			//offset width gives a 1 frame break for the classlist to update before
			//readding the class and its animation
			currentElem.offsetWidth;
			currentElem.classList.add("spin");
		}
		/*creates a Queue of random sounds to be played for the next few seconds*/
		for (var i = 0; i < 10; i++) {
			millisecondDelay = i * 400;
			setTimeout(randomSFX, millisecondDelay);
			setTimeout(randomStatSound, millisecondDelay);
		}
	}
}

maximumSaturation = 100;
function increaseSaturation(amount) {
	saturation += amount;
	if (saturation == maximumSaturation) {
		allStatsLoaded = true;
		sideBarImg.classList.add("oscillate");
		sideBarImg.style.filter = "saturate(" + 10 + ")";
	}
	else if (allStatsLoaded == false) {
		decimalValue = (saturation/100);
		sideBarImg.style.filter = "saturate(" + decimalValue + ")";
	}
}

function playAudioMic(elem) {
	soundName = elem.getAttribute("data-sound");
	audioNode = document.getElementById(soundName);
	console.log(soundName);
	//if the audio is not playing, play it. otherwise, if its a certain file, pause it.
	if (audioNode.paused) {
		var newAudio = audioNode.play();
		newAudio.currentTime = 0;
	}
	//if the audio is playing and is one of the full songs, just end the audio. Like an on/off
	else if (soundName == "mar-cena" || soundName == "sfx-trash-talk") {
		audioNode.pause();
		audioNode.currentTime = 0;
		console.log("pause");
	}
	
}

function tryReset() {
	if (allStatsLoaded)
		location.reload();
}

function reloadPage() {
	location.reload();
}
