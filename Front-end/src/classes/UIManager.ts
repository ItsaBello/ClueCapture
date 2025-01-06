import {fetchGameCardsFromDB} from "../imageLoaderFromDB.js";

export class UIManager {
	private hintButton: HTMLButtonElement;
	private hintText: HTMLSpanElement;
	private resetButton: HTMLButtonElement;
	private rulesButton: HTMLButtonElement;
	private rulesModal: HTMLDivElement;
	private closeRulesButton: HTMLButtonElement;
	private cloud: HTMLSpanElement;

	constructor() {
		this.hintButton = document.getElementById("hintButton") as HTMLButtonElement;
		this.hintText = document.getElementById("hintText") as HTMLSpanElement;
		this.resetButton = document.getElementById("resetButton") as HTMLButtonElement;
		this.rulesButton = document.getElementById("rulesButton") as HTMLButtonElement;
		this.rulesModal = document.getElementById("rulesModal") as HTMLDivElement;
		this.closeRulesButton = document.getElementById("closeRulesButton") as HTMLButtonElement;
		this.cloud = document.getElementById("cloud-text") as HTMLSpanElement;

		this.init();
	}

	private init() {
		if (this.hintButton) {
			this.hintButton.addEventListener("click", () => this.hintButtonListener());
		}
		if (this.rulesButton) {
			this.rulesButton.addEventListener("click", () => this.toggleRulesListener());
		}
		if (this.closeRulesButton) {
			this.closeRulesButton.addEventListener("click", () => this.toggleRulesListener());
		}
		window.addEventListener("click", this.windowClickListener.bind(this));
	}

	private async hintButtonListener() {
		this.hintButton.disabled = true;
		this.hintButton.classList.add("loading");
		console.log("Hint button clicked");
		try {
			console.log("Fetching game cards from DB");
			await fetchGameCardsFromDB();
		} catch (error) {
			console.error("Error loading the hint and images:", error);
			alert("Failed to load the game. Please try again.");
		} finally {
			this.hintButton.disabled = false;
			this.hintButton.classList.remove("loading");
		}
	}

	private windowClickListener(event: MouseEvent) {
		if (event.target === this.rulesModal) {
			this.toggleRulesListener();
		}
	}
	private toggleRulesListener() {
		this.rulesModal.style.display = this.rulesModal.style.display === "block" ? "none" : "block";
	}

	public displayHint(hint: string) {
		this.hintText.textContent = hint;
	}

	public setResetButtonLoading(isLoading: boolean) {
		if (this.resetButton) {
			this.resetButton.disabled = isLoading;
			if (isLoading) {
				this.resetButton.classList.add("loading");
			} else {
				this.resetButton.classList.remove("loading");
			}
		}
	}
	public showCloud() {
		this.cloud.style.display = "block";
	}
}
