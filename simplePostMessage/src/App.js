import React, { Component, Fragment } from "react";
import style from './App.scss';

const MAIN_THREAD = 'mainThread';

export default class App extends Component {
    state = {
        message: 4,
    }

    componentDidMount() {
        if ("Worker" in window) {
            this.myWebWorker = new Worker('public/myWebWorker.js');
            this.myWebWorker.onmessage = this.handleResponse;
        }
    }

    sendMessage = () => {
        if ("Worker" in window) {
            const { message } = this.state;
            console.log(MAIN_THREAD, 'send message', { message });
            this.myWebWorker.postMessage(Number(message));
        }
    }

    handleResponse = (event) => {
        console.log(MAIN_THREAD, 'received response', { data: event.data });
        this.setState(() => ({ response: event.data }));
    }

    handleFormUpdate = (event) => {
        const message = event.target.value;
        this.setState(() => ({ message }));
    }

    render() {
        const { message, response } = this.state;
        return (
            <Fragment>
                <h1>Send and receive messages from a Web Worker</h1>
                <div className={style.app}>
                    <h2>My Web Worker knows the square root of all the numbers</h2>
                    <div>
                        <div>Message payload:</div>
                        <div>
                            <input
                                type="number"
                                value={message}
                                onChange={this.handleFormUpdate}
                            />
                        </div>
                        <button onClick={this.sendMessage}>Send</button>
                    </div>
                    <div className={style.response}>
                        <div>Response payload:</div>
                        {response}
                    </div>
                </div>
            </Fragment>
        );
    }
}
