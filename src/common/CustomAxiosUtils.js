import axios, {AxiosInstance} from "axios";

const baseURL = "http://localhost:8080";
const tokenStorageKey = "token";

const customAxios: AxiosInstance = axios.create({
    baseURL: baseURL,
})

const token = localStorage.getItem(tokenStorageKey);

const customAuthAxios: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: token,
    }
})

const customAuthAndContentAxios: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
        Authorization: token,
    }
})


export {customAxios, customAuthAxios, customAuthAndContentAxios};