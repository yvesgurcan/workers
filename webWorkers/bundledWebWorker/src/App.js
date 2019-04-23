import React, { Component, Fragment } from "react";
import MyWebWorker from './myWebWorkers/MyWebWorker.js';
import style from './App.scss';

const MAIN_THREAD = 'mainThread';

export default class App extends Component {
    state = {
        message: 7,
    }

    componentDidMount() {
        if ("Worker" in window) {
            this.myWebWorker = new MyWebWorker();
            this.myWebWorker.onmessage = this.handleResponse;
        }
    }

    sendMessage = () => {
        if ("Worker" in window) {
            const { message } = this.state;
            console.log(MAIN_THREAD, 'send message', { message });
            this.myWebWorker.postMessage({ number: Number(message) });
        }
    }

    handleResponse = (event) => {
        console.log(MAIN_THREAD, 'received response', { data: event.data });
        this.setState(() => ({ response: event.data.number }));
    }

    handleFormUpdate = (event) => {
        const message = event.target.value;
        this.setState(() => ({ message }));
    }

    render() {
        const { message, response } = this.state;
        return (
            <Fragment>
                <h1>Bundle and optimize a Web Worker</h1>
                <div className={style.app}>
                    <h2>My bundled Web Worker can return the logarithm of any number</h2>
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
