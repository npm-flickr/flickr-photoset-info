const async = require('async')

module.exports = function (flickrSetId, options, callback) {
  const flickr = require('flickr-client')(options)
  flickr.info = require('flickr-photo-info')(flickr)

  flickr('photosets.getPhotos', {photoset_id: flickrSetId}, function (err, response) {
    if (err) return callback(err)
    const ids = response.photoset.photo.map(function (p) { return p.id })
    async.map(ids, flickr.info, callback)
  })
}
