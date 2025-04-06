/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Authorize a transaction
     * @param requestBody
     * @returns any Transaction authorization result
     * @throws ApiError
     */
    public static postApiTransactionsAuthorize(
        requestBody: {
            amount: number;
            metadata: {
                location?: string;
            };
            clientId: string;
            clientEmail: string;
        },
    ): CancelablePromise<{
        status: 'allowed' | 'denied';
        transaction: {
            id: string;
            userId: string;
            clientId: string;
            amount: number;
            status: string;
            metadata: {
                location?: string;
            };
            createdAt: string;
        };
        message: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/transactions/authorize',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                401: `Unauthorized`,
                500: `Internal server error`,
            },
        });
    }
}
