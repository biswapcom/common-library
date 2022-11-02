import { ObjectId } from "bson";

export type Pair = {
    _id?: ObjectId;
    /**
     * Reserves of token tokenA used to price trades and distribute liquidity
     */
    reserveA: string;

    /**
     * Reserves of token tokenB used to price trades and distribute liquidity
     */
    reserveB: string;

    /**
     * Address of the pair token with the lower sort order
     */
    tokenA: string;

    /**
     * Address of the pair token with the higher sort order
     */
    tokenB: string;

    /**
     * Total amount of pool tokens for a pair
     */
    totalSupply: string;
}