function drawBarGraph(data) {
	const max = Math.max(...data);
	const scale = 50 / max; // Scale the graph to fit within 50 characters wide

	data.forEach((value, index) => {
		let status = "null";
		if (value <= 20) {
			status = "FAST!";
		} else if (value < 40 && value > 20) {
			status = "NORMAL";
		}  else if (value < 10000 && value > 40) {
			status = "SLOW!";
		}

		const bar = '█'.repeat(value * scale);
		console.log(`${index + 1}: ${bar} (${value}) ${status}`);
	});
}

function scrollToEnd(elementId) {
	var textarea = document.getElementById(elementId);
	textarea.addEventListener('input', function() {
			// Check if the cursor is at the end of the text
		textarea.scrollTop = textarea.scrollHeight;
	});
}