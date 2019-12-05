# Web Worker Workshop

Bienvenue !

Watch this workshop on [Twitch](https://www.twitch.tv/videos/502607581) ([channel](https://www.twitch.tv/yves_gurcan)).

## How do web workers work?

We have some slides to summarize web workers in a nutshell:

* [Follow the presentation live as I'm going through the slides.](https://slides.com/yvesgurcan/deck/live#)
* or [look at the slides on your own time.](https://slides.com/yvesgurcan/deck#/)

## Some use cases

- [Processing images.](https://github.com/yvesgurcan/workers/blob/master/webWorkers/postMessage/public/webWorker2.js)
- [Parse binary files.](https://github.com/yvesgurcan/wadjs/tree/develop/app/webWorkers)
- [Generate CSV files.](https://github.com/markroper/web-worker-csv-parser/blob/master/js/FileParsingWorker.js)

## Part A: Set up your environment

Get your macOS ready.

### Step 1: Visual Studio Code

Download and install [Visual Studio Code](https://code.visualstudio.com/) (75 MB for v1.39).

### Step 2: Homebrew

Install [Homebrew](https://brew.sh/).

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Step 3: NPM

Install [Node](https://nodejs.org/en/) with Homebrew. [NPM](https://www.npmjs.com/) is included with Node.

```
brew install node
```

Check installed version of Node and NPM.

```
node -v
npm -v
```

If NPM is not the latest version, you can update it itself.

```
npm i -g npm
```

### Step 4: Git

Install [Git](https://git-scm.com/) with Homebrew.

```
brew install git
```

Check installed version of Git.

```
git --version
```

### Step 5: GitHub

Create a [GitHub account](https://github.com/join).

## Part B: Set up the repository

Let's make your own project.

### Step 1: Fork this repository on GitHub

Click the "Fork" button on the [repository page](https://github.com/yvesgurcan/workers).

### Step 2: Clone the repository 

Use Git to copy the repository locally.

```
git clone URL_OF_FORKED_REPO
```

### Step 3: Install and start development server

Enter the directory and run NPM commands.

```
cd PATH_TO_LOCAL_REPO/workshop
npm i
npm start
```

Now browse to <http://localhost:8080>. You should see this message:

```
It works!
```

In the `workshop/` directory, you will find a couple of files:
* `package.json` and `package-lock.json` is where NPM keeps track of all the project dependencies.
* `webpack.config.js` is the file that configures how the development server works.
* `README.md` contains the instructions you are reading.
* `.prettierrc` configures [Prettier](https://prettier.io/) (a linter) if you use it.
* `src/` is the folder where the source code of this application lives. Right now, it contains `index.html` and `index.js`, which respectively contain HTML and JavaScript code. It also contains `createImage.js`, which will be useful later!
* `public/worker.js` is the file where the web worker lives. The worker should be separate from the main thread and be available as a public URL (unless you use a special Webpack loader).

## Part C: A simple web worker

Alright let's write some code! The goal here is to create a very simple form. When you submit the form, the main thread will send a message to the worker. The worker will receive and respond by sending a message back to the main thread.

![Event model for web workers](https://s3.amazonaws.com/media-p.slid.es/uploads/1086608/images/6719788/EIIuqROU0AEm7Z8.png)

### Step 1: Form

You probably want to open your browser developer console for the rest of this workshop.

In `index.html`, let's create a [form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) with an ID and add a [button](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) and [input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) to it. We'll use this form to send messages to our web worker.

### Step 2: Instantiate the worker

In `index.js`, instantiate your worker thanks to the [Worker object](https://developer.mozilla.org/en-US/docs/Web/API/Worker).

Example:

```
const worker = new Worker('public/worker.js');
```

If you did it right, you'll see a message from the worker thread in your console 🙂

### Step 3: Send messages to the worker thread

In `index.js`, create a `sendMessage` function. Define this function as an [onsubmit handler](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onsubmit) for the form.

The function takes `event` as an argument (the data from the `input` field lives somewhere in `event.target`, find it!) and uses [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage) to send the data to the worker. 

*Hint: You should probably use [preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) in `sendMessage()` to prevent the page from reloading when you submit the form.*

### Step 4: Receive messages from the main thread

In `worker.js`, add an [onmessage handler](https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/onmessage). Similarly to `sendMessage` in the main thread, it also takes `event` as an argument.

Can you `console.log` the payload sent from the main thread?

### Step 5: Receive messages from the worker thread

The worker now receives payloads. Let's set up the main thread to receive messages from the worker.

Back in `index.js`, create a new `receiveMessage` function and associate it with the [worker's instance onmessage handler](https://developer.mozilla.org/en-US/docs/Web/API/Worker/onmessage).

*Hint: Before knowing if this handler really works, you'll have to do the next step.*

### Step 6: Send messages to the main thread

In `worker.js`, use the [postMessage method of the worker script](https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/postMessage) in the `onmessage` handler you wrote (I know, it's getting confusing!) to send a payload back to your app.

Hooray! 🎉 Now, your main thread and work thread are talking to each other. Your main thread can send a payload to the worker, then the worker can process it, and send the result back!

## Part D: Keep your UI hot

Let's take it to the next level. We're going to generate images first from the main thread and then from the worker thread and then compare performances.

### Step 1: Stopwatch

Let's implement a simple "stopwatch" in `index.html` and `index.js` that starts as soon as the page loads and increments every second. For example, add a `div` with an ID in `index.html`. Grab that `div` in `index.js` and use [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) and [innerHtml](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) to update your page with the new value.

### Step 2: Another input

In `index.html`, add an `input` tag to your form. If you want to get fancy, you can also `label` the two fields with `Width` and `Height`.

### Step 3: Add an image

In `index.html`, add an `img` tag with an ID to your page. Don't set the `src` attribute yet!

### Step 4: Generate an image from the main thread

Ok. This is where things get even more interesting!

Let's import the `createImage.js` script into `index.js` like so:

```
import createImage from './createImage';
```

We're going to duplicate the `sendMessage` function to create a new `handleImageCreation` function. Here is the code of that function:

```
async function handleImageCreation(event) {
    event.preventDefault();
    const width = event.target[0].value;
    const height = event.target[0].value;
    const blob = await createImage(width, height);
    if (blob) {
        const imageData = URL.createObjectURL(blob);
        image.src = imageData;
    }
}
```

Make sure to grab your `img` element with `getElementById` and define it as `image` in `index.js` for the function to work.

Then, change the `onsubmit` handler of the `form` element to use `handleImageCreation`.

Ready for fireworks? In your browser, enter a width and height and submit the form.

Try entering bigger numbers. Look at the stopwatch you created. What do you notice about the time?

### Step 4: Generate an image in the worker thread

That was fun, but creating this image in the main thread froze our UI, sometimes for a few seconds, sometimes forever!

Let's use our worker instead so that the the browser of the user does not blow up when creating the image.

First, let's modify `handleImageCreation` to send messages to our worker:

```
function handleImageCreation(event) {
    event.preventDefault();
    const width = event.target[0].value;
    const height = event.target[1].value;
    worker.postMessage({ width, height });
}
```

Then, update `receiveMessage` to handle the image returned by the worker:

```
function receiveMessage(event) {
    console.log('Message received from worker thread', event.data);
    if (blob) {
        const imageData = URL.createObjectURL(blob);
        image.src = imageData;
    }
}
```

There's some commented code in `worker.js`. Remove the `/*` and `*/`.

And give it a try! What do you notice? Does the stopwatch freeze?

## Part E: Bundle up your web worker

Well done! Want to level up some more? Learn how to [use Webpack and React to bundle your web workers](../webWorkers/bundledWebWorker/src).
