const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    filename:    { type: String, required: true },        // depolanan dosya adı
    originalName:{ type: String, required: true },        // kullanıcı dosya adı
    mimetype:    { type: String, required: true },
    size:        { type: Number, required: true },
    path:        { type: String, required: true },        // disk path
    uploadedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('File', FileSchema);
