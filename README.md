# Retro - Make Retrospectives Great Again
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

![CircleCI (all branches)](https://img.shields.io/circleci/project/github/yduman/retro.svg?style=flat-square) ![GitHub release](https://img.shields.io/github/release/yduman/retro.svg?style=flat-square) ![GitHub](https://img.shields.io/github/license/yduman/retro.svg?style=flat-square) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

![demo](./assets/retro.png)

## Table of Contents

- [What is Retro?](#what-is-retro)
- [Usage Locally](#usage-locally)
- [Branching](#branching)
- [Deployment Examples](#deployment-examples)
  - [PM2](#pm2)
  - [Docker](#docker)
- [Contributing](#contributing)
- [Project State](#project-state)

## What is Retro?

Retro is a tool that you can use for your retrospectives. The goal of Retro is to aid teams in remote retrospectives.

At work, we were using third party retrospective tools, which meant we couldn't express ourselves freely because of privacy reasons. Retro provides an open-source solution, where you can host the app on your own servers, so you can discuss freely again, since you own the data!

## Usage Locally

Install dependencies

```console
$ cd backend && npm i && cd ..
$ cd frontend && npm i && cd ..
```

Run servers

```console
$ cd backend && npm run start:dev && cd ..
$ cd frontend && npm run start && cd ..
```

## Branching

- The `master` branch is always the latest development stage
- Stable releases are tagged with their respective version number
- There might be feature branches that contain new experimental stuff

## Deployment Examples

### PM2

- Install [PM2](https://pm2.keymetrics.io/) on your server
- Clone this project on your server
- Install the dependencies by running `npm i` on `backend` and `frontend`
- Check if the proxy settings are correct
  - Check `backend/src/config/index.ts`
  - Check `frontend/src/setupProxy.js`
  - Check `frontend/src/utils/index.ts`
- Provide an `.env.production.local` file inside of `frontend`
    ```
    # Example
    REACT_APP_PROD_URL=http://mydomain.com
    REACT_APP_PROD_PORT=80
    ```
- Build the frontend by running `npm run deploy`
- Go to the `backend` folder and run `pm2 start processes.json`

### Docker

- There is a `Dockerfile` on the project root which builds everything and runs the server
- You might want to define your own restart policy then
- The server runs without process managers. You can read [here](https://www.docker.com/blog/keep-nodejs-rockin-in-docker/) why.

## Contributing

- This project uses [Prettier](https://prettier.io) and the latest LTS version of [Node.js](https://nodejs.org/en/)
- You can also develop with the provided Docker containers!
  - on Linux, make sure to set an environment variable, since `host.docker.internal` is not working: 
    - `export DOCKER_HOST_IP=$(docker network inspect bridge --format='{{(index .IPAM.Config 0).Gateway}}')`

## Project State

- You can always watch the current state of the project at [Trello](https://trello.com/b/AhEZ0aLs/retro)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/ravensinth"><img src="https://avatars0.githubusercontent.com/u/1155772?v=4" width="100px;" alt=""/><br /><sub><b>ravensinth</b></sub></a><br /><a href="https://github.com/yduman/retro/commits?author=ravensinth" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/tobim-dev"><img src="https://avatars3.githubusercontent.com/u/15176413?v=4" width="100px;" alt=""/><br /><sub><b>Tobias</b></sub></a><br /><a href="https://github.com/yduman/retro/commits?author=tobim-dev" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/PaulaBre"><img src="https://avatars2.githubusercontent.com/u/65403162?v=4" width="100px;" alt=""/><br /><sub><b>PaulaBre</b></sub></a><br /><a href="https://github.com/yduman/retro/commits?author=PaulaBre" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ClaasBusemann"><img src="https://avatars2.githubusercontent.com/u/65392929?v=4" width="100px;" alt=""/><br /><sub><b>Claas Busemann</b></sub></a><br /><a href="https://github.com/yduman/retro/commits?author=ClaasBusemann" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mrpatpat"><img src="https://avatars2.githubusercontent.com/u/2622069?v=4" width="100px;" alt=""/><br /><sub><b>Adrian Endrich</b></sub></a><br /><a href="https://github.com/yduman/retro/commits?author=mrpatpat" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!