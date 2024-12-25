import {Board} from "./classes/board.js";

declare global {
	var board: Board;
	var mode: "api" | "db";
}

document.addEventListener("DOMContentLoaded", () => {
	window.mode = "db";
	window.board = new Board("gameBoard", "numberOfCards", "resetButton", "scoreCounter");
});
