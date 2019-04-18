const MAIN_THREAD = 'mainThread';

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

export const createImage = async (message) => {
    console.log(MAIN_THREAD, 'received data', { message })
    try {
        const start = new Date();

        const { height, width } = message;

        const pixels = generateRandomRGBValues({ height, width });

        const canvas = document.createElement('canvas');
        canvas.height = height;
        canvas.width = width;
        const context = canvas.getContext('2d');


        const imageData = context.createImageData(
            width,
            height,
        );

        for (let i = 0; i < height * width; i++) {
            const { red, green, blue } = pixels[i];
            imageData.data[(i * 4) + 0] = red;
            imageData.data[(i * 4) + 1] = green;
            imageData.data[(i * 4) + 2] = blue;
            imageData.data[(i * 4) + 3] = 255;
        }
        const newCanvas = document.createElement('canvas');
        newCanvas.height = imageData.height;
        newCanvas.width = imageData.width;
        console.log({ newCanvas })
        newCanvas.getContext('2d').putImageData(imageData, 0, 0);
        context.imageSmoothingEnabled = false;
        context.drawImage(newCanvas, 0, 0);

        let blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

        const end = new Date();

        const timeToGenerate = `${((end - start) / 1000).toFixed(1)}s`;

        const response = {
            workerId: MAIN_THREAD,
            type: message.type,
            output: blob,
            timeToGenerate
        };

        console.log(MAIN_THREAD, 'done', { response })

        return response;
    } catch (error) {
        console.error(MAIN_THREAD, 'An error occurred while creating canvas', { error });

        const response = {
            workerId: MAIN_THREAD,
            type: message.type,
            error,
        };

        return response;
    }
};
