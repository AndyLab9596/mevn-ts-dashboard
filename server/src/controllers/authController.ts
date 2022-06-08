import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors';
import User from '../models/User';

const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    // check if any values missing
    if (!name || !email || !password) throw new BadRequestError('Please provide all values !');
    // check if user is already existed
    const isUserExist = await User.findOne({ email });
    if (isUserExist) throw new BadRequestError('Email is already existed !');
    // create user
    const user = await User.create({ name, email, password });
    const token = user.createJWT();

    const userCreated = {
        user: {
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            name: user.name
        },
        token,
        location: user.location
    }
    res.status(StatusCodes.CREATED).json({ user: userCreated });
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
};
