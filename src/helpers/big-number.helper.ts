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

/**
 * 10^decimals in BigNumber
 */
export const oneBN = (decimals = 18): BN => {
    return toBN(10^decimals);
}

export const zeroBN = (): BN => {
    return toBN(0);
}

/**
 * Representing the value in natural (fixed-point) notation rounded to `decimalPlaces` decimal places and divided by 1e18.
 * TODO: apply token decimals
 *
 * @param {BN|string|number} value
 * @param {number} decimalPlaces
 * @param {BN.RoundingMode} roundingMode
 */
export const valueToFixed = (value: BN | string | number, decimalPlaces: number = 6, roundingMode?: BN.RoundingMode): string => {
    if (typeof value === 'object') {
        return value.div(1e18).toFixed(decimalPlaces, roundingMode);
    }

    return toBN(value).div(1e18).toFixed(decimalPlaces, roundingMode);
}

// TODO: apply token decimals
export const weiToFixed = (value: BN | string | number, decimalPlaces: number = 6, roundingMode?: BN.RoundingMode): string => {
    if (typeof value === 'object') {
        return value.div(1e18).toFixed(decimalPlaces, roundingMode);
    }

    return toBN(value).div(1e18).toFixed(decimalPlaces, roundingMode);
}

/**
 * Representing the Wei in natural number
 * TODO: apply token decimals
 *
 * @param [value]
 */
export const weiToNumber = (value: BN | string): number => {
    if (typeof value === 'object') {
        return parseFloat(value.div(1e18).toString());
    }

    return parseFloat(toBN(value).div(1e18).toString());
}

/**
 * @param [amount] - Token amount.
 * @param [decimals] - Token decimals.
 * @param decimalPlaces
 */
export const amountToFixed = (amount: string|number, decimals = 18, decimalPlaces: number = 6): string => {
   return  toBN(amount).div(10**decimals).toFixed(decimalPlaces);
}

/**
 * @param [amount] - Token amount.
 * @param [decimals] - Token decimals.
 */
export const amountToBN = (amount: string|number, decimals = 18): BN => {
    return  toBN(amount).times(10**decimals);
}