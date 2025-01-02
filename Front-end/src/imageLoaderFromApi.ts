const gameBoard = document.getElementById("gameBoard") as HTMLElement;
const objectBaseUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
const queryObject = "stone";
const cardImageMap = new Map<number, string>();

export function getGameCatagory() {
	return "standard game";
}

export function getCardImageMap() {
	return cardImageMap;
}

export function getImageUrlByIndex(index: number): string | undefined {
	return cardImageMap.get(index);
}

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

const metAPI = {
	searchUrl: (query: string) =>
		`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&isHighlight=true&q=${query}`,
	objectUrl: (id: string) =>
		`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
	extractImages: (data: any) => ({imageUrl: data.primaryImageSmall, title: data.title})
};

const clevelandAPI = {
	searchUrl: (query: string) =>
		`https://openaccess-api.clevelandart.org/api/artworks/?q=${query}&has_image=1&`,
	objectUrl: null, // Cleveland API includes all data in search response
	extractImages: (data: any) => ({imageUrl: data.images.web.url, title: data.title})
};

const selectedApi = localStorage.getItem("selectedApi") || "met";
const api = selectedApi === "cleveland" ? clevelandAPI : metAPI;

export async function fetchGameCardsFromApi(){
	window.UIManager.setResetButtonLoading(true);
	const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&isHighlight=true&q=${queryObject}`; // Filter en Topic
	const cards = gameBoard.querySelectorAll(".card-image");
	cards.forEach((card) => (card.innerHTML = "")); // Clear board

	try {
		const searchResponse = await fetch(searchUrl);
		const searchData = await searchResponse.json();

		// Grabs all objects ids from the search query and shuffles to 100 random ID
		const allObjectIDs = searchData.objectIDs;
		const shuffledObjectIDs = allObjectIDs.sort(() => Math.random() - 0.5).slice(0, 30);

		// Fetch object details
		const objectDetailsPromises = shuffledObjectIDs.map(async (id: any) => {
			const response = await fetch(`${objectBaseUrl}${id}`);
			return response.ok ? response.json() : null;
		});

		const objectDetails = await Promise.all(objectDetailsPromises);

		// Filter objects that have a small image and pick 16 randomly
		const validObjects = objectDetails.filter((data) => data && data.primaryImageSmall);
		const randomizedObjects = validObjects.sort(() => Math.random() - 0.5).slice(0, 16);

		// Preload all images
		type PreloadedImage = {
			img: HTMLImageElement;
			object: {primaryImageSmall: string; title?: string};
		};
		const preloadedImages: PreloadedImage[] = await Promise.all(
			randomizedObjects.map(
				(object) =>
					new Promise<PreloadedImage>((resolve, reject) => {
						const img = new Image();
						img.src = object.primaryImageSmall;
						img.alt = object.title || "Artwork";

						img.onload = () => resolve({img, object});
						img.onerror = () =>
							reject(new Error(`Failed to load image: ${object.primaryImageSmall}`));
					})
			)
		);

		// Append all preloaded images to their respective cards
		preloadedImages.forEach(({img, object}, index) => {
			const card = cards[index];
			card.appendChild(img);

			cardImageMap.set(index, object.primaryImageSmall);
		});
	} catch (error) {
		console.error("Error fetching game cards:", error);
	} finally {
		cardImageMap.forEach((url, index) => {
			console.log(`Card Index: ${index + 1}, Image URL: ${url}`);
		});
		window.UIManager.setResetButtonLoading(false);
		window.UIManager.showCloud();
	}
}
