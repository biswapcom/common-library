"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toChunks = void 0;
const toChunks = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        chunks.push(chunk);
    }
    return chunks;
};
exports.toChunks = toChunks;
