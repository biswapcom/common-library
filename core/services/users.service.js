"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersService = exports.UsersService = void 0;
class UsersService {
    setDb(db) {
        this.db = db;
    }
    /**
     * getUserByAddress
     * @param address - user wallet address
     */
    async getUserByAddress(address) {
        const user = await this.db.collection('users').findOne({ address: address.toLowerCase() });
        return user;
    }
}
exports.UsersService = UsersService;
exports.usersService = new UsersService();
