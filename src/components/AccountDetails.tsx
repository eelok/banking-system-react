import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Account } from "../types/Account";
import { getAccounById } from "../services/AccountService";

export default function AccountDetails(){
    const {id} = useParams();
    const [account, setAccount] = useState<Account | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        setError(null);
        setLoading(true);

        if(!id){
            setError("Account ID not found!");
            setLoading(false);
            return;
        }

        const fetchAccountById = async (id: number) => {
            try {
                const account = await getAccounById(id);
                setAccount(account);
            } catch(error){
                setError(String(error));
            } finally {
                setLoading(false);
            }
        }

        fetchAccountById(Number(id));
    }, [id]);

    return(
        <div className="App">
            <h1>Account Details</h1>
                <p>{account?.fullName}</p>
                <p>{account?.iban}</p>
                <p>{account?.balance} {account?.currency}</p>
                <p>{account?.withdrawPerDayLimit}</p>
        </div>
    )
}