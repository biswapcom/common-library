import BN from "bignumber.js";

BN.config({ EXPONENTIAL_AT: 1000000000 });

export const toBN = (value: string | number): BN => {
    return new BN(value);
}

export const multiPlus = (...values: string[] | number[]): BN => {
    let result = toBN('0');

    for (const value of values) {
        result = result.plus(toBN(value));
    }

    return result;
}