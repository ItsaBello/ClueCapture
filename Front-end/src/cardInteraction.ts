import { getCardImageMap, getImageUrlByIndex } from './imageLoader.js';

const clickedCards: string[] = []; // Array to track clicked cards
const indexOfClickedCards: number[] = [];

export function getIndexOfSelectedCards(): number[] {
	if(indexOfClickedCards.length === 0) {
		return [];
	};
	return [...indexOfClickedCards]; // Returns a shallow copy of the clickedCards array
}

document.addEventListener("DOMContentLoaded", () => {
	const cards = document.querySelectorAll<HTMLDivElement>(".card");
	let score = 0; // Initialize score
	const scoreCounterElement = document.getElementById('scoreCounter');
	const numberOfcards = document.getElementById('numberOfCards')as HTMLSelectElement;
	const resetButton = document.getElementById('resetButton')as HTMLButtonElement;
	
	// Function to update score display
	function updateScore(newScore: number) {
		score = newScore;
		if (scoreCounterElement) {
			scoreCounterElement.textContent = `Score: ${score}`;
		}
	}

	function getSelectedCards(): string[] {
		if(clickedCards.length === 0) {
			return [];
		};
		return [...clickedCards]; // Returns a shallow copy of the clickedCards array
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
				indexOfClickedCards.push(parseInt(card.getAttribute("data-name") || "0", 10));
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
		indexOfClickedCards.length = 0;

		// Remove clicked class from all cards
		cards.forEach((card) => card.classList.remove("clicked"));

		console.log("Game reset. Score is now 0. Clicked cards are:" + getSelectedCards());
	})
	const exampleButton = document.getElementById("exampleButton") as HTMLButtonElement;
	exampleButton?.addEventListener("click", () => {
		const selectedCards = getSelectedCards();
		console.log("Currently selected cards:", selectedCards);
	});
});