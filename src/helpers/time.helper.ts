import moment from "moment";
import { getUnixTime, startOfMinute, subDays, subWeeks, subMonths } from 'date-fns';
import { Moment } from "moment";
import { DeltaTime, BlockDater } from "@types";
import { blockchainService } from "@services";

const EthDater = require('ethereum-block-by-date');


/**
 * Returns UTC timestamps for 24h ago, 48h ago, 7d ago and 14d ago relative to current date and time.
 */
export const getDeltaTimestamps = (): DeltaTime => {
    const utcCurrentTime = getUnixTime(new Date()) * 1000;

    const t24h = getUnixTime(startOfMinute(subDays(utcCurrentTime, 1)));
    const t48h = getUnixTime(startOfMinute(subDays(utcCurrentTime, 2)));
    const t7d = getUnixTime(startOfMinute(subWeeks(utcCurrentTime, 1)));
    const t14d = getUnixTime(startOfMinute(subWeeks(utcCurrentTime, 2)));
    const t1m = getUnixTime(startOfMinute(subMonths(utcCurrentTime, 1)));

    return { t24h, t48h, t7d, t14d, t1m };
}

export const getBlockDater = async (date: Date | Moment): Promise<BlockDater> => {
    const dater = new EthDater(blockchainService.getWeb3());

    return dater.getDate(date, true, true);
}

/**
 * Returns block numbers for now, 24h ago, 48h ago, 7d ago and 14d ago relative to current date and time.
 */
export const getBlockNumbersByPeriods = async (): Promise<DeltaTime> => {
    const [now, t24h, t48h, t7d, t14d, t1m] = await Promise.all([
        getBlockDater(moment()),
        getBlockDater(moment().subtract(1, 'd')),
        getBlockDater(moment().subtract(2, 'd')),
        getBlockDater(moment().subtract(1, 'w')),
        getBlockDater(moment().subtract(2, 'w')),
        getBlockDater(moment().subtract(1, 'm')),
    ]);

    return {
        now: now.block,
        t24h: t24h.block,
        t48h: t48h.block,
        t7d: t7d.block,
        t14d: t14d.block,
        t1m : t1m.block
    };
}