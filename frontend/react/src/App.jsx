import React from 'react';
import { GlobalProvider } from './context/GlobalState';
import {Header}  from "./components/Header";
import {Balance}  from "./components/Balance";
import { Transactions } from "./components/Transactions"
import { AddTransactions } from './components/AddTransaction';
import { Chart } from './components/Chart';
import './App.css';

function App() {

  return (
    <GlobalProvider>
    <div>
      <Header />
      <div className="container mx-auto p-2 grid sm:grid-cols-1 md:grid-cols-2 gap-4">
        <div className="balance mt-12">
          <Balance />
        </div>
        <div className="transactions">
          <Transactions />
        </div>
        <div className="chart">
          <Chart />
        </div>
        <div className="add-transactions">
          <AddTransactions />
        </div>
      </div>
    </div>
    </GlobalProvider>
  );
}

export default App;

