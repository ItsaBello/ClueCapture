import { getCardImageMap, getGameCatagory, getImageUrlByIndex } from "./imageLoaderFromApi.js";

// Global flag to track submission status
let submissionSuccessful = false;

// Type definitions
type HintData = {
    images: string[];
    hintImages: string[];
    hintText: string;
    gameCategory: string;
};

// Handles the submission of a hint
async function handleHintSubmission(): Promise<void> {
    const inputField = document.getElementById("inputField") as HTMLInputElement | null;
    const cloud = document.getElementById("cloud") as HTMLElement | null;

    if (!inputField) {
        console.error("Input field is missing.");
        throw new Error("Input field is missing.");
    }

    const hintText = inputField.value.trim();
    if (!hintText) {
        console.log("Hint text cannot be empty!");
        alert("Please enter a hint before submitting.");
        throw new Error("Please enter a hint before submitting.");
    }

    // Ensure the board is defined and get selected card indices
    const selectedIndices: number[] | null = board.getSelectedCardIndices();
    if (!selectedIndices || selectedIndices.length === 0) {
        alert("The hint should contain as many selected images as chosen.");
        throw new Error("The hint should contain as many selected images as chosen.");
    }

	const selectedImages: string[] = selectedIndices
    .map((index) => getImageUrlByIndex(index))
    .filter((url): url is string => url !== undefined);

    const gameCategory: string = getGameCatagory();
    const allCards: string[] = [...getCardImageMap().values()];

    // Ensure there are exactly 16 images loaded
    if (allCards.length !== 16) {
        throw new Error("Hint is not saved because there are not 16 images loaded.");
    }

    const hintData: HintData = {
        images: allCards,
        hintImages: selectedImages,
        hintText: hintText,
        gameCategory: gameCategory
    };

    console.log("Submitting the following data:", hintData);

    try {
        const response = await fetch("http://localhost:3000/api/hints", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(hintData)
        });

        if (!response.ok) {
            throw new Error("Failed to submit the hint");
        }

        const data = await response.json();
        console.log("Hint submitted successfully:", data);

        alert("Hint submitted successfully!");
        if (cloud) cloud.style.display = "none";
        submissionSuccessful = true; // Mark submission as successful
    } catch (error) {
        console.error("Error submitting the hint:", error);
        alert("Failed to submit the hint. Please try again.");
    }
}

// Initializes the hint form logic
function initializeHintForm(): void {
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

    inputField.addEventListener("input", () => {
        inputField.value = inputField.value.replace(/\d/g, "");
    });

    // Prevent default behavior on form submit and handle the hint submission
    form.addEventListener("submit", async (event: SubmitEvent) => {
        event.preventDefault(); // Prevent page refresh
        await handleHintSubmission();
    });

    // Prevent default behavior on button click and handle the hint submission
    submitHintButton.addEventListener("click", async (event: MouseEvent) => {
        event.preventDefault(); // Prevent page refresh
        await handleHintSubmission();

        if (submissionSuccessful) {
            modusChange(); // Redirect to clueGuesser mode
        }
    });

    function modusChange(): void {
        window.location.href = "clueGuesser.html";
    }
}

// Initialize the form when the DOM is ready
document.addEventListener("DOMContentLoaded", initializeHintForm);
