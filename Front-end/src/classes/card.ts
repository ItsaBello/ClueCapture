export class Card {
	

	public static createCardElement(index: number): HTMLElement {
		const card = document.createElement("div");
		card.classList.add("card");
		card.setAttribute("data-name", index.toString());

		const cardInner = document.createElement("div");
		cardInner.classList.add("card-inner");

		const cardImage = document.createElement("div");
		cardImage.classList.add("card-image");

		const cardFront = document.createElement("div");
		cardFront.classList.add("card-front");
		const infoButton = document.createElement("button");
		infoButton.classList.add("info-button");
		infoButton.textContent = "i";
		cardFront.appendChild(infoButton);

		const cardBack = document.createElement("div");
		cardBack.classList.add("card-back");
		const backText = document.createElement("p");
		backText.textContent = "Back of card";
		cardBack.appendChild(backText);

		cardInner.appendChild(cardImage);
		cardInner.appendChild(cardFront);
		cardInner.appendChild(cardBack);
		card.appendChild(cardInner);

		return card;
	}
}
