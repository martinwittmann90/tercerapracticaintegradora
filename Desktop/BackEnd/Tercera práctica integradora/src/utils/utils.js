/*----------------MULTER------------------------------*/
import { __dirname } from '../configPath.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, 'public', 'images');
    logger.info('Destination Path:', destinationPath);
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });
/*----------------------Validate numbre-----------------*/
const validateNumber = (number) => {
  return number && !isNaN(number) && number > 0;
};

export { validateNumber };
