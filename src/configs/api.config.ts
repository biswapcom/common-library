import * as dotenv from 'dotenv';

dotenv.config();

export const bsBackendUri: string = process.env.BS_BACKEND_URI || 'http://localhost:3045';