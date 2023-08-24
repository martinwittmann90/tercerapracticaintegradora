/*-----------------REGISTER USER------------*/
const form = document.querySelector('form');
form.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData.entries());

  const loadingElement = document.createElement('div');
  loadingElement.textContent = 'Loading...';
  document.body.appendChild(loadingElement);

  fetch('/api/sessions/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formValues),
  })
    .then(() => {
      document.body.removeChild(loadingElement);
      form.reset();
      const successElement = document.createElement('div');
      successElement.textContent = 'Redirecting to Login Page...';
      document.body.appendChild(successElement);
      setTimeout(() => {
        document.body.removeChild(successElement);
        window.location.href = '/?login=true';
      }, 2500);
    })
    .catch((error) => {
      document.body.removeChild(loadingElement);
      const errorElement = document.createElement('div');
      errorElement.textContent = 'Oops... Something went wrong!';
      document.body.appendChild(errorElement);
      setTimeout(() => {
        document.body.removeChild(errorElement);
      }, 2500);
    });
};
