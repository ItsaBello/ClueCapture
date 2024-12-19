const form = document.getElementById('username-form') as HTMLFormElement;


form.addEventListener('submit', function(event) {
    console.log ("test")
    event.preventDefault(); // Prevent that the page loads again
    
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const name = nameInput.value; // Gets the name
   
    if (name.trim() !== "") {
        localStorage.setItem('playerName', name); // Naam opslaan
        window.location.href = 'boardGame.html';
    } else {
        localStorage.setItem('playerName', 'Player one'); // Standaardnaam opslaan
        window.location.href = 'boardGame.html';
    }
   
    // Get the selected API
    const apiSelection = document.getElementById('apiSelection') as HTMLSelectElement | null;
    const selectedApi = apiSelection?.value || 'met'; // Default to 'met' if no selection is made

    localStorage.setItem('selectedApi', selectedApi); // Save API choice

});
