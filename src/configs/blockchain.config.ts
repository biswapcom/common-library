import * as dotenv from 'dotenv';
import { ChainId } from '@enums';
import { Web3Map } from '@types';

dotenv.config();

export const web3Config: Web3Map = {
    [ChainId.BSC]: {
        httpHosts: [
            process.env.BSC_PROVIDER || process.env.BS_URI || 'https://bsc-mainnet.nodereal.io/v1/27d47106be1c4154a66e1c1cbf36af74'
        ]
    }
};

export const defaultChainId: ChainId = ChainId.BSC;