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
exports.AlertingService = void 0;
var _configs_1 = require("../configs");
var log_service_1 = require("./log.service");
var node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
/**
 * @example
 * ```js
 * import {AlertingService} from './'
 * const alerting = new AlertingService();
 * await alerting.sendText('Some title', 'some text')
 * ```
 */
var AlertingService = /** @class */ (function () {
    /**
     * @param botAuthKey - your bot auth key
     * @param chatId -  chat id where you want to send a message (your bot must be admin of this chat)
     * @param withoutAlerts - if you don't need alerts (as example - for local development)
     */
    function AlertingService(botAuthKey, chatId, withoutAlerts) {
        if (botAuthKey === void 0) { botAuthKey = _configs_1.alertingConfig.botAuthKey; }
        if (chatId === void 0) { chatId = _configs_1.alertingConfig.chatId; }
        if (withoutAlerts === void 0) { withoutAlerts = _configs_1.alertingConfig.withoutAlerts; }
        this.withoutAlerts = withoutAlerts;
        if (!botAuthKey)
            throw Error('Alerting service. Required parameter "botAuthKey" is not specified');
        if (!chatId)
            throw Error('Alerting service. Required parameter "chatId" is not specified');
        this.chatId = chatId;
        this.client = new node_telegram_bot_api_1.default(botAuthKey);
    }
    AlertingService.prototype.sendText = function (title, text) {
        return __awaiter(this, void 0, void 0, function () {
            var msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.withoutAlerts)
                            return [2 /*return*/];
                        msg = "\n--------------------\nTitle::\n".concat(title, "\n\nMessage::\n").concat(text);
                        return [4 /*yield*/, this.client.sendMessage(this.chatId, msg, { parse_mode: 'HTML' })
                                .catch(function (err) { return log_service_1.logService.error("AlertingService::sendText\n".concat(err.toString())); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Send message to Telegram chat
     *
     * @param [message]
     * @param [options]
     */
    AlertingService.prototype.sendMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.withoutAlerts)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.sendMessage(this.chatId, message, { parse_mode: 'Markdown' })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        log_service_1.logService.error("Alerting service cannot send message. ".concat(e_1.toString()));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AlertingService;
}());
exports.AlertingService = AlertingService;
