const jobTypeOptions = ['full-time', 'part-time', 'remote', 'internship'] as const;
type TJobTypeOptions = typeof jobTypeOptions;
type TJobType = TJobTypeOptions[number];

const statusOptions = ['pending', 'interview', 'declined'] as const;
type TStatusOptions = typeof statusOptions;
type TStatus = TStatusOptions[number];


interface IPayloadCreateJob {
    position: string;
    company: string;
    jobType: TJobType;
    status: TStatus;
    jobLocation: string;
}

export {
    jobTypeOptions,
    statusOptions,
    TJobTypeOptions,
    TStatusOptions,
    TJobType,
    TStatus,
    IPayloadCreateJob
}
