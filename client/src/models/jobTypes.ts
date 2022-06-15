type TypeJobOptions = {
    FULL_TIME: 'full-time',
    PART_TIME: 'part-time',
    REMOTE: 'remote',
    INTERNSHIP: 'internship'
};

type TypeStatus = {
    PENDING: 'pending',
    INTERVIEW: 'interview',
    DECLINED: 'declined',
};

type TJobTypeOptions = ['full-time', 'part-time', 'remote', 'internship'];
type TStatusOptions = ['pending', 'interview', 'declined'];

type TJobType = TypeJobOptions[keyof TypeJobOptions];
type TStatus = TypeStatus[keyof TypeStatus];

interface IPayloadCreateJob {
    position: string;
    company: string;
    jobType: TJobType;
    status: TStatus;
    jobLocation: string;
}

export {
    TJobTypeOptions,
    TStatusOptions,
    TJobType,
    TStatus,
    IPayloadCreateJob
}
