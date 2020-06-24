import React, { useEffect, useState } from 'react';
import './App.scss';
import NewExpense from './components/NewExpense/NewExpense';
import { CurrencyRow } from './components/CurrencyRow/CurrencyRow';
import { getListExpenses } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { ExpensesList } from './components/ExpensesList/ExpensesList';
import { SortBy } from './store/sort';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';

function App() {
    const expenses = useSelector(getListExpenses);
    const dispatch = useDispatch();
    const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
    const [toCurrency, setToCurrency] = useState();
    const [currenciesRate, setCurrenciesRate] = useState();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (toCurrency != null && currenciesRate != null) {
            const rate = expenses
                .map(item => item.goods
                    .reduce((acc: number, good: Good) =>
                        acc + (good.amount / currenciesRate[good.currency]), 0) * currenciesRate[toCurrency]);
            const totalRate = rate.reduce((acc, currency) => acc + currency, 0)
            setTotal(Math.round(totalRate));
        }
    }, [toCurrency, currenciesRate, expenses]);

    useEffect(() => {
        fetch(BASE_URL)
            .then(res => res.json())
            .then(data => {
                if (typeof Object.keys(data.rates) !== 'undefined' && Object.keys(data.rates).length > 0) {
                    const firstCurrency = Object.keys(data.rates)[0];
                    setToCurrency(firstCurrency);
                    setCurrencyOptions([...Object.keys(data.rates)]);
                    setCurrenciesRate(data.rates);
                }
            })
    }, []);

    const handlerChange = (e: React.ChangeEvent<HTMLSelectElement>) => (
        setToCurrency(e.target.value)
    );

  return (
    <div className="App">
        <header className="App__header">
            <h1 className="App__head">Expenses</h1>
            <NewExpense />
        </header>
        <div className="App__list">
            <button
                className="NewExpense__button-list button"
                onClick={() => dispatch(SortBy('date'))}
            >
                list
            </button>
            <ExpensesList />
        </div>
            <CurrencyRow
                currencyOptions={currencyOptions}
                selectedCurrency={toCurrency}
                onChangeCurrency={handlerChange}
                total={total}
            />
    </div>
  );
}

export default App;
