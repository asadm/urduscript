#!/usr/bin/env node

var argv = require('yargs')
  .usage('Usage: urdujs [options] file')
  .demand(1)
  .describe('t', '-t=1 will only output the transpiled js code (only works when no output file defined)')
  .alias('o', 'out-file')
  .alias('d', 'out-dir')
  .alias('t', 'transpile')
  .describe('o', 'write output to file')
  .describe('d', 'write output to directory')
  .nargs('out-file', 1)
  .nargs('out-dir', 1)
  .nargs('transpile', 1)
  .help('h')
  .alias('h', 'help')
  .argv;

var path = require('path');
var fs   = require('fs');

//console.log(__dirname + "/../src/keywords")
var urduHeadersPath = fs.realpathSync(__dirname + "/../src/keywords.js")
var urduHeaders = fs.readFileSync(urduHeadersPath, "utf8");

var compile = require('@sweet-js/core').compile;
var NodeLoader = require('@sweet-js/core/dist/node-loader').default;

let loaderOptions = {
  noBabel: argv.noBabel,
  logging: argv.outFile || argv.outDir
};

var loader = new NodeLoader(process.cwd(), loaderOptions);

argv._.forEach(function (file) {
  // first add header file in the dir.
  var fileStr = fs.realpathSync(file)
  //fs.writeFileSync(path.dirname(fileStr) + "/__urduHeaders.js", urduHeaders, 'utf8');
  //console.log("dir", path.dirname(file))
  
  var output = compile(fileStr, loader, {
    noBabel: argv.noBabel
  }).code;

  //remove the header file we added.
  //fs.unlinkSync(path.dirname(fileStr) + "/__urduHeaders.js")

  if (argv.outFile) {
    fs.writeFileSync(argv.outFile, output, 'utf8');
  } else if (argv.outDir) {
    fs.writeFileSync(path.join(argv.outDir, path.basename(file)), output, 'utf8');
  } else {
    if (!argv.transpile){
      eval(output)
    }
    else{
      console.log(output);
    }
  }
});
