import React, { Component, Fragment } from "react";
import WorkerInterace from "./WorkerInterface";
import style from './App.scss';

import { createImage } from '../lib/createImage';

const MAIN_THREAD = 'mainThread';

export default class App extends Component {
    state = {
        responses: [],
        workerMessages: {
            0: {
                type: 'SAY_HI',
            },
            1: {
                type: 'COUNT_TO_1000',
            },
            2: {
                type: 'CREATE_RANDOM_IMAGE',
            }
        }
    }

    componentDidMount() {
        this.startTimer();
        if ("Worker" in window) {
            [0, 1, 2].map(i => {
                this[`webWorker${i}`] = new Worker(`public/webWorker${i}.js`);
                this[`webWorker${i}`].onmessage = this.handleResponse;
            })
        }
    }

    sendMessage = (i) => {
        if (i === 2) {
            this.setState(prevState => ({
                responses: {
                    ...prevState.responses,
                    [i]: undefined
                },
                workerMessages: {
                    ...prevState.workerMessages,
                    [i]: {
                        ...prevState.workerMessages[i],
                        height: 2800,
                        width: 2800,
                    },
                }
            }), () => {
                const { workerMessages } = this.state;
                console.log(MAIN_THREAD, 'send message', { message: workerMessages[i] })
                this[`webWorker${i}`].postMessage(workerMessages[i])
            })
        } else {
            this.setState(prevState => ({
                responses: {
                    ...prevState.responses,
                    [i]: undefined
                }
            }))
            const { workerMessages } = this.state;
            console.log(MAIN_THREAD, 'send message', { message: workerMessages[i] })
            this[`webWorker${i}`].postMessage(workerMessages[i])
        }
    }

    handleResponse = (event) => {
        console.log(MAIN_THREAD, 'received response', { data: event.data })
        this.setState(prevState => {
            let image = undefined;
            if (!event.data.error && event.data.type === 'CREATE_RANDOM_IMAGE') {
                image = URL.createObjectURL(event.data.output)
            }

            return {
                responses: {
                    ...prevState.responses,
                    [event.data.workerId]: {
                        payload: event.data,
                        image
                    }
                },
            }
        })
    }

    executeInMainThread = (i, message) => {
        this.setState(prevState => ({
            responses: {
                ...prevState.responses,
                [i]: undefined
            },
            workerMessages: {
                ...prevState.workerMessages,
                [i]: {
                    ...prevState.workerMessages[i],
                    height: 2800,
                    width: 2800,
                },
            }
        }), async () => {
            const { workerMessages } = this.state;
            console.log(MAIN_THREAD, 'executing script in main thread', { message: workerMessages[i] })

            const result = await createImage(workerMessages[i])

            this.setState(prevState => {
                console.log({ result })
                let image = undefined;
                if (result.output) {
                    image = URL.createObjectURL(result.output);
                }
                return {
                    responses: {
                        ...prevState.responses,
                        [i]: {
                            payload: result,
                            image
                        }
                    },
                }
            })
        })

    }

    startTimer() {
        this.setState(prevState => ({
            start: Date.now()
        }))
        this.timer = setInterval(() => this.setState(prevState => ({
            time: Date.now() - prevState.start
        })), 0.1);
    }


    render() {
        const { workerMessages, responses, time } = this.state;
        return (
            <Fragment>
                <h1>Send and receive messages from your Web Workers</h1>
                <div>Time elapsed: {(time / 1000).toFixed(2)}s</div>
                <div className={style.app}>
                    {[0, 1, 2].map(i => (
                        <WorkerInterace
                            key={i}
                            i={i}
                            message={workerMessages[i]}
                            sendMessage={() => this.sendMessage(i)}
                            response={responses[i]}
                            executeInMainThread={i === 2 ? (message) => this.executeInMainThread(i, message) : null}
                        />
                    ))}
                </div>
            </Fragment>
        );
    }
}
