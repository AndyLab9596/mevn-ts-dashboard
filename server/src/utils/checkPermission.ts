import { Types } from "mongoose";
import { UnauthorizedError } from "../errors";

const checkPermission = (requestUserId: Types.ObjectId, resourceUserId: Types.ObjectId) => {
    if (resourceUserId.equals(requestUserId)) return;
    throw new UnauthorizedError('Not authorized to access this route !');
}

export default checkPermission;