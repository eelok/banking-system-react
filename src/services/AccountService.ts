import axios from 'axios';
import { Account } from '../types/Account';

const JAVA_API_URL = process.env.REACT_APP_JAVA_API_URL;
const TS_API_URL = process.env.REACT_APP_TS_API_URL;

export async function getListAccountFromTS(): Promise<Account[]>{

    try {                                            
        const response =  await axios.get<Account[]>(`${TS_API_URL}api/v1/accounts`);
        console.log(response.data);
        return response.data;
    } catch(error){
        console.error("Error fetching accounts: ", error);
        throw error;
    }
 
}

export async function getListAccountFromJava(): Promise<Account[]> {
    try {                                            
        const response =  await axios.get<Account[]>(`${JAVA_API_URL}api/v1/accounts`);
        console.log(response.data);
        return response.data;
    } catch(error){
        console.error("Error fetching accounts: ", error);
        throw error;
    }
}
    


export async function getAccounByIdFromTS(id: number): Promise<Account> {
    try{
        const response = await axios.get<Account>(`${TS_API_URL}api/v1/accounts/${id}`);
        return response.data;
    } catch(error){
        console.log(`Error fetching account with Id: ${id}` , error);
        throw error;
    }
}

export async function getAccounByIdFromJava(id: number): Promise<Account> {
    try{
        const response = await axios.get<Account>(`${JAVA_API_URL}api/v1/accounts/${id}`);
        return response.data;
    } catch(error){
        console.log(`Error fetching account with Id: ${id}` , error);
        throw error;
    }
}

export async function createAccount(account: Account): Promise<Account> {
    try {
        const response = await axios.post<Account>(`${JAVA_API_URL}api/v1/accounts`, account);
        return response.data;
    }catch(error){
        console.log(`Error creating the account ${account}` , error);
        throw error;
    }
    
}