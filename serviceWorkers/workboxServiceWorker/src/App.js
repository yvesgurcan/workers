import React, { Component, Fragment } from "react";
import './App.css';

const MAIN_THREAD = 'mainThread';

export default class App extends Component {
    componentDidMount() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('workboxServiceWorker.js')
                .then(registration => console.log('Service worker registered.', { registration }))
                .catch(error => console.log('Service worker could not register.', { error }));
        } else {
            console.error('Service workers are not supported.');
        }
    }
    render() {
        return (
            <Fragment>
                <h1>Workbox</h1>
                <div className="app">
                    <h2>Get a service worker going without thinking about it</h2>
                    <p><b>Workbox simplifies the usage of Service Workers</b></p>
                </div>
            </Fragment>
        );
    }
}
