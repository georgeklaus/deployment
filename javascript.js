// Function to save expense
async function saveExpense(event) {
    event.preventDefault();

    const expenseName = document.getElementById('expense_name').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;

    const expense = {
        name: expenseName,
        amount: amount,
        date: date
    };

    try {
        const response = await fetch('/api/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expense)
        });

        if (response.ok) {
            alert('Expense saved!');
        } else {
            alert('Failed to save expense.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while saving the expense.');
    }
}

// Function to edit expense
async function editExpense(expenseId) {
    const name = prompt('Enter new name:');
    const amount = prompt('Enter new amount:');
    const date = prompt('Enter new date:');

    const expense = {
        name,
        amount,
        date
    };

    try {
        const response = await fetch(`/api/expenses/${expenseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expense)
        });

        if (response.ok) {
            alert('Expense updated!');
            fetchExpenses(); // Refresh expense list after editing
        } else {
            alert('Failed to update expense.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating the expense.');
    }
}

// Function to delete expense
async function deleteExpense(expenseId) {
    if (confirm('Are you sure you want to delete this expense?')) {
        try {
            const response = await fetch(`/api/expenses/${expenseId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Expense deleted!');
                fetchExpenses(); // Refresh expense list after deleting
            } else {
                alert('Failed to delete expense.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while deleting the expense.');
        }
    }
}

// Fetch expenses and display them (can be used in other pages as well)
async function displayExpenses() {
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
            `;
            expenseList.appendChild(expenseItem);
        });
    } catch (error) {
        console.error('Error fetching expenses:', error);
        alert('An error occurred while retrieving expenses.');
    }
}

// Initialize by fetching expenses on page load
document.addEventListener('DOMContentLoaded', displayExpenses);