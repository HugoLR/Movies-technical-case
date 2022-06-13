# Movies app

Single page application to list and add movies to watchlist, sorted by score average.

## Features

- ⚡️ Lightning fast HMR and builds thanks to [Vite](https://vitejs.dev/)
- ⌨️ Type safety using [TypeScript](https://www.typescriptlang.org/) in strict mode
- 🃏 Testing support with [Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)
- 🌈 [Prettier](https://prettier.io/) for consistent code style
- 📋 Standarized "best practices" extended from [Airbnb ESLint config](https://www.npmjs.com/package/eslint-config-airbnb)
- 🪝 Code quality assurance thanks to [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- 📐 Suit CSS for classes [naming](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md) convention
- ✂ Component-Scoped Styles with CSS Modules
- 📱 Mobile first approach

### Components structure

The UI components are separated into folders based on [Brad Frost's Atomic Design Principles](https://bradfrost.com/blog/post/atomic-web-design/).

## Developing

Install the dependencies with yarn:

```sh
$ yarn
```

Create a `env.local` file in the root, and add

```sh
VITE_API_URL = https://api.themoviedb.org/3
VITE_API_KEY = 0594315a054588e77c7b630046053929
```

Start the vite dev server:

```sh
$ yarn dev
```

## Testing

Run unit tests by running this command

```sh
$ yarn run test
```
