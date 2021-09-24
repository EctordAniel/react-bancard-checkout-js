[![npm version](https://img.shields.io/npm/v/react-bancard-checkout-js)](https://www.npmjs.com/package/react-bancard-checkout-js)
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/EctordAniel/react-bancard-checkout-js/blob/v1.0.0/LICENSE)
[![Test and publish](https://github.com/EctordAniel/react-bancard-checkout-js/actions/workflows/publish.yml/badge.svg)](https://github.com/EctordAniel/react-bancard-checkout-js/actions/workflows/publish.yml)

# React Bancard Checkout

It's a react component that loads the Bancard secure payment iFrame based on the [bancard-checkout-js 3.0.0](https://github.com/EctordAniel/bancard-connectors/tree/master/vpos/checkout/javascript) library.


## Usage/Examples

```jsx
import { BancardIframe } from "react-bancard-checkout"

function App() {
  return <BancardIframe 
    processType="Zimple"
    processId="1234"
    enviroment="Staging"
  />
}
```

  
## Props

| Name | Type     | Required     | Default     | Description                |
| :-------- | :------- | :------- | :------- | :------------------------- |
| `processId` | `string` | `false` |`undefined`| Process identifier to be used to invoke the iframe of occasional payment |
| `aliasToken` | `string` | `false` |`undefined` | It is obtained when retrieving the list of cards of a user |
| `processType` | `iFrameType` | `false` |`Checkout` | The type of process to be carried out in this operation |
| `enviroment` | `Production or Staging` | `false` | `Staging` | In what environment is the application running |
| `options.styles` | `iFrameStyles` | `false`|`undefined` | Styles for the iframe. Only HEX, HSL and RGB formats are valid |
| `options.handler` | `(data: IData) => void;` | `false`|`undefined` | You can pass a function to modify the default behavior of the component that would redirect to the return url |

## Running Tests

To run tests, run the following command

```bash
 npm run test
```
or
```bash
 yarn test
```

  