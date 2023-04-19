"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockNumbersByPeriods = exports.getBlockDater = exports.getDeltaTimestamps = void 0;
var moment_1 = __importDefault(require("moment"));
var date_fns_1 = require("date-fns");
var _services_1 = require("../services");
var EthDater = require('ethereum-block-by-date');
/**
 * Returns UTC timestamps for 24h ago, 48h ago, 7d ago and 14d ago relative to current date and time.
 */
var getDeltaTimestamps = function () {
    var utcCurrentTime = (0, date_fns_1.getUnixTime)(new Date()) * 1000;
    var t24h = (0, date_fns_1.getUnixTime)((0, date_fns_1.startOfMinute)((0, date_fns_1.subDays)(utcCurrentTime, 1)));
    var t48h = (0, date_fns_1.getUnixTime)((0, date_fns_1.startOfMinute)((0, date_fns_1.subDays)(utcCurrentTime, 2)));
    var t7d = (0, date_fns_1.getUnixTime)((0, date_fns_1.startOfMinute)((0, date_fns_1.subWeeks)(utcCurrentTime, 1)));
    var t14d = (0, date_fns_1.getUnixTime)((0, date_fns_1.startOfMinute)((0, date_fns_1.subWeeks)(utcCurrentTime, 2)));
    return { t24h: t24h, t48h: t48h, t7d: t7d, t14d: t14d };
};
exports.getDeltaTimestamps = getDeltaTimestamps;
var getBlockDater = function (date) { return __awaiter(void 0, void 0, void 0, function () {
    var dater;
    return __generator(this, function (_a) {
        dater = new EthDater(_services_1.blockchainService.getWeb3());
        return [2 /*return*/, dater.getDate(date, true, true)];
    });
}); };
exports.getBlockDater = getBlockDater;
/**
 * Returns block numbers for now, 24h ago, 48h ago, 7d ago and 14d ago relative to current date and time.
 */
var getBlockNumbersByPeriods = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, now, t24h, t48h, t7d, t14d;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, Promise.all([
                    (0, exports.getBlockDater)((0, moment_1.default)()),
                    (0, exports.getBlockDater)((0, moment_1.default)().subtract(1, 'd')),
                    (0, exports.getBlockDater)((0, moment_1.default)().subtract(2, 'd')),
                    (0, exports.getBlockDater)((0, moment_1.default)().subtract(1, 'w')),
                    (0, exports.getBlockDater)((0, moment_1.default)().subtract(2, 'w'))
                ])];
            case 1:
                _a = _b.sent(), now = _a[0], t24h = _a[1], t48h = _a[2], t7d = _a[3], t14d = _a[4];
                return [2 /*return*/, {
                        now: now.block,
                        t24h: t24h.block,
                        t48h: t48h.block,
                        t7d: t7d.block,
                        t14d: t14d.block,
                    }];
        }
    });
}); };
exports.getBlockNumbersByPeriods = getBlockNumbersByPeriods;
