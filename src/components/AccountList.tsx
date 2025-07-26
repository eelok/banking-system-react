import { useEffect, useState } from 'react';
import { Account } from '../types/Account';
import { getListAccountFromTS } from '../services/AccountService';
import { getListAccountFromJava } from '../services/AccountService';


export default function AccountList() {

  const [data, setData] = useState({
    fromJava: { 
      accounts: Array<Account>(), 
      loading: true, 
      error: null as string | null 
    },
    fromTS: {
      accounts: Array<Account>(),
      loading: true, 
      error: null as string | null 
    }
  });


  useEffect( () => {

    const getAccountsFromJava = async() => {
      setData((prev) => ({
        ...prev,
        fromJava: {...prev.fromJava, loading: true, error: null}
      }));

      try{
        const accountsFromJava = await getListAccountFromJava();
        setData((prev) => ({
          ...prev,
          fromJava: {accounts: accountsFromJava, loading: false, error: null}
        }));
      } catch(error){
          setData((prev) => ({
            ...prev,
            fromJava: {accounts: [], loading: false, error: String(error)}
          }));
      } 
  
    };

    const getAccountsFromTS = async() => {
      setData((prev) => ({
        ...prev,
        fromTS: {...prev.fromTS, loading: true, error: null}
      }));

      try{
        const accountFromTS = await getListAccountFromTS();
        setData((prev) => ({
          ...prev,
          fromTS: {accounts: accountFromTS, loading: false, error: null}
        }))
      }catch(error){
        setData((prev) => ({
          ...prev,
          fromTS: {accounts: [], loading: false, error: String(error)}
        }));
      }
    }


    getAccountsFromJava();
    getAccountsFromTS();
  //   const fetchAccounts = async() => {
  //     setError(null);
  //     setLoading(true);

  //     try {
  //       const accounts = await getListAccountFromTS();
  //       setAccounts(accounts);
  //     } catch(error){
  //       setError(String(error));
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchAccounts();
    
  }, [])

  return (
    <div className="App">
      <p>Java backend</p>
      <table>
        <thead>
          <tr>
            <th>Name:</th>
            <th>IBAN:</th>
            <th>Details:</th>
          </tr>
        </thead>
        <tbody>
          {
            data.fromJava.accounts.map(account => (
              <tr key={account.id}>
                <td>{account.fullName}</td>
                <td>{account.iban}</td>
                <td>
                  <a href={`/accounts/${account.id}`}>
                    <strong>Click to see Accounts Details</strong>
                  </a>
                </td>
              </tr>
            ))
          }
        </tbody>  
      </table>

      <p>TypeScript backend</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>IBAN</th>
          </tr>
        </thead>
        <tbody>
          {
            data.fromTS.accounts.map(account => (
              <tr key={account.id}>
                <td>{account.fullName}</td>
                <td>{account.iban}</td>
                <td>
                  <a href={`/accounts/${account.id}`}>
                    <strong>Click to see Accounts Details</strong>
                  </a>
                </td>
              </tr>
            ))
          }
        </tbody>  
      </table>
    </div>
  );
};
