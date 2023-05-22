"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockNumbersByPeriods = exports.getBlockDater = exports.getDeltaTimestamps = void 0;
const moment_1 = __importDefault(require("moment"));
const date_fns_1 = require("date-fns");
const _services_1 = require("../services");
const EthDater = require('ethereum-block-by-date');
/**
 * Returns UTC timestamps for 24h ago, 48h ago, 7d ago and 14d ago relative to current date and time.
 */
const getDeltaTimestamps = () => {
    const utcCurrentTime = (0, date_fns_1.getUnixTime)(new Date()) * 1000;
    const t24h = (0, date_fns_1.getUnixTime)((0, date_fns_1.startOfMinute)((0, date_fns_1.subDays)(utcCurrentTime, 1)));
    const t48h = (0, date_fns_1.getUnixTime)((0, date_fns_1.startOfMinute)((0, date_fns_1.subDays)(utcCurrentTime, 2)));
    const t7d = (0, date_fns_1.getUnixTime)((0, date_fns_1.startOfMinute)((0, date_fns_1.subWeeks)(utcCurrentTime, 1)));
    const t14d = (0, date_fns_1.getUnixTime)((0, date_fns_1.startOfMinute)((0, date_fns_1.subWeeks)(utcCurrentTime, 2)));
    return { t24h, t48h, t7d, t14d };
};
exports.getDeltaTimestamps = getDeltaTimestamps;
const getBlockDater = async (date) => {
    const dater = new EthDater(_services_1.blockchainService.getWeb3());
    return dater.getDate(date, true, true);
};
exports.getBlockDater = getBlockDater;
/**
 * Returns block numbers for now, 24h ago, 48h ago, 7d ago and 14d ago relative to current date and time.
 */
const getBlockNumbersByPeriods = async () => {
    const [now, t24h, t48h, t7d, t14d] = await Promise.all([
        (0, exports.getBlockDater)((0, moment_1.default)()),
        (0, exports.getBlockDater)((0, moment_1.default)().subtract(1, 'd')),
        (0, exports.getBlockDater)((0, moment_1.default)().subtract(2, 'd')),
        (0, exports.getBlockDater)((0, moment_1.default)().subtract(1, 'w')),
        (0, exports.getBlockDater)((0, moment_1.default)().subtract(2, 'w'))
    ]);
    return {
        now: now.block,
        t24h: t24h.block,
        t48h: t48h.block,
        t7d: t7d.block,
        t14d: t14d.block,
    };
};
exports.getBlockNumbersByPeriods = getBlockNumbersByPeriods;
