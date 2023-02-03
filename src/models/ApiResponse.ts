export enum ResponseType {
    Error = "Error",
    Warning = "Warning",
    Success = "Success",
    InputError = "Input Error"
}

export type ApiResponse = {
    statusCode: number,
    type: ResponseType,
    message: string,
    data?: object
}