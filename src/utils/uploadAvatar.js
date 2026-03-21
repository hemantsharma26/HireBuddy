const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { ValidationError } = require('./errors');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../../uploads/avatars');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype) || file.mimetype === 'application/octet-stream';

  console.log(`[UploadAvatar] Attempt ${file.originalname} - Ext: ${extname}, Mime: ${file.mimetype}`);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new ValidationError(`Unsupported file type: ${file.originalname} (${file.mimetype})`), false);
  }
};

const uploadAvatar = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

module.exports = uploadAvatar;
