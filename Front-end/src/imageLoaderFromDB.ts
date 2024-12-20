const gameBoard = document.getElementById("gameBoard") as HTMLElement;
const getHintButton = document.getElementById("getHintButton") as HTMLButtonElement;
const cardImageMap = new Map<number, string>();
const cloud = document.getElementById("cloud") as HTMLSpanElement;

export async function fetchGameCardsFromDB() {
	getHintButton.disabled = true;
	getHintButton.classList.add("loading");
	const cards = gameBoard.querySelectorAll(".card-image");
	cards.forEach((card) => (card.innerHTML = "")); // Clear board

	try {
		const response = await fetch("http://localhost:3000/api/getHints", {
			method: "GET",
		});

		if (!response.ok) {
			throw new Error("Failed to load hint.");
		}

		const data = await response.json();
		console.log("Hint loaded successfully:", data);
		cloud.style.display = "none";
	} catch (error) {
		console.error("Error loading the hint.", error);
	}
}

// Fetch object details
// 		const objectDetailsPromises = shuffledObjectIDs.map(async (id: any) => {
// 			const response = await fetch(`${objectBaseUrl}${id}`);
// 			return response.ok ? response.json() : null;
// 		});

// 		const objectDetails = await Promise.all(objectDetailsPromises);

// 		// Filter objects that have a small image and pick 16 randomly
// 		const validObjects = objectDetails.filter((data) => data && data.primaryImageSmall);
// 		const randomizedObjects = validObjects.sort(() => Math.random() - 0.5).slice(0, 16);

// 		// Preload all images
// 		type PreloadedImage = {
// 			img: HTMLImageElement;
// 			object: { primaryImageSmall: string; title?: string };
// 		};
// 		const preloadedImages: PreloadedImage[] = await Promise.all(
// 			randomizedObjects.map(
// 				(object) =>
// 					new Promise<PreloadedImage>((resolve, reject) => {
// 						const img = new Image();
// 						img.src = object.primaryImageSmall;
// 						img.alt = object.title || "Artwork";

// 						img.onload = () => resolve({ img, object });
// 						img.onerror = () =>
// 							reject(new Error(`Failed to load image: ${object.primaryImageSmall}`));
// 					})
// 			)
// 		);

// 		// Append all preloaded images to their respective cards
// 		preloadedImages.forEach(({ img, object }, index) => {
// 			const card = cards[index];
// 			card.appendChild(img);

// 			cardImageMap.set(index, object.primaryImageSmall);
// 		});
// 	} catch (error) {
// 		console.error("Error fetching game cards:", error);
// 	} finally {
// 		cardImageMap.forEach((url, index) => {
// 			console.log(`Card Index: ${index}, Image URL: ${url}`);
// 		});
// 		getHintButton.disabled = false;
// 		getHintButton.classList.remove("loading");
// 		cloud.style.display = "block";
// 	}
// }

// Reset game board
getHintButton.addEventListener("click", fetchGameCardsFromDB);
