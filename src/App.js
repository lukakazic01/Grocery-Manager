import './App.css';
import Grocery from "./Grocery";
import React, {useState, useEffect} from 'react';
import {Link, Outlet, useNavigate, useSearchParams} from "react-router-dom";
import {useForm} from "react-hook-form";

function App() {
    const [groceries, setGroceries] = useState([{item: 'milk', price: '300', amount: '3'}])
    const [date, setDate] = useState();
    const { register, handleSubmit, formState: {errors} } = useForm({
        defaultValues: {
            "item": '',
            "price": '',
            "amount": ''
        },
    });
    const onSubmit = (data) => {
        const {item, price, amount} = data;
        localStorage.setItem('groceries', JSON.stringify([...groceries, {item, price, amount}]));
        setGroceries([...groceries, {
            item, price, amount
        }])
    }
    useEffect(() => {
        setGroceries(JSON.parse(localStorage.getItem('groceries')));
    },[])
    useEffect(() => {
        const interval = setInterval(() => {
            const dateObject = new Date()
            const time = dateObject.toLocaleTimeString();
            setDate(time)
        }, 1000)
        return () => {
            clearInterval(interval);
        }
    }, [])

    const handleDelete = (grocery) => {
        const modifiedGroceries = groceries.filter((item) => item.item !== grocery.item)
        localStorage.setItem('groceries', JSON.stringify(modifiedGroceries));
        setGroceries(modifiedGroceries);
    }

    const handleEditing = (grocery, edited) => {
        const indexOfGrocery = groceries.findIndex(i => i.item === grocery.item);
        const modifiedGroceries = groceries.map((item, index) => {
            if(index === indexOfGrocery) return edited;
            return item;
        })
        localStorage.setItem('groceries', JSON.stringify(modifiedGroceries));
        setGroceries(modifiedGroceries)
    }
    return (
    <div>
        <Outlet />
        <form onSubmit={handleSubmit(onSubmit)}>
            <Link to={`/je`}>aa</Link>
            <div className="input-wrapper">
                {date}
                <label>Item</label>
                <input className="input"
                       {...register("item", {
                                    required: "Field is required",
                                        minLength: {
                                            value: 2,
                                            message: 'Item must have at least 2 characters'
                                        }
                                   }
                              )
                        }/>
                <p className="text-danger">{errors.item?.message}</p>
                <label>Price</label>
                <input className="input"
                       {...register("price", {
                           required: "Field is required",
                           min: {
                              value: 50,
                              message: "Price must be over 50"
                    }})}/>
                <p className="text-danger">{errors.price?.message}</p>
                <label>Amount</label>
                <input className="input" {
                    ...register("amount",
                        {
                            required: "Field is required",
                            min: {
                                value: 1,
                                message: "Amount must be over 0"
                            }})}/>
                <p className="text-danger">{errors.amount?.message}</p>
                <button type="submit" className="button">submit</button>
            </div>
        </form>
        {groceries.map((curr, index) => (
            <Grocery grocery={curr} key={index} handleDelete={handleDelete} handleEditing={handleEditing}/>
        ))}
    </div>
  );
}

export default App;
