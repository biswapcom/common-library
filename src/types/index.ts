import { getBlockDater } from "@helpers/time.helper";

export * from './balance.type'
export * from './blockchain.type';
export * from './pair.type';
export * from './user.type';


export type LoggerOptions = {
    /** Count of empty lines before output message */
    newline?: number;

    /** Count of empty lines after output message */
    break?: number;

    /** To bold the message */
    bold?: boolean;

    /** To underline the message */
    underline?: boolean;
}

export type CliArgumentValueType = string | number | boolean;

export interface DeltaTime {
    now?: number;
    t24h: number;
    t48h: number;
    t7d: number;
    t14d: number;
}

export interface BlockDater {
    date: string | Date;
    block: number;
    timestamp: number;
}