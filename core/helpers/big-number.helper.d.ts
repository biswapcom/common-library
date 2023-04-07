import BN from "bignumber.js";
export declare const toBN: (value: string | number) => BN;
export declare const multiPlus: (...values: string[] | number[]) => BN;
/**
 * 1000000000000000000 in BigNumber
 */
export declare const oneBN: () => BN;
export declare const zeroBN: () => BN;
/**
 * Representing the value in natural (fixed-point) notation rounded to `decimalPlaces` decimal places and divided by 1e18.
 *
 * @param {BN|string|number} value
 * @param {number} decimalPlaces
 * @param {BN.RoundingMode} roundingMode
 */
export declare const valueToFixed: (value: BN | string | number, decimalPlaces?: number, roundingMode?: BN.RoundingMode) => string;
export declare const weiToFixed: (value: BN | string | number, decimalPlaces?: number, roundingMode?: BN.RoundingMode) => string;
/**
 * Representing the Wei in natural number
 *
 * @param [value]
 */
export declare const weiToNumber: (value: BN | string) => number;
