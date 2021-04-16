// ****************************************************
// to AsyncAPI document (incomplete)
// ****************************************************

const YAML = require("yamljs");

const { metadata_title, metadata_name, metadata_root } = require('../util/alps-predicates')

module.exports = (doc, options) => {
  
  let protobuf = {
    async: "2.0.0",
    id: doc.alps.id,
    
    info: {
      title: doc.alps.ext && doc.alps.ext.filter(metadata_title)[0].value || "ALPS API",
      description: doc.alps.doc && doc.alps.doc.value || `Generated from ALPS file ${options.file}`,
      version: '1.0.0',
      baseTopic: doc.alps.ext && doc.alps.ext.filter(metadata_name)[0].value || "",
      host: doc.alps.ext && doc.alps.ext.filter(metadata_root)[0].value || "http://localhost:8888/root",
      schemes: [ 'amqp', 'mqtt'],
    },

//TODO    topic:
  };

  return YAML.stringify(protobuf, 10, 2);

//TODO signature
//  rtn += '?? *******************************************************************\n';
//  rtn += `?? generated by "unified" from ${options.file}\n`;
//  rtn += `?? date: ${new Date()}`;
//  rtn += '\n';
//  rtn += '?? http://github.com/mamund/2020-11-unified\n';
//  rtn += '?? *******************************************************************\n';
//  rtn += '\n';  
}