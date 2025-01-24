import React, { useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

export function Transactions() {
    const { transactions, deleteTransaction, error, loading } = useContext(GlobalContext);

    if (loading) {
        return <p>Loading...</p>;
    }

    if(error) {
        return <p>error</p>
    }

    return (
        <div>
            <h3 className='font-semibold'> Previous Transactions </h3>
            <ul className="list">
                {transactions.map((transaction) => (
                    <li     
                        key={transaction.id}
                        className={transaction.amount > 0 ? "plus" : "minus"}
                        >
                        {transaction.text}{" "} 
                        <span>
                            {transaction.amount > 0 ? "+ ₹" : "- ₹"}
                            {Math.abs(transaction.amount)}
                        </span>
                        <button
                            className='delete-btn'
                            onClick={() => deleteTransaction(transaction.id)}> x </button>    
                    </li>
                ))}
            </ul>
        </div>
    );
}

