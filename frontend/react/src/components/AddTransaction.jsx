import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import axios from "axios";

export function AddTransactions() {
    const [text, setText] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const { transactions, addTransaction } = useContext(GlobalContext);

    const totalIncome = transactions
        .map((transaction) => transaction.amount)
        .filter((amount) => amount > 0)
        .reduce((acc, item) => acc + item, 0);

    const totalExpenses = transactions
        .map((transaction) => transaction.amount)
        .filter((amount) => amount < 0)
        .reduce((acc, item) => acc + item, 0);

    const balance = totalIncome - totalExpenses;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!text || !amount) {
            setError("Please enter both description and amount.");
            return;
        }

        const amountValue = parseFloat(amount);

        if (amountValue < 0 && totalIncome - amountValue < 0) {
            setError(
                `Expense cannot exceed available savings or income. Current savings: ₹ ${totalIncome.toFixed(2)}`
            );
            return;
        }

        if (balance === 0 && amountValue < 0) {
            setError("Cannot add expense when total income and savings are 0.");
            return;
        }

        const newTransaction = {
            id: Math.floor(Math.random() * 1000000),
            text,
            amount: parseFloat(amount)
        };

        try {
            const response = await axios.post("http://localhost:7071/api/AddExpense", newTransaction);
            console.log("API Response:", response.data);
            addTransaction(response.data);
            setText("");
            setAmount("");
            setError("");
        } catch (err) {
            console.error("Error adding transaction", err);
            setError("Failed to add transaction. Try again");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
            <h2 className='text-xl '>Add Transaction</h2>
            <div className='mt-2'>
                <input
                    type='text'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder='Description of Transaction'
                    className='p-2 border border-gray-300 rounded'
                />
            </div>
            <div className='mt-2'>
                <input
                    type='number'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder='Amount'
                    className='p-2 border border-gray-300 rounded'
                />
            </div>
            <button type="submit" className='mt-4 p-2 bg-blue-500 text-white rounded'>Add</button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    );
}
