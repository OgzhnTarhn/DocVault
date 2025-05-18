// src/routes/file.js
const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/authMiddleware');

// Bu noktadan itibaren tüm /api/files rotaları JWT ile korunacak:
router.use(auth);

// 1) Dosya yükleme (POST /api/files/upload)
router.post('/upload', (req, res) => {
    // ileride burada multer ile dosya yükleme kodu olacak
    res.send('Upload handler’ı buraya gelecek');
});

// 2) Listeleme (GET /api/files)
router.get('/', (req, res) => {
    res.send('List handler’ı buraya gelecek');
});

// 3) Silme (DELETE /api/files/:id)
router.delete('/:id', (req, res) => {
    res.send('Delete handler’ı buraya gelecek');
});

module.exports = router;
