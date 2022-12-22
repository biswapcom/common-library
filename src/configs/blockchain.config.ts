import * as dotenv from 'dotenv';
import { ChainId } from '@enums';
import { Web3Map } from '@types';

dotenv.config();

export const web3Config: Web3Map = {
    [ChainId.BSC]: {
        httpHosts: [
            process.env.BSC_PROVIDER || 'https://bsc-mainnet.nodereal.io/v1/ef269c169b624e28acb38925c0db4e9b'
        ]
    }
};

export const defaultChainId: ChainId = ChainId.BSC;