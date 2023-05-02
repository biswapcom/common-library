import BN from "bignumber.js";
export declare const toBN: (value: string | number) => BN;
export declare const multiPlus: (...values: string[] | number[]) => BN;
/**
 * 10^decimals in BigNumber
 */
export declare const oneBN: (decimals?: number) => BN;
export declare const zeroBN: () => BN;
/**
 * Representing the value in natural (fixed-point) notation rounded to `decimalPlaces` decimal places and divided by 1e18.
 * TODO: apply token decimals
 *
 * @param {BN|string|number} value
 * @param {number} decimalPlaces
 * @param {BN.RoundingMode} roundingMode
 */
export declare const valueToFixed: (value: BN | string | number, decimalPlaces?: number, roundingMode?: BN.RoundingMode) => string;
export declare const weiToFixed: (value: BN | string | number, decimalPlaces?: number, roundingMode?: BN.RoundingMode) => string;
/**
 * Representing the Wei in natural number
 * TODO: apply token decimals
 *
 * @param [value]
 */
export declare const weiToNumber: (value: BN | string) => number;
/**
 * @param [amount] - Token amount.
 * @param [decimals] - Token decimals.
 * @param decimalPlaces
 */
export declare const amountToFixed: (amount: string | number, decimals?: number, decimalPlaces?: number) => string;
/**
 * Token amount multiple by 1 ** decimals.
 *
 * @param [amount] - Token amount.
 * @param [decimals] - Token decimals.
 */
export declare const amountToBN: (amount: string | number | BN, decimals?: number) => BN;
