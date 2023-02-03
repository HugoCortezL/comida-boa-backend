import { Material } from "../models"
import { ResultValidate } from "../utils/ResultValidate"

export const validateMaterial = async (material: Material): Promise<ResultValidate> => {
    /*
    1 - Validate the required fields
    2 - Validate input type
    3 - Validate Input format
    4 - Validate input range (min - max length or value)
    5 - 
    */
    if (!material.hasOwnProperty('name')) {
        return {
            success: false,
            fieldName: 'name',
            message: "Por favor preencha o nome"
        }
    }
    if (typeof material.name != 'string') {
        return {
            success: false,
            fieldName: 'name',
            message: "O nome deve ser preenchido como uma string"
        }
    }
    if (!/^[a-zA-Z\u00C0-\u00FF\s]*$/.test(material.name.trim())) {
        return {
            success: false,
            fieldName: 'name',
            message: "O nome só pode conter letras"
        }
    }
    if (material.name.trim().length < 2) {
        return {
            success: false,
            fieldName: 'name',
            message: "O nome deve conter ao menos 2 letras"
        }
    }
    return {
        success: true
    }
}