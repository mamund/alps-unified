// ***************************************************
// to OpenAPI document
// passes https://apitools.dev/swagger-parser/online/
// ***************************************************

const YAML = require('yamljs');

const { groups, safe, unsafe, update, remove, metadata_title, metadata_root } = require('../util/alps-predicates')

module.exports = (doc, options) => {

  let oas = {
    openapi: '3.0.1',

    // info section    
    info: {
      title: doc.alps.ext && doc.alps.ext.filter(metadata_title)[0].value || "ALPS API",
      description: doc.alps.doc && doc.alps.doc.value || `Generated from ALPS file ${options.file}`,
      version: '1.0.0',      
    },
    
    paths: {},
  };
  
  // servers
  if (doc.alps.ext && doc.alps.ext.filter(metadata_root)) {
    oas.servers = [
      {
        url: doc.alps.ext.filter(metadata_root)[0].value,
      },
    ]
  }

  // paths
  doc.alps.descriptor
    .forEach(item => {
      
      let methods = {};
      
      // gets
      if (safe(item)) {  
        methods.get = {
          summary: item.text || item.id,
          operationId: item.id,
          responses: {
            '200': {
                description: item.id,
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        $ref: `#/components/schemas/${item.rt || item.returns}`,
                      }
                    }
                  }
                }
            }
          }
        };
      }

      // posts
      if (unsafe(item)) {  
        methods.post = {
          summary: item.text || item.id,
          operationId: item.id,
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: `#/components/schemas/${item.rt || item.returns}`,
                  }
                }
              }
            }            
          },
          responses: {
            '200': {
                description: 'add ' + item.id,
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        $ref: `#/components/schemas/${item.rt || item.returns}`,
                      }
                    }
                  }
                }
            }
          }
        };
      }

      // puts
      if (update(item)) {  
        methods.put = {
          summary: item.text || item.id,
          operationId: item.id,
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: `#/components/schemas/${item.rt || item.returns}`,
                  }
                }
              }
            }            
          },
          responses: {
            '200': {
                description: 'add ' + item.id,
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        $ref: `#/components/schemas/${item.rt || item.returns}`,
                      }
                    }
                  }
                }
            }
          }
        };
      }
      
      // deletes
      if (remove(item)) {  
        methods.delete = {
          summary: item.text || item.id,
          operationId: item.id,
          parameters: item.descriptor.map(prop => {
            return {
              name: prop.href,
              in: 'path',
              description: `${prop.href} of ${item.id}`,
              required: true,
              schema: {
                type: 'string'
              }      
            };
          }),
          responses: {
            '204': {
                description: 'delete ' + item.id,
            }
          }
        };
      }

      // if methods are not empty
      if (Object.keys(methods).length > 0) {
        oas.paths['/' + item.id] = methods;
      }
    });
    
  // components
  let schemas = {};
  
  doc.alps.descriptor
    .filter(groups)
    .forEach(item => {
      schemas[item.id] = {
        type: 'object',
        properties: {},
      };
      
      if (item.text) {
          schemas[item.id].description = item.text;
      }
      
      item.descriptor.forEach(prop => {
        console.log(item.id);
        console.log(prop);
          schemas[item.id].properties[prop.href] = {
            type: 'string',
            example: prop.href, 
          }
      });
    });
  
  // if schemas are not empty
  if (Object.keys(schemas).length > 0) {
    oas.components = { schemas: schemas };
  }
    
  return YAML.stringify(oas, 10, 2);
}
  
//TODO signature
//  rtn += '?? *******************************************************************\n';
//  rtn += `?? generated by "unified" from ${options.file}\n`;
//  rtn += `?? date: ${new Date()}`;
//  rtn += '\n';
//  rtn += '?? http://github.com/mamund/2020-11-unified\n';
//  rtn += '?? *******************************************************************\n';
//  rtn += '\n';  