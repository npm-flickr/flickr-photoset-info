const fs = require('fs')
const userhome = require('userhome')
const dotenv = require('dotenv')
const configFile = userhome('.flickr-config')

module.exports = function () {
  // In a CI environment, this will already be set. Bail early.
  if (process.env.FLICKR_KEY) return

  if (!fs.existsSync(configFile)) {
    fs.writeFileSync(configFile, 'FLICKR_KEY=???')
    console.log(
      'Created a default Flickr config file. Please go fill in the blanks.',
      'If you need an API key, visit https://www.flickr.com/services/api',
      '\n\n$EDITOR ' + configFile
    )
    process.exit(1)
  }

  var config = dotenv.parse(fs.readFileSync(configFile))

  Object.keys(config).forEach(function (key) {
    process.env[key] = config[key]
  })

  if (!process.env.FLICKR_KEY || process.env.FLICKR_KEY === '???') {
    console.log('Please specify FLICKR_KEY in ' + configFile)
    process.exit(1)
  }
}
