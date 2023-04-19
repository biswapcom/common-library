import { Moment } from "moment";
import { DeltaTime, BlockDater } from "../types";
export declare const getDeltaTimestamps: () => DeltaTime;
export declare const getBlockDater: (date: Date | Moment) => Promise<BlockDater>;
export declare const getBlockNumbersByPeriods: () => Promise<DeltaTime>;
