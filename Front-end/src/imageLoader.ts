const gameBoard = document.getElementById("gameBoard") as HTMLElement;
const resetButton = document.getElementById("resetButton") as HTMLButtonElement;

const metAPI = {
    searchUrl: (query: string) => 
        `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&isHighlight=true&q=${query}`,
    objectUrl: (id: string) => 
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
    extractImages: (data: any) => 
        ({ imageUrl: data.primaryImageSmall, title: data.title }),
};

const clevelandAPI = {
    searchUrl: (query: string) => 
        `https://openaccess-api.clevelandart.org/api/artworks/?q=${query}&has_image=1&`,
    objectUrl: null, // Cleveland API includes all data in search response
    extractImages: (data: any) => 
        ({ imageUrl: data.images.web.url, title: data.title }),
};

const selectedApi = localStorage.getItem('selectedApi') || 'met';
const api = selectedApi === 'cleveland' ? clevelandAPI : metAPI;


async function fetchGameCards() {
    resetButton.disabled = true;
    resetButton.classList.add("loading");
    const queryObject = "glass"; // Example search term
    const cards = gameBoard.querySelectorAll(".card");
    cards.forEach((card) => (card.innerHTML = "")); // Clear board

    try {
        const searchResponse = await fetch(api.searchUrl(queryObject));
        const searchData = await searchResponse.json();

        let validObjects = [];
        if (selectedApi === 'met') {
            // Met API requires fetching object details
            const allObjectIDs = searchData.objectIDs || [];
            const shuffledObjectIDs = allObjectIDs.sort(() => Math.random() - 0.5).slice(0, 30);

            const objectDetailsPromises = shuffledObjectIDs.map(async (id: string) => {
                if (api.objectUrl) { // Ensure objectUrl exists before calling fetch
                    const response = await fetch(api.objectUrl(id));
                    return response.ok ? response.json() : null;
                }
                return null;
            });

            const objectDetails = await Promise.all(objectDetailsPromises);
            validObjects = objectDetails.filter((data) => data && data.primaryImageSmall);
        } else if (selectedApi === 'cleveland') {
            // Cleveland API includes image data in the search results
            validObjects = searchData.data.filter((item: any) => item.images && item.images.web);
        }

        const randomizedObjects = validObjects.sort(() => Math.random() - 0.5).slice(0, 16);

        // Preload images
        type PreloadedImage = {
            img: HTMLImageElement;
            object: { imageUrl: string; title?: string };
        };
        const preloadedImages: PreloadedImage[] = await Promise.all(
            randomizedObjects.map(
                (object: any) =>
                    new Promise<PreloadedImage>((resolve, reject) => {
                        const { imageUrl, title } = api.extractImages(object);
                        const img = new Image();
                        img.src = imageUrl;
                        img.alt = title || "Artwork";

                        img.onload = () => resolve({ img, object });
                        img.onerror = () =>
                            reject(new Error(`Failed to load image: ${imageUrl}`));
                    })
            )
        );

		// Append all preloaded images to their respective cards
		preloadedImages.forEach(({ img }, index) => {
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

// // Initial board generation
fetchGameCards();
