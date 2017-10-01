var require = meteorInstall({"subsites":{"bomb":{"itemselector":{"itemselector.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// subsites/bomb/itemselector/itemselector.js                                                                   //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
if (Meteor.isClient) {                                                                                          // 1
    Template.ItemSelector.helpers({                                                                             // 2
        categories: function () {                                                                               // 3
            var cats = BOMBCategories.find({}).fetch();                                                         // 4
            cats.forEach(function (cat) {                                                                       // 5
                cat.items = BOMBItems.find({                                                                    // 6
                    group_id: cat.id                                                                            // 7
                }).fetch();                                                                                     // 6
            });                                                                                                 // 9
            return cats;                                                                                        // 10
        },                                                                                                      // 11
        cat_is_empty: function (id) {                                                                           // 12
            console.log("id: " + id);                                                                           // 13
            var count = BOMBItems.find({                                                                        // 14
                group_id: id                                                                                    // 15
            }).count();                                                                                         // 14
            console.log("number of items: " + count);                                                           // 17
            return count == 0;                                                                                  // 18
        }                                                                                                       // 19
    });                                                                                                         // 2
    Template.ItemSelector.onRendered(function () {                                                              // 22
        $('.accordion').accordion({});                                                                          // 23
    });                                                                                                         // 24
    Template.ItemSelector.events({                                                                              // 26
        'click .button': function () {                                                                          // 27
            var id = this.id;                                                                                   // 28
            var boxes = $(':not(.radio).checkbox[data-category=' + id + ']');                                   // 29
                                                                                                                //
            if (boxes.first().checkbox('is checked')) {                                                         // 30
                boxes.checkbox('uncheck');                                                                      // 31
            } else {                                                                                            // 32
                boxes.checkbox('check');                                                                        // 34
            }                                                                                                   // 35
        }                                                                                                       // 36
    });                                                                                                         // 26
}                                                                                                               // 38
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"bomb.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// subsites/bomb/bomb.js                                                                                        //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
BOMBCategories = new Mongo.Collection("bomb_categories");                                                       // 1
BOMBItems = new Mongo.Collection("bomb_items");                                                                 // 2
                                                                                                                //
if (Meteor.isClient) {                                                                                          // 4
    Meteor.subscribe("bomb_categories");                                                                        // 5
    Meteor.subscribe("bomb_items");                                                                             // 6
    Template.bomb.onCreated(function () {                                                                       // 8
        Meteor.call("refreshItems");                                                                            // 9
    });                                                                                                         // 10
    Template.bomb.events({                                                                                      // 12
        'click .negative.button': function (e) {                                                                // 13
            console.log("Click!");                                                                              // 14
            var form_values = $('.bomb.form').serializeArray();                                                 // 15
            var base_id = "";                                                                                   // 16
            var apply_ids = [];                                                                                 // 17
            var cookies = {};                                                                                   // 18
            form_values.forEach(function (input) {                                                              // 19
                if (input.name == "base") {                                                                     // 20
                    base_id = input.value;                                                                      // 21
                } else if (input.name == "apply") {                                                             // 22
                    apply_ids.push(input.value);                                                                // 24
                } else {                                                                                        // 25
                    cookies[input.name] = input.value;                                                          // 27
                }                                                                                               // 28
            });                                                                                                 // 29
            Session.set("isRunning", true);                                                                     // 30
            Session.set("runFinishTime", new Date().getTime() + apply_ids.length * 2000);                       // 31
            Meteor.call("copyBOM", {                                                                            // 32
                base: base_id,                                                                                  // 33
                apply: apply_ids,                                                                               // 34
                cookies: cookies                                                                                // 35
            }, function (err, res) {                                                                            // 32
                Session.set("bombServerResponse", res);                                                         // 37
                Session.set("isRunning", false);                                                                // 38
            });                                                                                                 // 39
        }                                                                                                       // 40
    });                                                                                                         // 12
    Template.bomb.helpers({                                                                                     // 43
        cookies: function () {                                                                                  // 44
            return ['ExactOnlineLogin', 'ASP.NET_SessionId', 'PERSIST-EXACT', 'CSRFToken'];                     // 45
        },                                                                                                      // 46
        server_res: function () {                                                                               // 47
            return Session.get("bombServerResponse");                                                           // 48
        },                                                                                                      // 49
        running: function () {                                                                                  // 50
            return Session.get("isRunning");                                                                    // 51
        },                                                                                                      // 52
        run_time_remaining: function () {                                                                       // 53
            var seconds = Math.ceil((Session.get('runFinishTime') - new Date()) / 1000);                        // 54
            return Math.max(0, seconds);                                                                        // 55
        },                                                                                                      // 56
        color: function (msg) {                                                                                 // 57
            if (msg == "failed") {                                                                              // 58
                return "red";                                                                                   // 59
            } else {                                                                                            // 60
                return "blue";                                                                                  // 61
            }                                                                                                   // 62
        }                                                                                                       // 63
    });                                                                                                         // 43
} else if (Meteor.isServer) {                                                                                   // 65
    Meteor.publish("bomb_categories", function () {                                                             // 67
        return BOMBCategories.find({});                                                                         // 68
    });                                                                                                         // 69
    Meteor.publish("bomb_items", function () {                                                                  // 70
        return BOMBItems.find({});                                                                              // 71
    });                                                                                                         // 72
    Meteor.methods({                                                                                            // 73
        refreshItems: function () {                                                                             // 74
            console.log("Refreshing Items");                                                                    // 75
                                                                                                                //
            if (!exactapi.isAuthorized()) {                                                                     // 76
                console.log("Exact is not linked");                                                             // 77
                return;                                                                                         // 78
            }                                                                                                   // 79
                                                                                                                //
            var groups = exactapi.getItemGroups();                                                              // 81
            console.log("Found " + groups.length + " groups!");                                                 // 82
            BOMBCategories.remove({});                                                                          // 83
            BOMBCategories.batchInsert(groups);                                                                 // 84
            BOMBItems.remove({});                                                                               // 86
            groups.forEach(function (group) {                                                                   // 87
                var items = exactapi.getItems(group.id);                                                        // 88
                console.log("Found " + items.length + " items for group " + group.description);                 // 89
                items.forEach(function (item) {                                                                 // 90
                    BOMBItems.insert({                                                                          // 91
                        id: item.ID,                                                                            // 92
                        description: item.Description,                                                          // 93
                        group_id: item.ItemGroup,                                                               // 94
                        code: item.Code                                                                         // 95
                    });                                                                                         // 91
                });                                                                                             // 97
            });                                                                                                 // 98
        },                                                                                                      // 99
        copyBOM: function (ids) {                                                                               // 100
            console.log("Will apply BOM of " + ids.base + " to " + ids.apply);                                  // 101
                                                                                                                //
            for (var key in meteorBabelHelpers.sanitizeForInObject(ids.cookies)) {                              // 102
                if (ids.cookies.hasOwnProperty(key)) {                                                          // 103
                    console.log(key + ": " + ids.cookies[key]);                                                 // 104
                }                                                                                               // 105
            }                                                                                                   // 106
                                                                                                                //
            var destItems = [];                                                                                 // 107
            ids.apply.forEach(function (id) {                                                                   // 108
                destItems.push(BOMBItems.findOne({                                                              // 109
                    id: id                                                                                      // 109
                }));                                                                                            // 109
            });                                                                                                 // 110
            console.log("Copying BOM");                                                                         // 111
            var res = exactapi.copyBOM(ids.base, destItems, ids.cookies);                                       // 112
            console.log(res);                                                                                   // 113
            return res;                                                                                         // 114
        }                                                                                                       // 116
    });                                                                                                         // 73
}                                                                                                               // 118
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"project":{"server":{"bindings.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// subsites/project/server/bindings.js                                                                          //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
/**                                                                                                             // 1
 * Created by daan on 05/07/16.                                                                                 //
 */Meteor.methods({                                                                                             //
    getBOM: function (sourceID) {                                                                               // 6
        return exactapi.getBOM(sourceID);                                                                       // 7
    },                                                                                                          // 8
    getShopOrder: function (nr) {                                                                               // 9
        return exactapi.getShopOrder(nr);                                                                       // 10
    },                                                                                                          // 11
    getItem: function (item_id) {                                                                               // 12
        return exactapi.getItem(item_id);                                                                       // 13
    },                                                                                                          // 14
    getSalesOrder: function (orderID) {                                                                         // 15
        return exactapi.getSalesOrder(orderID);                                                                 // 16
    },                                                                                                          // 17
    getShopOrderChildren: function (orderID) {                                                                  // 18
        return exactapi.getShopOrderChildren(orderID);                                                          // 19
    },                                                                                                          // 20
    getShopOrders: function (options) {                                                                         // 21
        return exactapi.getShopOrders(options);                                                                 // 22
    },                                                                                                          // 23
    getProject: function (options) {                                                                            // 24
        return exactapi.getProject(options);                                                                    // 25
    }                                                                                                           // 26
});                                                                                                             // 5
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"server":{"ordersync.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// server/ordersync.js                                                                                          //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
/**                                                                                                             // 1
 * Created by daan on 31-10-15.                                                                                 //
 */Meteor.methods({                                                                                             //
    getExactURL: function () {                                                                                  // 6
        return exactapi.getAuthURL();                                                                           // 7
    },                                                                                                          // 8
    exactIsLinked: function () {                                                                                // 9
        return exactapi.isAuthorized();                                                                         // 10
    },                                                                                                          // 11
    getDivision: function () {                                                                                  // 12
        return exactapi.getDivision();                                                                          // 13
    },                                                                                                          // 14
    getDivisions: function () {                                                                                 // 15
        return exactapi.getDivisions();                                                                         // 16
    },                                                                                                          // 17
    setDivision: function (value) {                                                                             // 18
        exactapi.setDivision(parseInt(value));                                                                  // 19
    },                                                                                                          // 20
    updateOrders: function () {                                                                                 // 21
        updateOrders();                                                                                         // 22
    },                                                                                                          // 23
    updateCategories: function () {                                                                             // 24
        Categories.find({}).forEach(function (cat) {                                                            // 25
            Orders.update({                                                                                     // 26
                category: cat.description                                                                       // 27
            }, {                                                                                                // 26
                $set: {                                                                                         // 29
                    hoursTotal: cat.hours                                                                       // 30
                }                                                                                               // 29
            }, {                                                                                                // 28
                multi: true                                                                                     // 33
            });                                                                                                 // 32
        });                                                                                                     // 35
    }                                                                                                           // 36
});                                                                                                             // 5
                                                                                                                //
var dateFormat = function (date) {                                                                              // 40
    var res = date.getFullYear() + '-';                                                                         // 41
    var month = date.getMonth() + 1;                                                                            // 42
    if (month < 10) res += "0";                                                                                 // 43
    res += month + '-';                                                                                         // 44
    var day = date.getDate();                                                                                   // 45
    if (day < 10) res += "0";                                                                                   // 46
    res += day;                                                                                                 // 47
    return res;                                                                                                 // 48
};                                                                                                              // 49
                                                                                                                //
Meteor.setInterval(updateOrders, 5 * 60 * 1000); //5 Minutes                                                    // 51
                                                                                                                //
Meteor.setTimeout(updateOrders, 1000 * 10); //After 10 seconds, try once                                        // 52
                                                                                                                //
var MAXDIFF = 8.64e+9; //PlannedDate may be 100 days before today                                               // 54
                                                                                                                //
function updateOrders() {                                                                                       // 56
    console.log("Synchronized orders...");                                                                      // 57
                                                                                                                //
    if (!exactapi.isAuthorized()) {                                                                             // 58
        console.log("Exact is not linked");                                                                     // 59
        return;                                                                                                 // 60
    }                                                                                                           // 61
                                                                                                                //
    var orders = exactapi.getShopOrders({                                                                       // 63
        max_status: 20,                                                                                         // 64
        min_date: new Date(Date.now() - MAXDIFF).toJSON()                                                       // 65
    });                                                                                                         // 63
    var newOrders = [];                                                                                         // 68
    orders.forEach(function (order) {                                                                           // 69
        var databaseElem = {                                                                                    // 70
            number: order.ShopOrderNumber,                                                                      // 71
            plannedDate: exactapi.parseJSONDate(order.PlannedDate),                                             // 72
            description: order.Description,                                                                     // 73
            status: order.Status,                                                                               // 74
            entryDate: exactapi.parseJSONDate(order.EntryDate)                                                  // 75
        };                                                                                                      // 70
        var blacklist = Blacklist.findOne({                                                                     // 78
            type: 'order',                                                                                      // 78
            number: databaseElem.number                                                                         // 78
        });                                                                                                     // 78
                                                                                                                //
        if (blacklist) {                                                                                        // 79
            console.log("Order " + databaseElem.number + " is on the blacklist, discarding...");                // 80
            return;                                                                                             // 81
        }                                                                                                       // 82
                                                                                                                //
        if (Date.now() - databaseElem.plannedDate > MAXDIFF) {                                                  // 84
            console.log("Order " + databaseElem.number + " is more than 100 days old, discarding...");          // 85
            return;                                                                                             // 86
        }                                                                                                       // 87
                                                                                                                //
        var salesOrderLine = order.SalesOrderLines.results[0];                                                  // 89
                                                                                                                //
        if (salesOrderLine) {                                                                                   // 90
            databaseElem.description = salesOrderLine.Description;                                              // 91
            databaseElem.customer = exactapi.getSalesOrder(salesOrderLine.OrderID).DeliverToName;               // 92
            databaseElem.salesOrderLines = [];                                                                  // 93
            exactapi.getSalesOrderLines(salesOrderLine.OrderID).forEach(function (line) {                       // 94
                databaseElem.salesOrderLines[line.LineNumber - 1] = {                                           // 95
                    deliveryDate: dateFormat(exactapi.parseJSONDate(line.DeliveryDate)),                        // 96
                    description: line.Description,                                                              // 97
                    netPrice: line.NetPrice,                                                                    // 98
                    discount: (parseFloat(line.Discount) * 100).toFixed(2)                                      // 99
                };                                                                                              // 95
            });                                                                                                 // 101
        } else {                                                                                                // 102
            console.log("No sales order line: " + order.SalesOrderLines);                                       // 104
        }                                                                                                       // 105
                                                                                                                //
        var old_elem = Orders.findOne({                                                                         // 107
            number: order.ShopOrderNumber                                                                       // 107
        });                                                                                                     // 107
                                                                                                                //
        if (old_elem) {                                                                                         // 108
            //console.log("Taking category from old entry");                                                    // 109
            databaseElem.category = old_elem.category;                                                          // 110
            databaseElem.tasks = old_elem.tasks;                                                                // 111
            if (old_elem.hoursTotal) databaseElem.hoursTotal = old_elem.hoursTotal;                             // 112
        } else {                                                                                                // 113
            var item = exactapi.getItem(order.Item);                                                            // 115
                                                                                                                //
            if (item) {                                                                                         // 116
                databaseElem.category = item.ItemGroupDescription;                                              // 117
                var cat = Categories.findOne({                                                                  // 118
                    description: databaseElem.category                                                          // 118
                });                                                                                             // 118
                                                                                                                //
                if (cat) {                                                                                      // 119
                    databaseElem.hoursTotal = cat.hours;                                                        // 120
                } else {                                                                                        // 121
                    console.log("No matching category found for " + databaseElem.category);                     // 123
                }                                                                                               // 124
            } else {                                                                                            // 125
                console.log("No item on order " + order.ShopOrderNumber);                                       // 127
            }                                                                                                   // 128
        }                                                                                                       // 129
                                                                                                                //
        newOrders.push(databaseElem);                                                                           // 130
    });                                                                                                         // 131
                                                                                                                //
    if (newOrders.length == 0) {                                                                                // 132
        console.log("NO ORDERS FOUND!");                                                                        // 133
        return;                                                                                                 // 134
    }                                                                                                           // 135
                                                                                                                //
    Orders.remove({});                                                                                          // 136
    Orders.batchInsert(newOrders);                                                                              // 137
    console.log("Synchronized " + newOrders.length + " orders");                                                // 138
}                                                                                                               // 139
                                                                                                                //
Meteor.setInterval(function () {                                                                                // 141
    console.log("Refreshing token");                                                                            // 142
    exactapi.tokenRefresh();                                                                                    // 143
}, 500 * 1000); //Every 8.33 minutes a token refresh occurs                                                     // 144
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"blueboard.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// blueboard.js                                                                                                 //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
Employees = new Mongo.Collection("employees");                                                                  // 1
Events = new Mongo.Collection("events");                                                                        // 2
Orders = new Mongo.Collection("orders");                                                                        // 3
Categories = new Mongo.Collection("categories");                                                                // 4
Blacklist = new Mongo.Collection("blacklist");                                                                  // 5
                                                                                                                //
if (Meteor.isClient) {                                                                                          // 7
    var addEvent = function (date) {                                                                            // 7
        var employee = Session.get("newEventEmployee");                                                         // 39
        var order = Session.get("newEventOrder");                                                               // 40
        var start;                                                                                              // 41
        var allday = $('.fc').fullCalendar("getView").type != "agendaDay";                                      // 42
                                                                                                                //
        if (!date) {                                                                                            // 43
            date = $("#newEventDate").val();                                                                    // 44
            var moment = $.fullCalendar.moment;                                                                 // 45
                                                                                                                //
            if (allday) {                                                                                       // 46
                start = moment(date);                                                                           // 47
            } else {                                                                                            // 48
                //Start at 8 AM if no time was provided                                                         // 50
                start = moment(date + 'T08:00');                                                                // 51
            }                                                                                                   // 52
        } else {                                                                                                // 53
            start = date;                                                                                       // 55
        }                                                                                                       // 56
                                                                                                                //
        var hours = parseInt($("#newEventHours").val()) || 0;                                                   // 57
        var end;                                                                                                // 58
                                                                                                                //
        if (!allday) {                                                                                          // 59
            end = start.clone();                                                                                // 60
            end.hours(start.hours() + hours);                                                                   // 61
            end = end.format();                                                                                 // 62
        }                                                                                                       // 63
                                                                                                                //
        var newEvent = {                                                                                        // 64
            start: start.format(),                                                                              // 65
            end: end,                                                                                           // 66
            allday: false,                                                                                      // 67
            employee: employee,                                                                                 // 68
            hours: hours                                                                                        // 69
        };                                                                                                      // 64
        var formSide = $('.special.event.form').parent().parent();                                              // 71
                                                                                                                //
        if (formSide.hasClass('active')) {                                                                      // 72
            //If the active side of the bar is the orderless one,                                               // 72
            //This is a special event without an order                                                          // 73
            newEvent.type = $('input[name="itemType"]:checked').val();                                          // 74
            newEvent.description = $('input[name="notes"]').val();                                              // 75
        } else {                                                                                                // 76
            //This is a standard event with an order                                                            // 78
            newEvent.order = order;                                                                             // 79
            var fullOrder = Orders.findOne({                                                                    // 80
                number: parseInt(order)                                                                         // 80
            });                                                                                                 // 80
                                                                                                                //
            if (fullOrder) {                                                                                    // 81
                newEvent.customer = fullOrder.customer;                                                         // 82
                newEvent.description = fullOrder.description;                                                   // 83
            }                                                                                                   // 84
        }                                                                                                       // 85
                                                                                                                //
        Events.insert(newEvent, function (error, id) {                                                          // 86
            if (error) return console.error(error);                                                             // 87
        });                                                                                                     // 88
    };                                                                                                          // 89
                                                                                                                //
    Meteor.subscribe("employees");                                                                              // 8
    Meteor.subscribe("events");                                                                                 // 9
    Meteor.subscribe("orders");                                                                                 // 10
    Meteor.subscribe("categories");                                                                             // 11
    Meteor.subscribe("blacklist");                                                                              // 12
    Template.calendar.onRendered(function () {                                                                  // 15
        var calendar = $('#calendar');                                                                          // 16
        calendar.fullCalendar();                                                                                // 17
                                                                                                                //
        function onEventsChanged() {                                                                            // 19
            $(".fc").fullCalendar("refetchEvents");                                                             // 20
        }                                                                                                       // 21
                                                                                                                //
        ; //Make sure any changes to the events are passed on to all clients                                    // 21
                                                                                                                //
        Events.find({}).observeChanges({                                                                        // 24
            added: function () {                                                                                // 25
                onEventsChanged();                                                                              // 26
            },                                                                                                  // 27
            changed: function () {                                                                              // 28
                onEventsChanged();                                                                              // 29
            },                                                                                                  // 30
            removed: function () {                                                                              // 31
                onEventsChanged();                                                                              // 32
            }                                                                                                   // 33
        });                                                                                                     // 24
    });                                                                                                         // 36
    ; //Updates the state of the new event button, depending on selected employees, orders and the side of the order bar
                                                                                                                //
    window.setAddEventState = function () {                                                                     // 92
        var ordersVisible = $('.side').first().hasClass('active');                                              // 93
        var specialTypeSelected = !$('.special.event.checkbox').checkbox('is unchecked').every(function (val) {
            return val;                                                                                         // 95
        });                                                                                                     // 95
                                                                                                                //
        if (Session.get("newEventEmployee") && ( //An employee has been selected                                // 97
        Session.get("newEventOrder") && ordersVisible || //An order is selected and we are on the orders side   // 98
        !ordersVisible && specialTypeSelected) //We are on the special side and a type is selected              // 99
        ) {                                                                                                     // 97
                // Enable the button                                                                            // 101
                Session.set("addEventButtonState", "active");                                                   // 102
                console.log("sts: " + specialTypeSelected);                                                     // 103
                console.log("ov: " + ordersVisible);                                                            // 104
            } else {                                                                                            // 105
            // Disable                                                                                          // 107
            Session.set("addEventButtonState", "disabled");                                                     // 108
        }                                                                                                       // 109
                                                                                                                //
        updateNewEventDraggable();                                                                              // 110
    };                                                                                                          // 111
                                                                                                                //
    var onEventChange = function (event) {                                                                      // 113
        var savedEvent = {                                                                                      // 114
            _id: event._id,                                                                                     // 115
            title: event.title,                                                                                 // 116
            start: event.start.format(),                                                                        // 117
            allday: event.allday,                                                                               // 118
            employee: event.employee,                                                                           // 119
            order: event.order,                                                                                 // 120
            hours: event.hours,                                                                                 // 121
            customer: event.customer,                                                                           // 122
            description: event.description,                                                                     // 123
            type: event.type                                                                                    // 124
        };                                                                                                      // 114
                                                                                                                //
        if (event.end) {                                                                                        // 126
            //Update the number of hours                                                                        // 127
            savedEvent.end = event.end.format();                                                                // 128
            savedEvent.hours = event.end.diff(event.start, 'hours');                                            // 129
        }                                                                                                       // 130
                                                                                                                //
        Events.update({                                                                                         // 131
            _id: savedEvent._id                                                                                 // 131
        }, savedEvent, {                                                                                        // 131
            multi: false,                                                                                       // 131
            upsert: true                                                                                        // 131
        }, function (error, affected) {                                                                         // 131
            if (error) console.error(error);                                                                    // 132
        });                                                                                                     // 133
    }; //Request the exact authentication url from the exact-api plugin                                         // 134
                                                                                                                //
                                                                                                                //
    Meteor.call("getExactURL", function (err, res) {                                                            // 137
        Session.set("exactURL", res);                                                                           // 138
    }); //Set the exact link state as a Session variable, so we can use it in spacebars                         // 139
                                                                                                                //
    Meteor.call("exactIsLinked", function (err, res) {                                                          // 142
        Session.set("exact_linked", res);                                                                       // 143
    });                                                                                                         // 144
    Template.navbar.helpers({                                                                                   // 146
        exact_url: function () {                                                                                // 147
            return Session.get("exactURL");                                                                     // 148
        },                                                                                                      // 149
        exact_linked: function () {                                                                             // 150
            return Session.get("exact_linked");                                                                 // 151
        }                                                                                                       // 152
    }); //Adds an order to the blacklist                                                                        // 146
                                                                                                                //
    window.addBlacklist = function (id) {                                                                       // 156
        var number = Orders.findOne({                                                                           // 157
            _id: id                                                                                             // 157
        }).number;                                                                                              // 157
        Blacklist.insert({                                                                                      // 158
            type: 'order',                                                                                      // 159
            number: number                                                                                      // 160
        });                                                                                                     // 158
        Orders.remove({                                                                                         // 162
            _id: id                                                                                             // 162
        });                                                                                                     // 162
    };                                                                                                          // 163
                                                                                                                //
    Template.resourcesbar.helpers({                                                                             // 165
        addEventButtonState: function () {                                                                      // 166
            return Session.get("addEventButtonState");                                                          // 167
        }                                                                                                       // 168
    });                                                                                                         // 165
    Template.resourcesbar.events({                                                                              // 171
        'click .add': function () {                                                                             // 172
            addEvent();                                                                                         // 173
        }                                                                                                       // 174
    });                                                                                                         // 171
    Template.resourcesbar.onRendered(function () {                                                              // 177
        $('#newEventDate').val(dateFormat(new Date()));                                                         // 178
        $('.shape').shape({                                                                                     // 179
            onChange: function () {                                                                             // 180
                setAddEventState();                                                                             // 181
            }                                                                                                   // 182
        });                                                                                                     // 179
        $('.special.event.radio.checkbox').checkbox({                                                           // 184
            onChange: function () {                                                                             // 185
                setAddEventState();                                                                             // 186
            }                                                                                                   // 187
        });                                                                                                     // 184
    });                                                                                                         // 189
    Template.calendar.helpers({                                                                                 // 191
        options: function () {                                                                                  // 192
            return {                                                                                            // 193
                theme: false,                                                                                   // 194
                weekends: false,                                                                                // 195
                businessHours: true,                                                                            // 196
                defaultView: 'basicWeek',                                                                       // 197
                header: {                                                                                       // 198
                    center: 'basicWeek, month, agendaDay'                                                       // 199
                },                                                                                              // 198
                editable: true,                                                                                 // 201
                events: function (start, end, tz, callback) {                                                   // 202
                    window.setTimeout(function () {                                                             // 203
                        var theEvents = Events.find({                                                           // 204
                            start: {                                                                            // 204
                                $gte: start.format()                                                            // 204
                            }                                                                                   // 204
                        });                                                                                     // 204
                        callback(theEvents.fetch());                                                            // 205
                    }, 200);                                                                                    // 206
                },                                                                                              // 207
                eventResize: function (event) {                                                                 // 208
                    onEventChange(event);                                                                       // 209
                },                                                                                              // 210
                eventDrop: function (event) {                                                                   // 211
                    onEventChange(event);                                                                       // 212
                },                                                                                              // 213
                eventRender: function (event, element) {                                                        // 214
                    var content = element.find(".fc-content");                                                  // 215
                    var title = element.find(".fc-title");                                                      // 216
                                                                                                                //
                    if (!title.length) {                                                                        // 217
                        console.log("No title!");                                                               // 218
                        $(content).prepend("<span style='float: left' class='fc-title'></span>");               // 219
                        title = content.find('.fc-title');                                                      // 220
                                                                                                                //
                        if (!title.length) {                                                                    // 221
                            console.log("Still can't find it");                                                 // 222
                        }                                                                                       // 223
                    }                                                                                           // 224
                                                                                                                //
                    title.html(getEventTitle(event));                                                           // 225
                    title.click(showEventProperties);                                                           // 226
                    content.append("<button onclick=\"showEventDeleteModal('" + event._id + "')\" class='ui compact transparent right floated icon button'><i class='remove icon'></i></button>");
                                                                                                                //
                    if (event.type == "Met verlof") {                                                           // 228
                        $(element).addClass('striped');                                                         // 229
                    } else $(element).css("background-color", getOrderColor(event.order));                      // 230
                                                                                                                //
                    if (hasEmployeeOverlap(event)) {                                                            // 232
                        $(element).css("border", "3px solid red");                                              // 233
                    }                                                                                           // 234
                },                                                                                              // 235
                dayClick: function (date) {                                                                     // 236
                    $('#newEventDate').val(dateFormat(date.toDate()));                                          // 237
                },                                                                                              // 238
                eventClick: function (event) {                                                                  // 239
                    Session.set("currentEvent", Events.findOne({                                                // 240
                        _id: event._id                                                                          // 240
                    }));                                                                                        // 240
                },                                                                                              // 241
                droppable: true,                                                                                // 242
                drop: function (date) {                                                                         // 243
                    addEvent(date);                                                                             // 244
                }                                                                                               // 245
            };                                                                                                  // 193
        }                                                                                                       // 248
    });                                                                                                         // 191
                                                                                                                //
    window.getEventTitle = function (event) {                                                                   // 251
        if (event.title) return event.title;                                                                    // 252
        var title = "";                                                                                         // 253
        if (event.order) title += event.order + ". ";                                                           // 254
        if (event.employee) title += event.employee + ": ";                                                     // 255
        if (event.type) title += event.type + ": ";                                                             // 256
        if (event.description) title += event.description + "<br />";                                           // 257
        if (event.customer) title += event.customer + ", ";                                                     // 258
        if (event.hours) title += event.hours + " uur";                                                         // 259
        return title;                                                                                           // 260
    };                                                                                                          // 262
                                                                                                                //
    window.hasEmployeeOverlap = function (event) {                                                              // 264
        if (event.type == "Met verlof") return false;                                                           // 265
        var start = event.start;                                                                                // 266
        var end;                                                                                                // 267
                                                                                                                //
        if (event.end) {                                                                                        // 268
            end = event.end;                                                                                    // 269
        } else {                                                                                                // 270
            end = event.start.clone().add(1, 'days');                                                           // 272
        }                                                                                                       // 273
                                                                                                                //
        var cursor = Events.find({                                                                              // 274
            $or: [{                                                                                             // 275
                start: {                                                                                        // 277
                    $lte: start.format()                                                                        // 278
                },                                                                                              // 277
                end: {                                                                                          // 280
                    $gte: end.format()                                                                          // 281
                }                                                                                               // 280
            }, {                                                                                                // 276
                start: start.format(),                                                                          // 285
                end: {                                                                                          // 286
                    $exists: false                                                                              // 287
                }                                                                                               // 286
            }],                                                                                                 // 284
            employee: event.employee,                                                                           // 292
            type: "Met verlof"                                                                                  // 293
        });                                                                                                     // 274
        return cursor.count() > 0;                                                                              // 295
    };                                                                                                          // 296
                                                                                                                //
    Accounts.ui.config({                                                                                        // 298
        passwordSignupFields: "USERNAME_ONLY"                                                                   // 299
    });                                                                                                         // 298
}                                                                                                               // 301
                                                                                                                //
if (Meteor.isServer) {                                                                                          // 303
    Meteor.publish("events", function () {                                                                      // 304
        return Events.find();                                                                                   // 305
    });                                                                                                         // 306
    Meteor.publish("orders", function () {                                                                      // 307
        return Orders.find();                                                                                   // 308
    });                                                                                                         // 309
    Meteor.publish("employees", function () {                                                                   // 310
        return Employees.find();                                                                                // 311
    });                                                                                                         // 312
    Meteor.publish("categories", function () {                                                                  // 313
        return Categories.find();                                                                               // 314
    });                                                                                                         // 315
    Meteor.publish("blacklist", function () {                                                                   // 316
        return Blacklist.find();                                                                                // 317
    });                                                                                                         // 318
    Meteor.startup(function () {// code to run on server at startup                                             // 319
    });                                                                                                         // 321
}                                                                                                               // 322
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"global.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// global.js                                                                                                    //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
daydiff = function (first, second) {                                                                            // 1
    return Math.round((second - first) / (1000 * 60 * 60 * 24));                                                // 2
};                                                                                                              // 3
                                                                                                                //
dateFormat = function (date) {                                                                                  // 4
    var res = date.getFullYear() + '-';                                                                         // 5
    var month = date.getMonth() + 1;                                                                            // 6
    if (month < 10) res += "0";                                                                                 // 7
    res += month + '-';                                                                                         // 8
    var day = date.getDate();                                                                                   // 9
    if (day < 10) res += "0";                                                                                   // 10
    res += day;                                                                                                 // 11
    return res;                                                                                                 // 12
};                                                                                                              // 13
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"routes.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// routes.js                                                                                                    //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
Meteor.startup(function () {                                                                                    // 1
    Router.route('/', {                                                                                         // 2
        template: 'main'                                                                                        // 3
    });                                                                                                         // 2
    Router.route("/project/:code", function () {                                                                // 6
        this.render("project", {                                                                                // 7
            data: {                                                                                             // 7
                code: this.params.code                                                                          // 7
            }                                                                                                   // 7
        });                                                                                                     // 7
    });                                                                                                         // 8
    Router.route("/project/", function () {                                                                     // 10
        this.render("project_search");                                                                          // 11
    });                                                                                                         // 12
    Router.route("/shoporder/:number", function () {                                                            // 14
        this.render('shoporder', {                                                                              // 15
            data: {                                                                                             // 15
                number: this.params.number                                                                      // 15
            }                                                                                                   // 15
        });                                                                                                     // 15
    });                                                                                                         // 16
    Router.route("/shoporder/", function () {                                                                   // 18
        this.render("shoporder_search");                                                                        // 19
    });                                                                                                         // 20
    console.log("Registering routes");                                                                          // 22
});                                                                                                             // 23
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},{
  "extensions": [
    ".js",
    ".json",
    ".ts"
  ]
});
require("./subsites/bomb/itemselector/itemselector.js");
require("./subsites/project/server/bindings.js");
require("./subsites/bomb/bomb.js");
require("./server/ordersync.js");
require("./blueboard.js");
require("./global.js");
require("./routes.js");
//# sourceMappingURL=app.js.map
