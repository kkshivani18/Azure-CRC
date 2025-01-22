import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { GlobalContext } from '../context/GlobalState';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Chart () {

    const { transactions } = useContext(GlobalContext);
    const amounts = transactions.map((transaction) => transaction.amount);
  
    const income = amounts.filter((item) => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
  
    const expense = (amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0) * -1 ).toFixed(2);

    const data = {
        labels: ['Income', 'Expense'],
        datasets: [
            {
                label: 'Amount',
                data: [income, expense], 
                backgroundColor: ['#4CAF50', '#FF6384'],
                hoverBackgroundColor: ['#66BB6A', '#FF6384'],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="w-full h-64 p-3 mt-4">
            <Doughnut data={data} options={options} />
        </div>
    );
};

 
