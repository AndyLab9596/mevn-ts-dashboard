import { Router } from "express";
import {
    createJob,
    getAllJobs,
    updateJob,
    deleteJob,
    showStats
} from '../controllers/jobController';
const router = Router();

router.route('/').post(createJob).get(getAllJobs);
router.route('/:id').patch(updateJob).delete(deleteJob);
router.route('/stats').get(showStats);

export default router;