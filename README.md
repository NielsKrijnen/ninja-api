# Ninja RMM API

## Contents

- [Description](#description)
- [Usage](#usage)
- - [Documentation](#documentation)
- [Requirements](#requirements)
- [License](#license)

## Description

Easy to use JavaScript package for fetching data from the Ninja RMM API

## Usage

Install the **ninja-api** package with [NPM](https://www.npmjs.org/):

```sh
npm install ninja-api
```

You can then use the API by importing the package, creating a client and calling a function:

```js
import { createNinjaClient } from "ninja-api";

const { devices } = createNinjaClient("eu", "<ACCESS-TOKEN>");

devices.get(1).then(device => {
  console.log(device)
})
```

### Documentation

You can find further documentation about authentication and API routes on the [official documentation](https://eu.ninjarmm.com/apidocs/)

## Requirements

This package has no requirements and can be run on any NodeJS server or JavaScript client.

## License

The ninja-api script is released under the
[MIT license](https://opensource.org/licenses/MIT).