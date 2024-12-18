import type { User } from "./auth";

export type APIResponse<T> = {
    data: T;
    statusCode: number;
    message: string;
    timestamp?: string;
    error?: string;
    success?: boolean;
};

export type AuthAPIResponse = APIResponse<{
    user: User;
    token: string;
}>;