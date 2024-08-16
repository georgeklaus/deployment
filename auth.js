document.getElementById('registerForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('registerUsername').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  try {
      const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password })
      });

      if (response.ok) {
          alert('Registration successful');
          document.getElementById('registerForm').reset();
      } else {
          const data = await response.json();
          alert(data.error || 'Failed to register');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration');
  }
});

document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  try {
      const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
      });

      if (response.ok) {
          alert('Login successful');
          window.location.href = 'dashboard.html'; // Redirect to dashboard after login
      } else {
          const data = await response.json();
          alert(data.error || 'Failed to log in');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login');
  }
});
