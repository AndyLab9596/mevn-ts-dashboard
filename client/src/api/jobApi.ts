import { IJobInterfaceData, IPayloadCreateJob, IStats, TSearchJobType, TSearchStatus, TSort } from "@/models/jobTypes";
import axiosClient from "./apiClient";

interface IUpdateJobProps {
    payload: IPayloadCreateJob;
    jobId: string;
}

interface IAllJobsReturn {
    jobs: IJobInterfaceData[];
    totalJobs: number;
    numOfPages: number;
}

interface GetJobQueryObject {
    page: number;
    searchStatus: TSearchStatus;
    searchType: TSearchJobType;
    search: string;
    sort: TSort;
}

const jobApi = {
    createJob(payload: IPayloadCreateJob): Promise<IPayloadCreateJob> {
        const url = '/job';
        return axiosClient.post(url, payload)
    },

    getAllJobs({ page, search, searchStatus, searchType }: GetJobQueryObject): Promise<IAllJobsReturn> {
        let url = `/job?page=${page}&status=${searchStatus}&jobType=${searchType}`;

        if (search) {
            url = url + `&search=${search}`
        }
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

    getJobStats(): Promise<IStats> {
        const url = '/job/stats';
        return axiosClient.get(url);
    }
}

export default jobApi; 