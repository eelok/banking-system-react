import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Account } from "../types/Account";
import { getAccounByIdFromJava, getAccounByIdFromTS } from "../services/AccountService";

type DataFromAccount = {
    fromJava: {
        account: Account | null;
        loading: boolean;
        error: string | null
    },
    fromTS: {
        account: Account | null;
        loading: boolean;
        error: string | null
    }
}

export default function AccountDetails() {

    const {id} = useParams();

    const [data, setData] = useState<DataFromAccount>({
        fromJava: {
            account: null,
            loading: true,
            error: null
        },
        fromTS: {
            account: null,
            loading: true,
            error: null
        }
    });

    useEffect(() => {
    
        const fetchAccountFromTS = async() => {
            if(!id) {
                setData((prev) => ({
                    ...prev,
                    fromTS: {account: null, loading: true, error: "Account id is not found"}
                }));
                return;
            }

            setData((prev) => ({
                ...prev,
                fromTS: {account: null, loading: true, error: null}
            }));

            try {
                let account = await getAccounByIdFromTS(Number(id));
                setData((prev) => ({
                    ...prev,
                    fromTS: {account, loading: false, error: null}
                }));
            }catch(error){
                setData((prev) => ({
                    ...prev,
                    fromTS: {account: null, loading: false, error: String(error)}
                }));
            }
        };

        const fetchAccountFromJava = async () => {
            if(!id){
                setData((prev) => ({
                    ...prev,
                    fromJava: {account: null, loading: true, error: "Account id is not found"}
                }));
                return;
            }
            try{
                let account: Account = await getAccounByIdFromJava(Number(id));
                setData((prev) => ({
                    ...prev,
                    fromJava: {account, loading: false, error: null}
                }));
            }catch(error){
                setData((prev) => ({
                    ...prev,
                    fromJava: {account: null, loading: false, error: String(error)}
                }));
            }
        }

        fetchAccountFromTS();
        fetchAccountFromJava();
    }, [id]);

    // useEffect(() => {
    //     setError(null);
    //     setLoading(true);

    //     if(!id){
    //         setError("Account ID not found!");
    //         setLoading(false);
    //         return;
    //     }

    //     const fetchAccountById = async (id: number) => {
    //         try {
    //             const account = await getAccounByIdFromTS(id);
    //             setAccount(account);
    //         } catch(error){
    //             setError(String(error));
    //         } finally {
    //             setLoading(false);
    //         }
    //     }

    //     fetchAccountById(Number(id));
    // }, [id]);

    return(
        <div className="App">
            {
                data.fromJava.account &&(
                    <div>
                        <h3>Java</h3>
                        <h3>Account Details:</h3>
                        <p>{data.fromJava.account?.fullName}</p>
                        <p>{data.fromJava.account?.iban}</p>
                        <p>{data.fromJava.account?.balance} {data.fromJava.account?.currency}</p>
                        <p>{data.fromJava.account?.withdrawPerDayLimit}</p>  
                    </div>
                )
            }

            {
                data.fromTS.account && (
                    <div>
                        <h3>Type Script</h3>
                        <h3>Account Details</h3>
                        <p>{data.fromTS.account?.fullName}</p>
                        <p>{data.fromTS.account?.iban}</p>
                        <p>{data.fromTS.account?.balance} {data.fromTS.account?.currency}</p>
                        <p>{data.fromTS.account?.withdrawPerDayLimit}</p> 
                    </div>
                )

            }      
        </div>
    )
}