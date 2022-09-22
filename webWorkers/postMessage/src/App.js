import React, { Component, Fragment } from "react";
import WorkerInterace from "./WorkerInterface";
import style from "./App.scss";

import { createImage } from "../lib/createImage";

const MAIN_THREAD = "mainThread";

const WORKER_MESSAGES = {
  0: {
    type: "SAY_HI",
  },
  1: {
    type: "COUNT_TO_1000",
  },
  2: {
    type: "CREATE_RANDOM_IMAGE",
    height: 8000,
    width: 8000,
  },
};

export default class App extends Component {
  state = {
    responses: [],
  };

  componentDidMount() {
    this.startTimer();
    if ("Worker" in window) {
      [0, 1, 2].map((i) => {
        this[`webWorker${i}`] = new Worker(`public/webWorker${i}.js`);
        this[`webWorker${i}`].onmessage = this.handleResponse;
      });
    }
  }

  startTimer() {
    this.setState(() => ({ start: Date.now() }));

    setInterval(
      () =>
        this.setState((prevState) => ({
          time: Date.now() - prevState.start,
        })),
      10
    );
  }

  sendMessage = (i) => {
    if ("Worker" in window) {
      this.deleteResponse(i);
      console.log(MAIN_THREAD, "send message", { message: WORKER_MESSAGES[i] });
      this[`webWorker${i}`].postMessage(WORKER_MESSAGES[i]);
    }
  };

  deleteResponse = (i) => {
    this.setState((prevState) => ({
      responses: {
        ...prevState.responses,
        [i]: undefined,
      },
    }));
  };

  handleResponse = (event) => {
    const { data } = event;
    console.log(MAIN_THREAD, "received response", { data });
    this.setState((prevState) => {
      const image = this.getImageBlob(data);
      return {
        responses: {
          ...prevState.responses,
          [data.workerId]: {
            payload: data,
            image,
          },
        },
      };
    });
  };

  executeInMainThread = async (i) => {
    this.deleteResponse(i);
    this.setState((prevState) => ({
      responses: {
        ...prevState.responses,
        [i]: undefined,
      },
    }));

    console.log(MAIN_THREAD, "executing script in main thread", {
      message: WORKER_MESSAGES[i],
    });

    const result = await createImage(WORKER_MESSAGES[i]);

    this.setState((prevState) => {
      let image = this.getImageBlob(result);
      return {
        responses: {
          ...prevState.responses,
          [i]: {
            payload: result,
            image,
          },
        },
      };
    });
  };

  getImageBlob = (data) => {
    let image = undefined;
    if (!data.error && data.type === "CREATE_RANDOM_IMAGE") {
      image = URL.createObjectURL(data.output);
    }

    return image;
  };

  render() {
    const { responses, time } = this.state;
    return (
      <Fragment>
        <h1>Send and receive messages from your Web Workers</h1>
        <div>Time elapsed: {(time / 1000).toFixed(2)}s</div>
        <div className={style.app}>
          {[0, 1, 2].map((i) => (
            <WorkerInterace
              key={i}
              i={i}
              message={WORKER_MESSAGES[i]}
              sendMessage={() => this.sendMessage(i)}
              response={responses[i]}
              executeInMainThread={
                i === 2
                  ? (message) => this.executeInMainThread(i, message)
                  : null
              }
            />
          ))}
        </div>
      </Fragment>
    );
  }
}
