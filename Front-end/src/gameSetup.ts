import {UIManager} from "./classes/uiManager.js";
import {Board} from "./classes/board.js";

declare global {
	var mode: "api" | "db";
	var board: Board;
	var UIManager: UIManager;
}

document.addEventListener("DOMContentLoaded", () => {
	const body = document.body;
	const mode = body.getAttribute("data-mode") as "api" | "db";

	console.log("Game mode:", mode);
	window.mode = mode;
	window.board = new Board("gameBoard", "numberOfCards", "resetButton", "scoreCounter");
	window.UIManager = new UIManager();
});
