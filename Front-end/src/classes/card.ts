export class Card {
	public cardElement: HTMLElement;
	private textBox: HTMLElement;
	private static currentEnlargedCard: Card | null = null;

	constructor(cardElement: HTMLElement) {
		this.cardElement = cardElement;
		this.textBox = cardElement.querySelector(".text-box") as HTMLElement;
		this.infoButtonListener();
		this.addGlobalClickListener();
	}

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

		const textBox = document.createElement("div");
		textBox.classList.add("text-box");
		textBox.textContent = "Hier komt de tekst";
		cardInner.appendChild(textBox);

		cardInner.appendChild(cardImage);
		cardInner.appendChild(cardFront);
		card.appendChild(cardInner);

		return card;
	}

	private addGlobalClickListener() {
		document.addEventListener("click", (event) => {
			if (
				Card.currentEnlargedCard &&
				!Card.currentEnlargedCard.cardElement.contains(event.target as Node)
			) {
				Card.currentEnlargedCard.resetCard();
				Card.currentEnlargedCard = null;
			}
		});
	}
	private infoButtonListener() {
		const infoButton = this.cardElement.querySelector(".info-button") as HTMLButtonElement;
		if (infoButton) {
			infoButton.addEventListener("click", (event) => {
				event.stopPropagation();
				if (this.cardElement.classList.contains("big")) {
					this.resetCard();
				} else {
					this.animateCard();
				}
			});
		}
	}

	public animateCard() {
		if (Card.currentEnlargedCard && Card.currentEnlargedCard !== this) {
			Card.currentEnlargedCard.resetCard();
		}
		this.cardElement.classList.add("animatingCard");
		this.cardElement.addEventListener(
			"animationend",
			() => {
				this.cardElement.classList.remove("animatingCard");

				this.cardElement.classList.add("big");
				if (this.textBox) {
					this.textBox.classList.add("see");
				}
			},
			{once: true}
		);
		Card.currentEnlargedCard = this;
	}

	public resetCard() {
		this.cardElement.classList.remove("big", "animatingCard");
		this.textBox.classList.remove("see");
		this.cardElement.classList.remove("clicked");
		const image = this.cardElement.querySelector("img") as HTMLElement;
		if (image) {
			image.classList.remove("hidden");
		}
	}
}
