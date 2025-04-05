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
            currency: string;
            description?: string;
            metadata?: Record<string, any>;
        },
    ): CancelablePromise<{
        id: string;
        status: 'PENDING' | 'COMPLETED' | 'FAILED';
        amount: number;
        currency: string;
        description?: string;
        metadata?: Record<string, any>;
        createdAt: string;
        updatedAt: string;
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
