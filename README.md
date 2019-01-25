# Retro - Make Retrospectives Great Again


[![Build Status](https://travis-ci.org/yduman/retro.svg?branch=master)](https://travis-ci.org/yduman/retro) [![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/yduman/retro/blob/master/LICENSE.md)

Retro is tool you can use for your retrospectives. The goal of Retro is to have a good UX within distributed teams.

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

Currently there are no tests implemented (I know). The CI currently just checks formatting handled by Prettier. Just make sure to run `yarn format` or use the Prettier extension inside of VS Code.