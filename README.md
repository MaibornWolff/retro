# Retro - Make Retrospectives Great Again


![CircleCI branch](https://img.shields.io/circleci/project/github/yduman/retro/master.svg?style=for-the-badge) ![GitHub](https://img.shields.io/github/license/yduman/retro.svg?style=for-the-badge)

Retro is a tool you can use for your retrospectives. The goal of Retro is to have a good UX within distributed teams.

**⚠️ UNDER DEVELOPMENT - MVP RELEASE SOON ⚠️**

## Usage

### Install Dependencies

```bash
$ cd backend && yarn && cd ..
$ cd frontend && yarn && cd ..
```

### Run Servers

```bash
$ cd backend && yarn start
$ cd frontend && yarn start
```

After starting the servers visit `localhost:3000` to use the app.

### Board Data

The board data lives inside `backend/storage`. All boards have a unique ID and are saved as `<board_id>.json`.

## Contributing

- Please use Yarn instead of NPM. You can install Yarn [here](https://yarnpkg.com/en/).
- The CI checks formatting and tests. Make sure to run `yarn format` and `yarn test`.
