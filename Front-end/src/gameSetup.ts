import {Board} from "./classes/Board.js";

declare global {
	var board: Board;
	var mode: "api" | "db";
}

document.addEventListener("DOMContentLoaded", () => {
	window.mode = "db";
	window.board = new Board("gameBoard", "numberOfCards", "resetButton", "scoreCounter");
});
