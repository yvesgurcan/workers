import React, { Component, Fragment } from "react";
import './App.css';

const MAIN_THREAD = 'mainThread';

export default class App extends Component {
    componentDidMount() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('serviceWorker.js')
                .then(registration => console.log('Service worker registered.', { registration }))
                .catch(error => console.log('Service worker could not register.', { error }));
        } else {
            console.error('Service workers are not supported.');
        }
    }
    render() {
        return (
            <Fragment>
                <h1>Register a Service Worker</h1>
                <div className="app">
                    <h2>My app can now run offline thanks to the Service Worker</h2>
                    <p><b>I'm invincible!</b></p>
                </div>
            </Fragment>
        );
    }
}
