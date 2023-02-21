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
 * 1000000000000000000 in BigNumber
 */
export const oneBN = (): BN => {
    return toBN(1e18.toString());
}

/**
 * Representing the value in natural (fixed-point) notation rounded to `decimalPlaces` decimal places and divided by 1e18.
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

export const weiToFixed = (value: BN | string | number, decimalPlaces: number = 6, roundingMode?: BN.RoundingMode): string => {
    if (typeof value === 'object') {
        return value.div(1e18).toFixed(decimalPlaces, roundingMode);
    }

    return toBN(value).div(1e18).toFixed(decimalPlaces, roundingMode);
}

/**
 * Representing the Wei in natural number
 *
 * @param [value]
 */
export const weiToNumber = (value: BN | string): number => {
    if (typeof value === 'object') {
        return parseFloat(value.div(1e18).toString());
    }

    return parseFloat(toBN(value).div(1e18).toString());
}