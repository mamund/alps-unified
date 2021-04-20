

const assureArray = input => {
  return !input ? [] : (Array.isArray(input) ? input : [input]);
}

const normalizeDoc = doc => {

  if (typeof doc === 'string') {
    return { contentType: 'text/plain', value: doc };
  }
  
  if (typeof doc === 'object' && !doc.contentType) {
    return { contentType:  doc.format || 'text/plain', value: doc.value};
  }
  
  return doc;  
}

const normalizeDsc = dsc => Object.assign(dsc, 
          {
            return: dsc.return || dsc.returns || dsc.rt, 
            doc: assureArray(dsc.doc).map(normalizeDoc),
            descriptor: assureArray(dsc.descriptor).map(normalizeDsc),
            link: assureArray(dsc.link),
            ext: assureArray(dsc.ext),
            type: dsc.type || 'semantic',
          });

const canonicalizer = doc => !doc.alps ? {} : Object.assign(doc.alps, 
          {
            version: doc.alps.version || '1.0.0',
            doc: assureArray(doc.alps.doc).map(normalizeDoc),
            descriptor: assureArray(doc.alps.descriptor).map(normalizeDsc),
            link: assureArray(doc.alps.link),
            ext: assureArray(doc.alps.ext)
          });

module.exports = canonicalizer;