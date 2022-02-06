import React from 'react';
import { useContext, useState, useEffect } from 'react';

import { createContext } from 'react';
const Crypto = createContext();
const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState('INR');
    const [symbol, setSymbol] = useState('₹');

    useEffect(() => {
        if (currency === "INR") {
            setSymbol("₹")
        } else if (currency === "USD") {
            setSymbol("$")
        }
    }, [currency]);





    return (
        //Double curly braces imp
        <Crypto.Provider value={{ currency, symbol, setCurrency }}>
            {children}
        </Crypto.Provider>
    );
};

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
}