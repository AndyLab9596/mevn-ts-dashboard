const jobTypeOptions = ['full-time', 'part-time', 'remote', 'internship'] as const;
type TJobTypeOptions = typeof jobTypeOptions;
type TJobType = TJobTypeOptions[number];

const statusOptions = ['pending', 'interview', 'declined'] as const;
type TStatusOptions = typeof statusOptions;
type TStatus = TStatusOptions[number];

const searchJobTypeOptions = ['all', 'full-time', 'part-time', 'remote', 'internship'] as const;
type TSearchJobTypeOptions = typeof searchJobTypeOptions;
type TSearchJobType = TSearchJobTypeOptions[number];

const searchStatusOptions = ['all', 'pending', 'interview', 'declined'] as const;
type TSearchStatusOptions = typeof searchStatusOptions;
type TSearchStatus = TSearchStatusOptions[number];

const sortOptions = ['latest', 'oldest', 'a-z', 'z-a'] as const;
type TSortOptions = typeof sortOptions;
type TSort = TSortOptions[number];

interface IPayloadSearchJob {
    search: string;
    searchStatus: TSearchStatus,
    searchType: TSearchJobType,
    sort: TSort,
}

interface IPayloadCreateJob {
    position: string;
    company: string;
    jobType: TJobType;
    status: TStatus;
    jobLocation: string;
}

interface IJobInterfaceData extends IPayloadCreateJob {
    createdAt: Date;
    _id: string;
}

type IDefaultStats = { [K in typeof statusOptions[number]]: number }
interface IMonthlyApp {
    date: string,
    count: number,
}

interface IStats {
    defaultStats: IDefaultStats;
    monthlyApplications: IMonthlyApp[]
}

export {
    jobTypeOptions,
    statusOptions,
    TJobTypeOptions,
    TStatusOptions,
    TJobType,
    TStatus,
    IPayloadCreateJob,
    IJobInterfaceData,
    sortOptions,
    TSortOptions,
    TSort,
    searchJobTypeOptions,
    TSearchJobTypeOptions,
    TSearchJobType,
    searchStatusOptions,
    TSearchStatusOptions,
    TSearchStatus,
    IPayloadSearchJob,
    IStats,
    IMonthlyApp,
    IDefaultStats

}
