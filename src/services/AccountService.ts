import axios from 'axios';
import { Account } from '../types/Account';



export async function getListAccount(): Promise<Account[]>{

    try {
        const response =  await axios.get<Account[]>('http://localhost:8081/api/v1/accounts');
        console.log(response.data);
        return response.data;
    } catch(error){
        console.error("Error fetching accounts: ", error);
        throw error;
    }
 
}


export async function getAccounById(id: number): Promise<Account> {
    try{
        const response = await axios.get<Account>(`http://localhost:8081/api/v1/accounts/${id}`);
        return response.data;
    } catch(error){
        console.log(`Error fetching account with Id: ${id}` , error);
        throw error;
    }

}