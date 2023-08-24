/*----------------MULTER------------------------------*/

import multer from 'multer';
//-----
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'src/public/uploads'));
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
