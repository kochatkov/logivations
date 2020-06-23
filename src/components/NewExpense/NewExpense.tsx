import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { addExpensesByDate, setExpence } from '../../store/expencies';
import { useDispatch, useSelector } from 'react-redux';
import { Expencies } from '../../store/expencies';

import { getExpenses } from '../../store';

const options = [
    {key: 'USD', text: 'USD', value: 'USD'},
    {key: 'EUR', text: 'EUR', value: 'EUR'},
    {key: 'PLN', text: 'PLN', value: 'PLN'},
    {key: 'UAH', text: 'UAH', value: 'UAH'},
];

const NewExpense = () => {
    const dispatch = useDispatch();
    const expenses = useSelector(getExpenses);

    const [date, setDate] = useState<any>(new Date());
    const [amount, setAmount] = useState('');
    const [product, setProduct] = useState('');
    const [currency, setCurrency] = useState('');

    let changeId = () => (Math.random() + 1);

    const handleChangeInputDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    const handleChangeInputAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const handleChangeProductInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct(e.target.value)
    };

    const handleDropdownCurrency = (e: any, data: any) => {
        e.target.value = data.value;
        setCurrency(e.target.value);
    }

    const handleSubmitExpence = (
        e: React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();

        if (date !== ''
            && (amount !== null || amount !== "")
            && currency !== ''
            && product.replace(/\s/g, '') !== '') {
            const expence: Expencies = {
                id: changeId(),
                goods:
                    [{
                    amount: +amount,
                    currency: currency,
                    product: product
                }],
                date: date,
            };

            if (expenses.some(el => el.date === date)) {
                dispatch(addExpensesByDate(date, expence.goods[0]));
            } else {
                dispatch(setExpence(expence))
            };

            setDate('');
            setAmount('');
            setCurrency('');
            setProduct('');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmitExpence}>
                <input
                    type="date"
                    className="NewExpense__input"
                    value={date}
                    onChange={handleChangeInputDate}
                />
                <input
                    type="number"
                    className="NewExpense__input"
                    placeholder="add amount"
                    value={amount}
                    onChange={handleChangeInputAmount}
                />
                <Dropdown
                    clearable
                    options={options}
                    selection
                    value={currency}
                    placeholder="Choose"
                    onChange={handleDropdownCurrency}
                />
                <input
                    type="text"
                    className="NewExpense__input"
                    placeholder="add product"
                    value={product}
                    onChange={handleChangeProductInput}
                />
                <button
                    type="submit"
                    className="NewExpense__button button"
                    onClick={handleSubmitExpence}
                >Add
                </button>
            </form>
        </>
    );
};

export default NewExpense;
