import { IPayloadCreateJob } from "@/models/jobTypes";
import axiosClient from "./apiClient";

interface IUpdateJobProps {
    payload: IPayloadCreateJob;
    jobId: string;
}

const jobApi = {
    createJob(payload: IPayloadCreateJob): Promise<IPayloadCreateJob> {
        const url = '/job';
        return axiosClient.post(url, payload)
    },

    getAllJobs(): Promise<IPayloadCreateJob[]> {
        const url = '/job';
        return axiosClient.get(url)
    },

    updateJob({ payload, jobId }: IUpdateJobProps): Promise<IPayloadCreateJob> {
        const url = `/job/${jobId}`;
        return axiosClient.patch(url, payload)
    },

    deleteJob(jobId: string) {
        const url = `/job/${jobId}`;
        return axiosClient.delete(url);
    },

    getJobStats() {
        const url = '/job/stats';
        return axiosClient.get(url);
    }
}

export default jobApi; 