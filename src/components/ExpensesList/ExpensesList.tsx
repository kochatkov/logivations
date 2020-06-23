import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListExpenses } from '../../store';
import { removeExpences} from '../../store/expencies';

export const ExpensesList = () => {
    const dispatch = useDispatch();
    const expenses = useSelector(getListExpenses);

    return (
        <>
            {expenses.map((expence: Expencies) => (
            <div key={expence.id} className="NewExpense__list">
                <p className="NewExpense__date"><span className="NewExpense__date-text">{expence.date}</span></p>
                {expence.goods.map(item => (
                    <div key={item.product} className="NewExpense__paragraphs">
                        <p className="NewExpense__item">{item.product}</p>
                        <p className="NewExpense__item">{item.amount}
                        <span className="NewExpense__currency">{item.currency}</span>
                    </p>
                    </div>
                ))}
                <button
                    type="button"
                    className="NewExpense__button-item"
                    onClick={() => dispatch(removeExpences(expence.date))}
                >Clear</button>
            </div>
        ))}
        </>
    )
}
