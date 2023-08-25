/*-----------------LOGIN USER----------------*/
const loginForm = document.querySelector('form');
loginForm.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const formValues = Object.fromEntries(formData.entries());
  const loadingElement = document.createElement('div');
  loadingElement.textContent = 'Loading...';
  document.body.appendChild(loadingElement);

  fetch('/api/sessions/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formValues),
  })
    .then((response) => response.json())
    .then((result) => {
      document.body.removeChild(loadingElement);
      loginForm.reset();
      if (result.status === 'success') {
        const loggedInUser = { email: formValues.email, role: result.payload.role };
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        const successElement = document.createElement('div');
        successElement.textContent = 'Redirecting to Products Page...';
        document.body.appendChild(successElement);
        setTimeout(() => {
          document.body.removeChild(successElement);
          window.location.href = '/products';
        }, 2500);
      } else {
        const errorElement = document.createElement('div');
        errorElement.textContent = 'Invalid username or password';
        document.body.appendChild(errorElement);
        setTimeout(() => {
          document.body.removeChild(errorElement);
        }, 2500);
      }
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
