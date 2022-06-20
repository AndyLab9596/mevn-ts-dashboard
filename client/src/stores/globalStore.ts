import authApi from "@/api/authApi";
import jobApi from "@/api/jobApi";
import { IJobInterfaceData, IPayloadCreateJob, IPayloadSearchJob, jobTypeOptions, sortOptions, statusOptions, TJobType, TJobTypeOptions, TSearchJobType, TSearchStatus, TSort, TSortOptions, TStatus, TStatusOptions, searchStatusOptions, searchJobTypeOptions, TSearchStatusOptions, TSearchJobTypeOptions } from "@/models/jobTypes";
import { ILoginUserPayload, IRegisterUserPayload, IUpdateUser, IUserInfo, IUserInfoSaveLocal } from "@/models/userTypes";
import { extractExpirationDate } from "@/utils/helper";
import { defineStore } from "pinia";

interface IGlobalStore {
    isLoading: boolean;
    showAlert: boolean;
    alertText: string;
    alertType: 'success' | 'danger';
    showSideBar: boolean;

    // auth
    user: IUpdateUser | null;
    token: string;
    userLocation: string;
    jobLocation: string;
    isAutoLogout: boolean;

    // jobs
    isEditing: boolean;
    editJobId: string;
    position: string;
    company: string;
    jobTypeOptions: TJobTypeOptions;
    statusOptions: TStatusOptions;
    jobType: TJobType;
    status: TStatus;

    jobs: IJobInterfaceData[];
    totalJobs: number;
    numOfPages: number;
    page: number;

    // search
    search: string;
    searchStatus: TSearchStatus;
    searchType: TSearchJobType;
    sort: TSort;
    sortOptions: TSortOptions;
    searchJobTypeOptions: TSearchJobTypeOptions;
    searchStatusOptions: TSearchStatusOptions;
}

interface IAlertTextProps {
    alertText: IGlobalStore['alertText'];
    alertType: IGlobalStore['alertType'];
}


let timer: number | undefined;

export const useGlobalStore = defineStore('global', {
    state: () => {
        return {
            isLoading: false,
            showAlert: false,
            alertText: '',
            alertType: 'success',
            showSideBar: true,
            // auth
            user: {
                email: '',
                lastName: '',
                location: '',
                name: ''
            },
            isAutoLogout: false,
            token: '',
            userLocation: '',

            isEditing: false,
            editJobId: '',
            position: '',
            company: '',
            jobLocation: '',
            jobType: 'full-time',
            status: 'pending',
            jobTypeOptions,
            statusOptions,

            jobs: [],
            totalJobs: 0,
            numOfPages: 1,
            page: 1,

            search: '',
            searchStatus: 'all',
            searchType: 'all',
            sort: 'latest',
            sortOptions,
            searchStatusOptions,
            searchJobTypeOptions,

        } as IGlobalStore
    },

    actions: {
        clearAlert() {
            this.showAlert = false;
        },

        displayAlert({ alertText, alertType }: IAlertTextProps) {
            this.clearAlert();
            this.showAlert = true;
            this.alertText = alertText
            this.alertType = alertType;

            setTimeout(() => {
                this.clearAlert()
            }, 3000)
        },

        toggleSideBar() {
            this.showSideBar = !this.showSideBar
        },

        addUserToLocalStorage(payload: IUserInfoSaveLocal) {
            const { user, location, token, expirationDate } = payload;
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', token)
            localStorage.setItem('location', location)
            localStorage.setItem('expirationDate', expirationDate.toString())
        },

        removeUserFromLocalStorage() {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('location');
            localStorage.removeItem('expirationDate');
        },

        setUser(payload: IUserInfo) {

            const { user, location, token } = payload;
            const expiresIn = extractExpirationDate(token);
            timer = setTimeout(() => {
                this.didAutoLogout();
            }, expiresIn)

            this.user = user;
            this.userLocation = location;
            this.jobLocation = location;
            this.token = token;

            const expirationDate = expiresIn + new Date().getTime();
            const localStoragePayload = { user, location, token, expirationDate }
            this.addUserToLocalStorage(localStoragePayload);
        },

        async authAction(payload: IRegisterUserPayload | ILoginUserPayload) {
            try {
                if ('name' in payload) {
                    const data = await authApi.register(payload);
                    this.setUser(data);
                } else {
                    const data = await authApi.login(payload);
                    this.setUser(data);
                }
            } catch (error) {
                if (error instanceof Error) {
                    this.displayAlert({ alertText: error.message, alertType: 'danger' })
                }
            }
        },

        logout() {
            this.removeUserFromLocalStorage();
            this.user = null;
            this.token = '';
            this.userLocation = '';
            this.jobLocation = '';
            clearTimeout(timer);
        },

        didAutoLogout() {
            this.logout();
            this.isAutoLogout = true;
        },

        tryLogin() {
            const expirationDate = localStorage.getItem('expirationDate') as string;
            if (typeof expirationDate !== 'string') return;
            const token = localStorage.getItem('token') as string;
            const expiresIn = +expirationDate - new Date().getTime();
            const user = JSON.parse(localStorage.getItem('user') as string);
            const location = localStorage.getItem('location') as string;
            if (expiresIn < 0) {
                return;
            }

            timer = setTimeout(() => {
                this.didAutoLogout();
            }, expiresIn)
            if (!!user && !!token) {
                this.setUser({ user, token, location })
            }
        },

        changeUserValue(key: keyof IUpdateUser, value: string) {
            if (this.user !== null) {
                this.user[key] = value;
            }
        },

        async updateUser() {
            if (this.user === null) {
                this.displayAlert({ alertText: 'Something went wrong !', alertType: 'success' })
                return
            }
            this.isLoading = true;
            try {
                const userUpdateedInfo = await authApi.updateUser(this.user);
                this.setUser(userUpdateedInfo);
                this.displayAlert({ alertText: 'Update success', alertType: 'success' })
            } catch (error) {
                if (error instanceof Error) {
                    this.displayAlert({ alertText: error.message, alertType: 'danger' })
                }
            } finally {
                this.isLoading = false;
            }
        },

        changeJobInfo<T extends keyof IPayloadCreateJob>(key: T, value: IGlobalStore[T]) {
            this.$state[key] = value;
        },

        resetJobInfo() {
            this.position = '';
            this.company = '';
            this.jobLocation = '';
            this.status = 'pending';
            this.jobType = 'full-time';
            this.editJobId = '';
            this.isEditing = false;
        },

        async setupJob(jobId = "") {
            const payload: IPayloadCreateJob = {
                position: this.position,
                company: this.company,
                jobLocation: this.jobLocation,
                status: this.status,
                jobType: this.jobType,
            };

            try {
                if (this.isEditing === false) {
                    await jobApi.createJob(payload);
                    this.displayAlert({ alertText: 'Create Job Success', alertType: 'success' })
                } else {
                    await jobApi.updateJob({ payload, jobId });
                    this.displayAlert({ alertText: 'Update Job Success', alertType: 'success' })
                }
            } catch (error) {
                if (error instanceof Error) {
                    this.displayAlert({ alertText: error.message, alertType: 'danger' })
                }
            } finally {
                this.resetJobInfo();
            }
        },

        async getAllJobs() {
            try {
                this.isLoading = true;
                const { jobs, totalJobs } = await jobApi.getAllJobs();
                this.jobs = jobs;
                this.totalJobs = totalJobs

            } catch (error) {
                if (error instanceof Error) {
                    this.displayAlert({ alertText: error.message, alertType: 'danger' })
                }
            } finally {
                this.isLoading = false
            }
        },

        editJob(id: IJobInterfaceData['_id']) {
            this.isEditing = true;
            this.editJobId = id;
            const editedJob = this.jobs.find((job: IJobInterfaceData) => job._id === id);

            if (editedJob) {
                this.position = editedJob.position;
                this.company = editedJob.company;
                this.jobLocation = editedJob.jobLocation;
                this.status = editedJob.status;
                this.jobType = editedJob.jobType;
            } else {
                this.displayAlert({ alertText: 'No job was found', alertType: 'danger' })
            }
        },

        async updateJob() {
            try {
                const payload: IPayloadCreateJob = {
                    position: this.position,
                    company: this.company,
                    jobLocation: this.jobLocation,
                    status: this.status,
                    jobType: this.jobType,
                };
                await jobApi.updateJob({ payload, jobId: this.editJobId })
                this.displayAlert({ alertText: 'Update Job Success', alertType: 'success' });
                this.resetJobInfo();
            } catch (error) {
                if (error instanceof Error) {
                    this.displayAlert({ alertText: error.message, alertType: 'danger' })
                }
            }
        },

        async deleteJob(id: string) {
            try {
                await jobApi.deleteJob(id);
                this.displayAlert({ alertText: 'Delete Job Success', alertType: 'success' });
                await this.getAllJobs();
            } catch (error) {
                if (error instanceof Error) {
                    this.displayAlert({ alertText: error.message, alertType: 'danger' })
                }
            }
        },

        changeJobSearch<T extends keyof IPayloadSearchJob>(key: T, value: IGlobalStore[T]) {
            this.$state[key] = value;
        },

        clearSearchForm() {
            this.search = '';
            this.searchStatus = 'all';
            this.searchType = 'all';
            this.sort = 'latest';
        }
    },

    getters: {
        isAuthenticated(state) {
            return !!state.token
        },
    }
})