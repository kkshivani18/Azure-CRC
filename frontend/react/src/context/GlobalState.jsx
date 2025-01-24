import React, { createContext, useReducer, useEffect} from 'react';
import axios from 'axios'

// Initial state
const initialState = {
    transactions: [],
    error: null,
    loading: true
};

// reducer func to manage state changes
function appReducer(state, action){
      switch (action.type) { 
        case "GET_TRANSACTIONS": 
          return { 
            ...state, 
            transactions: action.payload, 
            loading: false 
          }; 
          
          case "TRANSACTION_ERROR": 
            return { 
              ...state, 
              error: action.payload, 
              loading: false 
            }; 
            
            case "ADD_TRANSACTION": 
              return { 
                ...state, 
                  transactions: [action.payload, ...state.transactions], 
                }; 
                
            case "DELETE_TRANSACTION": 
              return { 
                ...state, 
                transactions: state.transactions.filter((transaction) => transaction.id !== action.payload), 
              }; 
              default: 
                return state; 
          } 
       }
    
// creating context
export const GlobalContext = createContext(initialState);

// global state provider 
export const GlobalProvider = ( {children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // fetch transactions from backend when application initializes
  useEffect (() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:7071/api/GetExpenses");
        dispatch({ type: 'GET_TRANSACTIONS', payload: response.data }); 
      } catch (error) { 
        dispatch({ type: 'TRANSACTION_ERROR', payload: error.message }); 
      }
    };

    fetchTransactions(); 
    }, []);

    // actions
    function addTransaction(transaction){
      dispatch({ type: "ADD_TRANSACTION", payload: transaction});
    }

    async function deleteTransaction(id) {
      try{
        await axios.delete("http://localhost:7071/api/DeleteExpense", {
          data: { id }
        });
        dispatch({ type: "DELETE_TRANSACTION", payload: id });
      } catch (error){
        dispatch({type: 'TRANSACTION_ERROR', payload: error.message})
      }
    }
  
    return (
      <GlobalContext.Provider
        value={{
          transactions: state.transactions,
          error: state.error, 
          loading: state.loading,
          addTransaction,
          deleteTransaction,
        }}
      >
        {children}
      </GlobalContext.Provider>
    );
  };