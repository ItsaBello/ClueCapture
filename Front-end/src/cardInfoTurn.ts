let currentlyFlippedCard: HTMLElement | null = null;

document.querySelectorAll(".card .info-button").forEach((button) => {
	button.addEventListener("click", (event) => {
		event.stopPropagation(); // Prevent the click event from propagating to the card

		const card = button.closest(".card") as HTMLElement;
		if (card) {
			// Flip back the currently flipped card if it exists and is not the same as the clicked card
			if (currentlyFlippedCard && currentlyFlippedCard !== card) {
				currentlyFlippedCard.classList.remove("flipped");
				const previousImage = currentlyFlippedCard.querySelector("img") as HTMLElement;
				if (previousImage) {
					previousImage.classList.remove("hidden");
				}
			}

			// Toggle the flipped state of the clicked card
			card.classList.toggle("flipped");
			const image = card.querySelector("img") as HTMLElement;
			if (image) {
				image.classList.toggle("hidden");
			}

			// Update the currently flipped card
			currentlyFlippedCard = card.classList.contains("flipped") ? card : null;
		}
	});
});

document.querySelectorAll(".card .flipped").forEach((card) => {
	card.addEventListener("click", () => {
		// Flip back the card if it is currently flipped
		if (card.classList.contains("flipped")) {
			card.classList.remove("flipped");
			const image = card.querySelector("img") as HTMLElement;
			if (image) {
				image.classList.remove("hidden");
			}
			currentlyFlippedCard = null;
		}

		// Add the clicked class to highlight the card
		card.classList.toggle("clicked");
	});
});

// Add event listener to the "reset game" button
const resetGameButton = document.querySelector("#resetButton");
if (resetGameButton) {
	resetGameButton.addEventListener("click", () => {
		document.querySelectorAll(".card").forEach((card) => {
			card.classList.remove("flipped");
			const image = card.querySelector("img") as HTMLElement;
			if (image) {
				image.classList.remove("hidden");
			}
		});
		currentlyFlippedCard = null;
	});
}
