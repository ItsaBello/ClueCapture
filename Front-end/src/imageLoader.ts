const gameBoard = document.getElementById('gameBoard') as HTMLElement;
const resetButton = document.getElementById('resetButton') as HTMLButtonElement;
const objectBaseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

async function fetchGameCards() {
    const searchUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&isHighlight=true&q=woman'; // Filter en Topic
    const cards = gameBoard.querySelectorAll('.card');
    cards.forEach(card => card.innerHTML = ''); // Clear board

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

        // Add the fetched images to the cards
        randomizedObjects.forEach((object, index) => {
            const card = cards[index];
            const img = document.createElement('img');
            img.src = object.primaryImageSmall;
            img.alt = object.title || 'Artwork';
            card.appendChild(img);
        });
    } catch (error) {
        console.error('Error fetching game cards:', error);
    }
}

// Reset game board
resetButton.addEventListener('click', fetchGameCards);
        
// Initial board generation
fetchGameCards();