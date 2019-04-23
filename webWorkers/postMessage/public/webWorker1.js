const WORKER_ID = '1';

onmessage = (event) => {
    console.log(`webWorker${WORKER_ID}`, 'received message', { data: event.data })


    let x = 0;
    for (let i = 1; i <= 1000; i++) {
        x = i;
        const response = {
            workerId: WORKER_ID,
            type: event.data.type,
            output: i,
        };

        postMessage(response)
    }

    console.log(`webWorker${WORKER_ID}`, 'counted to 1000')

};