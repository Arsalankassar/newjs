const canvas1 = document.querySelectorAll('canvas')[0]; // First canvas
const canvas2 = document.querySelectorAll('canvas')[1]; // Second canvas
const form = document.querySelector('.signature');
const clearButton = document.querySelector('.clear');
const submitButton = document.querySelector('.submit');
const ctx1 = canvas1.getContext("2d"); // Selecting context for the first canvas
const ctx2 = canvas2.getContext("2d"); // Selecting context for the second canvas
let writingMode = false;

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get the data URL of the first canvas
    const imageURL = canvas1.toDataURL();
    
    // Create an image from the data URL
    const image = new Image();
    image.src = imageURL;

    // When the image is loaded, draw it onto the second canvas
    image.onload = function() {
        ctx2.drawImage(image, 0, 0);
    };

    // Clear the first canvas
    clearPad();
});

const clearPad = () => {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
};

clearButton.addEventListener('click', (event) => {
    event.preventDefault();
    clearPad();
});

const getTargetPosition = (event) => {
    positionX = event.clientX - event.target.getBoundingClientRect().x;
    positionY = event.clientY - event.target.getBoundingClientRect().y;
    console.log(positionX, positionY);
    return [positionX, positionY];
};

const handlePointerMove = (event) => {
    if (!writingMode) return;

    const [positionX, positionY] = getTargetPosition(event);
    ctx1.lineTo(positionX, positionY);
    ctx1.stroke();
};

const handlePointerUp = () => {
    writingMode = false;
};

const handlePointerDown = (event) => {
    writingMode = true;
    ctx1.beginPath();
    const [positionX, positionY] = getTargetPosition(event);
    ctx1.moveTo(positionX, positionY);
};

ctx1.lineWidth = 3;
ctx1.lineJoin = ctx1.lineCap = 'round';

canvas1.addEventListener('pointerdown', handlePointerDown, { passive: true });
canvas1.addEventListener('pointerup', handlePointerUp, { passive: true });
canvas1.addEventListener('pointermove', handlePointerMove, { passive: true });
