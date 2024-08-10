export enum ErrorCode {
    Success = 0,
    InvalidKey = 1,
    PermissionDenied = 2,
    InvalidAuth = 3,
    AccountExists = 4,
    SessionNotFound = 5,
    InvalidPayload = 6,
    PasswordIncorrect = 7,
    ResourceNotFound = 8,
    Error = 9,
}

export enum HeaderTag {
    EXPORT = 'EXPORT',
    WEIGH = 'WEIGH',
    NO_SESSION = 'NO_SESSION'
};

export type DataResult = {
    error_code: ErrorCode,
    data: Record<any, any>,
    message?: string,
}

export enum ConnectScannerStatus {
    Success = 0, 
    NoSession = 2,
}
