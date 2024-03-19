import * as dotenv from 'dotenv';
import { ChainId } from '@enums';
import { Web3Map } from '@types';

dotenv.config();

export const web3Config: Web3Map = {
    [ChainId.BSC]: {
        httpHosts: [
            process.env.BSC_PROVIDER || 'https://restless-bitter-cherry.bsc.quiknode.pro/7cd27b905f7b140932a1f71bd12345f24e575e0a3ca'
        ]
    }
};

export const defaultChainId: ChainId = ChainId.BSC;