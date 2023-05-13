# nodejs-server-template

> [Not-so-much] opinionated server template, with all the important stuff<sup>1</sup>

<sup>1</sup>: [TypeScript](https://www.typescriptlang.org), [Fastify](https://www.fastify.io/), [AVA](https://avajs.dev/), [GraphQL](https://graphql.org/), [ESLint](https://eslint.org/), [Sentry](https://sentry.io/welcome/), [nodemon](https://nodemon.io/), [dotenv](https://github.com/motdotla/dotenv), [zod](https://zod.dev), code coverage and other bits and bobs.

[![build](https://badges.iamnapo.me/ci/iamnapo/nodejs-server-template)](https://github.com/iamnapo/nodejs-server-template/actions) [![style](https://badges.iamnapo.me/style)](https://iamnapo.me)

## Use this template

- Update [`package.json`](./package.json) with your info.
- Update [`LICENSE`](./LICENSE) with your info.
- Create a `.env` file based on [`.env.sample`](./.env.sample).
- Delete this section from README and update the rest accordingly.

## Prerequisites

- node >= 20

## Install

```sh
npm ci
```

## Usage

```sh
npm run build
npm start
```

## Run tests

```sh
npm test
```

## Development

```sh
npm run dev
```
