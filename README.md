#  ALPS Unified

Utility for converting ALPS API description documents (in YAML or JSON format) into target API definition documents (OpenAPI, SDL, Proto3, AsyncAPI, WSDL). Also converts alps YAML into alps JSON.


**NOTE**
> This utility is based on a presentation (and initial demo) here: https://github.com/mamund/2020-04-unified-api-design

### USAGE

```
-ws:~$unified -h
Usage: -f <alpsfile> -t <format type> -o <outfile>

Options:
  --help      Show help                                                [boolean]
  --version   Show version number                                      [boolean]
  -f, --file  Input file (alps.[yaml|JSON])                  [string] [required]
  -t, --type  Format Type
              ([j]son, [p]roto, [s]dl, [a]syncapi, [o]penapi, [w]sdl)   [string]
  -o, --out   Output file                                               [string]
```
### INSTALL

 * Requires NodeJS

```
npm install -g
```

