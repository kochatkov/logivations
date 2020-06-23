import { AnyAction } from 'redux';

const SET_EXPENCES = 'SET_EXPENCES';
const ADD_EXPENSES_BY_DATE = 'ADD_EXPENSES_BY_DATE';
const REMOVE_EXPENCES = 'REMOVE_EXPENCES';




export const addExpensesByDate = (date: string, data: Good) => ({
    type: ADD_EXPENSES_BY_DATE,
    date,
    data
});
export const setExpence = (expense: Expencies) => ({ type: SET_EXPENCES, expense });
export const removeExpences = (date: string | undefined) => ({ type: REMOVE_EXPENCES, date });

const expencesReducer = (expenses: Expencies[] = [], action: AnyAction) => {
    switch (action.type) {
        case SET_EXPENCES:
            return [...expenses, action.expense];

        case REMOVE_EXPENCES:
            return expenses.filter(expense => expense.date !== action.date);

        case ADD_EXPENSES_BY_DATE:
            return expenses.map(item => {
                if (item.date === action.date) {
                    return {
                        date: action.date,
                        goods: [...item.goods, action.data],
                    }
                } else {
                    return item;
                }
            });

        default:
            return expenses;
    }
}

export default expencesReducer;
