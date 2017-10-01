(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var WebApp = Package.webapp.WebApp;
var WebAppInternals = Package.webapp.WebAppInternals;
var main = Package.webapp.main;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

var require = meteorInstall({"node_modules":{"meteor":{"wildarch:restorder":{"restorder.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/wildarch_restorder/restorder.js                                                            //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
// Write your package code here!                                                                       // 1
// necessary to parse POST data                                                                        // 3
var bodyparser = Npm.require('body-parser'); // necessary for Collection use and other wrapped methods
                                                                                                       //
                                                                                                       //
var Fiber = Npm.require('fibers');                                                                     // 6
                                                                                                       //
WebApp.connectHandlers.use(bodyparser.json());                                                         // 9
WebApp.connectHandlers.use(bodyparser.urlencoded({                                                     // 10
    extended: false                                                                                    // 11
}));                                                                                                   // 10
WebApp.connectHandlers.use('/tasks', function (req, res, next) {                                       // 13
    var orderID = req.query.orderID;                                                                   // 14
    var category = req.query.category;                                                                 // 15
    if (category == "null" || category == "undefined") category = null; //Seriously, why the fuck do I have to do this?!?!
                                                                                                       //
    if (req.method == "GET") {                                                                         // 17
        sendTasks(res, orderID, category);                                                             // 18
        res.end();                                                                                     // 19
    } else if (req.method == "POST") {                                                                 // 20
        updateTasks(orderID, JSON.parse(req.body.tasks), category);                                    // 22
        res.end(JSON.stringify({                                                                       // 23
            result: "OK"                                                                               // 24
        }));                                                                                           // 23
    }                                                                                                  // 26
});                                                                                                    // 27
                                                                                                       //
function sendTasks(res, orderID, category) {                                                           // 29
    res.writeHead(200, {                                                                               // 30
        'Content-Type': 'application/json'                                                             // 31
    });                                                                                                // 30
    var tasks;                                                                                         // 33
                                                                                                       //
    if (category) {                                                                                    // 34
        tasks = get_category_template(category, new Date());                                           // 35
    } else {                                                                                           // 36
        var order = Orders.findOne(orderID);                                                           // 38
        tasks = order.tasks;                                                                           // 39
                                                                                                       //
        if (!tasks) {                                                                                  // 40
            tasks = get_category_template(order.category, order.entryDate);                            // 41
            console.log("Serving category template");                                                  // 42
            updateTasks(orderID, tasks);                                                               // 43
        } else {                                                                                       // 44
            console.log("Serving order");                                                              // 46
        }                                                                                              // 47
    }                                                                                                  // 48
                                                                                                       //
    return res.write(JSON.stringify(tasks));                                                           // 49
    var order = Orders.findOne(orderID);                                                               // 50
                                                                                                       //
    if (!order.tasks) {                                                                                // 51
        var tasks = generate_dummy(order.entryDate);                                                   // 52
        updateTasks(orderID, JSON.stringify(tasks));                                                   // 53
        return res.write(JSON.stringify(tasks));                                                       // 54
    }                                                                                                  // 55
                                                                                                       //
    res.write(JSON.stringify(order.tasks));                                                            // 56
}                                                                                                      // 57
                                                                                                       //
function updateTasks(orderID, tasks, category) {                                                       // 59
    Fiber(function () {                                                                                // 60
        if (category) {                                                                                // 61
            Categories.update({                                                                        // 62
                description: category                                                                  // 63
            }, {                                                                                       // 62
                $set: {                                                                                // 65
                    tasks: tasks                                                                       // 66
                }                                                                                      // 65
            });                                                                                        // 64
            return;                                                                                    // 69
        }                                                                                              // 70
                                                                                                       //
        Orders.update(orderID, {                                                                       // 71
            $set: {                                                                                    // 72
                tasks: tasks                                                                           // 73
            }                                                                                          // 72
        });                                                                                            // 71
    }).run();                                                                                          // 76
}                                                                                                      // 77
                                                                                                       //
function get_category_template(category_desc, startDate) {                                             // 79
    var category = Categories.findOne({                                                                // 80
        description: category_desc                                                                     // 81
    });                                                                                                // 80
                                                                                                       //
    if (!category) {                                                                                   // 83
        console.log("No category found for: " + category_desc);                                        // 84
        return null;                                                                                   // 85
    }                                                                                                  // 86
                                                                                                       //
    if (category.tasks) {                                                                              // 87
        var tasks = category.tasks;                                                                    // 88
        moveProject(tasks, startDate);                                                                 // 89
        console.log("Category " + category_desc + " has a template");                                  // 90
        return category.tasks;                                                                         // 91
    }                                                                                                  // 92
                                                                                                       //
    var dummy = generate_dummy(startDate, category_desc);                                              // 93
    Fiber(function () {                                                                                // 94
        Categories.update(category._id, {                                                              // 95
            $set: {                                                                                    // 96
                tasks: dummy                                                                           // 97
            }                                                                                          // 96
        });                                                                                            // 95
    }).run();                                                                                          // 100
    return dummy;                                                                                      // 101
}                                                                                                      // 102
                                                                                                       //
function generate_dummy(startDate, category) {                                                         // 104
    var dummy = JSON.parse(JSON.stringify(dummy_project));                                             // 105
                                                                                                       //
    if (!startDate) {                                                                                  // 106
        startDate = new Date();                                                                        // 107
    }                                                                                                  // 108
                                                                                                       //
    if (category) dummy.tasks[0].name = category;                                                      // 109
    moveProject(dummy, startDate);                                                                     // 110
    return dummy;                                                                                      // 111
}                                                                                                      // 112
                                                                                                       //
function moveProject(project, startDate) {                                                             // 114
    var deltaTime = startDate.getTime() - project.tasks[0].start;                                      // 115
    project.tasks.forEach(function (task) {                                                            // 116
        task.start += deltaTime;                                                                       // 117
        task.end += deltaTime;                                                                         // 118
    });                                                                                                // 119
}                                                                                                      // 120
                                                                                                       //
var dummy_project = {                                                                                  // 122
    "tasks": [{                                                                                        // 123
        "id": 1,                                                                                       // 125
        "name": "1800PLUS",                                                                            // 126
        "progress": 0,                                                                                 // 127
        "description": "",                                                                             // 128
        "code": "",                                                                                    // 129
        "level": 0,                                                                                    // 130
        "status": "STATUSACTIVE",                                                                      // 131
        "depends": "",                                                                                 // 132
        "canWrite": true,                                                                              // 133
        "start": 1452121200000,                                                                        // 134
        "duration": 46,                                                                                // 135
        "end": 1457650799999,                                                                          // 136
        "startIsMilestone": true,                                                                      // 137
        "endIsMilestone": false,                                                                       // 138
        "collapsed": false,                                                                            // 139
        "assigs": [],                                                                                  // 140
        "hasChild": true                                                                               // 143
    }, {                                                                                               // 124
        "id": 2,                                                                                       // 146
        "name": "Staal bestellen",                                                                     // 147
        "progress": 0,                                                                                 // 148
        "description": "",                                                                             // 149
        "code": "",                                                                                    // 150
        "level": 1,                                                                                    // 151
        "status": "STATUSACTIVE",                                                                      // 152
        "depends": "",                                                                                 // 153
        "canWrite": true,                                                                              // 154
        "start": 1452207600000,                                                                        // 155
        "duration": 14,                                                                                // 156
        "end": 1453935599999,                                                                          // 157
        "startIsMilestone": false,                                                                     // 158
        "endIsMilestone": false,                                                                       // 159
        "collapsed": false,                                                                            // 160
        "assigs": [],                                                                                  // 161
        "hasChild": true,                                                                              // 164
        "earlyStart": 0,                                                                               // 165
        "earlyFinish": 14,                                                                             // 166
        "latestStart": 0,                                                                              // 167
        "latestFinish": 14,                                                                            // 168
        "criticalCost": 39,                                                                            // 169
        "isCritical": true                                                                             // 170
    }, {                                                                                               // 145
        "id": 3,                                                                                       // 173
        "name": "Bestellen",                                                                           // 174
        "progress": 0,                                                                                 // 175
        "description": "",                                                                             // 176
        "code": "",                                                                                    // 177
        "level": 2,                                                                                    // 178
        "status": "STATUSACTIVE",                                                                      // 179
        "depends": "",                                                                                 // 180
        "canWrite": true,                                                                              // 181
        "start": 1452207600000,                                                                        // 182
        "duration": 1,                                                                                 // 183
        "end": 1452293999999,                                                                          // 184
        "startIsMilestone": false,                                                                     // 185
        "endIsMilestone": false,                                                                       // 186
        "collapsed": false,                                                                            // 187
        "assigs": [],                                                                                  // 188
        "hasChild": false,                                                                             // 191
        "earlyStart": 0,                                                                               // 192
        "earlyFinish": 1,                                                                              // 193
        "latestStart": 25,                                                                             // 194
        "latestFinish": 26,                                                                            // 195
        "criticalCost": 14,                                                                            // 196
        "isCritical": false                                                                            // 197
    }, {                                                                                               // 172
        "id": 4,                                                                                       // 200
        "name": "Levertijd",                                                                           // 201
        "progress": 0,                                                                                 // 202
        "description": "",                                                                             // 203
        "code": "",                                                                                    // 204
        "level": 2,                                                                                    // 205
        "status": "STATUSSUSPENDED",                                                                   // 206
        "depends": "3",                                                                                // 207
        "canWrite": true,                                                                              // 208
        "start": 1452466800000,                                                                        // 209
        "duration": 13,                                                                                // 210
        "end": 1453935599999,                                                                          // 211
        "startIsMilestone": false,                                                                     // 212
        "endIsMilestone": false,                                                                       // 213
        "collapsed": false,                                                                            // 214
        "assigs": [],                                                                                  // 215
        "hasChild": false,                                                                             // 218
        "earlyStart": 1,                                                                               // 219
        "earlyFinish": 14,                                                                             // 220
        "latestStart": 26,                                                                             // 221
        "latestFinish": 39,                                                                            // 222
        "criticalCost": 13,                                                                            // 223
        "isCritical": false                                                                            // 224
    }, {                                                                                               // 199
        "id": "tmpFk1455215846637",                                                                    // 227
        "name": "Onderdelen",                                                                          // 228
        "progress": 0,                                                                                 // 229
        "description": "",                                                                             // 230
        "code": "",                                                                                    // 231
        "level": 1,                                                                                    // 232
        "status": "STATUSACTIVE",                                                                      // 233
        "depends": "",                                                                                 // 234
        "canWrite": true,                                                                              // 235
        "start": 1452207600000,                                                                        // 236
        "duration": 35,                                                                                // 237
        "end": 1456441199999,                                                                          // 238
        "startIsMilestone": false,                                                                     // 239
        "endIsMilestone": false,                                                                       // 240
        "assigs": [],                                                                                  // 241
        "hasChild": true,                                                                              // 244
        "earlyStart": 0,                                                                               // 245
        "earlyFinish": 35,                                                                             // 246
        "latestStart": 4,                                                                              // 247
        "latestFinish": 39,                                                                            // 248
        "criticalCost": 35,                                                                            // 249
        "isCritical": false                                                                            // 250
    }, {                                                                                               // 226
        "id": "tmpFk1455215853066",                                                                    // 253
        "name": "Wabco",                                                                               // 254
        "progress": 0,                                                                                 // 255
        "description": "",                                                                             // 256
        "code": "",                                                                                    // 257
        "level": 2,                                                                                    // 258
        "status": "STATUSACTIVE",                                                                      // 259
        "depends": "",                                                                                 // 260
        "canWrite": true,                                                                              // 261
        "start": 1452207600000,                                                                        // 262
        "duration": 14,                                                                                // 263
        "end": 1453935599999,                                                                          // 264
        "startIsMilestone": false,                                                                     // 265
        "endIsMilestone": false,                                                                       // 266
        "assigs": [],                                                                                  // 267
        "hasChild": false,                                                                             // 270
        "earlyStart": 0,                                                                               // 271
        "earlyFinish": 14,                                                                             // 272
        "latestStart": 25,                                                                             // 273
        "latestFinish": 39,                                                                            // 274
        "criticalCost": 14,                                                                            // 275
        "isCritical": false                                                                            // 276
    }, {                                                                                               // 252
        "id": "tmpFk1455215857137",                                                                    // 279
        "name": "Assen",                                                                               // 280
        "progress": 0,                                                                                 // 281
        "description": "",                                                                             // 282
        "code": "",                                                                                    // 283
        "level": 2,                                                                                    // 284
        "status": "STATUSACTIVE",                                                                      // 285
        "depends": "",                                                                                 // 286
        "canWrite": true,                                                                              // 287
        "start": 1452207600000,                                                                        // 288
        "duration": 14,                                                                                // 289
        "end": 1453935599999,                                                                          // 290
        "startIsMilestone": false,                                                                     // 291
        "endIsMilestone": false,                                                                       // 292
        "assigs": [],                                                                                  // 293
        "hasChild": false,                                                                             // 296
        "earlyStart": 0,                                                                               // 297
        "earlyFinish": 14,                                                                             // 298
        "latestStart": 25,                                                                             // 299
        "latestFinish": 39,                                                                            // 300
        "criticalCost": 14,                                                                            // 301
        "isCritical": false                                                                            // 302
    }, {                                                                                               // 278
        "id": "tmpFk1455215859009",                                                                    // 305
        "name": "Wielen",                                                                              // 306
        "progress": 0,                                                                                 // 307
        "description": "",                                                                             // 308
        "code": "",                                                                                    // 309
        "level": 2,                                                                                    // 310
        "status": "STATUSACTIVE",                                                                      // 311
        "depends": "",                                                                                 // 312
        "canWrite": true,                                                                              // 313
        "start": 1452207600000,                                                                        // 314
        "duration": 35,                                                                                // 315
        "end": 1456441199999,                                                                          // 316
        "startIsMilestone": false,                                                                     // 317
        "endIsMilestone": false,                                                                       // 318
        "assigs": [],                                                                                  // 319
        "hasChild": false,                                                                             // 322
        "earlyStart": 0,                                                                               // 323
        "earlyFinish": 35,                                                                             // 324
        "latestStart": 4,                                                                              // 325
        "latestFinish": 39,                                                                            // 326
        "criticalCost": 35,                                                                            // 327
        "isCritical": false                                                                            // 328
    }, {                                                                                               // 304
        "id": 5,                                                                                       // 331
        "name": "Lassen",                                                                              // 332
        "progress": 0,                                                                                 // 333
        "description": "",                                                                             // 334
        "code": "",                                                                                    // 335
        "level": 1,                                                                                    // 336
        "status": "STATUSSUSPENDED",                                                                   // 337
        "depends": "2",                                                                                // 338
        "canWrite": true,                                                                              // 339
        "start": 1453935600000,                                                                        // 340
        "duration": 8,                                                                                 // 341
        "end": 1454972399999,                                                                          // 342
        "startIsMilestone": false,                                                                     // 343
        "endIsMilestone": false,                                                                       // 344
        "collapsed": false,                                                                            // 345
        "assigs": [],                                                                                  // 346
        "hasChild": false,                                                                             // 349
        "earlyStart": 14,                                                                              // 350
        "earlyFinish": 20,                                                                             // 351
        "latestStart": 14,                                                                             // 352
        "latestFinish": 20,                                                                            // 353
        "criticalCost": 25,                                                                            // 354
        "isCritical": true                                                                             // 355
    }, {                                                                                               // 330
        "id": "tmpFk1455215471547",                                                                    // 358
        "name": "Poedercoaten",                                                                        // 359
        "progress": 0,                                                                                 // 360
        "description": "",                                                                             // 361
        "code": "",                                                                                    // 362
        "level": 1,                                                                                    // 363
        "status": "STATUSSUSPENDED",                                                                   // 364
        "depends": "9",                                                                                // 365
        "canWrite": true,                                                                              // 366
        "start": 1454972400000,                                                                        // 367
        "duration": 17,                                                                                // 368
        "end": 1456959599999,                                                                          // 369
        "startIsMilestone": false,                                                                     // 370
        "endIsMilestone": false,                                                                       // 371
        "assigs": [],                                                                                  // 372
        "hasChild": false,                                                                             // 375
        "earlyStart": 20,                                                                              // 376
        "earlyFinish": 34,                                                                             // 377
        "latestStart": 20,                                                                             // 378
        "latestFinish": 34,                                                                            // 379
        "criticalCost": 19,                                                                            // 380
        "isCritical": true                                                                             // 381
    }, {                                                                                               // 357
        "id": "tmpFk1455215491210",                                                                    // 384
        "name": "Assembleren Trekker",                                                                 // 385
        "progress": 0,                                                                                 // 386
        "description": "",                                                                             // 387
        "code": "",                                                                                    // 388
        "level": 1,                                                                                    // 389
        "status": "STATUSSUSPENDED",                                                                   // 390
        "depends": "10,7,6",                                                                           // 391
        "canWrite": true,                                                                              // 392
        "start": 1456959600000,                                                                        // 393
        "duration": 3,                                                                                 // 394
        "end": 1457391599999,                                                                          // 395
        "startIsMilestone": false,                                                                     // 396
        "endIsMilestone": false,                                                                       // 397
        "assigs": [],                                                                                  // 398
        "hasChild": false,                                                                             // 401
        "earlyStart": 34,                                                                              // 402
        "earlyFinish": 37,                                                                             // 403
        "latestStart": 34,                                                                             // 404
        "latestFinish": 37,                                                                            // 405
        "criticalCost": 5,                                                                             // 406
        "isCritical": true                                                                             // 407
    }, {                                                                                               // 383
        "id": "tmpFk1455215496653",                                                                    // 410
        "name": "Assembleren Oplegger",                                                                // 411
        "progress": 0,                                                                                 // 412
        "description": "",                                                                             // 413
        "code": "",                                                                                    // 414
        "level": 1,                                                                                    // 415
        "status": "STATUSSUSPENDED",                                                                   // 416
        "depends": "2",                                                                                // 417
        "canWrite": true,                                                                              // 418
        "start": 1453935600000,                                                                        // 419
        "duration": 3,                                                                                 // 420
        "end": 1454367599999,                                                                          // 421
        "startIsMilestone": false,                                                                     // 422
        "endIsMilestone": false,                                                                       // 423
        "assigs": [],                                                                                  // 424
        "hasChild": false,                                                                             // 427
        "earlyStart": 14,                                                                              // 428
        "earlyFinish": 17,                                                                             // 429
        "latestStart": 36,                                                                             // 430
        "latestFinish": 39,                                                                            // 431
        "criticalCost": 3,                                                                             // 432
        "isCritical": false                                                                            // 433
    }, {                                                                                               // 409
        "id": "tmpFk1455216430399",                                                                    // 436
        "name": "Keuren",                                                                              // 437
        "progress": 0,                                                                                 // 438
        "description": "",                                                                             // 439
        "code": "",                                                                                    // 440
        "level": 1,                                                                                    // 441
        "status": "STATUSSUSPENDED",                                                                   // 442
        "depends": "11,12",                                                                            // 443
        "canWrite": true,                                                                              // 444
        "start": 1457391600000,                                                                        // 445
        "duration": 2,                                                                                 // 446
        "end": 1457564399999,                                                                          // 447
        "startIsMilestone": false,                                                                     // 448
        "endIsMilestone": false,                                                                       // 449
        "assigs": [],                                                                                  // 450
        "hasChild": false                                                                              // 453
    }],                                                                                                // 435
    "selectedRow": 0,                                                                                  // 456
    "deletedTaskIds": [],                                                                              // 457
    "resources": [],                                                                                   // 458
    "roles": [],                                                                                       // 459
    "canWrite": true,                                                                                  // 460
    "canWriteOnParent": true,                                                                          // 461
    "splitterPosition": 57.81364636830521,                                                             // 462
    "zoom": "q"                                                                                        // 463
};                                                                                                     // 122
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/wildarch:restorder/restorder.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['wildarch:restorder'] = {};

})();

//# sourceMappingURL=wildarch_restorder.js.map
