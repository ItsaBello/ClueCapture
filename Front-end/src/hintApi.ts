import {getCardImageMap, getGameCatagory, getImageUrlByIndex} from "./imageLoaderFromApi.js";
import {Board} from "./classes/Board.js";
// Function to handle hint submission

declare const board: Board;

async function handleHintSubmission() {
	const inputField = document.getElementById("inputField") as HTMLInputElement | null;
	const cloud = document.getElementById("cloud") as HTMLSpanElement;

	if (!inputField) {
		console.error("Input field is missing.");
		return;
	}

	const hintText = inputField.value.trim();
	if (!hintText) {
		console.log("Hint text cannot be empty!");
		alert("Please enter a hint before submitting.");
		return;
	}

	const selectedIndices = board.getSelectedCardIndices();
	if (selectedIndices === null) {
		alert("The hint should contain as many selected images as chosen.");
		throw new Error("The hint should contain as many selected image as chosen.");
	}
	const selectedImages = selectedIndices.map((index) => getImageUrlByIndex(index));
	const gameCategory = getGameCatagory();
	const allCards = [...getCardImageMap().values()];

	if (allCards.length != 16) {
		throw new Error("Hint is not saved because there are not 16 images loaded.");
	}

	const hintData = {
		images: allCards, // Array of image URLs corresponding to the selected cards
		hintImages: selectedImages,
		hintText: hintText, // Hint text (from the input field)
		gameCategory: gameCategory
	};

	console.log("Submitting the following data:", hintData);

	try {
		const response = await fetch("http://localhost:3000/api/hints", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(hintData)
		});

		if (!response.ok) {
			throw new Error("Failed to submit the hint");
		}

		const data = await response.json();
		console.log("Hint submitted successfully:", data);
		alert("Hint submitted successfully!");
		cloud.style.display = "none";
	} catch (error) {
		console.error("Error submitting the hint:", error);
		alert("Failed to submit the hint. Please try again.");
	}
}

// Initialize the hint form logic
function initializeHintForm() {
	const inputField = document.getElementById("inputField") as HTMLInputElement | null;
	const form = document.getElementById("hintForm") as HTMLFormElement | null;
	const submitHintButton = document.getElementById("submitHintButton") as HTMLButtonElement | null;

	if (!inputField || !form || !submitHintButton) {
		console.error("Required elements are missing.");
		return;
	}

	// Automatically remove spaces from the input field
	inputField.addEventListener("input", () => {
		inputField.value = inputField.value.replace(/\s/g, "");
	});

	// Prevent default behavior on form submit and handle the hint submission
	form.addEventListener("submit", async (event: Event) => {
		event.preventDefault(); // Prevent page refresh
		await handleHintSubmission();
	});

	// Prevent default behavior on button click and handle the hint submission
	submitHintButton.addEventListener("click", async (event: Event) => {
		event.preventDefault(); // Prevent page refresh
		await handleHintSubmission();
	});
}

// Initialize the form when the DOM is ready
document.addEventListener("DOMContentLoaded", initializeHintForm);
