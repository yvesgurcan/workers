const WORKER_ID = '0';

const responses = [
    'Hello, Dave',
    'Bonjour !',
    'What\'sup?',
    'I don\'t wanna.',
    'This is a randomly picked response.',
    'Bungiorno!',
    'Hi there.',
    'Yo!',
    'Hello 👋👋👋',
    'Well, hello.'
]

onmessage = (event) => {
    console.log(`webWorker${WORKER_ID}`, 'received message', { data: event.data })

    const response = {
        workerId: WORKER_ID,
        type: event.data.type,
        output: responses[(Math.floor(Math.random() * responses.length))],
    };

    console.log(`webWorker${WORKER_ID}`, 'responded', { response })

    postMessage(response)
};