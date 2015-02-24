/* import Meta */ var Meta = window.Meta;
/* import SyncStorage */ var SyncStorage = window.SyncStorage;
/* import Todo */ var Todo = require('./Todo');

console.log("WOOOOO----------");
console.log(SyncStorage);
console.log(RemoteFacadeBridge);
var remoteBridge = new RemoteFacadeBridge({
    host: "http://localhost:5984",
    name: "showcase"
});
var remoteDb = new SyncStorage("showcase2", remoteBridge);
var localDb = new SyncStorage("localShowcase", new IndexedDbStorage({
    name: "localShowcase",
    indexes: ["_id", "_rev", "_timestamp", "value", "_conflict"]
}));
console.log(remoteDb);


var todos = _.map([1, 2, 3], function(num) {
    return new Todo("todo" + num);
});
todos = [];
var data = {
    isSyncing: true,
    hide_done: false,
    todos: todos,
    buttons: {
        binds: {
            ".todo_add": {
                onclick: function() {
                    data.todos.push(new TodoView(new Todo("empty")));
                    data.render();
                }
            },
            ".todo_hide_done": {
                onclick: function() {
                    data.hide_done = !data.hide_done;
                    data.render();
                }
            },
            ".todo_sync": {
                onclick: function() {
                    sync();
                }
            },
            ".todo_destroy": {
                onclick: function() {
                    remoteDb.destroy().then(function() {
                        return localDb.destroy();
                    }).then(function() {
                        data.render();
                    });
                }
            }
        }
    }
}
var template = new Template("todosApp", data, "container").render();
var saveTodo = function(todoView) {
        var todo = Todo.fromObject(todoView);
        var todoEntity = _.extend(todo, _.pick(todoView, "_id", "_rev"));
        localDb.save(todoEntity).then(function(result) {
            todoView._id = result._id;
            todoView._rev = result._rev;
        });
    }
localDb.init().then(function() {}).then(function() {
    return remoteDb.init();
}).then(function() {
    var filter = new Filter();
    var query = new Query(null, null, null);
    return localDb.query(query);
}).then(function(result) {
    console.log(result);
    if (result.total_rows) {
        _.each(result.rows, function(liste) {
            _.each(liste, function(todoEntity) {
                if (!todoEntity._id) {
                    return;
                }
                var view = new TodoView(todoEntity);
                view._templateId = todoEntity._id;
                data.todos.push(view);
            })
        });
    }
    data.isSyncing = false;
    data.render();
});
var periodicFct = function(interval, fonction) {
        setTimeout(function() {
            fonction();
            periodicFct(interval, fonction);
        }, interval);
    }
localDb.addListener("save", function(todoEntity) {
    if (!todoEntity._id) {
        return;
    }
    var view = new TodoView(todoEntity);
    view._templateId = todoEntity._id;
    data.todos.push(view);
    data.render();
});
var sync = function() {
        localDb.syncWith(remoteDb).then(function(result) {
            console.log(result);
            data.render();
        });
    };
//periodicFct(1000, sync);
