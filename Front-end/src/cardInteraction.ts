document.addEventListener("DOMContentLoaded", () => {
	const cards = document.querySelectorAll<HTMLDivElement>(".card");
	const clickedCards: string[] = []; // Array to track clicked cards
	const numberOfcards = document.getElementById("numberOfcards") as HTMLSelectElement;

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

			// Prevent adding more than 4 cards
			if (clickedCards.length >= selectedValue) {
				console.log(`You can only select up to ${selectedValue} cards.`);
				return;
			}

			// Select the card
			if (cardName) {
				clickedCards.push(cardName); // Add card to the array
				card.classList.add("clicked"); // Add visual border
				console.log(`Clicked cards: ${clickedCards.join(", ")}`);
			}
		});
	});

	numberOfcards.addEventListener("change", () => {
		clickedCards.length = 0;
		cards.forEach((card) => {
			card.classList.remove("clicked");
		});
	});
});
