import BigNumber from "bignumber.js";
export declare const Q96: bigint;
export declare function getLiquidityByY(amountY: bigint, sqrtPrice96: bigint): bigint;
export declare function getLiquidityByX(amountX: bigint, sqrtPrice96: bigint): bigint;
export declare function getSqrtRatioAtTick(tick: number): string;
export declare const point2PriceDecimal: (tokenA: any, tokenB: any, point: number) => number;
export declare const priceUndecimal2PriceDecimal: (tokenA: any, tokenB: any, priceUndecimalAByB: BigNumber) => number;
export declare const getTokenXYFromToken: (tokenA: any, tokenB: any) => {
    tokenX;
    tokenY;
};
