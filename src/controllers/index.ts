// External Dependencies
import express from 'express';

// Internal Dependencies
import uploader from './uploader';

// Local Variables
const router = express.Router();

router.use('/upload', uploader);

export default router;
