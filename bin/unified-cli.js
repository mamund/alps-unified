#!/usr/bin/env node
// ****************************************************
// unified - an ALPS-to-??? translator
//
// author:  @mamund
// date:    2020-04
//
// desc:    translates ALPS.[yaml\json] into:
//          - ALPS.json
//          - SDL
//          - protobuf
//          - openAPI
//          - asyncAPI
//          - WSDL
//
// notes    install as npm install -g .
//          proof-of-concept utility (needs work)
// ****************************************************

// modules
const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");
const YAML = require("yamljs");
const fs = require('fs');

const unified = require("../src/translator")

// args
const options = yargs
 .usage("Usage: -f <alpsfile> -t <format type> -o <outfile>")
 .option("f", { alias: "file", 
    describe: "Input file (alps.[yaml|JSON]", 
    type: "string", demandOption: true })
 .option("t", { alias: "type", 
    describe: "Format Type \n([j]son, [p]roto, [s]dl, [a]syncapi, [o]penapi, [w]sdl)",
    type: "string", demandOption: false})
 .option("o", { alias: "out", 
    describe: "Output file", 
    type: "string", demandOption: false})
 .argv;

// cleanup regex
const rxHash = /#/g;
const rxQ = /\?\?/g;

// init vars
var alps_document = {};
var format = "json";
var rtn = "";

// **************************
// read incoming file
//
// first, assume incoming file is YAML
try {

  var file = `${process.cwd()}/${options.file}`;
  alps_document = YAML.load(file);
} 
catch(err) {
  // ok, assume incoming file is JSON
  try {
    var file = `${process.cwd()}/${options.file}`;
    var doc = fs.readFileSync(file);
    alps_document = JSON.parse(doc);
  }
  catch(err) {
    // not JSON, either!
    console.log(`ERROR: ${err}`);
  }
}

// selection translation
try {
  format = options.type.toLowerCase();
} 
catch {
  format = "json";
}

// process requested translation
switch (format) {
  case "s":
  case "sdl":
    rtn = unified.toSDL(alps_document, options);
    break;
  case "a":
  case "async":
  case "asyncapi":
    rtn = unified.toAsync(alps_document, options);
    break;
  case "o":   
  case "oas":
  case "open":
  case "openapi":
    rtn = unified.toOAS(alps_document, options);
    break;
  case "p":
  case "proto":
    rtn = unified.toProto(alps_document, options);
    break;
  case "j":
  case "json":
    rtn = unified.toJSON(alps_document, options);
    break;    
  case "w":
  case "wsdl":
  case "soap":
    rtn = unified.toWSDL(alps_document, options);
    break;    
  default:
    console.log(`ERROR: unknown format: ${format}`);
}

// output directly
if (options.out) {
  
  try {
    fs.writeFileSync(options.out, rtn);
    
  } catch(err) {
    console.log(`ERROR: ${err}`);
  }
  
} else {
  console.log(rtn);
}
