import { ILoginUserPayload, IRegisterUserPayload, IUpdateUser, IUserInfo } from "@/models/userTypes";
import axiosClient from "./apiClient";

const authApi = {
    register(payload: IRegisterUserPayload): Promise<IUserInfo> {
        const url = '/auth/register';
        return axiosClient.post(url, payload)
    },

    login(payload: ILoginUserPayload): Promise<IUserInfo> {
        const url = '/auth/login';
        return axiosClient.post(url, payload)
    },

    updateUser(payload: IUpdateUser) {
        const url = `/auth/update`;
        return axiosClient.patch(url, payload)
    }
}

export default authApi;