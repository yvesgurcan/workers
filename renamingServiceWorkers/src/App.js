import React, { Component, Fragment } from "react";
import './App.css';

const SW_NAME = 'serviceWorker.js';

export default class App extends Component {
    state = { registrations: 0 }

    async componentDidMount() {
        if ('serviceWorker' in navigator) {

            await navigator.serviceWorker.register(SW_NAME)
                .then(registration => {
                    console.log('Service worker registered.', { registration })
                    this.getRegistrations();
                })
                .catch(error => {
                    console.log('Service worker could not register.', { error })
                });
        } else {
            console.error('Service workers are not supported.');
        }
    }

    getRegistrations = () => {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            this.setState(() => ({ registrations: registrations.length }))
        })

    }

    render() {
        const { registrations } = this.state;
        return (
            <Fragment>
                <h1>Service Worker anti-pattern</h1>
                <div className="app">
                    <p>Service Workers registered:</p>
                    <b>{SW_NAME}</b>
                </div>
            </Fragment>
        );
    }
}
