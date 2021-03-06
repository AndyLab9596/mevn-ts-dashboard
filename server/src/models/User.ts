import mongoose, { Document, Model, Types } from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export interface IUserSchema extends Document {
    name: string;
    email: string;
    password: string;
    lastName: string;
    location: string;
    _id: Types.ObjectId;
    createJWT: () => string;
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}

// export interface IUserMethods {
//     createJWT(): string;
//     comparePassword(candidatePassword: string): Promise<boolean>
// }

// export type UserModel = Model<IUserSchema, {}, IUserMethods>;

const UserSchema = new mongoose.Schema<IUserSchema>({
    name: {
        type: String,
        required: [true, 'Please provide name !'],
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide proper email !'
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        select: false,
    },
    lastName: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 30,
        default: 'last name',
    },
    location: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 30,
        default: 'my city',
    }
});

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET as string, {expiresIn: process.env.JWT_LIFETIME});
};

UserSchema.methods.comparePassword = async function (candidatePassword: typeof this.password) {
    return await bcrypt.compare(candidatePassword, this.password);
}

export default mongoose.model('User', UserSchema);