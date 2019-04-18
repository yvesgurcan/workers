const WORKER_ID = '2';

const generateRandomRGBValues = ({ height = 200, width = 200 }) => {
    const pixels = [];
    for (let i = 0; i < height * width; i++) {
        pixels[i] = {
            red: Math.ceil((Math.random() * 255) + 1),
            green: Math.ceil((Math.random() * 255) + 1),
            blue: Math.ceil((Math.random() * 255) + 1),
        }
    }

    return pixels;
}

onmessage = async (event) => {
    console.log(`webWorker${WORKER_ID}`, 'received message', { data: event.data })
    try {
        const start = new Date();

        const { height, width } = event.data;

        const pixels = generateRandomRGBValues({ height, width });

        const canvas = new OffscreenCanvas(height, width);
        canvas.height = height;
        canvas.width = width;
        const context = canvas.getContext('2d');

        const imageData = context.createImageData(
            canvas.width,
            canvas.height,
        );

        for (let i = 0; i < height * width; i++) {
            const { red, green, blue } = pixels[i];
            imageData.data[(i * 4) + 0] = red;
            imageData.data[(i * 4) + 1] = green;
            imageData.data[(i * 4) + 2] = blue;
            imageData.data[(i * 4) + 3] = 255;
        }
        const newCanvas = new OffscreenCanvas(height, width);
        newCanvas.height = imageData.height;
        newCanvas.width = imageData.width;
        newCanvas.getContext('2d').putImageData(imageData, 0, 0);
        context.imageSmoothingEnabled = false;
        context.drawImage(newCanvas, 0, 0);

        const blob = await canvas.convertToBlob();

        const end = new Date();

        const timeToGenerate = `${((end - start) / 1000).toFixed(1)}s`;

        const response = {
            workerId: WORKER_ID,
            type: event.data.type,
            output: blob,
            timeToGenerate
        };

        console.log(`webWorker${WORKER_ID}`, 'responded', { response })

        postMessage(response)

        return blob;
    } catch (error) {
        console.error(`webWorker${WORKER_ID}`, 'An error occurred while creating canvas', { error });

        const response = {
            workerId: WORKER_ID,
            type: event.data.type,
            error,
        };

        postMessage(response)

        return;
    }
};