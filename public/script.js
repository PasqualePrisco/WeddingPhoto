document.getElementById('uploadForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData();
    const fileInput = document.getElementById('fileInput');
    formData.append('image', fileInput.files[0]);

    const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        alert('Immagine caricata con successo!');
        loadGallery();
    } else {
        alert('Errore durante il caricamento dell\'immagine');
    }
});

async function loadGallery() {
    const response = await fetch('/images');
    const images = await response.json();
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = `/uploads/${image}`;
        gallery.appendChild(imgElement);
    });
}

loadGallery();
