import mongoose, { Document, Schema, Types } from "mongoose";

interface IJobSchema extends Document {
    company: string;
    position: string;
    status: 'interview' | 'declined' | 'pending';
    jobType: 'full-time' | 'part-time' | 'remote' | 'internship';
    jobLocation: string;
    createdBy: Types.ObjectId
}

const JobSchema = new mongoose.Schema<IJobSchema>({
    company: {
        type: String,
        maxlength: 50,
        required: [true, 'Please provide company !']
    },
    position: {
        type: String,
        maxlength: 20,
        required: [true, 'Please provide position !']
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship', 'remote'],
        default: 'full-time'
    },
    jobLocation: {
        type: String,
        default: 'my city',
        required: [true, 'Please provide job location'],
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
}, { timestamps: true })

export default mongoose.model('Job', JobSchema);