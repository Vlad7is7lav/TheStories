import {
    UserActionType,
    USER_LOGIN,
    USER_AUTH,
    USER_LOGOUT,
    USER_UPDATE,
    USER_REGISTER,
} from "../reducers/TypesForUser"

import axios from "axios"

type ValuesType = {
    email: string
    password: string
}

export function loginUser({ email, password }: ValuesType): UserActionType {
    const request = axios
        .post("/api/user/login", { email, password })
        .then((request) => {
            return request.data
        })

    return {
        type: USER_LOGIN,
        payload: request,
    }
}

export function registerUser({ email, password }: ValuesType): UserActionType {
    const request = axios
        .post("/api/user/register", { email, password })
        .then((request) => {
            return request.data
        })

    return {
        type: USER_REGISTER,
        payload: request,
    }
}

export function auth(): UserActionType {
    const request = axios.get("/api/user/auth").then((request) => request.data)

    return {
        type: USER_AUTH,
        payload: request,
    }
}

export function logoutUser(): UserActionType {
    const request = axios.get("/api/user/logout").then(() => {
        return { auth: false, userData: null }
    })

    return {
        type: USER_LOGOUT,
        payload: request,
    }
}

export function updateUser(user: Gen): UserActionType {
    const request = axios.patch("/api/user/update", user).then((request) => {
        return request.data
    })

    return {
        type: USER_UPDATE,
        payload: request,
    }
}

type Gen = {
    auth: boolean | null
    userData: IAdminValues
}

interface IAdminValues {
    id: string
    email: string
    password?: string
    name: string
    lastname?: string
    age?: string
    country?: string
    city?: string
    favBooks?: string
}
