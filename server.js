const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    res.send('File uploaded successfully.');
});

app.get('/images', (req, res) => {
    fs.readdir(path.join(__dirname, 'uploads'), (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory.');
        }
        res.json(files);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
