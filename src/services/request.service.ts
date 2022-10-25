import fetch from 'node-fetch';
import { bsBackendUri } from "@configs";

const uri = `${bsBackendUri}/back`;

export class RequestService {

    async post(path: string, body = {}) {
        const response = await fetch(`${uri}/${path}`, {
            method: 'post',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });

        this.checkResponseStatus(response);

        return response.json();
    }

    async get(path: string, queryParams = {}) {
        const params = new URLSearchParams(queryParams);
        const response = await fetch(`${uri}/${path}?${params.toString()}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        });

        this.checkResponseStatus(response);

        return response.json();
    }

    private checkResponseStatus(response) {
        if (response.ok) {
            return response;
        }

        throw new Error(`The HTTP status of the response: ${response.status} (${response.statusText})`);
    }
}

export const requestService = new RequestService();