export declare class RequestService {
    post(path: string, body?: {}): Promise<any>;
    get(path: string, queryParams?: {}): Promise<any>;
    private checkResponseStatus;
}
export declare const requestService: RequestService;
