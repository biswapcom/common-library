import { ObjectId } from "mongodb";
export interface UserFlags {
    farm: boolean;
    swap: boolean;
    pool: boolean;
    squid: boolean;
}
export interface User {
    _id: ObjectId | null;
    created_at: Date;
    address: string;
    balanceDistribution: string;
    balanceSwap: string;
    balanceSwapV3: string;
    balancePool: string;
    balanceFarm: string;
    balanceStakedTokens: string;
    defaultReferralLink: ObjectId | null;
    registerReferralLink: ObjectId;
    transactions: number;
    flags: UserFlags;
    /** The reward that the referrer received from me */
    profitFromMe: string;
    /** Total user swap volume in USDT */
    statsVolumeSwap: string;
    statsVolumeSwapV3: string;
    autoPoolShares: string;
    chainId?: number;
    clickId?: string;
}
