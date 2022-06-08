import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api-error";

class NotFoundError extends CustomAPIError {
    status: number;
    constructor(message: string) {
        super(message)
        this.status = StatusCodes.NOT_FOUND
    }
}
export default NotFoundError