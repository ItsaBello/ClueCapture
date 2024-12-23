import {Board} from "./classes/board.js";

declare global {
	var board: Board;
}

document.addEventListener("DOMContentLoaded", () => {
	window.board = new Board("gameBoard", "numberOfCards", "resetButton", "scoreCounter");
});
