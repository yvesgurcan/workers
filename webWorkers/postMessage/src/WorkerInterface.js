import React, { Fragment } from 'react';
import style from './WorkerInterface.scss';

export default ({ i, sendMessage, message, response, executeInMainThread }) => (
    <div className={style.workerInterfaceOuter}>
        <div className={style.workerInterfaceInner}>
            <h2>Web Worker #{i}</h2>
            <div>
                <div>
                    Message payload:
            </div>
                <pre>
                    {JSON.stringify(message)}
                </pre>
                {
                    executeInMainThread && (
                        <button onClick={() => executeInMainThread(message)}>
                            Do it in the Main Thread
                        </button>
                    )
                }
                <button onClick={sendMessage}>
                    Send
                </button>
            </div>
            <div className={style.response}>
                <div>
                    Response payload:
            </div>
                {response && (
                    <Fragment>
                        <pre>
                            {JSON.stringify(response.payload)}
                        </pre>
                        {
                            response.image && (
                                <img src={response.image} />
                            )
                        }
                    </Fragment>
                )}
            </div>
        </div>
    </div>
)
