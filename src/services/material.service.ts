import { MaterialDal } from "../data-access/material.dal"
import { Material, ApiResponse, ResponseType } from "../models"
import { validateMaterial } from "../validators/material"

export class MaterialService {
    materialDal: MaterialDal
    constructor() {
        this.materialDal = new MaterialDal()
    }

    async getAll(): Promise<ApiResponse> {
        const users = await this.materialDal.getAll()
        return {
            statusCode: 200,
            type: ResponseType.Success,
            message: "Successfully to retrieve all the materials",
            data: users
        }
    }

    async getById(id: number): Promise<ApiResponse> {
        const material = await this.materialDal.getById(id)
        if (material) {
            return {
                statusCode: 200,
                type: ResponseType.Success,
                message: "Successfully to retrieve the material",
                data: material
            }
        }
        else {
            return {
                statusCode: 404,
                type: ResponseType.Error,
                message: "Can't retrieve the material with this id"
            }
        }
    }

    async create(data: Material): Promise<ApiResponse> {
        const validMaterial = await validateMaterial(data)
        if (!validMaterial.success) {
            return {
                statusCode: 400,
                message: "Material not valid",
                type: ResponseType.InputError,
                data: validMaterial
            }
        }
        const oldMaterial = await this.materialDal.getOne({ name: data.name.toLowerCase() });

        if (oldMaterial) {
            return {
                statusCode: 409,
                message: "Material already exists",
                type: ResponseType.Warning
            }
        }

        data = {
            ...data,
            name: data.name.toLowerCase()
        }

        const material = await this.materialDal.create(data)

        return {
            statusCode: 201,
            message: "Success to create the material",
            type: ResponseType.Success,
            data: {
                material
            }
        }

    }

    async update(id: number, data: Material): Promise<ApiResponse> {
        const validMaterial = await validateMaterial(data)
        if (!validMaterial.success) {
            return {
                statusCode: 400,
                message: "Material not valid",
                type: ResponseType.InputError,
                data: validMaterial
            }
        }

        data = {
            ...data,
            name: data.name.toLowerCase()
        }

        const material = await this.materialDal.update(id, data)

        return {
            statusCode: 200,
            message: "Success to update the material",
            type: ResponseType.Success,
            data: {
                material
            }
        }

    }

    async delete(id: number): Promise<ApiResponse> {
        const success = await this.materialDal.delete(id)

        if (!success) {
            return {
                statusCode: 400,
                message: "Can't delete the material",
                type: ResponseType.Error
            }
        }
        return {
            statusCode: 200,
            message: "Success to delete the material",
            type: ResponseType.Success
        }

    }
}