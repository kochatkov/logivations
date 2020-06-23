import React from 'react';

type CurrencyRowProps = {
    currencyOptions: [],
    selectedCurrency: [],
    onChangeCurrency: (e: any) => void,
    total: number,
}

export const CurrencyRow: React.FC<CurrencyRowProps> = ({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  total
}) => {

    return (
        <div className="CurrencyRow">
            <div className="CurrencyRow__row">
                <p className="CurrencyRow__text-total">total: {total}</p>
                <select
                    value={selectedCurrency}
                    onChange={onChangeCurrency}
                    className="CurrencyRow__select"
                >
                    {currencyOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}
