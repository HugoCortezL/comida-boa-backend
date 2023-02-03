import { Portion } from "../models"
import { ResultValidate } from "../utils/ResultValidate"

export const validatePortion = async (portion: Portion): Promise<ResultValidate> => {
    /*
    1 - Validate the required fields
    2 - Validate input type
    3 - Validate Input format
    4 - Validate input range (min - max length or value)
    5 - 
    */
    if (!portion.hasOwnProperty('name')) {
        return {
            success: false,
            fieldName: 'name',
            message: "Por favor preencha o nome"
        }
    }
    if (typeof portion.name != 'string') {
        return {
            success: false,
            fieldName: 'name',
            message: "O nome deve ser preenchido como uma string"
        }
    }
    if (!/^[a-zA-Z\u00C0-\u00FF\s]*$/.test(portion.name.trim())) {
        return {
            success: false,
            fieldName: 'name',
            message: "O nome só pode conter letras"
        }
    }
    if (portion.name.trim().length < 1) {
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