# nodejs-server-template

> [Not-so-much] opinionated server template, with all the important stuff<sup>1</sup>

<sup>1</sup>: [TypeScript](https://www.typescriptlang.org), [Express](https://expressjs.com/), [AVA](https://avajs.dev/), [GraphQL](https://graphql.org/), [ESLint](https://eslint.org/), [Sentry](https://sentry.io/welcome/), [nodemon](https://nodemon.io/), [dotenv](https://github.com/motdotla/dotenv), [zod](https://zod.dev), code coverage and other bits and bobs.

[![build](https://badges.iamnapo.me/ci/iamnapo/nodejs-server-template)](https://github.com/iamnapo/nodejs-server-template/actions) [![style](https://badges.iamnapo.me/style)](https://iamnapo.me)

## Use this template

- Update [`package.json`](./package.json) with your info.
- Update [`LICENSE`](./LICENSE) with your info.
- Create a `.env` file based on [`.env.sample`](./.env.sample).
- Delete this section from README and update the rest accordingly.

## Prerequisites

- node >= 22

## Install

```sh
pnpm i
```

## Usage

```sh
pnpm build
pnpm start
```

## Run tests

```sh
pnpm test
```

## Development

```sh
pnpm dev
```
