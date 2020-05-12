// External Dependencies
import express, { Request } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Datauri from 'datauri';
import path from 'path';

// Local Typings
interface MulterRequest extends Request {
  files: any[];
}

// Local Variables
const dUri = new Datauri();
const router = express.Router();
const upload = multer();

router.post('/', upload.any(), async (req: MulterRequest, res) => {
  const files: any = req.files;

  const file = files ? files[0] : null;

  if (file) {
    try {
      const dataUri = () => dUri.format(path.extname(file.originalname).toString(), file.buffer);

      const fileContent = dataUri().content;

      return cloudinary.uploader.upload(
        fileContent,
        {
          public_id: file.originalname,
        },
        (err: any, result: any) => {
          if (err) {
            return res.status(500);
          }

          return res.json(result);
        }
      );
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong.' });
    }
  } else {
    return res.status(400).json({ error: 'Missing file' });
  }
});

export default router;
