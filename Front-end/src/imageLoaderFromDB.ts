const gameBoard = document.getElementById("gameBoard") as HTMLElement;
const getHintButton = document.getElementById("getHintButton") as HTMLButtonElement;
const cloud = document.getElementById("cloud") as HTMLSpanElement;
const hintLabel = document.getElementById("hintLabel") as HTMLLabelElement;

export async function fetchGameCardsFromDB() {
  getHintButton.disabled = true;
  getHintButton.classList.add("loading");
  const cards = gameBoard.querySelectorAll(".card-image");
  cards.forEach((card) => (card.innerHTML = "")); // Clear the game board

  try {
    // Fetch hint and images
    const response = await fetch("http://localhost:3000/api/getHint", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to load hint.");
    }

    const { data, message } = await response.json();
    console.log(message); // "Hint loaded successfully"

    // Extract hint and images from the response
    const hint = data.Hints[0]?.hint_text || "No hint available";
    const images = data.Images || [];
	const gameId = data.game_id || "No game id available";

	console.log(gameId, hint, images); // Print de loaded game data naar browser console

    // Display the hint
    hintLabel.textContent = "Hint: " + hint;
    cloud.style.display = "block"; // Show the hint UI element

    // Check if images are available
    if (images.length !== 16) {
      throw new Error("Invalid number of images received.");
    }

    // Render images on the game board
    images.forEach(({ image_id, image_url }: { image_id: number, image_url: string }, index: number) => {
      const card = cards[index];
      const img = new Image();
      img.src = image_url;
      img.alt = `Image ${image_id}`;
      card.appendChild(img);
    });

  } catch (error) {
    console.error("Error loading the hint and images:", error);
    alert("Failed to load the game. Please try again.");
  } finally {
    getHintButton.disabled = false;
    getHintButton.classList.remove("loading");
  }
}

// Add event listener to load the game when the button is clicked
getHintButton.addEventListener("click", fetchGameCardsFromDB);