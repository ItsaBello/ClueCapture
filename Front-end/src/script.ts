function hintFormSubmit() {

  const inputField = document.getElementById('inputField') as HTMLInputElement | null;
  const form = document.getElementById('hintForm') as HTMLFormElement | null;

  if (!inputField || !form) {
    console.error('Required elements are missing.');
    return;
  }

  inputField.addEventListener('input', () => {
    inputField.value = inputField.value.replace(/\s/g, '');
  });

  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    const inputFieldValue = inputField.value.trim();
    if (inputFieldValue === '') {
      console.log('Input cannot be empty');
    } else {
      console.log('Hint entered:', inputFieldValue);
    }
  });
}

document.addEventListener('DOMContentLoaded', hintFormSubmit);
