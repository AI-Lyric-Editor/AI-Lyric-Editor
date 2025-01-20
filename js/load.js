// This is the javaScript for the loading screen and logic for correct time intervals
window.addEventListener("beforeunload", function(e){
	e.preventDefault();
	e.returnValue = "Make sure you save your lyrics!";
});

// loading time changed for development purposes
document.addEventListener('DOMContentLoaded', function() {
	// Initialize loading elements
	const loading = document.getElementById("loading-bar");
	const loadingPercent = document.getElementById("loading-bar-percent");
	const loadingScreen = document.getElementById("loading-screen");
	const lyrics = document.getElementById("lyrics-page");
	const footer = document.getElementById("footer");
	const popup = document.getElementById("update-bg");
	const blur = document.getElementById("blur-overlay");

	// Set time variables for loadingLoop
	// Play with these 2 values to change speed and waitTime of loading bar
	let interval = 20;
	let waitTime = 500;

	let time = new Date();
	let ms = time.getMilliseconds();
	let lastMs = time.getMilliseconds();

	let loadingLoop = setInterval(() => {
		// update current milliseconds
		ms = time.getMilliseconds();
		// subtract last milliseconds from current milliseconds
		interval = ms - lastMs;
		// update last milliseconds
		lastMs = time.getMilliseconds();
		// update current time
		time = new Date();

		// update loading bar value
		loading.value++;
		// update loading bar percentage
		loadingPercent.innerHTML = loading.value + "%";

		// if loading bar reaches 100%
		if (loading.value == 100) {
			// update loading bar percentage to "DONE" instead of 99%
			loadingPercent.innerHTML = "DONE";

			// close the loop
			clearInterval(loadingLoop);
			// set timeout for loading screen to disappear after 100% has been reached
			setTimeout(() => {
				// hide loading screen
				loadingScreen.style.animation = "fade-out ease-out 250ms";

				setTimeout(() => {
					loadingScreen.style.display = "none";
					footer.style.display = "flex";
					lyrics.style.display = "flex";
					// !IMPORTANT Chache was stored (Backwards Compatible) Seprate Ids for each update
					// Set equal to current version
					if(localStorage.getItem("DisableUpdate") == "0.1.0-beta") {
						popup.style.display = "none";
						blur.style.display = "none";
						console.log("dont show again");
					} else {
						popup.style.display = "block";
						blur.style.display = "block";
					}
				}, 250);

				// for initial lyric animation 

				// show version footer

				// change time below to change amount of time after bar has reached 100%
			}, waitTime);
		}
	}, interval);
});


// FOOTNOTES: 
// Change "interval" variable to change the speed of the loading bar
/* Change "waitTime" variable to change the amount of time the loading
 screen stays after the loading bar reaches 100% */