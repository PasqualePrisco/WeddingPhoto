document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();

    if (response.ok) {
        loadImages();
    } else {
        alert(result.error);
    }
});

async function loadImages() {
    const response = await fetch('/images');
    console.log(response);
    const images = await response.json();
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    images.forEach(image => {
        const img = document.createElement('img');
        img.src = `/uploads/${image}`;
        gallery.appendChild(img);
    });
}

window.onload = loadImages;