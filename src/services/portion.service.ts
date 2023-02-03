import { PortionDal } from "../data-access/portion.dal"
import { Portion, ApiResponse, ResponseType } from "../models"
import { validatePortion } from "../validators/portion"

export class PortionService {
    portionDal: PortionDal
    constructor() {
        this.portionDal = new PortionDal()
    }

    async getAll(): Promise<ApiResponse> {
        const portions = await this.portionDal.getAll()
        return {
            statusCode: 200,
            type: ResponseType.Success,
            message: "Successfully to retrieve all the portions",
            data: portions
        }
    }

    async getById(id: number): Promise<ApiResponse> {
        const portion = await this.portionDal.getById(id)
        if (portion) {
            return {
                statusCode: 200,
                type: ResponseType.Success,
                message: "Successfully to retrieve the portion",
                data: portion
            }
        }
        else {
            return {
                statusCode: 404,
                type: ResponseType.Error,
                message: "Can't retrieve the portion with this id"
            }
        }
    }

    async create(data: Portion): Promise<ApiResponse> {
        const validPortion = await validatePortion(data)
        if (!validPortion.success) {
            return {
                statusCode: 400,
                message: "Portion not valid",
                type: ResponseType.InputError,
                data: validPortion
            }
        }
        const oldPortion = await this.portionDal.getOne({ name: data.name.toLowerCase() });

        if (oldPortion) {
            return {
                statusCode: 409,
                message: "Portion already exists",
                type: ResponseType.Warning
            }
        }

        data = {
            ...data,
            name: data.name.toLowerCase()
        }

        const portion = await this.portionDal.create(data)

        return {
            statusCode: 201,
            message: "Success to create the portion",
            type: ResponseType.Success,
            data: {
                portion
            }
        }

    }

    async update(id: number, data: Portion): Promise<ApiResponse> {
        const validPortion = await validatePortion(data)
        if (!validPortion.success) {
            return {
                statusCode: 400,
                message: "Portion not valid",
                type: ResponseType.InputError,
                data: validPortion
            }
        }

        data = {
            ...data,
            name: data.name.toLowerCase()
        }

        const portion = await this.portionDal.update(id, data)

        return {
            statusCode: 200,
            message: "Success to update the portion",
            type: ResponseType.Success,
            data: {
                portion
            }
        }

    }

    async delete(id: number): Promise<ApiResponse> {
        const success = await this.portionDal.delete(id)

        if (!success) {
            return {
                statusCode: 400,
                message: "Can't delete the portion",
                type: ResponseType.Error
            }
        }
        return {
            statusCode: 200,
            message: "Success to delete the portion",
            type: ResponseType.Success
        }

    }
}