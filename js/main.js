const textarea = document.getElementById('lyrics');
let lyricTitle = document.getElementById('title');

textarea.addEventListener("input", (e) => {
	const selection = window.getSelection();
	let cursorPos = saveCursorPos(selection);

	textarea.innerHTML = textarea.innerText;

	let newText = applyHighlighting();

	textarea.innerHTML = newText;

	restoreCursorPos(cursorPos, selection);
});

function applyHighlighting() {
	let newHTML = textarea.innerHTML;
	syntax.forEach((value) => {
		newHTML = newHTML.replace(value.match, (match) => {
			return `<span style="${value.style}">${match}</span>`;
		});
	});
	
	return newHTML;
}
