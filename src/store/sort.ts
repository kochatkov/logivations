import { AnyAction } from 'redux';

const SORT_BY = 'SORT_BY';

export const SortBy = (field: string) => ({ type: SORT_BY, field });

const defaultSortState = {
    field: 'date',
    order: 'ACS',
};

const sortReducer = (state = defaultSortState, action: AnyAction) => {
    switch (action.type) {
        case SORT_BY:
            if (state.field === action.field) {
                return {
                    ...state,
                    order: state.order === 'ACS' ? 'DESC' : 'ACS',
                }
            };

            return { ...state, field: action.field };
        default:
            return state;
    }
};

export default sortReducer;
