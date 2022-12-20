import { Db } from "mongodb";
import { User } from "@types";


export class UsersService {
    private db: Db;

    setDb(db: Db) {
        this.db = db;
    }

    /**
     * getUserByAddress
     * @param address - user wallet address
     */
    async getUserByAddress(address: string): Promise<User | null> {
        const user = await this.db.collection('users').findOne({ address: address.toLowerCase()});
        return user as User | null;
    }
}

export const usersService = new UsersService();