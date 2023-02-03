export type User = {
    id: number,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    role?: any
}

export enum Roles {
    ADM = "ADM",
    CHEF = "CHEF",
    USER = "USER"
}
