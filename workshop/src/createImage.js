const MAIN_THREAD = 'mainThread:';

const generateRandomRGBValues = ({ height = 200, width = 200 }) => {
    const pixels = [];
    for (let i = 0; i < height * width; i++) {
        pixels[i] = {
            red: Math.ceil(Math.random() * 255 + 1),
            green: Math.ceil(Math.random() * 255 + 1),
            blue: Math.ceil(Math.random() * 255 + 1)
        };
    }

    return pixels;
};

export default async (width, height) => {
    console.log(MAIN_THREAD, 'received data', { width, height });
    try {
        const pixels = generateRandomRGBValues({ height, width });

        const canvas = document.createElement('canvas');
        canvas.height = height;
        canvas.width = width;
        const context = canvas.getContext('2d');

        const imageData = context.createImageData(width, height);

        for (let i = 0; i < height * width; i++) {
            const { red, green, blue } = pixels[i];
            imageData.data[i * 4 + 0] = red;
            imageData.data[i * 4 + 1] = green;
            imageData.data[i * 4 + 2] = blue;
            imageData.data[i * 4 + 3] = 255;
        }
        const newCanvas = document.createElement('canvas');
        newCanvas.height = imageData.height;
        newCanvas.width = imageData.width;
        newCanvas.getContext('2d').putImageData(imageData, 0, 0);
        context.imageSmoothingEnabled = false;
        context.drawImage(newCanvas, 0, 0);

        let blob = await new Promise(resolve =>
            canvas.toBlob(resolve, 'image/png')
        );

        console.log(MAIN_THREAD, 'done', { blob });

        return blob;
    } catch (error) {
        console.error(MAIN_THREAD, 'An error occurred while creating canvas', {
            error
        });

        return error;
    }
};
