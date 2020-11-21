# 2020-11-unified

Utility for converting ALPS API description documents (in YAML or JSON format) into target API definition documents (OpenAPI, SDL, Proto3, AnsyncAPI, WSDL). Also converts alps YAML into alps JSON.


This utility is based on a presentation (and initial demo) here: http://2020-04-unified-api-design

-- @mamund

```
// ****************************************************
// unified - an ALPS-to-??? translator
//
// author:  @mamund
// date:    2020-11
//
// desc:    translates ALPS.[yaml|JSON] into:
//          - ALPS.json
//          - SDL
//          - protobuf
//          - openAPI
//          - asyncAPI (todo)
//          - WSDL (todo)
//
// notes    install as npm install -g .
// ****************************************************
```

### INSTALL

 * Requires NodeJS
 * move to `/src/` folder to install

```
npm install -g
```


### USAGE

```
-ws:~$unified -h
Usage: -f <alpsfile> -t <format type> -o <outfile>

Options:
  --help      Show help                                                [boolean]
  --version   Show version number                                      [boolean]
  -f, --file  Input file (alps.yaml)                         [string] [required]
  -t, --type  Format Type
              ([j]son, [p]roto, [s]dl, [a]syncapi, [o]penapi, [w]sdl)   [string]
  -o, --out   Output file                                               [string]

Missing required argument: f
```


