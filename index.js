const async = require('async')
const merge = require('lodash.merge')

module.exports = function (flickrSetId, options, callback) {
  const flickr = require('flickr-client')(options)
  flickr.info = require('flickr-photo-info')(flickr)
  flickr.urls = require('flickr-photo-urls')(flickr)

  flickr('photosets.getPhotos', {photoset_id: flickrSetId}, function (err, response) {
    if (err) return callback(err)
    const ids = response.photoset.photo.map(function (p) { return p.id })
    async.map(ids, flickr.info, function (err, infos) {
      if (err) return callback(err)
      async.map(ids, flickr.urls, function (err, urls) {
        if (err) return callback(err)
        var photos = infos.map(function (info, index) {
          return merge(info, {sizes: urls[index]})
        })
        return callback(null, photos)
      })
    })
  })
}
