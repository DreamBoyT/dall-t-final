document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');
    const generateBtn = document.getElementById('generateBtn');
    const loadingIndicator = document.getElementById('loading');
    const imageContainer = document.getElementById('imageContainer');
<<<<<<< HEAD
  
=======

>>>>>>> c3763a3ba55bcf2fb544224b1c5832db047fb6e9
    // Event listener for theme toggle
    themeToggle.addEventListener('change', function () {
        document.body.classList.toggle('dark', themeToggle.checked);
    });
<<<<<<< HEAD
  
    generateBtn.addEventListener('click', function () {
        generateImage();
    });
  
=======

    generateBtn.addEventListener('click', function () {
        generateImage();
    });

>>>>>>> c3763a3ba55bcf2fb544224b1c5832db047fb6e9
    function generateImage() {
        const prompt = document.getElementById('text').value;
        const size = document.getElementById('sizeSelect').value;
        const style = document.getElementById('styleSelect').value;
        const quality = document.getElementById('qualitySelect').value;
<<<<<<< HEAD
  
=======

>>>>>>> c3763a3ba55bcf2fb544224b1c5832db047fb6e9
        if (!prompt) {
            alert('Please enter a description or keyword.');
            return;
        }
<<<<<<< HEAD
  
        loadingIndicator.classList.remove('hidden');
        imageContainer.innerHTML = '';
  
=======

        loadingIndicator.classList.remove('hidden');
        imageContainer.innerHTML = '';

>>>>>>> c3763a3ba55bcf2fb544224b1c5832db047fb6e9
        fetch('/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, size, style, quality })
        })
<<<<<<< HEAD
        .then(response => response.json())
=======
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }
            return response.json();
        })
>>>>>>> c3763a3ba55bcf2fb544224b1c5832db047fb6e9
        .then(data => {
            if (data.imageUrls) {
                data.imageUrls.forEach(url => {
                    if (size === '1600x900' || size === '1080x1920' || size === '1920x1080') {
                        const [width, height] = size.split('x').map(Number);
                        resizeImage(url, width, height).then(resizedUrl => {
                            const imageWrapper = createImageWrapper(resizedUrl, width, height);
                            imageContainer.appendChild(imageWrapper);
<<<<<<< HEAD
=======
                        }).catch(error => {
                            console.error('Error resizing image:', error);
>>>>>>> c3763a3ba55bcf2fb544224b1c5832db047fb6e9
                        });
                    } else {
                        const [width, height] = size.split('x').map(Number);
                        const imageWrapper = createImageWrapper(url, width, height);
                        imageContainer.appendChild(imageWrapper);
                    }
                });
<<<<<<< HEAD
=======
            } else {
                console.error('No image URLs returned');
                alert('No images were generated.');
>>>>>>> c3763a3ba55bcf2fb544224b1c5832db047fb6e9
            }
        })
        .catch(error => {
            console.error('Error generating image:', error);
            alert('Failed to generate image.');
        })
        .finally(() => {
            loadingIndicator.classList.add('hidden');
        });
    }
<<<<<<< HEAD
  
=======

>>>>>>> c3763a3ba55bcf2fb544224b1c5832db047fb6e9
    function resizeImage(url, width, height) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
<<<<<<< HEAD
  
                canvas.width = width;
                canvas.height = height;
  
                ctx.drawImage(img, 0, 0, width, height);
  
=======

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

>>>>>>> c3763a3ba55bcf2fb544224b1c5832db047fb6e9
                canvas.toBlob(blob => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        resolve(reader.result);
                    };
                    reader.readAsDataURL(blob);
                }, 'image/png');
            };
<<<<<<< HEAD
            img.onerror = reject;
            img.src = url;
        });
    }
  
    function createImageWrapper(url, width, height) {
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'relative bg-white dark:bg-gray-700 p-2 rounded-lg shadow-lg';
  
=======
            img.onerror = () => {
                reject(new Error('Image load error'));
            };
            img.src = url;
        });
    }

    function createImageWrapper(url, width, height) {
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'relative bg-white dark:bg-gray-700 p-2 rounded-lg shadow-lg';

>>>>>>> c3763a3ba55bcf2fb544224b1c5832db047fb6e9
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Generated Image';
        img.className = 'w-full h-auto rounded-lg';
        img.style.width = `${width}px`;
        img.style.height = `${height}px`;
<<<<<<< HEAD
  
        const buttonRow = document.createElement('div');
        buttonRow.className = 'button-row';
  
        const addButton = createIconButton('fas fa-plus', function () {
            generateImage();
        });
  
=======

        const buttonRow = document.createElement('div');
        buttonRow.className = 'button-row';

        const addButton = createIconButton('fas fa-plus', function () {
            generateImage();
        });

>>>>>>> c3763a3ba55bcf2fb544224b1c5832db047fb6e9
        const downloadButton = createIconButton('fas fa-download', function () {
            const link = document.createElement('a');
            link.href = url;
            link.download = `generated_image_${width}x${height}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
<<<<<<< HEAD
  
        const trashButton = createIconButton('fas fa-trash', function () {
            imageWrapper.remove();
        });
  
        buttonRow.appendChild(addButton);
        buttonRow.appendChild(downloadButton);
        buttonRow.appendChild(trashButton);
  
        imageWrapper.appendChild(img);
        imageWrapper.appendChild(buttonRow);
  
        return imageWrapper;
    }
  
=======

        const trashButton = createIconButton('fas fa-trash', function () {
            imageWrapper.remove();
        });

        buttonRow.appendChild(addButton);
        buttonRow.appendChild(downloadButton);
        buttonRow.appendChild(trashButton);

        imageWrapper.appendChild(img);
        imageWrapper.appendChild(buttonRow);

        return imageWrapper;
    }

>>>>>>> c3763a3ba55bcf2fb544224b1c5832db047fb6e9
    function createIconButton(iconClass, onClick) {
        const button = document.createElement('button');
        button.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded';
        button.innerHTML = `<i class="${iconClass}"></i>`;
        button.addEventListener('click', onClick);
        return button;
    }
<<<<<<< HEAD
  });
  
=======
});
>>>>>>> c3763a3ba55bcf2fb544224b1c5832db047fb6e9
