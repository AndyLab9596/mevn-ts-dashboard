import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError, UnauthenticatedError } from '../errors';
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
    const { email, password } = req.body;
    if (!email || !password) throw new BadRequestError('Please provide all values !');

    // check if user is already existed
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new UnauthenticatedError('Invalid credential');
    // comapare password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) throw new BadRequestError('Invalid credential');
    const token = user.createJWT();

    res.status(StatusCodes.OK).json({ user, token, location: user.location })
};

const updateUser = async (req: Request, res: Response) => {
    res.send('updateUser')
};

export {
    register,
    login,
    updateUser
};
