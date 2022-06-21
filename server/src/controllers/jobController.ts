import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors';
import Job from '../models/Job';
import checkPermission from '../utils/checkPermission';


const createJob = async (req: Request, res: Response) => {
    const { body: { position, company } } = req;
    if (!position || !company) throw new BadRequestError('Please provide all needed value !');

    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job })
};

const getAllJobs = async (req: Request, res: Response) => {
    const { search, jobType, sort, status } = req.query;

    const queryObject: { [x: string]: any } = {
        createdBy: req.user.userId
    }

    if (jobType && jobType !== 'all') {
        queryObject.jobType = jobType
    }

    if (status && status !== 'all') {
        queryObject.status = status
    }

    if (search) {
        queryObject.position = { $regex: search, $options: 'i' }
    }

    let result = Job.find(queryObject);

    if (sort === 'latest') {
        result.sort('createdAt')
    }

    if (sort === 'oldest') {
        result.sort('-createdAt')
    }

    if (sort === 'a-z') {
        result.sort('position')
    }

    if (sort === 'z-a') {
        result.sort('-position')
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit)

    const jobs = await result;

    const totalJobs = await Job.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);

    res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages })
};

const updateJob = async (req: Request, res: Response) => {
    const { id: jobId } = req.params;
    const { company, position } = req.body;

    if (!company || !position) throw new BadRequestError('Please provide all needed value !');

    const job = await Job.findOne({ _id: jobId });

    if (!job) throw new NotFoundError(`No job was found with ${jobId} !`);

    checkPermission(req.user.userId, job.createdBy);

    const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
        new: true,
        runValidators: true
    })

    res.status(StatusCodes.OK).json({ job: updatedJob });
};

const deleteJob = async (req: Request, res: Response) => {
    const { id: jobId } = req.params

    const job = await Job.findOne({ _id: jobId })

    if (!job) {
        throw new NotFoundError(`No job with id :${jobId}`)
    }

    checkPermission(req.user.userId, job.createdBy)

    await job.remove()

    res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' })

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


