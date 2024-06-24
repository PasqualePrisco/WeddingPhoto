const express = require('express');
const multer = require('multer');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurazione multer per gestire i file caricati
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware per servire file statici
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotta per il caricamento delle immagini
app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Nessun file caricato.' });
    }

    try {
        const response = await axios.post('https://vercel-storage.url/endpoint', req.file.buffer, {
            headers: {
                'Content-Type': req.file.mimetype,
                'Content-Length': req.file.size,
            }
        });

        res.json({ filePath: response.data.url });
    } catch (error) {
        console.error('Errore durante il caricamento:', error);
        res.status(500).json({ error: 'Errore durante il caricamento dell\'immagine' });
    }
});

// Rotta per ottenere tutte le immagini
app.get('/images', async (req, res) => {
    try {
        const response = await axios.get('https://vercel-storage.url/endpoint');
        res.json(response.data);
    } catch (error) {
        console.error('Errore durante il recupero delle immagini:', error);
        res.status(500).json({ error: 'Errore nel recupero delle immagini' });
    }
});

// Serve index.html su root
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});