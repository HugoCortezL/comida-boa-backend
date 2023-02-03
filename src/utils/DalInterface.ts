
export default interface DalInterface<T> {
    getAll(): Promise<T[]>
    getById(id: number): Promise<T | null>
    getOne(where: object): Promise<T | null>
    create(data: T): Promise<T | null>
    update(id: number, data: T): Promise<T | null>
    delete(id: number): Promise<boolean>
}