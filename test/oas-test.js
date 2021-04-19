

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const unified = require('../src/translator');

const suite = require('./suite/oas/oas-test-manifest');

describe('toOAS()', function() {

  suite.forEach(testCase => {

    var input;
    var expected;

    before(done => {
        
      fs.readFile(path.resolve(__dirname, './suite/oas/' + testCase.input), 'utf8', (e, content) => { 
    
        if (e) { throw e; }
      
        input = JSON.parse(content);

        fs.readFile(path.resolve(__dirname, './suite/oas/' + testCase.expected), 'utf8', (e, content) => { 
      
          if (e) { throw e; }
        
          expected = content;
          done();
         });    
      });
    });

    it(testCase.name, () => {
      
      const output = unified.toOAS(input, { omitHeader: true});

      assert.strictEqual(output, expected);
    });
  });
});