"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toChunks = void 0;
var toChunks = function (arr, chunkSize) {
    var chunks = [];
    for (var i = 0; i < arr.length; i += chunkSize) {
        var chunk = arr.slice(i, i + chunkSize);
        chunks.push(chunk);
    }
    return chunks;
};
exports.toChunks = toChunks;
