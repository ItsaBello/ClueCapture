document.addEventListener("DOMContentLoaded", () => {
	const cards = document.querySelectorAll<HTMLDivElement>(".card");
	const clickedCards: string[] = []; // Array to track clicked cards
	let score = 0; // Initialize score
	const scoreCounterElement = document.getElementById('scoreCounter');
	const numberOfcards = document.getElementById('numberOfCards')as HTMLSelectElement;


	// Function to update score display
	function updateScore(newScore: number) {
		score = newScore;
		if (scoreCounterElement) {
			scoreCounterElement.textContent = `Score: ${score}`;
		}
	}

	// Set initial score
	updateScore(score);

	cards.forEach((card) => {
		card.addEventListener("click", () => {
			const cardName = card.getAttribute("data-name");

			const selectedValue = parseInt(numberOfcards.value, 5);

			// Check if the card is already selected
			if (cardName && clickedCards.includes(cardName)) {
				// Deselect the card
				const index = clickedCards.indexOf(cardName);
				clickedCards.splice(index, 1); // Remove card from the array
				card.classList.remove("clicked"); // Remove visual border
				console.log(`Clicked cards: ${clickedCards.join(", ")}`);
				return;
			}

			// Prevent adding more than the selected number of cards
			if (clickedCards.length >= selectedValue) {
				console.log(`You can only select up to ${selectedValue} cards.`);
				return;
			}

			// Select the card
			if (cardName) {
				clickedCards.push(cardName); // Add card to the array
				card.classList.add("clicked"); // Add visual border
				console.log(`Clicked cards: ${clickedCards.join(", ")}`);

				// Increase score
				updateScore(score + 1);
			}
		});
	});

	// Reset functionality for when player interacts with resetButton
	resetButton.addEventListener("click", () => {
		// Reset score
		updateScore(0);

		//Clear clicked cards array
		clickedCards.length = 0;

		// Remove clicked class from all cards
		cards.forEach((card) => card.classList.remove("clicked"));

		console.log("Game reset. Score is now 0.");
	})
});
