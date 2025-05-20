const express   = require('express');
const multer    = require('multer');
const auth      = require('../middleware/authMiddleware');
const fileCtrl  = require('../controllers/fileController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename:    (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

const router = express.Router();
router.use(auth);

router.post('/upload',      upload.single('file'), fileCtrl.uploadFile);
router.get('/',             fileCtrl.listFiles);
router.delete('/:id',       fileCtrl.deleteFile);
router.get('/:id/download', fileCtrl.downloadFile);

module.exports = router;
