import { ChangeEvent, FormEvent, useState } from "react";
import { createAccountJava } from "../services/AccountService";
import { Account } from "../types/Account";

export default function CreateAccount() {
    const [formData, setFormData] = useState({
        fullName: ""
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevStat) => ({
            ...prevStat,
            [name]: value
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            const response = await createAccountJava({
                fullName: formData.fullName,
                iban: "DE 1234 is iban",
                currency: "some currensy",
                balance: Number(1),
                withdrawPerDayLimit: Number(10)
            } as Account);
             console.log("Success:", response);
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Your Full Name
                    <input 
                        type="text" name="fullName" 
                        value={formData.fullName} onChange={handleChange}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}