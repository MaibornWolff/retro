# Retro - Frontend

The frontend of Retro is a React app using [create-react-app](https://github.com/facebook/create-react-app).

## Scripts

| Name            | Description                                      |
| --------------- | ------------------------------------------------ |
| start           | starts the dev server                            |
| build           | starts a build                                   |
| build:prod      | starts a prod build by reading an .env file      |
| deploy:frontend | copies built files to public folder of `backend` |
| deploy          | runs `build:prod` and `deploy:frontend`          |
| test            | runs tests                                       |
| lint            | runs ESLint                                      |
| format          | runs Prettier                                    |
| format:check    | runs Prettier check (for CI)                     |
| eject           | eject from CRA                                   |

## Information

- The frontend makes use of [Material-UI](https://github.com/mui-org/material-ui) and [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
