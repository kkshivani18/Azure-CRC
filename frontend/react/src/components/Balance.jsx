import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

export function Balance() {

    const { transactions } = useContext(GlobalContext);
    const amounts = transactions.map((transaction) => transaction.amount);

    const income = amounts.filter((item) => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);

    const expense = (amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0) * -1 ).toFixed(2);

    const total = (parseFloat(income) - Math.abs(parseFloat(expense))).toFixed(2);

    return (
    <div> 
        <div className='p-4 bg-white shadow-md'>
        <h2 className='text-lg font-semi-bold'>Balance Amount</h2>
        <div className='font-bold text-2xl'>₹ {total}</div>
        </div>

        <div className='inc-exp-container'>
            <div>
                <h4>Income</h4>
                <p className='money plus'>+ ₹ {income}</p>
            </div>
            <div>
                <h4>Expenses</h4>
                <p className='money minus'>- ₹ {expense}</p>
            </div>
        </div>
    </div>
    );
}