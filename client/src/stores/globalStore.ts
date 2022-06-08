import authApi from "@/api/authApi";
import { ILoginUserPayload, IRegisterUserPayload, IUpdateUser, IUserInfo } from "@/models/userTypes";
import { defineStore } from "pinia";

interface IGlobalStore {
    isLoading: boolean;
    showAlert: boolean;
    alertText: string;
    alertType: 'success' | 'danger';

    // auth
    user: IUpdateUser;
    token: string;
    userLocation: string;
    jobLocation: string;
}

interface IAlertTextProps {
    alertText: IGlobalStore['alertText'];
    alertType: IGlobalStore['alertType'];
}

export const useGlobalStore = defineStore('global', {
    state: () => {
        return {
            isLoading: false,
            showAlert: false,
            alertText: '',
            alertType: 'success',

            // auth
            user: {
                email: '',
                lastName: '',
                location: '',
                name: ''
            },
            token: '',
            userLocation: '',
            jobLocation: ''

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
            this.displayAlert({ alertText: 'Login Successful! Redirecting...', alertType: 'success' })
            const { user, location, token } = payload;
            this.user = user;
            this.userLocation = location;
            this.jobLocation = location;
            this.token = token;
            this.addUserToLocalStorage(payload);
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
        }
    }
})