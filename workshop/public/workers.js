console.log('Hello from worker!');

/*

// That's for later :)

const THREAD = 'worker:';

const generateRandomRGBValues = ({ height, width }) => {
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

onmessage = async event => {
    console.log(THREAD, 'received message', { data: event.data });
    try {
        const { height: h, width: w } = event.data;
        const height = Number(h);
        const width = Number(w);

        const pixels = generateRandomRGBValues({ height, width });

        const canvas = new OffscreenCanvas(height, width);
        canvas.height = height;
        canvas.width = width;
        const context = canvas.getContext('2d');

        const imageData = context.createImageData(canvas.width, canvas.height);

        for (let i = 0; i < height * width; i++) {
            const { red, green, blue } = pixels[i];
            imageData.data[i * 4 + 0] = red;
            imageData.data[i * 4 + 1] = green;
            imageData.data[i * 4 + 2] = blue;
            imageData.data[i * 4 + 3] = 255;
        }
        const newCanvas = new OffscreenCanvas(height, width);
        newCanvas.height = imageData.height;
        newCanvas.width = imageData.width;
        newCanvas.getContext('2d').putImageData(imageData, 0, 0);
        context.imageSmoothingEnabled = false;
        context.drawImage(newCanvas, 0, 0);

        const blob = await canvas.convertToBlob();

        console.log(THREAD, 'responded', { blob });

        postMessage(blob);

        return blob;
    } catch (error) {
        console.error(THREAD, 'An error occurred while creating canvas', {
            error
        });
        postMessage(error);
        return;
    }
};

*/
