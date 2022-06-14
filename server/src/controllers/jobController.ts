import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors';
import Job from '../models/Job';


const createJob = async (req: Request, res: Response) => {
    const { body: { position, company } } = req;
    if (!position || !company) throw new BadRequestError('Please provide all needed value !');

    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job })
};

const getAllJobs = async (req: Request, res: Response) => {
    const jobs = await Job.find({});
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
};

const updateJob = async (req: Request, res: Response) => {
    res.send('update jobs');
};

const deleteJob = async (req: Request, res: Response) => {
    res.send('delete jobs');
};

const showStats = async (req: Request, res: Response) => {
    res.send('job stats');
};

export {
    createJob,
    getAllJobs,
    updateJob,
    deleteJob,
    showStats
}


