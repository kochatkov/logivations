/// <reference types="react-scripts" />


type Good = {
    amount: number,
    currency: string,
    product: string,
}

type Expencies = {
    id: number,
    goods: Good[],
    date: string,
};

interface DropdownData {
    value: string,
}
