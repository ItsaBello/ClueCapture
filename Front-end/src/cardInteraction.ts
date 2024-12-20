import {Card} from "./classes/card.js";
import {fetchGameCards} from "./imageLoader.js";

console.log("Card interaction initialized.");
const clickedCards: string[] = []; // Array to track clicked cards
const indexOfClickedCards: number[] = [];
const numberOfcards = document.getElementById('numberOfCards')as HTMLSelectElement;

export function getIndexOfSelectedCards(): number[] | null {
	if(parseInt(numberOfcards.value) != indexOfClickedCards.length) {
		return null;
	};
	return [...indexOfClickedCards]; // Returns a shallow copy of the clickedCards array
}

console.log("Card interaction initialized.");
document.addEventListener("DOMContentLoaded", () => {
	console.log("DOM loaded.");
	// const cards = document.querySelectorAll<HTMLDivElement>(".card");
	const gameBoard = document.getElementById("gameBoard") as HTMLElement;
	let score = 0; // Initialize score
	const scoreCounterElement = document.getElementById('scoreCounter');
	const resetButton = document.getElementById('resetButton')as HTMLButtonElement;
	
	// Function to update score display
	function updateScore(newScore: number) {
		score = newScore;
		if (scoreCounterElement) {
			scoreCounterElement.textContent = `Score: ${score}`;
		}
	}
	console.log("Card interaction initialized.");
	function getSelectedCards(): string[] {
		if (clickedCards.length === 0) {
			return [];
		}
		return [...clickedCards]; // Returns a shallow copy of the clickedCards array
	}
	function generateCards(count: number) {
		console.log("Generating cards...");
		for (let i = 0; i < count; i++) {
			const cardElement = Card.createCardElement(i);
			gameBoard.appendChild(cardElement);
			handleCardClick(cardElement);
		}
	}

	function handleCardClick(card: HTMLElement) {
		card.addEventListener("click", () => {
			const cardName = card.getAttribute("data-name");
			const selectedValue = parseInt(numberOfcards.value, 10);

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
	}
	console.log("Game board initialized.");
	// Set initial score
	updateScore(score);

	generateCards(16);
	fetchGameCards();

	// Reset functionality for when player interacts with resetButton
	resetButton.addEventListener("click", () => {
		// Reset score
		updateScore(0);
		//Clear clicked cards array
		clickedCards.length = 0;
		indexOfClickedCards.length = 0;
		// Remove clicked class from all cards
		const cards = document.querySelectorAll(".card");
		cards.forEach((card) => card.classList.remove("clicked"));
		fetchGameCards();
		console.log("Game reset. Score is now 0. Clicked cards are:" + getSelectedCards());
	});

	const exampleButton = document.getElementById("exampleButton") as HTMLButtonElement;
	exampleButton?.addEventListener("click", () => {
		const selectedCards = getSelectedCards();
		console.log("Currently selected cards:", selectedCards);
	});
});
