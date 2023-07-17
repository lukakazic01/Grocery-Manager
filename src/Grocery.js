import {useState} from "react";


export default function Grocery({grocery, handleDelete, handleEditing}) {
    const [isEditable, setIsEditable] = useState(false);
    const [item, setItem]  = useState();
    const [price, setPrice] = useState();
    const [amount, setAmount] = useState();
    const edited = {item, price, amount};
    return (
        <ul className="input-wrapper">
                <li>
                    {isEditable ? <input placeholder="name" onChange={(e) =>  setItem(e.target.value)}/> : <span className="me-5">{grocery.item}</span> }
                    {isEditable ? <input placeholder="price" onChange={(e) =>  setPrice(e.target.value)}/> : <span className="me-5">{grocery.price}</span> }
                    {isEditable ? <input placeholder="amount" onChange={(e) =>  setAmount(e.target.value)}/> : <span className="me-5">{grocery.amount}</span> }
                    {isEditable ? (
                        <button onClick={() => {
                            setIsEditable(false)
                            handleEditing(grocery, edited)
                        }
                        }>Save</button>
                    ) : (
                        <>
                            <button className="me-5" onClick={() => handleDelete(grocery)}>Delete</button>
                            <button onClick={() => setIsEditable(true)}>Edit</button>
                        </>
                    )}
                </li>
        </ul>
    )
}