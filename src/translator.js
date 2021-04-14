
module.exports = {
  toJSON: require('./translator/alps-json'), 
  toSDL: require('./translator/sdl'),
  toAsync: require('./translator/async-api'),
  toOAS: require('./translator/open-api'),
  toProto: require('./translator/proto'),
  toWSDL: require('./translator/wsdl'),  
}