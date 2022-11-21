import { Db } from "mongodb";
import { User } from "../types";
export declare class UsersService {
    private db;
    setDb(db: Db): void;
    getUserByAddress(address: string): Promise<User | null>;
}
export declare const usersService: UsersService;
