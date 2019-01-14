# Apollo recipes
An GraphQL API using:

- [`express`](https://npm.im/express)
- [`apollo-server-express`](https://npm.im/apollo-server-express)
- [`graphql`](https://npm.im/graphql)

An Client using:

- [`apollo-client`](https://npm.im/apollo-client)
- [`react`](https://npm.im/react)

## Setup

1.  Install the latest [Node.js](https://nodejs.org) and [npm](https://npmjs.com).
2.  Duplicate `.env.example` as `.env` and configure in `./` and `./client` directories.
3.  Run `npm install` in the `./` directory with Terminal.
4.  Run `npm install` in the `./client` directory with Terminal.
5.  Run `npm run dev` in the `./` directory

## Attention (.env files)

1. API_URI in `./` directory must be === API_URI in `./client` directory
2. CLIENT_PORT in `./client` directory must be include in FRONT_CORS `./` directory

## Additions
1. Basic graphiql url is http://localhost:4444/graphql
2. You can create new users and add to them an unlimited number of recipes.
3. You can signin width username `admin` and password `admin`
