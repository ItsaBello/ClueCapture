export async function fetchGameCardsFromDB() {
	const gameBoard = document.getElementById("gameBoard") as HTMLElement;
	const cards = gameBoard.querySelectorAll(".card-image");
	cards.forEach((card) => (card.innerHTML = "")); // Clear the game board
	
	
	// Fetch hint and images
	const response = await fetch("http://localhost:3000/api/getHint", {
		method: "GET"
	});

	if (!response.ok) {
		throw new Error("Failed to load hint.");
	}

	const {data, message} = await response.json();
	console.log(message); // "Hint loaded successfully"

	// Extract hint and images from the response
	const hint = data.Hints[0]?.hint_text || "No hint available";
	const images = data.Images || [];
	const gameId = data.game_id || "No game id available";

	console.log(gameId, hint, images); // Print de loaded game data naar browser console

	// Display the hint
	window.UIManager.displayHint(hint);
	// Check if images are available
	if (images.length !== 16) {
		throw new Error("Invalid number of images received.");
	}

	// Render images on the game board
	images.forEach(({image_id, image_url}: {image_id: number; image_url: string}, index: number) => {
		const card = cards[index];
		const img = new Image();
		img.src = image_url;
		img.alt = `Image ${image_id}`;
		card.appendChild(img);
	});
}
