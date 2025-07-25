import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios, { get } from 'axios';
import { getListAccount } from './services/AccountService';
import { Account } from './types/Account';
import { error } from 'console';

function App() {

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect( () => {

    const fetchAccounts = async() => {
      setError(null);
      setLoading(true);

      try {
        const accounts = await getListAccount();
        setAccounts(accounts);
      } catch(error){
        setError(String(error));
      } finally {
        setLoading(false);
      }
    }

    fetchAccounts();
    
  }, [])

  return (
    <div className="App">
      <h1>Banking-system</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>IBAN</th>
            <th>Currency</th>
            <th>Balance</th>
            <th>Withdraw Limit Per Day</th>
          </tr>

        </thead>
        <tbody>
          {
            accounts.map(account => (
              <tr key={account.id}>
                <td>{account.fullName}</td>
                <td>{account.iban}</td>
                <td>{account.currency}</td>
                <td>{account.balance}</td>
                <td>{account.withdrawPerDayLimit}</td>
              </tr>
            ))
          }
        </tbody>  
      </table>
      
    </div>
  );
}

export default App;
