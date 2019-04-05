# Retro - Backend

The backend is a simple Express server using REST and WebSockets.

## Scripts

| Name         | Description                                     |
| ------------ | ----------------------------------------------- |
| start        | starts the server                               |
| test         | runs tests                                      |
| format       | formats the whole backend project with Prettier |
| format:check | checks if formatting is valid                   |

## Information

- The backend runs on port `8081` for development. Check `src/config/index.js` for more information.
- The communication happens mostly with WebSockets, but there are some REST endpoints for stuff like exporting your board, or validation stuff. 