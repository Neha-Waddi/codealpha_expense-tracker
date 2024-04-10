let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let totalamount = parseFloat(localStorage.getItem('totalAmount')) || 0;

const categorySelect = document.getElementById('category');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expenses-list-body');
const totalAmountCell = document.getElementById('total-amount');

function saveData() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('totalAmount', totalamount);
}

function renderExpenses() {
    expensesTableBody.innerHTML = '';
    expenses.forEach(expense => {
        const newRow = expensesTableBody.insertRow();
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            const index = expenses.indexOf(expense);
            expenses.splice(index, 1);
            totalamount -= expense.amount;
            totalAmountCell.textContent = totalamount;
            saveData();
            renderExpenses();
        });

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        dateCell.textContent = expense.date;
        deleteCell.appendChild(deleteBtn);
    });

    totalAmountCell.textContent = totalamount;
}

addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    if (date === '') {
        alert('Please select a date');
        return;
    }

    expenses.push({ category, amount, date });
    totalamount += amount;

    saveData();
    renderExpenses();

    categorySelect.value = '';
    amountInput.value = '';
    dateInput.value = '';
});

renderExpenses();
