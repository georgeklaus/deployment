// Fetch and display expenses
async function fetchExpenses() {
  try {
      const response = await fetch('/api/expenses');
      const expenses = await response.json();

      const expenseList = document.getElementById('expenseList');
      expenseList.innerHTML = ''; // Clear the list before adding new items

      expenses.forEach(expense => {
          const expenseItem = document.createElement('div');
          expenseItem.innerHTML = `
              <p><strong>Expense Name:</strong> ${expense.name}</p>
              <p><strong>Amount:</strong> $${expense.amount}</p>
              <p><strong>Date:</strong> ${new Date(expense.date).toLocaleDateString()}</p>
              <button onclick="editExpense('${expense._id}')">Edit</button>
              <button onclick="deleteExpense('${expense._id}')">Delete</button>
          `;
          expenseList.appendChild(expenseItem);
      });
  } catch (error) {
      console.error('Error fetching expenses:', error);
  }
}

// Add a new expense
document.getElementById('addExpenseForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.getElementById('expense_name').value;
  const amount = document.getElementById('amount').value;
  const date = document.getElementById('date').value;

  try {
      const response = await fetch('/api/expenses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, amount, date }) // Ensure these fields are being correctly passed
      });

      if (response.ok) {
          fetchExpenses(); // Refresh expense list after adding
          alert('Expense added');
      } else {
          alert('Failed to add expense');
      }
  } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense');
  }
});

// Initialize the dashboard by fetching expenses
document.addEventListener('DOMContentLoaded', fetchExpenses);
