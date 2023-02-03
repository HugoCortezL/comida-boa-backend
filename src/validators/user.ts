import { User } from "../models"
import { ResultValidate } from "src/utils/ResultValidate"

export const validateUser = async (user: User): Promise<ResultValidate> => {
    if (!user.hasOwnProperty('name')) {
        return {
            success: false,
            fieldName: 'name',
            message: "Por favor preencha o nome"
        }
    }
    if (!user.hasOwnProperty('email')) {
        return {
            success: false,
            fieldName: 'email',
            message: "Por favor preencha o email"
        }
    }
    if (!user.hasOwnProperty('password')) {
        return {
            success: false,
            fieldName: 'password',
            message: "Por favor preencha a senha"
        }
    }
    if (typeof user.name != 'string') {
        return {
            success: false,
            fieldName: 'name',
            message: "O nome deve ser preenchido como uma string"
        }
    }
    if (typeof user.email != 'string') {
        return {
            success: false,
            fieldName: 'email',
            message: "O email deve ser preenchido como uma string"
        }
    }
    if (typeof user.password != 'string') {
        return {
            success: false,
            fieldName: 'password',
            message: "A senha deve ser preenchido como uma string"
        }
    }
    if (!/^[a-zA-Z\u00C0-\u00FF\s]*$/.test(user.name.trim())) {
        return {
            success: false,
            fieldName: 'name',
            message: "O nome só pode conter letras"
        }
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email.trim())) {
        return {
            success: false,
            fieldName: 'email',
            message: "Verifique a formatação do email"
        }
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(user.password.trim())) {
        return {
            success: false,
            fieldName: 'password',
            message: "Verifique a formatação da senha"
        }
    }
    if (user.name.trim().length < 3) {
        return {
            success: false,
            fieldName: 'name',
            message: "O nome deve conter ao menos 3 letras"
        }
    }
    return {
        success: true
    }
}

export const validateUserInput = async (user: User): Promise<ResultValidate> => {
    if (!user.hasOwnProperty('email')) {
        return {
            success: false,
            fieldName: 'email',
            message: "Por favor preencha o email"
        }
    }
    if (!user.hasOwnProperty('password')) {
        return {
            success: false,
            fieldName: 'password',
            message: "Por favor preencha a senha"
        }
    }
    if (typeof user.email != 'string') {
        return {
            success: false,
            fieldName: 'email',
            message: "O email deve ser preenchido como uma string"
        }
    }
    if (typeof user.password != 'string') {
        return {
            success: false,
            fieldName: 'password',
            message: "A senha deve ser preenchido como uma string"
        }
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email.trim())) {
        return {
            success: false,
            fieldName: 'email',
            message: "Verifique a formatação do email"
        }
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(user.password.trim())) {
        return {
            success: false,
            fieldName: 'password',
            message: "Verifique a formatação da senha"
        }
    }
    return {
        success: true
    }
}