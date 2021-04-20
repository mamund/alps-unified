
const canonicalize = require('./canonicalizer');

const toOAS = require('./translator/open-api');

module.exports = {
  toJSON: require('./translator/alps-json'), 
  toSDL: require('./translator/sdl'),
  toAsync: require('./translator/async-api'),
  toOAS: (doc, options) => toOAS(canonicalize(doc), options),
  toProto: require('./translator/proto'),
  toWSDL: require('./translator/wsdl'),  
}