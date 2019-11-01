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

### Step 1: Visual Studio Code

Download and install [Visual Studio Code](https://code.visualstudio.com/) (75 MB for v1.39).

### Step 2: Homebrew

Install [Homebrew](https://brew.sh/).

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Step 3: NPM

Install [Node](https://nodejs.org/en/) with Homebrew. NPM is included with Node.

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

### Step 1: Fork this repository on GitHub

Click the "Fork" button on the [repository page](https://github.com/yvesgurcan/workers).

### Step 2: Clone the repository 

Use Git to copy the repository locally.

```
git clone URL_OF_CLONED_REPO
```

## Part C: Web worker
