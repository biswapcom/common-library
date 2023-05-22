import { Moment } from "moment";
import { DeltaTime, BlockDater } from "../types";
/**
 * Returns UTC timestamps for 24h ago, 48h ago, 7d ago and 14d ago relative to current date and time.
 */
export declare const getDeltaTimestamps: () => DeltaTime;
export declare const getBlockDater: (date: Date | Moment) => Promise<BlockDater>;
/**
 * Returns block numbers for now, 24h ago, 48h ago, 7d ago and 14d ago relative to current date and time.
 */
export declare const getBlockNumbersByPeriods: () => Promise<DeltaTime>;
