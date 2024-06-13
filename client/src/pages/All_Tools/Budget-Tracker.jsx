import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { jsPDF } from 'jspdf';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import { Line } from 'react-chartjs-2';
import 'react-toastify/dist/ReactToastify.css';
import 'chart.js/auto';

const BudgetTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState({ type: 'income', category: '', amount: '', date: '', description: '', recurring: false });
  const [currency, setCurrency] = useState('USD');
  const [budgetGoals, setBudgetGoals] = useState({ income: 0, expense: 0 });
  const [categories, setCategories] = useState({ income: [], expense: [] });
  const [chartData, setChartData] = useState({});
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTransaction({ ...transaction, [name]: type === 'checkbox' ? checked : value });
  };

  const addTransaction = () => {
    if (!transaction.category || !transaction.amount || !transaction.date || !transaction.description) {
      toast.error("Please fill in all fields");
      return;
    }
    setTransactions([...transactions, transaction]);
    setTransaction({ type: 'income', category: '', amount: '', date: '', description: '', recurring: false });
    toast.success("Transaction added");
  };

  const exportToCSV = () => {
    const headers = ["Type", "Category", "Amount", "Date", "Description", "Recurring"];
    const csvData = transactions.map(tran => [tran.type, tran.category, tran.amount, tran.date, tran.description, tran.recurring]);
    const ws = XLSX.utils.aoa_to_sheet([headers, ...csvData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, "transactions.xlsx");
    toast.success("Transactions exported to Excel");
  };

  const generateChartData = () => {
    const incomeData = transactions.filter(tran => tran.type === 'income').reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    const expenseData = transactions.filter(tran => tran.type === 'expense').reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    setChartData({
      labels: ['Income', 'Expense'],
      datasets: [
        {
          label: 'Amount',
          data: [incomeData, expenseData],
          backgroundColor: ['green', 'red'],
        },
      ],
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const importedTransactions = jsonData.slice(1).map(row => ({
        type: row[0],
        category: row[1],
        amount: row[2],
        date: row[3],
        description: row[4],
        recurring: row[5],
      }));
      setTransactions([...transactions, ...importedTransactions]);
      toast.success("Transactions imported from bank statement");
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="text-editor-container" style={{ padding: '20px' }}>
      <h1 className="title">Budget Tracker</h1>
      <div>
        <h2>Add Transaction</h2>
        <select name="type" value={transaction.type} onChange={handleInputChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input type="text" name="category" placeholder="Category" value={transaction.category} onChange={handleInputChange} />
        <input type="number" name="amount" placeholder="Amount" value={transaction.amount} onChange={handleInputChange} />
        <input type="date" name="date" value={transaction.date} onChange={handleInputChange} />
        <input type="text" name="description" placeholder="Description" value={transaction.description} onChange={handleInputChange} />
        <label>
          Recurring
          <input type="checkbox" name="recurring" checked={transaction.recurring} onChange={handleInputChange} />
        </label>
        <button className="btn-tool" onClick={addTransaction}>Add Transaction</button>
      </div>
      <div>
        <h2>Transactions</h2>
        <ul>
          {transactions.map((tran, index) => (
            <li key={index}>
              {tran.date} - {tran.type} - {tran.category} - {tran.amount} {currency} - {tran.description} - {tran.recurring ? 'Recurring' : 'One-time'}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Export Transactions</h2>
        <CSVLink data={transactions} filename="transactions.csv" className="btn btn-primary" target="_blank">Export to CSV</CSVLink>
        <button className="btn-tool" onClick={exportToCSV}>Export to Excel</button>
      </div>
      <div>
        <h2>Charts and Reports</h2>
        <button className="btn-tool" onClick={generateChartData}>Generate Chart</button>
        {chartData.labels && (
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Income vs Expense',
                },
              },
            }}
          />
        )}
      </div>
      <div>
        <h2>Import Transactions</h2>
        <input type="file" onChange={handleFileUpload} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default BudgetTracker;
