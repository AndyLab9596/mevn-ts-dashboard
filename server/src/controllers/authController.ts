import { Request, Response } from 'express';

const register = async (req: Request, res: Response) => {
    res.send('register')
};

const login = async (req: Request, res: Response) => {
    res.send('login')
};

const updateUser = async (req: Request, res: Response) => {
    res.send('updateUser')
};

export {
    register,
    login,
    updateUser
}