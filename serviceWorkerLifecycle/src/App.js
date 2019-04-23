import React, { Component, Fragment } from "react";
import './App.css';

const MAIN_THREAD = 'mainThread';

export default class App extends Component {
    state = { statuses: [] }

    componentDidMount() {
        if ('serviceWorker' in navigator) {
            let swRegistered = false;
            navigator.serviceWorker.getRegistrations((registrations) => {
                console.log({ registrations })
                swRegistered = true;
            })

            if (!swRegistered) {
                this.updateStatus('Registering Service Worker.');
                navigator.serviceWorker.register('serviceWorker.js')
                    .then(registration => {
                        this.updateStatus('Service Worker registered.');
                        this.listenToServiceWorker(registration);
                        console.log('Service worker registered.', { registration })
                    })
                    .catch(error => {
                        this.updateStatus('Registration failed :(');
                        console.log('Service worker could not register.', { error })
                    });
            }
        } else {
            console.error('Service workers are not supported.');
        }
    }

    listenToServiceWorker = (registration) => {
        registration.addEventListener('updatefound', () => {
            this.updateStatus('Service Worker found an update.');
            registration.installing.addEventListener('statechange', (event) => {
                console.log(`State of Service Worker has changed: ${event.target.state}`);
                if (event.target.state === 'installed') {
                    this.updateStatus('Service Worker installed.');
                } else if (event.target.state === 'activating') {
                    this.updateStatus('Service Worker is activating.');
                } else if (event.target.state === 'activated') {
                    this.updateStatus('Service Worker activated.');
                } else {
                    this.updateStatus(`Service Worker state has changed: ${event.target.state}.`);
                }
            });
        })
    }

    updateStatus = (status) => this.setState(prevState => ({
        statuses: [...prevState.statuses, status]
    }))

    unregisterWorker = async () => {
        const registrations = await navigator.serviceWorker.getRegistrations();
        registrations.map(registration => {
            this.updateStatus('Unregistering Service Worker.');
            registration.unregister()
        });
    }

    render() {
        const { statuses } = this.state;
        console.log({ statuses }, statuses[statuses.length - 1])
        return (
            <Fragment>
                <h1>Service Worker lifecycle</h1>
                <div className="app">
                    <p>Service Worker statuses:</p>
                    <b>{statuses.map((status, index) => (
                        <p key={index}>{index}. {status}</p>
                    ))}</b>
                    <button onClick={this.unregisterWorker}>Unregister worker</button>
                    <br />
                    <br />
                    <a href="">Reload page</a>
                </div>
            </Fragment >
        );
    }
}
