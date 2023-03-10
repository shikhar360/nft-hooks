# How to use the useMintNft hook

Start by

``npm i @shikhar360/nft-hooks``

---------------------------------------------------------------------------------
### useGetAllNfts


```javascript
//Step 1
import {useGelAllNfts} from '@shikhar360/nft-hooks'

//Step 2
const data = await useGetAllNfts('0x24425365yourWalletAddressBroo...')
    console.log(data);
```

Supported chains : Ethereum , Polygon , BinanceSmartChain



---------------------------------------------------------------------------------
### useMintNft

```javascript

//You have to pass the following as a prop to the useNftMint function

 const options : MintingProps = {
        token: process.env.NEXT_YOUR_TOKEN,
        file: file, // this should be a BLOB
        nftName: "ChintuTesting",  // The name of the nft that you want to set
        nftDescription: "this is a test nft", //description of the nft
        mintToAddress: "0xa2BFmyEthereumAddressd67F31", 
        contractName : "dnews" // the name of the NFT-Product contract 
      }
  
const data  =  useMintNft( options )

```
#### How it works:

1. useMintNft uploads the data to the IPFS and return the response (IPFS_URL)

2. Then the IPFS_URL goes for the metadating and it returns the METADATA_URI

3. After getting the METADATA_URI it runs the normal easy minting function

#### The error I am getting
```
nft-hooks.esm.js?a0c7:365          POST https://api.nftport.xyz/v0/files 400

nft-hooks.esm.js?a0c7:368 undefined

nft-hooks.esm.js?a0c7:374 Metadating starts................................................

nft-hooks.esm.js?a0c7:379 finding contract................................................

nft-hooks.esm.js?a0c7:488 {name: 'dnews', symbol: 'DNS', transaction_hash: '0xe0646453401881896290d7cc6a70152d034d73e4b759c225b343a05ff95a1f7c', transaction_external_url: 'https://polygonscan.com/tx/0xe0646453401881896290d7cc6a70152d034d73e4b759c225b343a05ff95a1f7c', chain: 'polygon', …}

nft-hooks.esm.js?a0c7:384 MInting starts................................................

nft-hooks.esm.js?a0c7:449          POST https://api.nftport.xyz/v0/mints/customizable 429

-- StatusCode 429
-- Too many requests

```
I have checked the Blob file it is OK 
Dont know where I am getting the error


___________________________________________________________________________________________________
___________________________________________________________________________________________________
___________________________________________________________________________________________________
___________________________________________________________________________________________________
___________________________________________________________________________________________________
___________________________________________________________________________________________________ 
 
# How to get started with the files

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run the example inside another:

```bash
cd example
npm i # or yarn to install dependencies
npm start # or yarn start
```

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above. **No symlinking required**, we use [Parcel's aliasing](https://parceljs.org/module_resolution.html#aliases).

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

### Bundle analysis

Calculates the real cost of your library using [size-limit](https://github.com/ai/size-limit) with `npm run size` and visulize it with `npm run analyze`.

#### Setup Files

This is the folder structure we set up for you:

```txt
/example
  index.html
  index.tsx       # test your component here in a demo app
  package.json
  tsconfig.json
/src
  index.tsx       # EDIT THIS
/test
  blah.test.tsx   # EDIT THIS
.gitignore
package.json
README.md         # EDIT THIS
tsconfig.json
```

#### React Testing Library

We do not set up `react-testing-library` for you yet, we welcome contributions and documentation on this.

### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [`size-limit`](https://github.com/ai/size-limit)

## Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```

You can also choose to install and use [invariant](https://github.com/palmerhq/tsdx#invariant) and [warning](https://github.com/palmerhq/tsdx#warning) functions.

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Deploying the Example Playground

The Playground is just a simple [Parcel](https://parceljs.org) app, you can deploy it anywhere you would normally deploy that. Here are some guidelines for **manually** deploying with the Netlify CLI (`npm i -g netlify-cli`):

```bash
cd example # if not already in the example folder
npm run build # builds to dist
netlify deploy # deploy the dist folder
```

Alternatively, if you already have a git repo connected, you can set up continuous deployment with Netlify:

```bash
netlify init
# build command: yarn build && cd example && yarn && yarn build
# directory to deploy: example/dist
# pick yes for netlify.toml
```

## Named Exports

Per Palmer Group guidelines, [always use named exports.](https://github.com/palmerhq/typescript#exports) Code split inside your React app instead of your React library.

## Including Styles

There are many ways to ship styles, including with CSS-in-JS. TSDX has no opinion on this, configure how you like.

For vanilla CSS, you can include it at the root directory and add it to the `files` section in your `package.json`, so that it can be imported separately by your users and run through their bundler's loader.

## Publishing to NPM

We recommend using [np](https://github.com/sindresorhus/np).

## Usage with Lerna

When creating a new package with TSDX within a project set up with Lerna, you might encounter a `Cannot resolve dependency` error when trying to run the `example` project. To fix that you will need to make changes to the `package.json` file _inside the `example` directory_.

The problem is that due to the nature of how dependencies are installed in Lerna projects, the aliases in the example project's `package.json` might not point to the right place, as those dependencies might have been installed in the root of your Lerna project.

Change the `alias` to point to where those packages are actually installed. This depends on the directory structure of your Lerna project, so the actual path might be different from the diff below.

```diff
   "alias": {
-    "react": "../node_modules/react",
-    "react-dom": "../node_modules/react-dom"
+    "react": "../../../node_modules/react",
+    "react-dom": "../../../node_modules/react-dom"
   },
```

An alternative to fixing this problem would be to remove aliases altogether and define the dependencies referenced as aliases as dev dependencies instead. [However, that might cause other problems.](https://github.com/palmerhq/tsdx/issues/64)
