# Development

## Install dependencies

```
$ npm install
```

## Create .env file

Create a `.env` file and simply copy the content of `.env.template` into it.
The `.env` file should contain everything required to start the application locally.

## Run dev servers

```
$ npm run frontend:dev
$ npm run backend:dev
$ npm run signaling:dev
$ npm run watch
```

| Application | Port |
| ----------- | :--: |
| Frontend    | 3000 |
| Backend     | 3001 |
| Signaling   | 3002 |

## Testing

Create frontend tests with **playwright** and normal unit tests with **jest**. Test files should be in the same directory as the working code file.
