import axiosClient from "./apiClient";

const getTestingApi = {
    testing(): Promise<{ msg: string }> {
        const url = '/';
        return axiosClient.get(url);
    }
}

export default getTestingApi;