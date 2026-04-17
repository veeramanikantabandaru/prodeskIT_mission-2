// State Management
let state = {
    salary: 0,
    expenses: []
};

// Elements
const salaryForm = document.getElementById('salary-form');
const salaryInput = document.getElementById('salary-input');
const expenseForm = document.getElementById('expense-form');
const expenseName = document.getElementById('expense-name');
const expenseAmount = document.getElementById('expense-amount');

const displaySalary = document.getElementById('display-salary');
const displayBalance = document.getElementById('display-balance');
const displayExpenses = document.getElementById('display-expenses');
const expenseListContainer = document.getElementById('expense-list-container');
const noExpensesMsg = document.getElementById('no-expenses-msg');

let balanceChart = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    updateUI();
});

// Load from LocalStorage
function loadData() {
    const savedData = localStorage.getItem('cashflow_data');
    if (savedData) {
        state = JSON.parse(savedData);
    }
}

// Save to LocalStorage
function saveData() {
    localStorage.setItem('cashflow_data', JSON.stringify(state));
}

// Update UI
function updateUI() {
    const totalExpenses = state.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const balance = state.salary - totalExpenses;

    // Fast counters / formatting
    displaySalary.textContent = formatCurrency(state.salary);
    displayBalance.textContent = formatCurrency(balance);
    displayExpenses.textContent = formatCurrency(totalExpenses);

    // Color code balance
    displayBalance.style.color = balance < 0 ? 'var(--danger)' : 'var(--text-main)';

    renderExpenseList();
    renderChart(state.salary, totalExpenses);
    saveData();
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

// Handle Salary Update
salaryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = parseFloat(salaryInput.value);
    
    if (isNaN(val) || val < 0) {
        alert('Please enter a valid positive salary amount.');
        return;
    }

    state.salary = val;
    salaryInput.value = '';
    updateUI();
});

// Handle Expense Addition
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmount.value);

    if (!name) {
        alert('Please enter an expense name.');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid positive amount.');
        return;
    }

    const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount
    };

    state.expenses.unshift(newExpense); // Add to beginning
    expenseName.value = '';
    expenseAmount.value = '';
    updateUI();
});

// Render Expense List
function renderExpenseList() {
    expenseListContainer.innerHTML = '';
    
    if (state.expenses.length === 0) {
        expenseListContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center; margin-top: 1rem;">No expenses added yet.</p>';
        return;
    }

    state.expenses.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'expense-item';
        item.innerHTML = `
            <div class="expense-info">
                <span class="expense-name">${exp.name}</span>
                <span class="expense-amount">-${formatCurrency(exp.amount)}</span>
            </div>
            <button class="delete-btn" onclick="deleteExpense(${exp.id})">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        expenseListContainer.appendChild(item);
    });
}

// Delete Expense
window.deleteExpense = function(id) {
    state.expenses = state.expenses.filter(exp => exp.id !== id);
    updateUI();
};

// Chart.js Visualization
function renderChart(salary, totalExpenses) {
    const ctx = document.getElementById('balanceChart').getContext('2d');
    
    const remaining = Math.max(0, salary - totalExpenses);
    
    const chartData = {
        labels: ['Remaining Balance', 'Spent'],
        datasets: [{
            data: [remaining, totalExpenses],
            backgroundColor: ['#8b5cf6', '#f43f5e'],
            borderColor: 'rgba(30, 41, 59, 0.7)',
            borderWidth: 2,
            hoverOffset: 10
        }]
    };

    if (balanceChart) {
        balanceChart.data = chartData;
        balanceChart.update();
    } else {
        balanceChart = new Chart(ctx, {
            type: 'doughnut',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#94a3b8',
                            font: {
                                family: 'Outfit',
                                size: 12
                            },
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += formatCurrency(context.raw);
                                return label;
                            }
                        }
                    }
                },
                cutout: '70%',
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }
}
