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

/* Package-scope variables */
var exactapi;

var require = meteorInstall({"node_modules":{"meteor":{"wildarch:exact-api":{"exact-api.js":function(require){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/wildarch_exact-api/exact-api.js                                                         //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
// Write your package code here!                                                                    // 1
var rest = Npm.require('restler');                                                                  // 2
                                                                                                    //
var xml2js = Npm.require('xml2js');                                                                 // 3
                                                                                                    //
var clone = Npm.require('clone');                                                                   // 4
                                                                                                    //
var cookie_parser = Npm.require('set-cookie-parser');                                               // 5
                                                                                                    //
var local_conf = {                                                                                  // 7
    client_id: "28554901-0075-4e86-92f4-76764817b4f3",                                              // 8
    secret: "CsiVKM9ou5Fy",                                                                         // 9
    redirect_url: "https://localhost/exactauth"                                                     // 10
};                                                                                                  // 7
var conf = {                                                                                        // 12
    client_id: "2c023656-d37a-451b-a2ee-df72bab08f59",                                              // 13
    secret: "pWm2S2zwDNqh",                                                                         // 14
    redirect_url: "https://blueboard-wildarch.rhcloud.com/exactauth"                                // 15
};                                                                                                  // 12
                                                                                                    //
if (process.env.ROOT_URL == "http://localhost:3000/") {                                             // 18
    conf = local_conf;                                                                              // 19
}                                                                                                   // 20
                                                                                                    //
var exact_base_url = "https://start.exactonline.nl";                                                // 22
var exact_auth_url = exact_base_url + "/api/oauth2/auth?response_type=code&client_id=" + conf.client_id + "&redirect_uri=" + conf.redirect_url + "&force_login=0";
var exact_token_url = exact_base_url + "/api/oauth2/token";                                         // 24
var exact_get_url = "/docs/XMLDownload.aspx";                                                       // 25
var exact_post_url = "/docs/XMLUpload.aspx";                                                        // 26
exactapi = {                                                                                        // 28
    getAuthURL: function () {                                                                       // 29
        return exact_auth_url;                                                                      // 30
    },                                                                                              // 31
    isAuthorized: function () {                                                                     // 32
        return exact != undefined;                                                                  // 33
    },                                                                                              // 34
    getShopOrders: function (options) {                                                             // 35
        var result = Meteor.wrapAsync(exact.getShopOrders)(options);                                // 36
        return result;                                                                              // 37
    },                                                                                              // 38
    getShopOrder: function (orderNumber) {                                                          // 39
        return Meteor.wrapAsync(exact.getShopOrder)(orderNumber);                                   // 40
    },                                                                                              // 41
    getSalesOrder: function (orderID) {                                                             // 42
        return Meteor.wrapAsync(exact.getSalesOrder)(orderID);                                      // 43
    },                                                                                              // 44
    getSalesOrders: function (options) {                                                            // 45
        return Meteor.wrapAsync(exact.getSalesOrders)(options);                                     // 46
    },                                                                                              // 47
    getItem: function (itemID) {                                                                    // 48
        return Meteor.wrapAsync(exact.getItem)(itemID);                                             // 49
    },                                                                                              // 50
    getItems: function (groupID) {                                                                  // 51
        return Meteor.wrapAsync(exact.getItems)(groupID);                                           // 52
    },                                                                                              // 53
    parseJSONDate: function (jsonDate) {                                                            // 54
        if (!jsonDate) return;                                                                      // 55
        return new Date(parseInt(jsonDate.substr(6)));                                              // 56
    },                                                                                              // 57
    tokenRefresh: function () {                                                                     // 58
        if (exact == undefined) return;                                                             // 59
        return Meteor.wrapAsync(tokenRefresh)();                                                    // 60
    },                                                                                              // 61
    getDivisions: function () {                                                                     // 62
        if (exact == undefined) return;                                                             // 63
        return Meteor.wrapAsync(exact.getDivisions)();                                              // 64
    },                                                                                              // 65
    setDivision: function (div) {                                                                   // 66
        if (exact == undefined) return;                                                             // 67
        division = div;                                                                             // 68
    },                                                                                              // 69
    getDivision: function () {                                                                      // 70
        if (exact == undefined) return;                                                             // 71
        return division;                                                                            // 72
    },                                                                                              // 73
    getSalesOrderLines: function (itemID) {                                                         // 74
        return Meteor.wrapAsync(exact.getSalesOrderLines)(itemID);                                  // 75
    },                                                                                              // 76
    getItemGroups: function () {                                                                    // 77
        return Meteor.wrapAsync(exact.getItemGroups)();                                             // 78
    },                                                                                              // 79
    getBOM: function (sourceID) {                                                                   // 80
        return Meteor.wrapAsync(exact.getBOM)(sourceID);                                            // 81
    },                                                                                              // 82
    copyBOM: function (sourceID, destItems, cookies) {                                              // 83
        return Meteor.wrapAsync(exact.copyBOM)(sourceID, destItems, cookies);                       // 84
    },                                                                                              // 85
    "delete": function (id) {                                                                       // 86
        return Meteor.wrapAsync(exact.delete)(id);                                                  // 87
    },                                                                                              // 88
    getShopOrderMaterialPlans: function (orderID) {                                                 // 89
        return Meteor.wrapAsync(exact.getShopOrderMaterialPlans)(orderID);                          // 90
    },                                                                                              // 91
    getShopOrderChildren: function (orderID) {                                                      // 92
        return Meteor.wrapAsync(exact.getShopOrderChildren)(orderID);                               // 93
    },                                                                                              // 94
    getProject: function (projectCode) {                                                            // 95
        return Meteor.wrapAsync(exact.getProject)(projectCode);                                     // 96
    }                                                                                               // 97
};                                                                                                  // 28
var exact;                                                                                          // 100
var access_token;                                                                                   // 101
var refresh_token;                                                                                  // 102
                                                                                                    //
var tokenRefresh = function (cb) {                                                                  // 104
    rest.post(exact_token_url, {                                                                    // 105
        data: {                                                                                     // 106
            refresh_token: refresh_token,                                                           // 107
            grant_type: "refresh_token",                                                            // 108
            client_id: conf.client_id,                                                              // 109
            client_secret: conf.secret                                                              // 110
        }                                                                                           // 106
    }).on('complete', function (data, response) {                                                   // 105
        if (!data.access_token) {                                                                   // 113
            console.log("Error refreshing token!");                                                 // 114
            exact = undefined;                                                                      // 115
        }                                                                                           // 116
                                                                                                    //
        access_token = data.access_token;                                                           // 117
        refresh_token = data.refresh_token;                                                         // 118
        console.log("Token refreshed, next in refresh after: " + data.expires_in);                  // 119
        cb(null, data.refresh_token);                                                               // 120
    });                                                                                             // 121
};                                                                                                  // 122
                                                                                                    //
WebApp.connectHandlers.use('/exactauth', function (req, res, next) {                                // 124
    exact = new Exact(req.query.code, function () {                                                 // 125
        // 301 Send to main app                                                                     // 126
        res.writeHead(301, {                                                                        // 127
            'Location': '/'                                                                         // 128
        });                                                                                         // 127
        res.end();                                                                                  // 130
    });                                                                                             // 131
});                                                                                                 // 132
var division;                                                                                       // 133
var Exact = rest.service(function (auth_code, cb) {                                                 // 134
    var self = this;                                                                                // 135
    rest.post(exact_token_url, {                                                                    // 136
        data: {                                                                                     // 138
            code: auth_code,                                                                        // 139
            redirect_uri: conf.redirect_url,                                                        // 140
            grant_type: "authorization_code",                                                       // 141
            client_id: conf.client_id,                                                              // 142
            client_secret: conf.secret                                                              // 143
        }                                                                                           // 138
    }).on('complete', function (data, response) {                                                   // 137
        access_token = data.access_token;                                                           // 147
        console.log(data);                                                                          // 148
        console.log("Access token: " + access_token);                                               // 149
        refresh_token = data.refresh_token;                                                         // 150
        console.log("Refresh token: " + refresh_token);                                             // 151
        self.getCurrentDivision(function (div) {                                                    // 152
            division = div;                                                                         // 153
            console.log("Division: " + div);                                                        // 154
        });                                                                                         // 155
        cb();                                                                                       // 156
    });                                                                                             // 157
}, {                                                                                                // 158
    baseURL: exact_base_url                                                                         // 159
}, {                                                                                                // 159
    getShopOrders: function (options, cb) {                                                         // 161
        var filter = "";                                                                            // 162
                                                                                                    //
        if (options.min_date) {                                                                     // 163
            filter = "PlannedDate ge DateTime'" + options.min_date + "'";                           // 164
        } else if (options.project) {                                                               // 165
            filter = "Project eq guid'" + options.project + "'";                                    // 167
        }                                                                                           // 168
                                                                                                    //
        exact.get('/api/v1/' + division + '/manufacturing/ShopOrders', {                            // 170
            query: {                                                                                // 171
                access_token: access_token,                                                         // 172
                $filter: filter,                                                                    // 173
                $select: "ID, ShopOrderNumber, ShopOrderMaterialPlans, ShopOrderRoutingStepPlans, ShopOrderParentNumber, SalesOrderLines, PlannedDate, PlannedQuantity, Description, Notes, Item",
                $expand: "SalesOrderLines, ShopOrderMaterialPlans, ShopOrderRoutingStepPlans"       // 175
            },                                                                                      // 171
            headers: {                                                                              // 177
                'Accept': 'application/json',                                                       // 177
                'User-Agent': 'Restler for node.js'                                                 // 177
            },                                                                                      // 177
            parser: rest.parsers.json                                                               // 178
        }).on('complete', function (data, response) {                                               // 170
            if (data.d && data.d.results && data.d.results.length > 0) {                            // 180
                cb(null, data.d.results);                                                           // 181
            } else {                                                                                // 182
                cb("Could not retrieve shop orders", data);                                         // 184
            }                                                                                       // 185
        });                                                                                         // 186
    },                                                                                              // 187
    getProject: function (options, cb) {                                                            // 188
        var filter = "";                                                                            // 189
                                                                                                    //
        if (options.projectCode) {                                                                  // 190
            filter = "Code eq '" + options.projectCode + "'";                                       // 191
        } else if (options.startDate) {                                                             // 192
            filter = "StartDate gt DateTime'" + options.startDate.toISOString() + "'";              // 194
        } else {                                                                                    // 195
            console.err("Invalid options for project");                                             // 197
        }                                                                                           // 198
                                                                                                    //
        exact.get('/api/v1/' + division + '/project/Projects', {                                    // 199
            query: {                                                                                // 200
                access_token: access_token,                                                         // 201
                $filter: filter,                                                                    // 202
                $orderby: "StartDate desc",                                                         // 203
                $select: "ID, Description, Code, CreatorFullName, StartDate, EndDate"               // 204
            },                                                                                      // 200
            headers: {                                                                              // 206
                'Accept': 'application/json',                                                       // 206
                'User-Agent': 'Restler for node.js'                                                 // 206
            },                                                                                      // 206
            parser: rest.parsers.json                                                               // 207
        }).on('complete', function (data, response) {                                               // 199
            if (data.d && data.d.results && data.d.results.length > 0) {                            // 209
                if (options.projectCode) cb(null, data.d.results[0]);else cb(null, data.d.results);
            } else {                                                                                // 212
                console.warn("Could not retrieve project");                                         // 214
                console.log(JSON.stringify(data));                                                  // 215
                cb("Could not retrieve project", data);                                             // 216
            }                                                                                       // 217
        });                                                                                         // 218
    },                                                                                              // 219
    getShopOrder: function (orderNumber, cb) {                                                      // 221
        exact.get('/api/v1/' + division + '/manufacturing/ShopOrders', {                            // 222
            query: {                                                                                // 223
                access_token: access_token,                                                         // 224
                $filter: "ShopOrderNumber eq " + orderNumber,                                       // 225
                $select: "ID, ShopOrderNumber, ShopOrderMaterialPlans, ShopOrderRoutingStepPlans, ShopOrderParentNumber, SalesOrderLines, PlannedDate, PlannedQuantity, Description, Notes, Item",
                $expand: "SalesOrderLines, ShopOrderMaterialPlans, ShopOrderRoutingStepPlans"       // 227
            },                                                                                      // 223
            headers: {                                                                              // 229
                'Accept': 'application/json',                                                       // 229
                'User-Agent': 'Restler for node.js'                                                 // 229
            },                                                                                      // 229
            parser: rest.parsers.json                                                               // 230
        }).on('complete', function (data, response) {                                               // 222
            var res = data.d.results[0];                                                            // 232
                                                                                                    //
            if (!res) {                                                                             // 233
                cb(JSON.stringify(data), null);                                                     // 234
            } else if (res.ShopOrderMaterialPlans && res.ShopOrderMaterialPlans.__next) {           // 235
                console.log("Issuing extra request: " + res.ShopOrderMaterialPlans.__next + '&access_token=' + access_token);
                rest.get(res.ShopOrderMaterialPlans.__next + '&access_token=' + access_token, {     // 238
                    headers: {                                                                      // 239
                        'Accept': 'application/json',                                               // 239
                        'User-Agent': 'Restler for node.js'                                         // 239
                    } //parser: rest.parsers.json                                                   // 239
                                                                                                    //
                }).on('complete', function (data, response) {                                       // 238
                    if (data && data.d.results) {                                                   // 242
                        console.log("Appending extra elements: " + data.d.results.length);          // 243
                        data.d.results.forEach(function (elem) {                                    // 244
                            res.ShopOrderMaterialPlans.results.push(elem);                          // 245
                        });                                                                         // 246
                    }                                                                               // 247
                                                                                                    //
                    cb(null, res);                                                                  // 248
                });                                                                                 // 249
            } else {                                                                                // 250
                cb(null, res);                                                                      // 252
            }                                                                                       // 253
        });                                                                                         // 254
    },                                                                                              // 255
    getShopOrderChildren: function (orderID, cb) {                                                  // 256
        exact.get('/api/v1/' + division + '/manufacturing/ShopOrders', {                            // 257
            query: {                                                                                // 258
                access_token: access_token,                                                         // 259
                $filter: "ShopOrderParent eq guid'" + orderID + "'",                                // 260
                $select: "ID, ShopOrderNumber, ShopOrderMaterialPlans, ShopOrderRoutingStepPlans, SalesOrderLines, PlannedDate, PlannedQuantity, Description, Notes, Item",
                $expand: "SalesOrderLines, ShopOrderMaterialPlans, ShopOrderRoutingStepPlans"       // 262
            },                                                                                      // 258
            headers: {                                                                              // 264
                'Accept': 'application/json',                                                       // 264
                'User-Agent': 'Restler for node.js'                                                 // 264
            },                                                                                      // 264
            parser: rest.parsers.json                                                               // 265
        }).on('complete', function (data, response) {                                               // 257
            if (!data.d.results) {                                                                  // 267
                cb(JSON.stringify(data), null);                                                     // 268
                return;                                                                             // 269
            }                                                                                       // 270
                                                                                                    //
            var left = data.d.results.length;                                                       // 272
            if (left == 0) return cb(null, data.d.results);                                         // 273
            data.d.results.forEach(function (res) {                                                 // 275
                if (res.ShopOrderMaterialPlans && res.ShopOrderMaterialPlans.__next) {              // 276
                    console.log("Issuing extra request: " + res.ShopOrderMaterialPlans.__next + '&access_token=' + access_token);
                    rest.get(res.ShopOrderMaterialPlans.__next + '&access_token=' + access_token, {
                        headers: {                                                                  // 279
                            'Accept': 'application/json',                                           // 279
                            'User-Agent': 'Restler for node.js'                                     // 279
                        } //parser: rest.parsers.json                                               // 279
                                                                                                    //
                    }).on('complete', function (data, response) {                                   // 278
                        if (data && data.d.results) {                                               // 282
                            console.log("Appending extra elements: " + data.d.results.length);      // 283
                            data.d.results.forEach(function (elem) {                                // 284
                                res.ShopOrderMaterialPlans.results.push(elem);                      // 285
                            });                                                                     // 286
                        }                                                                           // 287
                                                                                                    //
                        left--;                                                                     // 288
                        if (left == 0) return cb(null, data.d.results);                             // 289
                    });                                                                             // 290
                } else {                                                                            // 291
                    left--;                                                                         // 293
                    if (left == 0) return cb(null, data.d.results);                                 // 294
                }                                                                                   // 295
            });                                                                                     // 296
        });                                                                                         // 297
    },                                                                                              // 298
    getShopOrderMaterialPlans: function (orderID, cb) {                                             // 299
        exact.get('/api/v1/' + division + '/manufacturing/ShopOrderMaterialPlans', {                // 300
            query: {                                                                                // 301
                access_token: access_token,                                                         // 302
                $filter: "ShopOrder eq " + orderID,                                                 // 303
                $select: "Description, ItemDescription, ItemCode, LineNumber, PlannedQuantity, Unit, UnitDescription, Notes"
            },                                                                                      // 301
            headers: {                                                                              // 306
                'Accept': 'application/json',                                                       // 306
                'User-Agent': 'Restler for node.js'                                                 // 306
            },                                                                                      // 306
            parser: rest.parsers.json                                                               // 307
        }).on('complete', function (data, response) {                                               // 300
            var res = data.d.results;                                                               // 309
                                                                                                    //
            if (res) {                                                                              // 310
                cb(null, res);                                                                      // 311
            } else {                                                                                // 312
                cb(JSON.stringify(data), null);                                                     // 314
            }                                                                                       // 315
        });                                                                                         // 316
    },                                                                                              // 317
    getCurrentDivision: function (cb) {                                                             // 318
        this.get('/api/v1/current/Me', {                                                            // 319
            query: {                                                                                // 320
                access_token: access_token,                                                         // 321
                $select: "CurrentDivision"                                                          // 322
            },                                                                                      // 320
            headers: {                                                                              // 324
                'Accept': 'application/json'                                                        // 324
            },                                                                                      // 324
            parser: rest.parsers.json                                                               // 325
        }).on('complete', function (data, response) {                                               // 319
            cb(data.d.results[0]["CurrentDivision"]);                                               // 327
        });                                                                                         // 328
    },                                                                                              // 329
    getDivisions: function (cb) {                                                                   // 330
        exact.get('/api/v1/' + division + '/system/Divisions', {                                    // 331
            query: {                                                                                // 332
                access_token: access_token,                                                         // 333
                $select: "Code,Description"                                                         // 334
            },                                                                                      // 332
            headers: {                                                                              // 336
                'Accept': 'application/json',                                                       // 336
                'User-Agent': 'Restler for node.js'                                                 // 336
            }                                                                                       // 336
        }).on('complete', function (data, response) {                                               // 331
            if (!data.d || !data.d.results) {                                                       // 338
                console.log("Some error occurred! " + data);                                        // 339
                return cb(data, null);                                                              // 340
            }                                                                                       // 341
                                                                                                    //
            cb(null, data.d.results);                                                               // 342
        });                                                                                         // 343
    },                                                                                              // 344
    getSalesOrder: function (orderID, cb) {                                                         // 345
        exact.get('/api/v1/' + division + '/salesorder/SalesOrders', {                              // 346
            query: {                                                                                // 347
                access_token: access_token,                                                         // 348
                $filter: "OrderID eq guid'" + orderID + "'",                                        // 349
                $select: "DeliverToName, OrderNumber"                                               // 350
            },                                                                                      // 347
            headers: {                                                                              // 352
                'Accept': 'application/json',                                                       // 352
                'User-Agent': 'Restler for node.js'                                                 // 352
            }                                                                                       // 352
        }).on('complete', function (data, response) {                                               // 346
            if (data.d && data.d.results) {                                                         // 354
                cb(null, data.d.results[0]);                                                        // 355
            } else {                                                                                // 356
                cb("Error retrieving sales order", data);                                           // 358
            }                                                                                       // 359
        });                                                                                         // 360
    },                                                                                              // 361
    getSalesOrderLines: function (orderID, cb) {                                                    // 362
        exact.get('/api/v1/' + division + '/salesorder/SalesOrderLines', {                          // 363
            query: {                                                                                // 364
                access_token: access_token,                                                         // 365
                $filter: "OrderID eq guid'" + orderID + "'",                                        // 366
                $select: "DeliveryDate, Description, NetPrice, Notes, Discount, LineNumber"         // 367
            },                                                                                      // 364
            headers: {                                                                              // 369
                'Accept': 'application/json',                                                       // 369
                'User-Agent': 'Restler for node.js'                                                 // 369
            }                                                                                       // 369
        }).on('complete', function (data, response) {                                               // 363
            if (data.d && data.d.results) {                                                         // 371
                cb(null, data.d.results);                                                           // 372
            } else {                                                                                // 373
                cb("Error retrieving sales order lines", data);                                     // 375
            }                                                                                       // 376
        });                                                                                         // 377
    },                                                                                              // 378
    getSalesOrders: function (options, cb) {                                                        // 379
        exact.get('/api/v1/' + division + '/salesorder/SalesOrders', {                              // 380
            query: {                                                                                // 381
                access_token: access_token,                                                         // 382
                $filter: "OrderDate ge DateTime'" + options.min_date + "'",                         // 383
                $select: "DeliverToName"                                                            // 384
            },                                                                                      // 381
            headers: {                                                                              // 386
                'Accept': 'application/json',                                                       // 386
                'User-Agent': 'Restler for node.js'                                                 // 386
            }                                                                                       // 386
        }).on('complete', function (data, response) {                                               // 380
            if (data.d && data.d.results) {                                                         // 388
                cb(null, data.d.results);                                                           // 389
            } else {                                                                                // 390
                cb("Error retrieving sales orders", data);                                          // 392
            }                                                                                       // 393
        });                                                                                         // 394
    },                                                                                              // 395
    getItem: function (itemID, cb) {                                                                // 396
        exact.get('/api/v1/' + division + '/logistics/Items', {                                     // 397
            query: {                                                                                // 398
                access_token: access_token,                                                         // 399
                $filter: "ID eq guid'" + itemID + "'",                                              // 400
                $select: "ItemGroupDescription, Code"                                               // 401
            },                                                                                      // 398
            headers: {                                                                              // 403
                'Accept': 'application/json',                                                       // 403
                'User-Agent': 'Restler for node.js'                                                 // 403
            }                                                                                       // 403
        }).on('complete', function (data, response) {                                               // 397
            if (data.d && data.d.results) {                                                         // 405
                cb(null, data.d.results[0]);                                                        // 406
            } else {                                                                                // 407
                cb("Error retrieving item", data);                                                  // 409
            }                                                                                       // 410
        });                                                                                         // 411
    },                                                                                              // 412
    getItems: function (groupID, cb) {                                                              // 413
        exact.get('/api/v1/' + division + '/logistics/Items', {                                     // 414
            query: {                                                                                // 415
                access_token: access_token,                                                         // 416
                $select: "ID, Code, ItemGroupDescription, Description, ItemGroup",                  // 417
                $filter: groupID ? "ItemGroup eq guid'" + groupID + "'" : undefined                 // 418
            },                                                                                      // 415
            headers: {                                                                              // 420
                'Accept': 'application/json',                                                       // 420
                'User-Agent': 'Restler for node.js'                                                 // 420
            }                                                                                       // 420
        }).on('complete', function (data, response) {                                               // 414
            if (data.d && data.d.results) {                                                         // 422
                cb(null, data.d.results);                                                           // 423
            } else if (cb) {                                                                        // 424
                cb("Error retrieving items", data);                                                 // 426
            }                                                                                       // 427
        });                                                                                         // 428
    },                                                                                              // 429
    getItemGroups: function (cb) {                                                                  // 430
        exact.get('api/v1/' + division + '/logistics/ItemGroups', {                                 // 431
            query: {                                                                                // 432
                access_token: access_token,                                                         // 433
                $select: 'ID,Description'                                                           // 434
            },                                                                                      // 432
            headers: {                                                                              // 436
                'Accept': 'application/json',                                                       // 436
                'User-Agent': 'Restler for node.js'                                                 // 436
            }                                                                                       // 436
        }).on('complete', function (data, response) {                                               // 431
            var groups = [];                                                                        // 438
                                                                                                    //
            if (!data) {                                                                            // 439
                console.log(response);                                                              // 440
                cb("Some error from Exact", null);                                                  // 441
                return;                                                                             // 442
            }                                                                                       // 443
                                                                                                    //
            data.d.results.forEach(function (result) {                                              // 444
                groups.push({                                                                       // 445
                    id: result.ID,                                                                  // 446
                    description: result.Description                                                 // 447
                });                                                                                 // 445
            });                                                                                     // 449
            cb(null, groups);                                                                       // 450
        });                                                                                         // 451
    },                                                                                              // 452
    copyBOM: function (source_id, dest_items, cookies, cb) {                                        // 453
        //Get the BOM of the source                                                                 // 454
        exact.getBOM(source_id, function (err, data) {                                              // 455
            if (err) return cb(err, data); //Construct a builder object                             // 456
                                                                                                    //
            var builder = new BOMBuilder(data);                                                     // 458
            var cookie_holder = new CookieHolder(cookies); //For each destination item              // 459
                                                                                                    //
            var updates = [];                                                                       // 461
            var cb_called = false;                                                                  // 462
            var i = 0;                                                                              // 463
            (function () {                                                                          // 464
                function iterator() {                                                               // 464
                    var item = dest_items[i];                                                       // 465
                    exact.getBOMID(item.id, function (err, id) {                                    // 466
                        if (err) {                                                                  // 467
                            console.warn("Error getting BOM ID: %j", err);                          // 468
                            next();                                                                 // 469
                        } else {                                                                    // 470
                            exact.delete(id, cookie_holder, function (err, data, response) {        // 472
                                if (err) console.err("Error deleting: " + err);else {               // 473
                                    var ok = cookie_holder.update_cookies(response);                // 475
                                    updates.push({                                                  // 476
                                        key: "delete",                                              // 477
                                        message: ok ? "success" : "failed"                          // 478
                                    });                                                             // 476
                                }                                                                   // 480
                                next();                                                             // 481
                            });                                                                     // 482
                        }                                                                           // 483
                                                                                                    //
                        function next() {                                                           // 484
                            builder.set_item(item);                                                 // 485
                            var xml = builder.get_xml();                                            // 486
                            exact.postBOM(xml).on('complete', function (data, response) {           // 487
                                if (response.statusCode > 200) {                                    // 488
                                    console.warn("BOM post status code: " + response.statusCode);   // 489
                                    updates.push({                                                  // 490
                                        key: response.statusCode,                                   // 491
                                        msg: "Error occurred"                                       // 492
                                    });                                                             // 490
                                } else {                                                            // 494
                                    data.eExact.Messages[0].Message.forEach(function (elem) {       // 496
                                        var key = elem.Topic[0].Data[0].$.keyAlt;                   // 497
                                        var msg = elem.Description[0];                              // 498
                                        updates.push({                                              // 499
                                            key: key,                                               // 500
                                            message: msg                                            // 501
                                        });                                                         // 499
                                    });                                                             // 503
                                }                                                                   // 504
                                                                                                    //
                                i++;                                                                // 505
                                                                                                    //
                                if (i < dest_items.length) {                                        // 506
                                    setTimeout(iterator, 2000);                                     // 507
                                } else if (!cb_called) {                                            // 508
                                    cb(null, updates);                                              // 510
                                    cb_called = true;                                               // 511
                                } else {                                                            // 512
                                    console.warn("callback overcall!");                             // 514
                                }                                                                   // 515
                                                                                                    //
                                ;                                                                   // 515
                            });                                                                     // 516
                        }                                                                           // 517
                    });                                                                             // 518
                }                                                                                   // 519
                                                                                                    //
                return iterator;                                                                    // 464
            })()();                                                                                 // 464
        });                                                                                         // 520
    },                                                                                              // 521
    getBOM: function (source_ID, cb) {                                                              // 522
        exact.get(exact_get_url, {                                                                  // 523
            query: {                                                                                // 524
                access_token: access_token,                                                         // 525
                Params_Item: '{' + source_ID + '}',                                                 // 526
                _Division_: division,                                                               // 527
                Topic: 'ManufacturedBillOfMaterials'                                                // 528
            },                                                                                      // 524
            parser: rest.parsers.xml                                                                // 529
        }).on('complete', function (data, res) {                                                    // 523
            if (!data.eExact.ManufacturedBillofMaterials) {                                         // 531
                console.warn("No BOM for " + source_ID);                                            // 532
                console.log(data);                                                                  // 533
                return cb(null, null);                                                              // 534
            }                                                                                       // 535
                                                                                                    //
            cb(null, data.eExact.ManufacturedBillofMaterials[0].ManufacturedBillofMaterial[0]);     // 536
        });                                                                                         // 537
    },                                                                                              // 538
    getBOMID: function (item_ID, cb) {                                                              // 539
        exact.getBOM(item_ID, function (err, data) {                                                // 540
            if (err) return cb(err, data);                                                          // 541
            var id = data.eExact.ManufacturedBillofMaterials[0].ManufacturedBillofMaterial[0].$.ID;
            cb(null, id);                                                                           // 543
        });                                                                                         // 544
    },                                                                                              // 545
    postBOM: function (xml) {                                                                       // 546
        return exact.post(exact_post_url, {                                                         // 547
            query: {                                                                                // 548
                access_token: access_token,                                                         // 548
                Topic: 'ManufacturedBillOfMaterials'                                                // 549
            },                                                                                      // 548
            parser: rest.parsers.xml,                                                               // 550
            data: xml                                                                               // 551
        });                                                                                         // 547
    },                                                                                              // 553
    "delete": function (id, cookie_holder, cb) {                                                    // 554
        exact.get('/docs/LogItemVersion.aspx', {                                                    // 555
            query: {                                                                                // 556
                ID: id,                                                                             // 557
                BCAction: 3,                                                                        // 558
                CSRFToken: cookie_holder.get_csrf(),                                                // 559
                _Division_: division                                                                // 560
            },                                                                                      // 556
            headers: {                                                                              // 563
                Cookie: cookie_holder.get_cookies()                                                 // 564
            },                                                                                      // 563
            timeout: 5000                                                                           // 566
        }).on('complete', function (data, response) {                                               // 555
            cb(null, data, response);                                                               // 568
        }).on('timeout', function () {                                                              // 569
            console.error("Timeout!! retrying...");                                                 // 570
            setTimeout(function () {                                                                // 571
                exact.delete(id, cookie_holder, cb);                                                // 572
            }, 1000);                                                                               // 573
        }).on('error', function () {                                                                // 574
            console.error('error!');                                                                // 575
        });                                                                                         // 576
    }                                                                                               // 577
});                                                                                                 // 160
                                                                                                    //
function cookieFormat(cookies) {                                                                    // 580
    var res = "";                                                                                   // 581
                                                                                                    //
    for (var key in meteorBabelHelpers.sanitizeForInObject(cookies)) {                              // 582
        if (cookies.hasOwnProperty(key)) {                                                          // 583
            res += key + "=" + cookies[key] + ";";                                                  // 584
        }                                                                                           // 585
    }                                                                                               // 586
                                                                                                    //
    return res;                                                                                     // 587
}                                                                                                   // 588
                                                                                                    //
var CookieHolder = function (cookies) {                                                             // 590
    var self = this;                                                                                // 591
    this.cookies = cookies;                                                                         // 592
                                                                                                    //
    this.get_cookies = function () {                                                                // 593
        var res = "";                                                                               // 594
                                                                                                    //
        for (var key in meteorBabelHelpers.sanitizeForInObject(self.cookies)) {                     // 595
            if (self.cookies.hasOwnProperty(key)) {                                                 // 596
                res += key + "=" + self.cookies[key] + ";";                                         // 597
            }                                                                                       // 598
        }                                                                                           // 599
                                                                                                    //
        return res;                                                                                 // 600
    };                                                                                              // 601
                                                                                                    //
    this.update_cookies = function (response) {                                                     // 602
        var cookies = cookie_parser.parse(response);                                                // 603
                                                                                                    //
        if (cookies.length == 0) {                                                                  // 604
            console.err('No cookies found!');                                                       // 605
        } else {                                                                                    // 606
            var ack = false;                                                                        // 608
            cookies.forEach(function (cookie) {                                                     // 609
                console.log("Cookie: " + cookie.name);                                              // 610
                self.cookies[cookie.name] = cookie.value;                                           // 611
                                                                                                    //
                if (cookie.name == "PERSIST-EXACT") {                                               // 612
                    ack = true;                                                                     // 613
                }                                                                                   // 614
            });                                                                                     // 615
        }                                                                                           // 616
                                                                                                    //
        return ack;                                                                                 // 617
    };                                                                                              // 618
                                                                                                    //
    this.get_csrf = function () {                                                                   // 619
        return self.cookies.CSRFToken;                                                              // 620
    };                                                                                              // 621
};                                                                                                  // 623
                                                                                                    //
var BOMBuilder = function (data) {                                                                  // 625
    var self = this;                                                                                // 626
    this.data = data;                                                                               // 627
    this.boms = this.data.eExact.ManufacturedBillofMaterials[0].ManufacturedBillofMaterial;         // 628
    this.base_bom = this.boms[0];                                                                   // 629
    this.builder = new xml2js.Builder();                                                            // 630
                                                                                                    //
    this.set_item = function (item) {                                                               // 631
        var props = self.base_bom.Item[0];                                                          // 632
        props.$.ID = item.id;                                                                       // 633
        props.$.code = item.code;                                                                   // 634
        props.Description[0] = item.description;                                                    // 635
    };                                                                                              // 636
                                                                                                    //
    this.get_xml = function () {                                                                    // 637
        return self.builder.buildObject(this.data);                                                 // 638
    }; //Unused                                                                                     // 639
                                                                                                    //
                                                                                                    //
    this.add = function (bom) {                                                                     // 643
        self.boms.push(bom);                                                                        // 644
    };                                                                                              // 645
                                                                                                    //
    this.add_copy = function (item) {                                                               // 646
        var new_bom = clone(self.base_bom);                                                         // 647
        var props = new_bom.Item[0];                                                                // 648
        props.$.ID = item.id;                                                                       // 649
        props.$.code = item.code;                                                                   // 650
        props.Description[0] = item.description;                                                    // 651
        self.add(new_bom);                                                                          // 652
    };                                                                                              // 653
};                                                                                                  // 654
//////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/wildarch:exact-api/exact-api.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['wildarch:exact-api'] = {}, {
  exactapi: exactapi
});

})();

//# sourceMappingURL=wildarch_exact-api.js.map
