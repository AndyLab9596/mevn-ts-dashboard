import authApi from "@/api/authApi";
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
            token: '',
            userLocation: '',
            jobLocation: '',
            isAutoLogout: false,

        } as IGlobalStore
    },

    actions: {
        clearAlert() {
            this.showAlert = false;
        },

        displayAlert({ alertText, alertType }: IAlertTextProps) {
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
            this.displayAlert({ alertText: 'Login Successful! Redirecting...', alertType: 'success' })
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
            this.isLoading = true;
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
            const token = localStorage.getItem('token') as string;
            const expirationDate = localStorage.getItem('expirationDate') as string;
            const expiresIn = +expirationDate - extractExpirationDate(token);
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
        }
    },

    getters: {
        isAuthenticated(state) {
            return !!state.token
        },
    }
})