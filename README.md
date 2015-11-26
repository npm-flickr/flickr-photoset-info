# flickr-photoset-info

Get info for all photos in a Flickr set (now called albums).

## Why?

The Flickr API's [photosets.getPhotos](https://www.flickr.com/services/api/flickr.photosets.getPhotos.html)
endpoint returns an array of photo metadata, but that metadata is lacking. The response doesn't include the actual
URLs to the photos. This package simplifies the process of getting all metadata by asynchronously fetching
metadata for every photo in the set.

## Programmatic Usage

```sh
npm install flickr-photoset-info --save
```

```js
const photoset = require('flickr-photoset-info')
const setId = '72157646234635567'

photoset(setId, {key: process.env.FLICKR_KEY}, function (err, photos) {
  if (err) throw err
  console.log(photos)
})
```

## Command Line Usage

Install the package globally.

```sh
npm i -g flickr-photoset-info
```
The first time you invoke the command, it will
tell you how to set up your Flickr API key.

Then pass it a photoset ID:

```sh
flickr-photoset-info 72157646234635567
```

The resulting JSON will be printed to STDOUT. To pipe it into a file:

```sh
flickr-photoset-info 72157646234635567 > data.json
```

## Tests

```sh
npm install
npm test
```

## Dependencies

- [async](https://github.com/caolan/async): Higher-order functions and common patterns for asynchronous code
- [dotenv](https://github.com/motdotla/dotenv): Loads environment variables from .env file
- [flickr-client](https://github.com/npm-flickr/flickr-client): Flickr API Client
- [flickr-photo-info](https://github.com/npm-flickr/flickr-photo-info): Get info of a photo on Flickr
- [userhome](https://github.com/shama/userhome): A cross-platform path to the user&#39;s home

## Dev Dependencies

- [mocha](https://github.com/mochajs/mocha): simple, flexible, fun test framework
- [nixt](https://github.com/vesln/nixt): Simple and powerful testing for command-line apps
- [standard](https://github.com/feross/standard): JavaScript Standard Style

## License

MIT
