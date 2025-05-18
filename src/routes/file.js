const express   = require('express');
const multer    = require('multer');
const path      = require('path');
const auth      = require('../middleware/authMiddleware');
const fileCtrl  = require('../controllers/fileController');

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename:    (req, file, cb) => {
        const unique = `${Date.now()}-${file.originalname}`;
        cb(null, unique);
    }
});
const upload = multer({ storage });

// JWT koruması
router.use(auth);

// POST /api/files/upload
router.post('/upload', upload.single('file'), fileCtrl.uploadFile);

// GET  /api/files
router.get('/', fileCtrl.listFiles);

// DELETE /api/files/:id
router.delete('/:id', fileCtrl.deleteFile);

// GET /api/files/:id/download
router.get('/:id/download', fileCtrl.downloadFile);

module.exports = router;
