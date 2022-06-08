import CustomAPIError from "./custom-api-error";
import { StatusCodes } from 'http-status-codes';

class BadRequestError extends CustomAPIError {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = StatusCodes.BAD_REQUEST
    }
}

export default BadRequestError;