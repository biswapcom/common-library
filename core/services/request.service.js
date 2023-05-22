"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestService = exports.RequestService = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const _configs_1 = require("../configs");
const uri = `${_configs_1.bsBackendUri}/back`;
class RequestService {
    async post(path, body = {}) {
        const response = await (0, node_fetch_1.default)(`${uri}/${path}`, {
            method: 'post',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        this.checkResponseStatus(response);
        return response.json();
    }
    async get(path, queryParams = {}) {
        const params = new URLSearchParams(queryParams);
        const response = await (0, node_fetch_1.default)(`${uri}/${path}?${params.toString()}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        });
        this.checkResponseStatus(response);
        return response.json();
    }
    checkResponseStatus(response) {
        if (response.ok) {
            return response;
        }
        throw new Error(`The HTTP status of the response: ${response.status} (${response.statusText})`);
    }
}
exports.RequestService = RequestService;
exports.requestService = new RequestService();
