const WORKER_ID = 'webWorker';

onmessage = (event) => {
    console.log(WORKER_ID, 'received message', { data: event.data })

    const response = { number: Math.log(event.data.number) };

    postMessage(response)

    console.log(WORKER_ID, 'responded', { response })
};