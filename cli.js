#!/usr/bin/env node

require('./lib/config')()

const photoset = require('./')
const args = process.argv.slice(2)
const flickrSetId = args[0]

if (!flickrSetId) {
  console.log('Usage:\n\n flickr-photoset <set-id>')
  process.exit(1)
}

photoset(flickrSetId, {key: process.env.FLICKR_KEY}, function (err, photos) {
  if (err) throw err
  process.stdout.write(JSON.stringify(photos, null, 2))
})
