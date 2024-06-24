const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurazione multer per salvare i file caricati
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Middleware per servire file statici
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotta per il caricamento delle immagini
app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        res.json({ filePath: `/uploads/${req.file.filename}` });
    } else {
        res.status(400).json({ error: 'Errore durante il caricamento dell\'immagine' });
    }
});

// Rotta per ottenere tutte le immagini
app.get('/images', (req, res) => {
    const fs = require('fs');
    const directoryPath = path.join(__dirname, 'uploads');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Errore nel recupero delle immagini' });
        }
        res.json(files);
    });
});

// Serve index.html su root
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Avvio del server
app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});