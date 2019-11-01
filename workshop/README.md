# Web Worker Workshop

Bienvenue !

Follow this workshop on [Twitch](https://www.twitch.tv/yves_gurcan).

## How do web workers work?

We have some slides to summarize web workers in a nutshell:

* [Follow the presentation live as I'm going through the slides.](https://slides.com/yvesgurcan/deck/live#)
* or [look at the slides on your own time.](https://slides.com/yvesgurcan/deck#/)

## Some use cases

- [Create images with canvas.](https://github.com/yvesgurcan/workers/blob/master/webWorkers/postMessage/public/webWorker2.js)
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
* `src/` is the folder where the source code of this application lives. Right now, it contains `index.html` and `inded.js`, which respectively contain HTML and JavaScript code.
* `public/worker.js` is the file where the web worker lives. The worker should be separate from the main thread and be available as a public URL (unless you use a special Webpack loader).

## Part C: A simple web worker

Alright let's write some code!

### Step 1: Form

In `index.html`, let's create a [form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) with an ID and add a [button](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) and [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) to it. We'll use this form to send messages to our web worker.

### Step 2: Instantiate the worker

In `index.js`, instantiate your worker thanks to the [Worker object](https://developer.mozilla.org/en-US/docs/Web/API/Worker).

Example:

```
const worker = new Worker('public/worker.js');
```

If you did it right, you'll see a message from the worker thread in your console 🙂

### Step 3: postMessage

In `index.js`, create a `sendMessage` function. Define this function as an [onsubmit handler](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onsubmit) for the form.

The function takes `event` as an argument (the form data lives somewhere in `event.target`, find it!) and uses [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage) to send the data to the worker. 

*Hint: You should probably use [preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) in `sendMessage()` to prevent the page from reloading when you submit the form.*

### Step 3: 

In `worker.js`, add an [onmessage handler](https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/onmessage). Similarly to `sendMessage` in the main thread, it also takes `event` as an argument.

Can you `console.log` the payload?

## Part D: Keep your UI hot

### Step 1: Stopwatch

Let's implement a simple stopwatch in `index.html` and `index.js` that starts as soon as the page loads and increments every second. Use [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) and [innerHtml](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) to update your page with the new value.

## Step 2: Break it!
