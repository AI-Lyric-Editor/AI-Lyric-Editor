function saveCursorPos(selection) {
	const range = selection.getRangeAt(0);
	const preCursorRange = range.cloneRange();
	preCursorRange.selectNodeContents(textarea);
	preCursorRange.setEnd(range.startContainer, range.startOffset);

	let returnValue = preCursorRange.toString().length;

	return returnValue;
}

// Function to restore the cursor position
function restoreCursorPos(cursorPos, selection) {
	const walker = document.createTreeWalker(textarea, NodeFilter.SHOW_TEXT, null, false);
	let node;
	let position = 0;

	while ((node = walker.nextNode())) {
		const nodeLength = node.textContent.length;
		if (position + nodeLength >= cursorPos) {
			const newRange = document.createRange();
			newRange.setStart(node, cursorPos - position);
			newRange.setEnd(node, cursorPos - position);
			selection.removeAllRanges();
			selection.addRange(newRange);
			break;
		}
		position += nodeLength;
	}
}