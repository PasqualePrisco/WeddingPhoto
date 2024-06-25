function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const uploadedImages = document.getElementById('uploadedImages');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const img = document.createElement('img');
            img.src = event.target.result;
            img.alt = file.name;
            uploadedImages.appendChild(img);

            const link = document.createElement('a');
            link.href = event.target.result;
            link.download = file.name;
            link.innerText = 'Scarica ' + file.name;
            uploadedImages.appendChild(link);
            uploadedImages.appendChild(document.createElement('br'));
        };

        reader.readAsDataURL(file);
    }
}