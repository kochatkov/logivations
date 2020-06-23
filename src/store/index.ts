import { createStore, combineReducers, applyMiddleware } from 'redux';
import expencesReducer from './expencies';
import sortReducer from './sort';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createSelector } from 'reselect';

export const getExpenses = (state: RootState) => state.expenses;
export const getSorted = (state: RootState) => state.sort;

const rootReducer = combineReducers({
    expenses: expencesReducer,
    sort: sortReducer,
});

export const getListExpenses = createSelector(
    getExpenses,
    getSorted,

    (expenses: Expencies[], sort) => {
        const filterExpenses = [...expenses];
        const sortDirection = (sort.order === 'ACS') ? 1 : -1;

        switch (sort.field) {
            case 'date':
                return filterExpenses
                    .sort((a: Expencies, b: Expencies) =>
                            // @ts-ignore
                        (Date.parse(new Date(a.date.split("/").reverse().join("-"))) -
                            // @ts-ignore
                            Date.parse(new Date(b.date.split("/").reverse().join("-")))) * sortDirection
                    );
            default:
                return filterExpenses;
        }
    }
);

export type RootState = ReturnType<typeof rootReducer>;

const persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState') || '')
    : {};

const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(thunk)),
);

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
