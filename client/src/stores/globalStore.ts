/* eslint-disable @typescript-eslint/no-unused-vars */
import authApi from "@/api/authApi";
import { ILoginUserPayload, IRegisterUserPayload, IUpdateUser, IUserInfo } from "@/models/userTypes";
import { extractExpirationDate } from '@/utils/helperFnc';
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
    expirationDate: number;
    isAutoLogOut: boolean;
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
            user: null,
            token: '',
            userLocation: '',
            jobLocation: '',
            expirationDate: 0,
            isAutoLogOut: false

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

        addUserToLocalStorage(payload: IUserInfo) {
            const { user, location, token } = payload;
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', token)
            localStorage.setItem('location', location)
        },

        removeUserFromLocalStorage() {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('location')
        },

        setUser(payload: IUserInfo) {
            const { user, location, token } = payload;
            this.user = user;
            this.userLocation = location;
            this.jobLocation = location;
            this.token = token;
            const expireIn = extractExpirationDate(token);
            this.expirationDate = expireIn + new Date().getTime();

            timer = setTimeout(() => {
                this.didAutoLogout();
            }, expireIn)

            this.addUserToLocalStorage(payload);
        },

        async authAction(payload: IRegisterUserPayload | ILoginUserPayload) {
            this.isLoading = true;
            try {
                if ('name' in payload) {
                    const data = await authApi.register(payload);
                    this.setUser(data);
                    this.displayAlert({ alertText: 'Register Successful! Redirecting...', alertType: 'success' });
                } else {
                    const data = await authApi.login(payload);
                    this.setUser(data);
                    this.displayAlert({ alertText: 'Login Successful! Redirecting...', alertType: 'success' });
                }
            } catch (error) {
                if (error instanceof Error) {
                    this.displayAlert({ alertText: error.message, alertType: 'danger' })
                }
            }
        },

        tryLogin() {
            const user = JSON.parse(localStorage.getItem('user') as string);
            const token = localStorage.getItem('token') as string;
            const location = localStorage.getItem('location') as string;

            const expiresIn = this.expirationDate - extractExpirationDate(token);

            if (expiresIn < 0) {
                return;
            }

            timer = setTimeout(() => {
                this.didAutoLogout();
            }, expiresIn)

            if (user && token) {
                this.setUser({ user, token, location })
            }

        },

        logout() {
            this.removeUserFromLocalStorage();
            this.user = null;
            this.token = '';
            this.jobLocation = '';
            this.userLocation = '';
            clearTimeout(timer);
        },

        didAutoLogout() {
            this.logout();
            this.isAutoLogOut = true;
        },
    },

    getters: {
        isAuthenticated: (state) => !!state.token,
    }
})