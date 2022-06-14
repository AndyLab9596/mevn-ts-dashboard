export interface ILoginUserPayload {
    email: string;
    password: string;
}

export interface IRegisterUserPayload extends ILoginUserPayload {
    name: string;
}

export interface IUpdateUser extends Omit<IRegisterUserPayload, 'password'> {
    location: string;
    lastName: string;
}
export interface IUserInfo {
    user: IUpdateUser;
    token: string;
    location: string
}

export interface IUserInfoSaveLocal extends IUserInfo {
    expirationDate: number;
}