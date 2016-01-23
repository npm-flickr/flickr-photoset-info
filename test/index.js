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
    var photo = photos[0]
    assert(photo)
    assert(photo.urls)
    assert(photo.urls.original)
    assert(photo.sizes.original.width)
    assert(photo.sizes.original.height)
    assert(photo.sizes.original.source)
    assert(photo.sizes.original.url)
  })

  it('returns a width and height percentages (for making fixed aspect ratios with CSS)', function () {
    var photo = photos[0]
    var w = photo.sizes.original.width
    var h = photo.sizes.original.height
    assert(photo.widthAsPercentageOfHeight)
    assert.equal(photo.widthAsPercentageOfHeight, parseInt(w / h * 100, 10))
    assert.equal(photo.heightAsPercentageOfWidth, parseInt(h / w * 100, 10))
  })

  it('can be used a CLI that writes JSON to stdout', function (done) {
    nixt()
      .run(`./cli.js ${set}`)
      .stdout(/14953767666/)
      .end(done)
  })
})
