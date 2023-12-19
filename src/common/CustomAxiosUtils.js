import axios, {AxiosInstance} from "axios";
import {baseURL} from "./Constant";

const tokenStorageKey = "token";

const customAxios: AxiosInstance = axios.create({
    baseURL: baseURL,
})

const customAuthAxios: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: localStorage.getItem(tokenStorageKey),
    }
})

const customAuthAndContentAxios: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(tokenStorageKey),
    }
})


export {customAxios, customAuthAxios, customAuthAndContentAxios};