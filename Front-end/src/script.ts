const inputField = document.getElementById('inputField') as HTMLInputElement;

function handleSubmit(event: any) {
  event.preventDefault();
  const inputFieldValue = inputField.value;
  if (inputFieldValue.trim() === '') {
    console.log('No hint entered');
  } else {
    console.log('Hint entered:', inputFieldValue);
  }
}

//1. fetch atfhandelen oftwel de response die gegeven is een functie maken die check of alles klopt in de back-end
//2. in website routes staat res.send ... (is de response).
//3. response is String
//4. haal de response uit de json --> return response.json()
//5. deel de response in de kleinste delen bv. response.status / !response.ok
//6. return response.json();
//7. .then (data =>              oftewel wat ga je doen met de opgevraagde data
//8. Je wilt de String uit website routes op de website zien.
