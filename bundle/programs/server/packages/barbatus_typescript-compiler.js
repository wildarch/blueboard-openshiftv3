(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

/* Package-scope variables */
var Logger, FileMixin, TypeScriptCompiler, TypeScript;

var require = meteorInstall({"node_modules":{"meteor":{"barbatus:typescript-compiler":{"logger.js":function(require){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/barbatus_typescript-compiler/logger.js                                                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                             //
                                                                                                                    //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                    //
                                                                                                                    //
var _createClass2 = require("babel-runtime/helpers/createClass");                                                   //
                                                                                                                    //
var _createClass3 = _interopRequireDefault(_createClass2);                                                          //
                                                                                                                    //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                   //
                                                                                                                    //
var util = Npm.require('util');                                                                                     // 1
                                                                                                                    //
var Logger_ = function () {                                                                                         //
  function Logger_() {                                                                                              // 4
    (0, _classCallCheck3.default)(this, Logger_);                                                                   // 4
    this.llevel = process.env.TYPESCRIPT_LOG;                                                                       // 5
  }                                                                                                                 // 6
                                                                                                                    //
  Logger_.prototype.newProfiler = function () {                                                                     //
    function newProfiler(name) {                                                                                    //
      var profiler = new Profiler(name);                                                                            // 9
      if (this.isProfile) profiler.start();                                                                         // 10
      return profiler;                                                                                              // 11
    }                                                                                                               // 12
                                                                                                                    //
    return newProfiler;                                                                                             //
  }();                                                                                                              //
                                                                                                                    //
  Logger_.prototype.log = function () {                                                                             //
    function log(msg) {                                                                                             //
      if (this.llevel >= 1) {                                                                                       // 27
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {   // 27
          args[_key - 1] = arguments[_key];                                                                         // 26
        }                                                                                                           // 27
                                                                                                                    //
        console.log.apply(null, [msg].concat(args));                                                                // 28
      }                                                                                                             // 29
    }                                                                                                               // 30
                                                                                                                    //
    return log;                                                                                                     //
  }();                                                                                                              //
                                                                                                                    //
  Logger_.prototype.debug = function () {                                                                           //
    function debug(msg) {                                                                                           //
      if (this.isDebug) {                                                                                           // 33
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];                                                                       // 32
        }                                                                                                           // 33
                                                                                                                    //
        this.log.apply(this, msg, args);                                                                            // 34
      }                                                                                                             // 35
    }                                                                                                               // 36
                                                                                                                    //
    return debug;                                                                                                   //
  }();                                                                                                              //
                                                                                                                    //
  Logger_.prototype.assert = function () {                                                                          //
    function assert(msg) {                                                                                          //
      if (this.isAssert) {                                                                                          // 39
        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];                                                                       // 38
        }                                                                                                           // 39
                                                                                                                    //
        this.log.apply(this, msg, args);                                                                            // 40
      }                                                                                                             // 41
    }                                                                                                               // 42
                                                                                                                    //
    return assert;                                                                                                  //
  }();                                                                                                              //
                                                                                                                    //
  (0, _createClass3.default)(Logger_, [{                                                                            //
    key: "isDebug",                                                                                                 //
    get: function () {                                                                                              //
      return this.llevel >= 2;                                                                                      // 15
    }                                                                                                               // 16
  }, {                                                                                                              //
    key: "isProfile",                                                                                               //
    get: function () {                                                                                              //
      return this.llevel >= 3;                                                                                      // 19
    }                                                                                                               // 20
  }, {                                                                                                              //
    key: "isAssert",                                                                                                //
    get: function () {                                                                                              //
      return this.llevel >= 4;                                                                                      // 23
    }                                                                                                               // 24
  }]);                                                                                                              //
  return Logger_;                                                                                                   //
}();                                                                                                                //
                                                                                                                    //
;                                                                                                                   // 43
Logger = new Logger_();                                                                                             // 45
                                                                                                                    //
var Profiler = function () {                                                                                        //
  function Profiler(name) {                                                                                         // 48
    (0, _classCallCheck3.default)(this, Profiler);                                                                  // 48
    this.name = name;                                                                                               // 49
  }                                                                                                                 // 50
                                                                                                                    //
  Profiler.prototype.start = function () {                                                                          //
    function start() {                                                                                              //
      console.log('%s started', this.name);                                                                         // 53
      console.time(util.format('%s time', this.name));                                                              // 54
      this._started = true;                                                                                         // 55
    }                                                                                                               // 56
                                                                                                                    //
    return start;                                                                                                   //
  }();                                                                                                              //
                                                                                                                    //
  Profiler.prototype.end = function () {                                                                            //
    function end() {                                                                                                //
      if (this._started) {                                                                                          // 59
        console.timeEnd(util.format('%s time', this.name));                                                         // 60
      }                                                                                                             // 61
    }                                                                                                               // 62
                                                                                                                    //
    return end;                                                                                                     //
  }();                                                                                                              //
                                                                                                                    //
  return Profiler;                                                                                                  //
}();                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"file-mixin.js":function(require){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/barbatus_typescript-compiler/file-mixin.js                                                              //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var createHash = Npm.require('crypto').createHash;                                                                  // 1
                                                                                                                    //
FileMixin = {                                                                                                       // 3
  getShortArch: function () {                                                                                       // 4
    var arch = this.getArch();                                                                                      // 5
    return (/^web/.test(arch) ? 'web' : 'os'                                                                        // 6
    );                                                                                                              // 6
  },                                                                                                                // 7
  warn: function (error) {                                                                                          // 9
    console.log(error.sourcePath + " (" + error.line + ", " + error.column + "): " + error.message);                // 10
  },                                                                                                                // 11
  isBare: function () {                                                                                             // 13
    var fileOptions = this.getFileOptions();                                                                        // 14
    return fileOptions && fileOptions.bare;                                                                         // 15
  },                                                                                                                // 16
  // Get root app config.                                                                                           // 18
  isConfig: function () {                                                                                           // 19
    return this.getPathInPackage() === 'tsconfig.json';                                                             // 20
  },                                                                                                                // 21
  isDeclaration: function () {                                                                                      // 23
    return TypeScript.isDeclarationFile(this.getBasename());                                                        // 24
  },                                                                                                                // 25
  // Get path with package prefix if any.                                                                           // 27
  getPackagePrefixPath: function () {                                                                               // 28
    var packageName = this.getPackageName();                                                                        // 29
    packageName = packageName ? packageName.replace(':', '_') + '/' : '';                                           // 30
    var inputFilePath = this.getPathInPackage();                                                                    // 32
    return packageName + inputFilePath;                                                                             // 33
  },                                                                                                                // 34
  getES6ModuleName: function () {                                                                                   // 36
    var packaged = this.getPackagePrefixPath();                                                                     // 37
    return TypeScript.removeTsExt(packaged);                                                                        // 38
  }                                                                                                                 // 39
};                                                                                                                  // 3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"typescript-compiler.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/barbatus_typescript-compiler/typescript-compiler.js                                                     //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                             //
                                                                                                                    //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                    //
                                                                                                                    //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                   //
                                                                                                                    //
var async = Npm.require('async');                                                                                   // 1
                                                                                                                    //
var Future = Npm.require('fibers/future');                                                                          // 2
                                                                                                                    //
var minimatch = Npm.require('minimatch');                                                                           // 3
                                                                                                                    //
var TSBuild = Npm.require('meteor-typescript').TSBuild;                                                             // 4
                                                                                                                    //
var createHash = Npm.require('crypto').createHash;                                                                  // 5
                                                                                                                    //
var path = Npm.require('path');                                                                                     // 6
                                                                                                                    //
TypeScriptCompiler = function () {                                                                                  // 8
  function TypeScriptCompiler(extraOptions, maxParallelism) {                                                       // 9
    (0, _classCallCheck3.default)(this, TypeScriptCompiler);                                                        // 9
    TypeScript.validateExtraOptions(extraOptions);                                                                  // 10
    this.extraOptions = extraOptions;                                                                               // 12
    this.maxParallelism = maxParallelism || 10;                                                                     // 13
    this.tsconfig = TypeScript.getDefaultOptions();                                                                 // 14
    this.defExclude = ['**/node_modules/**'];                                                                       // 15
    this.tsconfig.exclude = this.defExclude;                                                                        // 16
    this.cfgHash = null;                                                                                            // 17
    this.diagHash = new Set();                                                                                      // 18
    this.archSet = new Set();                                                                                       // 19
  }                                                                                                                 // 20
                                                                                                                    //
  TypeScriptCompiler.prototype.processFilesForTarget = function () {                                                // 8
    function processFilesForTarget(inputFiles) {                                                                    // 8
      var _this = this;                                                                                             // 22
                                                                                                                    //
      this.extendFiles(inputFiles); // If tsconfig.json has changed, create new one.                                // 23
                                                                                                                    //
      this.processConfig(inputFiles);                                                                               // 26
      inputFiles = this.excludeFiles(inputFiles);                                                                   // 28
      if (!inputFiles.length) return;                                                                               // 30
      var filesMap = new Map();                                                                                     // 32
      inputFiles.forEach(function (inputFile, index) {                                                              // 33
        filesMap.set(_this.getExtendedPath(inputFile), index);                                                      // 34
      });                                                                                                           // 35
                                                                                                                    //
      var getFileContent = function (filePath) {                                                                    // 37
        var index = filesMap.get(filePath);                                                                         // 38
        return index !== undefined ? inputFiles[index].getContentsAsString() : null;                                // 39
      }; // Assemble options.                                                                                       // 41
                                                                                                                    //
                                                                                                                    //
      var typings = this.tsconfig.typings;                                                                          // 44
      var compilerOptions = this.tsconfig.compilerOptions;                                                          // 45
      compilerOptions = TypeScript.getCompilerOptions(compilerOptions, this.extraOptions);                          // 46
      var useCache = this.tsconfig.useCache;                                                                        // 48
      var buildOptions = {                                                                                          // 49
        compilerOptions: compilerOptions,                                                                           // 49
        typings: typings,                                                                                           // 49
        useCache: useCache                                                                                          // 49
      };                                                                                                            // 49
      var pcompile = Logger.newProfiler('compilation');                                                             // 51
      var arch = inputFiles[0].getArch();                                                                           // 52
      var archFiles = this.filterArchFiles(inputFiles, arch);                                                       // 53
      var filePaths = archFiles.map(function (inputFile) {                                                          // 54
        return _this.getExtendedPath(inputFile);                                                                    // 54
      });                                                                                                           // 54
      Logger.log('process files: %s', filePaths);                                                                   // 55
      buildOptions.arch = arch;                                                                                     // 56
      var pbuild = Logger.newProfiler('tsBuild');                                                                   // 57
      var tsBuild = new TSBuild(filePaths, getFileContent, buildOptions);                                           // 58
      pbuild.end();                                                                                                 // 59
      var pfiles = Logger.newProfiler('tsEmitFiles');                                                               // 61
      var future = new Future(); // Don't emit typings.                                                             // 62
                                                                                                                    //
      archFiles = archFiles.filter(function (inputFile) {                                                           // 64
        return !inputFile.isDeclaration();                                                                          // 64
      });                                                                                                           // 64
      async.eachLimit(archFiles, this.maxParallelism, function (inputFile, cb) {                                    // 65
        var co = compilerOptions;                                                                                   // 66
        var source = inputFile.getContentsAsString();                                                               // 67
        var inputFilePath = inputFile.getPathInPackage();                                                           // 68
        var outputFilePath = TypeScript.removeTsExt(inputFilePath) + '.js';                                         // 69
        var toBeAdded = {                                                                                           // 70
          sourcePath: inputFilePath,                                                                                // 71
          path: outputFilePath,                                                                                     // 72
          data: source,                                                                                             // 73
          hash: inputFile.getSourceHash(),                                                                          // 74
          sourceMap: null,                                                                                          // 75
          bare: inputFile.isBare()                                                                                  // 76
        };                                                                                                          // 70
                                                                                                                    //
        var filePath = _this.getExtendedPath(inputFile);                                                            // 79
                                                                                                                    //
        var moduleName = _this.getFileModuleName(inputFile, co);                                                    // 80
                                                                                                                    //
        var pemit = Logger.newProfiler('tsEmit');                                                                   // 82
        var result = tsBuild.emit(filePath, moduleName);                                                            // 83
                                                                                                                    //
        var throwSyntax = _this.processDiagnostics(inputFile, result.diagnostics, co);                              // 84
                                                                                                                    //
        pemit.end();                                                                                                // 86
                                                                                                                    //
        if (!throwSyntax) {                                                                                         // 88
          toBeAdded.data = result.code;                                                                             // 89
          var module = compilerOptions.module;                                                                      // 90
          toBeAdded.bare = toBeAdded.bare || module === 'none';                                                     // 91
          toBeAdded.hash = result.hash;                                                                             // 92
          toBeAdded.sourceMap = result.sourceMap;                                                                   // 93
          inputFile.addJavaScript(toBeAdded);                                                                       // 94
        }                                                                                                           // 95
                                                                                                                    //
        cb();                                                                                                       // 97
      }, future.resolver());                                                                                        // 98
      pfiles.end();                                                                                                 // 100
      future.wait();                                                                                                // 102
      pcompile.end();                                                                                               // 104
    }                                                                                                               // 105
                                                                                                                    //
    return processFilesForTarget;                                                                                   // 8
  }();                                                                                                              // 8
                                                                                                                    //
  TypeScriptCompiler.prototype.extendFiles = function () {                                                          // 8
    function extendFiles(inputFiles, mixins) {                                                                      // 8
      mixins = _.extend({}, FileMixin, mixins);                                                                     // 108
      inputFiles.forEach(function (inputFile) {                                                                     // 109
        return _.defaults(inputFile, mixins);                                                                       // 109
      });                                                                                                           // 109
    }                                                                                                               // 110
                                                                                                                    //
    return extendFiles;                                                                                             // 8
  }();                                                                                                              // 8
                                                                                                                    //
  TypeScriptCompiler.prototype.processDiagnostics = function () {                                                   // 8
    function processDiagnostics(inputFile, diagnostics, compilerOptions) {                                          // 8
      var _this2 = this;                                                                                            // 112
                                                                                                                    //
      // Remove duplicated warnings for shared files                                                                // 113
      // by saving hashes of already shown warnings.                                                                // 114
      var reduce = function (diagnostic, cb) {                                                                      // 115
        var dob = {                                                                                                 // 116
          message: diagnostic.message,                                                                              // 117
          sourcePath: _this2.getExtendedPath(inputFile),                                                            // 118
          line: diagnostic.line,                                                                                    // 119
          column: diagnostic.column                                                                                 // 120
        };                                                                                                          // 116
        var arch = inputFile.getArch(); // TODO: find out how to get list of architectures.                         // 122
                                                                                                                    //
        _this2.archSet.add(arch);                                                                                   // 124
                                                                                                                    //
        var shown = false;                                                                                          // 126
                                                                                                                    //
        for (var _iterator = _this2.archSet.keys(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;                                                                                                 // 127
                                                                                                                    //
          if (_isArray) {                                                                                           // 127
            if (_i >= _iterator.length) break;                                                                      // 127
            _ref = _iterator[_i++];                                                                                 // 127
          } else {                                                                                                  // 127
            _i = _iterator.next();                                                                                  // 127
            if (_i.done) break;                                                                                     // 127
            _ref = _i.value;                                                                                        // 127
          }                                                                                                         // 127
                                                                                                                    //
          var key = _ref;                                                                                           // 127
                                                                                                                    //
          if (key !== arch) {                                                                                       // 128
            dob.arch = key;                                                                                         // 129
                                                                                                                    //
            var _hash = _this2.getShallowHash(dob);                                                                 // 130
                                                                                                                    //
            if (_this2.diagHash.has(_hash)) {                                                                       // 131
              shown = true;                                                                                         // 132
              break;                                                                                                // 132
            }                                                                                                       // 133
          }                                                                                                         // 134
        }                                                                                                           // 135
                                                                                                                    //
        if (!shown) {                                                                                               // 136
          dob.arch = arch;                                                                                          // 137
                                                                                                                    //
          var hash = _this2.getShallowHash(dob);                                                                    // 138
                                                                                                                    //
          _this2.diagHash.add(hash);                                                                                // 139
                                                                                                                    //
          cb(dob);                                                                                                  // 140
        }                                                                                                           // 141
      }; // Always throw syntax errors.                                                                             // 142
                                                                                                                    //
                                                                                                                    //
      var throwSyntax = !!diagnostics.syntacticErrors.length;                                                       // 145
      diagnostics.syntacticErrors.forEach(function (diagnostic) {                                                   // 146
        reduce(diagnostic, function (dob) {                                                                         // 147
          return inputFile.error(dob);                                                                              // 147
        });                                                                                                         // 147
      });                                                                                                           // 148
      var packageName = inputFile.getPackageName();                                                                 // 150
      if (packageName) return throwSyntax; // And log out other errors except package files.                        // 151
                                                                                                                    //
      if (compilerOptions && compilerOptions.diagnostics) {                                                         // 154
        diagnostics.semanticErrors.forEach(function (diagnostic) {                                                  // 155
          reduce(diagnostic, function (dob) {                                                                       // 156
            return inputFile.warn(dob);                                                                             // 156
          });                                                                                                       // 156
        });                                                                                                         // 157
      }                                                                                                             // 158
                                                                                                                    //
      return throwSyntax;                                                                                           // 160
    }                                                                                                               // 161
                                                                                                                    //
    return processDiagnostics;                                                                                      // 8
  }();                                                                                                              // 8
                                                                                                                    //
  TypeScriptCompiler.prototype.getShallowHash = function () {                                                       // 8
    function getShallowHash(ob) {                                                                                   // 8
      var hash = createHash('sha1');                                                                                // 164
      var keys = Object.keys(ob);                                                                                   // 165
      keys.sort();                                                                                                  // 166
      keys.forEach(function (key) {                                                                                 // 168
        hash.update(key).update('' + ob[key]);                                                                      // 169
      });                                                                                                           // 170
      return hash.digest('hex');                                                                                    // 172
    }                                                                                                               // 173
                                                                                                                    //
    return getShallowHash;                                                                                          // 8
  }();                                                                                                              // 8
                                                                                                                    //
  TypeScriptCompiler.prototype.getExtendedPath = function () {                                                      // 8
    function getExtendedPath(inputFile) {                                                                           // 8
      var packageName = inputFile.getPackageName();                                                                 // 176
      var packagedPath = inputFile.getPackagePrefixPath();                                                          // 177
      var filePath = packageName ? 'packages/' + packagedPath : packagedPath;                                       // 179
      return filePath;                                                                                              // 182
    }                                                                                                               // 183
                                                                                                                    //
    return getExtendedPath;                                                                                         // 8
  }();                                                                                                              // 8
                                                                                                                    //
  TypeScriptCompiler.prototype.getFileModuleName = function () {                                                    // 8
    function getFileModuleName(inputFile, options) {                                                                // 8
      if (options.module === 'none') return null;                                                                   // 186
      return inputFile.getES6ModuleName();                                                                          // 188
    }                                                                                                               // 189
                                                                                                                    //
    return getFileModuleName;                                                                                       // 8
  }();                                                                                                              // 8
                                                                                                                    //
  TypeScriptCompiler.prototype.processConfig = function () {                                                        // 8
    function processConfig(inputFiles) {                                                                            // 8
      var cfgFile = inputFiles.filter(function (inputFile) {                                                        // 192
        return inputFile.isConfig();                                                                                // 193
      })[0];                                                                                                        // 193
                                                                                                                    //
      if (cfgFile) {                                                                                                // 194
        var source = cfgFile.getContentsAsString();                                                                 // 195
        var hash = cfgFile.getSourceHash(); // If hashes differ, create new tsconfig.                               // 196
                                                                                                                    //
        if (hash !== this.cfgHash) {                                                                                // 198
          this.tsconfig = this.parseConfig(source);                                                                 // 199
          this.cfgHash = hash;                                                                                      // 200
        }                                                                                                           // 201
      }                                                                                                             // 202
    }                                                                                                               // 203
                                                                                                                    //
    return processConfig;                                                                                           // 8
  }();                                                                                                              // 8
                                                                                                                    //
  TypeScriptCompiler.prototype.parseConfig = function () {                                                          // 8
    function parseConfig(cfgContent) {                                                                              // 8
      try {                                                                                                         // 206
        var tsconfig = JSON.parse(cfgContent);                                                                      // 207
        var files = tsconfig.files || [];                                                                           // 209
                                                                                                                    //
        if (!_.isArray(files)) {                                                                                    // 210
          throw new Error('[tsconfig]: files is not array');                                                        // 211
        } // Allow only typings in the "files" array.                                                               // 212
                                                                                                                    //
                                                                                                                    //
        tsconfig.typings = this.getTypings(files);                                                                  // 214
        var exclude = tsconfig.exclude || [];                                                                       // 216
                                                                                                                    //
        if (!_.isArray(exclude)) {                                                                                  // 217
          throw new Error('[tsconfig]: exclude is not array');                                                      // 218
        }                                                                                                           // 219
                                                                                                                    //
        exclude = exclude.filter(function (ex) {                                                                    // 221
          return !!ex;                                                                                              // 221
        });                                                                                                         // 221
        exclude.forEach(function (ex, ind) {                                                                        // 222
          if (ex.indexOf('.') >= 0 || ex.endsWith('*')) return;                                                     // 223
          exclude[ind] = path.join(ex, '*');                                                                        // 224
        });                                                                                                         // 225
        tsconfig.exclude = exclude.concat(this.defExclude);                                                         // 226
        return tsconfig;                                                                                            // 228
      } catch (err) {                                                                                               // 229
        throw new Error("Format of the tsconfig is invalid: " + err);                                               // 230
      }                                                                                                             // 231
    }                                                                                                               // 232
                                                                                                                    //
    return parseConfig;                                                                                             // 8
  }();                                                                                                              // 8
                                                                                                                    //
  TypeScriptCompiler.prototype.excludeFiles = function () {                                                         // 8
    function excludeFiles(inputFiles) {                                                                             // 8
      var resultFiles = inputFiles;                                                                                 // 235
      var pexclude = Logger.newProfiler('exclude');                                                                 // 237
                                                                                                                    //
      var _loop = function (ex) {                                                                                   // 234
        resultFiles = resultFiles.filter(function (inputFile) {                                                     // 239
          var path = inputFile.getPathInPackage();                                                                  // 240
          Logger.assert('exclude pattern %s: %s', ex, path);                                                        // 241
          return !minimatch(path, ex);                                                                              // 242
        });                                                                                                         // 243
      };                                                                                                            // 234
                                                                                                                    //
      for (var _iterator2 = this.tsconfig.exclude, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;                                                                                                  // 238
                                                                                                                    //
        if (_isArray2) {                                                                                            // 238
          if (_i2 >= _iterator2.length) break;                                                                      // 238
          _ref2 = _iterator2[_i2++];                                                                                // 238
        } else {                                                                                                    // 238
          _i2 = _iterator2.next();                                                                                  // 238
          if (_i2.done) break;                                                                                      // 238
          _ref2 = _i2.value;                                                                                        // 238
        }                                                                                                           // 238
                                                                                                                    //
        var ex = _ref2;                                                                                             // 238
                                                                                                                    //
        _loop(ex);                                                                                                  // 238
      }                                                                                                             // 244
                                                                                                                    //
      pexclude.end();                                                                                               // 245
      return resultFiles;                                                                                           // 247
    }                                                                                                               // 248
                                                                                                                    //
    return excludeFiles;                                                                                            // 8
  }();                                                                                                              // 8
                                                                                                                    //
  TypeScriptCompiler.prototype.filterArchFiles = function () {                                                      // 8
    function filterArchFiles(inputFiles, arch) {                                                                    // 8
      var archFiles = inputFiles.filter(function (inputFile, index) {                                               // 251
        if (inputFile.isConfig()) return false;                                                                     // 252
        return inputFile.getArch() === arch;                                                                        // 254
      }); // Include only typings that current arch needs,                                                          // 255
      // typings/main is for the server only and                                                                    // 258
      // typings/browser - for the client.                                                                          // 259
                                                                                                                    //
      var excludes = arch.startsWith('web') ? ['typings/main/**', 'typings/main.d.ts'] : ['typings/browser/**', 'typings/browser.d.ts'];
                                                                                                                    //
      var _loop2 = function (ex) {                                                                                  // 250
        archFiles = archFiles.filter(function (inputFile) {                                                         // 265
          var path = inputFile.getPathInPackage();                                                                  // 266
          return !minimatch(path, ex);                                                                              // 267
        });                                                                                                         // 268
      };                                                                                                            // 250
                                                                                                                    //
      for (var _iterator3 = excludes, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;                                                                                                  // 264
                                                                                                                    //
        if (_isArray3) {                                                                                            // 264
          if (_i3 >= _iterator3.length) break;                                                                      // 264
          _ref3 = _iterator3[_i3++];                                                                                // 264
        } else {                                                                                                    // 264
          _i3 = _iterator3.next();                                                                                  // 264
          if (_i3.done) break;                                                                                      // 264
          _ref3 = _i3.value;                                                                                        // 264
        }                                                                                                           // 264
                                                                                                                    //
        var ex = _ref3;                                                                                             // 264
                                                                                                                    //
        _loop2(ex);                                                                                                 // 264
      }                                                                                                             // 269
                                                                                                                    //
      return archFiles;                                                                                             // 271
    }                                                                                                               // 272
                                                                                                                    //
    return filterArchFiles;                                                                                         // 8
  }();                                                                                                              // 8
                                                                                                                    //
  TypeScriptCompiler.prototype.getTypings = function () {                                                           // 8
    function getTypings(filePaths) {                                                                                // 8
      check(filePaths, Array);                                                                                      // 275
      return filePaths.filter(function (filePath) {                                                                 // 277
        return TypeScript.isDeclarationFile(filePath);                                                              // 278
      });                                                                                                           // 279
    }                                                                                                               // 280
                                                                                                                    //
    return getTypings;                                                                                              // 8
  }();                                                                                                              // 8
                                                                                                                    //
  return TypeScriptCompiler;                                                                                        // 8
}();                                                                                                                // 8
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"typescript.js":function(require){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/barbatus_typescript-compiler/typescript.js                                                              //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var meteorTS = Npm.require('meteor-typescript');                                                                    // 1
                                                                                                                    //
TypeScript = {                                                                                                      // 3
  validateOptions: function (options) {                                                                             // 4
    if (!options) return;                                                                                           // 5
    meteorTS.validateAndConvertOptions(options);                                                                    // 7
  },                                                                                                                // 8
  // Extra options are the same compiler options                                                                    // 10
  // but passed in the compiler constructor.                                                                        // 11
  validateExtraOptions: function (options) {                                                                        // 12
    if (!options) return;                                                                                           // 13
    meteorTS.validateAndConvertOptions({                                                                            // 15
      compilerOptions: options                                                                                      // 16
    });                                                                                                             // 15
  },                                                                                                                // 18
  getDefaultOptions: meteorTS.getDefaultOptions,                                                                    // 20
  getCompilerOptions: function (compilerOptions, extraOptions) {                                                    // 22
    var dco = meteorTS.getDefaultOptions().compilerOptions;                                                         // 23
    var resultOptions = compilerOptions ? _.clone(compilerOptions) : dco; // First, default undefined values, e.g.,
    // if diagnostics undefined, set it to true, etc.                                                               // 27
                                                                                                                    //
    _.defaults(resultOptions, dco); // Second, apply extra options, i.e.,                                           // 28
    // options passed in the compiler constructor.                                                                  // 31
                                                                                                                    //
                                                                                                                    //
    _.extend(resultOptions, extraOptions);                                                                          // 32
                                                                                                                    //
    return resultOptions;                                                                                           // 34
  },                                                                                                                // 35
  compile: function (source, options) {                                                                             // 37
    options = options || meteorTS.getDefaultOptions();                                                              // 38
    return meteorTS.compile(source, options);                                                                       // 39
  },                                                                                                                // 40
  setCacheDir: function (cacheDir) {                                                                                // 42
    meteorTS.setCacheDir(cacheDir);                                                                                 // 43
  },                                                                                                                // 44
  isDeclarationFile: function (filePath) {                                                                          // 46
    return filePath.match(/^.*\.d\.ts$/);                                                                           // 47
  },                                                                                                                // 48
  removeTsExt: function (path) {                                                                                    // 50
    return path && path.replace(/(\.tsx|\.ts)$/g, '');                                                              // 51
  }                                                                                                                 // 52
};                                                                                                                  // 3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/barbatus:typescript-compiler/logger.js");
require("./node_modules/meteor/barbatus:typescript-compiler/file-mixin.js");
require("./node_modules/meteor/barbatus:typescript-compiler/typescript-compiler.js");
require("./node_modules/meteor/barbatus:typescript-compiler/typescript.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['barbatus:typescript-compiler'] = {}, {
  TypeScript: TypeScript,
  TypeScriptCompiler: TypeScriptCompiler
});

})();

//# sourceMappingURL=barbatus_typescript-compiler.js.map
