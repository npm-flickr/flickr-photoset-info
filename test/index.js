/* globals before, describe, it */

// Set up environment variables
require('../lib/config')()

const assert = require('assert')
const photoset = require('..')
const nixt = require('nixt')
const set = '72157646234635567'
var photos

describe('flickr-photoset-info', function () {
  this.timeout(30 * 1000)

  before(function (done) {
    photoset(set, {key: process.env.FLICKR_KEY}, function (err, _photos) {
      assert(!err)
      photos = _photos
      done()
    })
  })

  it('returns an array of photo objects', function () {
    assert(Array.isArray(photos))
    assert(photos[0])
    assert(photos[0].urls)
    assert(photos[0].urls.original)
  })

  it('can be used a CLI that writes JSON to stdout', function (done) {
    nixt()
      .run(`./cli.js ${set}`)
      .stdout(/14953767666/)
      .end(done)
  })
})
