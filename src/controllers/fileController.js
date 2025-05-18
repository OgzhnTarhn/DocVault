const File = require('../models/File');
const fs   = require('fs');

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
        console.error(err);
        res.status(500).json({ msg: 'Sunucu hatası' });
    }
};

exports.listFiles = async (req, res) => {
    try {
        const files = await File.find({ uploadedBy: req.user.id })
            .select('-path'); // path gizli kalabilir
        res.json(files);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Sunucu hatası' });
    }
};

exports.deleteFile = async (req, res) => {
    try {
        const file = await File.findOne({ _id: req.params.id, uploadedBy: req.user.id });
        if (!file) return res.status(404).json({ msg: 'Dosya bulunamadı' });

        // Diskten sil
        fs.unlinkSync(file.path);
        await file.remove();

        res.json({ msg: 'Silme başarılı' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Sunucu hatası' });
    }
};

exports.downloadFile = async (req, res) => {
    try {
        const file = await File.findOne({ _id: req.params.id, uploadedBy: req.user.id });
        if (!file) return res.status(404).json({ msg: 'Dosya bulunamadı' });

        res.download(file.path, file.originalName);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Sunucu hatası' });
    }
};
