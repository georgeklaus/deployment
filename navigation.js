function showPage(page) {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('registerPage').style.display = 'none';
  document.getElementById('dashboardPage').style.display = 'none';

  document.getElementById(page).style.display = 'block';
}

document.getElementById('loginLink').addEventListener('click', () => showPage('loginPage'));
document.getElementById('registerLink').addEventListener('click', () => showPage('registerPage'));

