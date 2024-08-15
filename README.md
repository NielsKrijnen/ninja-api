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
import { NinjaClient } from "ninja-api";

const { devices } = new NinjaClient("eu", "<ACCESS-TOKEN>");

devices.get(1).then(device => {
  console.log(device)
})
```

### Types

You can use types defined in the API by importing different interfaces:

```ts
import { Devices } from "ninja-api";

const devices: Devices.DeviceDetails[] = [];
```

Currently, these interfaces are available for types:
- Backup
- Devices
- DocumentTemplates
- Main
- Management
- System
- Ticketing
- Temp

### Documentation

You can find further documentation about authentication and API routes on the [official documentation](https://eu.ninjarmm.com/apidocs/)

## Requirements

This package has no requirements and can be run on any Node.js server or JavaScript client.

## License

The ninja-api script is released under the
[MIT license](https://opensource.org/licenses/MIT).