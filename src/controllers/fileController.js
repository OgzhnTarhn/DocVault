const File = require('../models/File');
const fs   = require('fs');

/* ---------- YÜKLE ---------- */
exports.uploadFile = async (req, res) => {
    if (!req.file) return res.status(400).json({ msg: 'Dosya bulunamadı' });

    const { filename, originalname, mimetype, size, path } = req.file;
    try {
        const file = new File({
            filename,
            originalName: originalname,
            mimetype,
            size,
            path,
            uploadedBy: req.user.id
        });
        await file.save();
        res.status(201).json({ msg: 'Yükleme başarılı', fileId: file._id });
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ msg: 'Sunucu hatası' });
    }
};

/* ---------- LİSTELE ---------- */
exports.listFiles = async (req, res) => {
    try {
        const files = await File.find({ uploadedBy: req.user.id }).select('-path');
        res.json(files);
    } catch (err) {
        console.error('List error:', err);
        res.status(500).json({ msg: 'Sunucu hatası' });
    }
};

/* ---------- SİL ---------- */
exports.deleteFile = async (req, res) => {
    try {
        // 1) Belgeyi al
        const file = await File.findOne({
            _id: req.params.id,
            uploadedBy: req.user.id
        });
        if (!file) return res.status(404).json({ msg: 'Dosya bulunamadı' });

        // 2) Fiziksel dosyayı sil (varsa)
        try {
            fs.unlinkSync(file.path);
        } catch (err) {
            if (err.code !== 'ENOENT') throw err; // dosya zaten yoksa yut
        }

        // 3) MongoDB kaydını sil
        await File.deleteOne({ _id: file._id });   // <-- remove() yerine

        res.json({ msg: 'Silme başarılı' });
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ msg: 'Sunucu hatası' });
    }
};

/* ---------- İNDİR ---------- */
exports.downloadFile = async (req, res) => {
    try {
        const file = await File.findOne({
            _id: req.params.id,
            uploadedBy: req.user.id
        });
        if (!file) return res.status(404).json({ msg: 'Dosya bulunamadı' });
        res.download(file.path, file.originalName);
    } catch (err) {
        console.error('Download error:', err);
        res.status(500).json({ msg: 'Sunucu hatası' });
    }
};

exports.uploadFile = async (req, res) => {
    if (!req.file) return res.status(400).json({ msg: 'Dosya bulunamadı' });

    const { filename, originalname, mimetype, size, path } = req.file;
    const newName = req.body.newName?.trim();

    // Sunucuda saklanacak ad: kullanıcı verdi + orijinal uzantı veya orijinal ad
    const ext       = originalname.substring(originalname.lastIndexOf('.'));
    const finalName = newName ? `${newName}${ext}` : originalname;

    try {
        const file = new File({
            filename,
            originalName: finalName,
            mimetype,
            size,
            path,
            uploadedBy: req.user.id
        });
        await file.save();
        res.status(201).json({ msg: 'Yükleme başarılı', fileId: file._id });
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ msg: 'Sunucu hatası' });
    }
};

