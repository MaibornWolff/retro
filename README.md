# Retro - Make Retrospectives Great Again


![CircleCI (all branches)](https://img.shields.io/circleci/project/github/yduman/retro.svg?style=flat-square) ![GitHub](https://img.shields.io/github/license/yduman/retro.svg?style=flat-square) ![GitHub release](https://img.shields.io/github/release/yduman/retro.svg?style=flat-square) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Retro is a tool that you can use for your retrospectives. The goal of Retro is to have a good UX within distributed teams.

## Usage Locally

### Install Dependencies

```bash
$ cd backend && yarn && cd ..
$ cd frontend && yarn && cd ..
```

### Run Servers

```bash
$ cd backend && yarn start && cd ..
$ cd frontend && yarn start && cd ..
```

After starting the servers visit `localhost:3000` to use the app.

### Board Data

The board data lives currently inside `backend/storage`. All boards have a unique ID and are saved as `<board_id>.json`. The exports are saved as `<board_id>.png`.

## Intent

At work, we were using third party retrospective tools, which meant we couldn't express ourselves freely, because of privacy reasons. Retro provides on open-source solution, where you can host the app on your own servers. You can express yourself freely! You own the data!

## Contributing

- Please use Yarn instead of NPM. You can install Yarn [here](https://yarnpkg.com/en/).
- The CI checks formatting and tests. Make sure to run `yarn format` and `yarn test` on both projects.
