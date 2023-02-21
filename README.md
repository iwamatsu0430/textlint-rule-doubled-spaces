# textlint-rule-doubled-spaces

![Node.js CI](https://github.com/iwamatsu0430/textlint-rule-doubled-spaces/actions/workflows/node.js.yml/badge.svg)
[![npm version](https://badge.fury.io/js/textlint-rule-doubled-spaces.svg)](https://badge.fury.io/js/textlint-rule-doubled-spaces)
[![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)

textlint rule for check doubled spaces in sentence.

## Example

OK:

```
Apple Pen
Pen Pineapple Apple Pen
```

NG:

```
Apple  Pen
Pen  Pineapple   Apple  Pen
```

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-doubled-spaces

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "doubled-spaces": true
    }
}
```

Via CLI

```
textlint --rule doubled-spaces README.md
```

## Options

- `allow`: `string[]`
  - word to ignore
  - default: `[]`
  - support RegExp string
    - e.g. `/RegExp/`

```
{
  allow: [
    "/RegExp/"
  ]
}
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

    npm test

## Author

- [github/iwamatsu0430](https://github.com/iwamatsu0430)

## License

MIT © iwamatsu0430
