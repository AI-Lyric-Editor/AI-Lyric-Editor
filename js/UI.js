// document.documentElement.style.setProperty("height", window.innerHeight + "px");

let lastPage;

// TO make title blur when enterkey is pressed
const title = document.getElementById("title");
title.addEventListener("keydown", function (e) {
	if (e.key === "Enter") {
		title.blur();
	}
});

function hideWhenSwitchPage() {
	directions.style.display = "none";
}

// Don't forget logic
let onLyrics = true;
const popup = document.getElementById("update-bg");
const lyrics = document.getElementById("lyrics-page");
const loadingScreen = document.getElementById("loading-screen");
const dontForget = document.getElementById("dont-forget");
setInterval(() => {	
	if (popup.style.display == "none" && lyrics.style.display != "none") {
		dontForget.classList.remove("slide-out");
		dontForget.classList.add("slide-right");
		dontForget.addEventListener("animationend", () => {
			dontForget.style.transform = "translate(0)";
		});
		dontForget.addEventListener("click", () => {
			hideDontForget()
		});
		setTimeout(() => {
			hideDontForget();
			// Time before dont show goes up
		}, 7500);
	}
	// time dont forget is up
}, 30000);

function hideDontForget() {
	dontForget.classList.remove("slide-right");
	dontForget.classList.add("slide-out");
	dontForget.addEventListener("animationend", () => {
		dontForget.style.transform = "translate(-500%)";
	});
}


// function scrollIntoView() {
// 	textarea.scrollIntoView({ behavior: 'smooth', block: "end" });
// }

function select() {
	const buttonBG = document.querySelectorAll(".direction-bg");
	const directions = document.getElementById("directions");
	
		if (directions.style.display == "flex") {

		buttonBG.forEach(buttonBG => {
			buttonBG.classList.add("direction-bg-out");
			buttonBG.classList.remove("direction-bg-in");
		});

		setTimeout(() => {
			directions.style.display = "none";
		}, 300);

	} else {
		buttonBG.forEach(buttonBG => {
			buttonBG.classList.add("direction-bg-in");
			buttonBG.classList.remove("direction-bg-out");
		});

		directions.style.display = "flex";
	}
}

const blur = document.getElementById("blur-overlay");
const checkbox = document.getElementById("check");

function closePopup() {
	const popup = document.getElementById("update-bg");
	const blur = document.getElementById("blur-overlay");
	const checkbox = document.getElementById("check");
	popup.style.display = "none";
	blur.style.display = "none";

	if (checkbox.checked) {
		localStorage.setItem("DisableUpdate", "0.1.0-beta");
	}
}

let saveText = "Untitled Song";

function makeEditable() {
	let title = document.getElementById("title");
	let charCount = document.getElementById("title-charCount");

	title.contentEditable = "true";
	title.style.borderBottom = "2px solid white";

	charCount.style.display = "block";

	title.innerHTML = saveText;
	title.focus();
	title.scrollTo(title.scrollWidth, 0)

	const range = document.createRange();
	range.selectNodeContents(title);
	range.collapse(false);

	const selection = window.getSelection()
	selection.removeAllRanges();
	selection.addRange(range);
}

let gMaxChars;

function makeNonEditable() {
	let title = document.getElementById("title");
	let charCount = document.getElementById("title-charCount");
	let currentLength = title.innerText.length;

	saveText = title.innerText;

	if (currentLength > gMaxChars) {
		let result = alert("To many charaters!");
		return;
	}

	if (currentLength < 1) {
		title.innerHTML = "Untitled Song";
	}

	charCount.style.display = "none";
	title.style.overflowX = "hidden";

	title.contentEditable = "false";
	title.style.borderBottom = "none";
	title.scrollTo(0, 0);

	let scrollWidth = title.scrollWidth;
	let clientWidth = title.clientWidth;

	const avgCharWidth = scrollWidth / title.innerText.length;

	const visibleChars = clientWidth / avgCharWidth;

	if (currentLength > visibleChars) {
		title.innerHTML = title.innerHTML.substring(0, visibleChars - 2) + "...";
	}
}

let newlines = 0;

function updateCharCount(charId, inputId, maxChars, redText) {
	let input = document.getElementById(inputId);
	let charCount = document.getElementById(charId);
	let toMany = document.getElementById("to-many");

	

	gMaxChars = maxChars;

	let currentLength = input.innerText.length;

	let newCount = `${currentLength}/${maxChars}`;

	if (currentLength > maxChars) {
		charCount.style.color = "red";
		if (redText) {
			input.style.color = "red";
		} else {
			toMany.style.display = "block";
		}
	} else {
		charCount.style.color = "white";
		input.style.color = "white";
		toMany.style.display = "none";
	}

	charCount.innerHTML = newCount;
}

// To initailly update title content becuase it containes Untitled Song by default
updateCharCount('title-charCount', 'title', 40, true);

function switchPage(page) {
	// To remove select buttons on lyric editor if there out
	hideWhenSwitchPage();

	// Pages
	const lyrics = document.getElementById("lyrics-page");
	const songs = document.getElementById("songs-page");
	const settings = document.getElementById("settings-page");
	const feedback = document.getElementById("feedback-page");

	// Navigation bar tabs
	let lyricsTab = document.getElementById("lyricTab");
	let songsTab = document.getElementById("songsTab");
	let settingsTab = document.getElementById("settingsTab");
	let feedbackTab = document.getElementById("feedbackTab");

	// Left/right transition elements
	let settingsBG = document.querySelectorAll(".settings-bg");

	// Header tools 
	let lyricTitle = document.querySelector(".title");

	/* Define a class for all pages/tabs.
	 For use when hiding/removing class for ALL OTHER pages/tabs */
	const tabs = document.querySelectorAll(".navTab");
	const pages = document.querySelectorAll(".page");

	// Define page order
	const pageOrder = [lyrics, songs, settings, feedback];

	// To switch button tab and add background
	function changeTab(currentTab) {
		// Remove tab backgrounds for all other tabs
		tabs.forEach(tab => {
			tab.classList.remove("current");
		});

		// Add tab background for current tab
		currentTab.classList.add("current");
	}

	// To change page
	function changePage(currentPage) {
		// Set lastPage
		lastPage = currentPage;

		// Hide all other pages
		pages.forEach(page => {
			page.style.display = "none";
		});

		// Show current page
		currentPage.style.display = "flex";
	}

	// To switch header tools
	function changeTools(currentTools) {
		// True becuase no other tools have been created
		if (currentTools == true) {
			lyricTitle.style.display = "flex";
		} else {
			lyricTitle.style.display = "none";
		}
	}

	// To add left and right transitions dependent on which side your on
	function transition(currentPage, transitionLeft, transitionRight, element) {
		// Find the index of the last page
		let lastPageIndex;
		pageOrder.forEach((page, index) => {
			if (page == lastPage) lastPageIndex = index;
		});

		/* Compare the current page index with the last
		 page index and add transitions accordingly */
		pageOrder.forEach((page, index) => {
			if (page == currentPage) {
				if (lastPageIndex < index && lastPage) {
					element.classList.add(transitionLeft);
					element.classList.remove(transitionRight);
				} else if (lastPage != currentPage) {
					element.classList.add(transitionRight);
					element.classList.remove(transitionLeft);
				}
			}
		});
	}

	// Actual logic for switching pages depending on which button tab called the function
	switch (page) {
		case "lyrics":
			changeTab(lyricsTab);

			changeTools(true);

			changePage(lyrics);
			onLyrics = true;
			break;

		case "songs":
			changeTab(songsTab);

			changeTools(false);

			changePage(songs);
			onLyrics = false;
			break;

		case "settings":
			settingsBG.forEach(element => {
				transition(settings, "settings-slide-left", "settings-slide-right", element);
			});

			changeTab(settingsTab);

			changeTools(false);

			changePage(settings);
			onLyrics = false;
			break;

		case "feedback":
			changeTab(feedbackTab);

			changeTools(false);

			changePage(feedback);
			onLyrics = false;
			break;
	}
}

console.log("checking terminal");

const bg = document.getElementById("bg");
const tools = document.querySelectorAll(".tool-buttons");

const copyButton = document.getElementById("copy");

copyButton.addEventListener("click", (e) => {
	const tooltip = document.getElementById('copy-tooltip');
	const instructions = document.getElementById("tap-lyrics");

	const header = document.getElementById("mobile-logo");
	setTimeout(function() {
		header.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}, 200); 

	setTimeout(() => {
		tooltip.style.display = "flex";
		tooltip.style.animation = "tooltip-grow 250ms ease-in";

		
		setTimeout(() => {
			instructions.style.display = "flex";
			instructions.style.animation = "tooltip-grow 250ms ease-in";
		}, 500);

		setTimeout(() => {
			tooltip.style.animation = "fade-out 500ms ease-out";
			setTimeout(() => {
				tooltip.style.display = "none";
				// Set same time as fade-out
			}, 500);
		}, 2000);

		followingInstructions = true;

		textarea.addEventListener("click", () => {hideInstruct("click");});

		function hideInstruct(event) {
			instructions.style.animation = "fade-out 500ms ease-out";
			setTimeout(() => {
				instructions.style.display = "none";
				// Set same time as fade-out
			}, 500);
			textarea.removeEventListener(event);
		}
		// To add time for scroll to header to stop;
	}, 500);

	selectText('lyrics');
	// showTapLyrics();
	
	if (!navigator.clipboard) {
    textarea.innerText.select();
		textarea.innerText.setSelectionRange(0, 99999);
		document.execCommand("copy");
	} else {
    navigator.clipboard.writeText(textarea.innerText).then(
        function(){
					// 
        })
      .catch(
         function() {
            alert("There was an error when copying"); // error
      });
	} 
});
	

function selectText(elementId) {
	const element = document.getElementById(elementId);
	if (document.body.createTextRange) { // for IE
			const range = document.body.createTextRange();
			range.moveToElementText(element);
			range.select();
	} else if (window.getSelection) { // for modern browsers
			const range = document.createRange();
			range.selectNodeContents(element);
			const selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
	}
}

function scrollToElementOnFocus(elementId) {
	var element = document.getElementById(elementId);
	element.addEventListener('click', function() {
		setTimeout(function() {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}, 300); // Adjust the delay as needed
	});
}
scrollToElementOnFocus("lyrics");

const lyricarea = document.getElementById("lyrics");

const bodyHeight = document.documentElement.clientHeight;
const bodyWidth = document.documentElement.clientWidth;

window.addEventListener("resize", () => {
	if (document.documentElement.clientHeight < bodyHeight) {
		document.body.style.height = `${bodyHeight}px`;
		document.body.style.width = `${bodyWidth}px`;
	} else {
		document.body.style.height = "100%";
		document.body.style.width = "100%";
	}
	setTimeout(function() {
		element.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}, 300); // Adjust the delay as needed
});







