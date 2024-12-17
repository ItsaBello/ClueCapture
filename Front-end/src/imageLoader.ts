const gameBoard = document.getElementById("gameBoard") as HTMLElement;
const resetButton = document.getElementById("resetButton") as HTMLButtonElement;
const objectBaseUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

// Define the query options
const queryOptions = [
  "American Decorative Arts",
  "Ancient Near Eastern Art",
  "Arms and Armor",
  "Arts of Africa, Oceania, and the Americas",
  "Asian Art",
  "Costume Institute",
  "Drawings and Prints",
  "Egyptian Art",
  "European Paintings",
  "European Sculpture and Decorative Arts",
  "Greek and Roman Art",
  "Islamic Art",
  "Medieval Art",
  "Modern and Contemporary Art",
  "Musical Instruments",
  "Robert Lehman Collection",
  "Photographs",
  "The American Wing"
];

async function fetchGameCards() {
    resetButton.disabled = true;
    resetButton.classList.add("loading");
  
    const cards = gameBoard.querySelectorAll(".card");
    cards.forEach((card) => (card.innerHTML = "")); // Clear board
  
    async function preloadImage(cardIndex: number, remainingRetries: number = queryOptions.length): Promise<HTMLImageElement> {
      if (remainingRetries === 0) {
        throw new Error(`Exhausted all keywords for card ${cardIndex}`);
      }
  
      // Randomize a query
      const randomQuery = queryOptions[Math.floor(Math.random() * queryOptions.length)];
      console.log(`Attempting query for card ${cardIndex}: ${randomQuery}`); // Debugging
  
      try {
        // Fetch object IDs for the random query
        const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&isHighlight=true&q=${randomQuery}`;
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();
  
        if (!searchData.objectIDs || searchData.objectIDs.length === 0) {
          throw new Error(`No results found for query: ${randomQuery}`);
        }
  
        // Randomize object IDs and pick one
        const randomObjectID =
          searchData.objectIDs[Math.floor(Math.random() * searchData.objectIDs.length)];
  
        // Fetch object details
        const objectResponse = await fetch(`${objectBaseUrl}${randomObjectID}`);
        if (!objectResponse.ok) {
          throw new Error(`Failed to fetch details for object ID: ${randomObjectID}`);
        }
        const objectData = await objectResponse.json();
  
        // Ensure the object has a valid small image
        if (!objectData.primaryImageSmall) {
          throw new Error(`Object ID ${randomObjectID} does not have a valid image.`);
        }
  
        // Preload the image
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.src = objectData.primaryImageSmall;
          img.alt = objectData.title || "Artwork";
  
          img.onload = () => resolve(img);
          img.onerror = () =>
            reject(new Error(`Failed to load image: ${objectData.primaryImageSmall}`));
        });
    } catch (error) {
        if (error instanceof Error) {
          console.warn(`Error for card ${cardIndex} with query "${randomQuery}": ${error.message}`);
        } else {
          console.warn(`Unknown error for card ${cardIndex} with query "${randomQuery}":`, error);
        }
        // Retry with a reduced number of remaining retries
        return preloadImage(cardIndex, remainingRetries - 1);
      }

    }
  
    try {
      // Preload images for each card
      const preloadedImages = await Promise.all(
        Array.from(cards).map((_, index) => preloadImage(index))
      );
  
      // Append all preloaded images to their respective cards
      preloadedImages.forEach((img, index) => {
        const card = cards[index];
        card.appendChild(img);
      });
    } catch (error) {
      console.error("Error fetching game cards:", error);
    } finally {
      resetButton.disabled = false;
      resetButton.classList.remove("loading");
    }
  }
  
  // Reset game board
  resetButton.addEventListener("click", fetchGameCards);
  
  // Initial board generation
  fetchGameCards();
  