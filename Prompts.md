# Mission: Cash-Flow Dashboard - Prompts & Requirements

This document archives the original mission request and the implementation details for the Salary & Expense Tracker.

## 🎯 The Mission Goal
Build a functional Dashboard where a user can input their salary, add expenses, and see the remaining balance update in real-time.

---

## 📋 Requirements Reference

### Level 1 (Beginner Requirement)
- **App Functionality**: Must function without errors.
- **Input Fields**: 
  - "Total Salary" (Number)
  - "Expense Name" (Text)
  - "Expense Amount" (Number)
- **The Logic**:
  - Display Salary on screen upon entry.
  - Dynamic list for Expenses below the form.
  - **Math**: `Total Salary - Total Expenses = Remaining Balance`.
- **Validation**: Prevent empty or negative inputs.

### Level 2 (Intermediate Requirement)
- **Everything in Level 1**.
- **Data Persistence (LocalStorage)**: 
  - Salary and Expense list must survive page refreshes.
  - Check for existing data on page load.
- **Delete Functionality**: 
  - Trash icon for each expense.
  - Real-time balance and list update upon deletion.
- **Visualization**: 
  - Integrated **Chart.js** library.
  - Pie Chart showing "Remaining Balance vs. Total Expenses".

---

## 🛠️ Implementation Summary

1.  **Modern Aesthetic**: Implemented a dark-mode glassmorphism design using CSS Backdrop filters.
2.  **State Management**: Used a centralized JavaScript state object to track financial data.
3.  **Real-time Math**: Integrated a reactive engine that recalculates the balance whenever salary or expenses change.
4.  **Currency Localization**: Customized the currency format to the Indian Rupee (₹) and `en-IN` locale as per user request.
5.  **Persistence Layer**: Synchronized state with `localStorage` for seamless user experience across sessions.
