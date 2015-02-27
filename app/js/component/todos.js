/* import directives */ var directives = require('./../directives');
/* import SyncStorage */ var SyncStorage = window.SyncStorage;
/* import Storage */ var Storage = require('./../services/Storage');
/* import Todo */ var Todo = require('./../Todo');

directives.addTemplate("todos", {
    storage: "="
}, function($scope, attr, elem) {
    var storage = $scope.storage;

    var View = function(todo) {
        this.todo = todo;
    }
    View.prototype.save = function() {
        var self = this;
        var todo = self.todo;
        return storage.promise.then(function() {
            return storage.save(todo).then(function(result) {
                console.log("result save=");
                console.log(result);
                self.todo = result;
                $scope.$apply();
            });
        }).fail(function(err) {
            console.error(err);
        });
    }
    View.prototype.getId = function() {
        return this.todo._id+"/"+this.todo._rev;
    }

    storage.promise.then(function() {
        var lastFilter = SyncStorage.query.Filter.value("_last", true);
        return storage.query(new SyncStorage.query.Query(null, [lastFilter])).then(function(result) {
            console.log("test");
            console.log(result);
            $scope.todos = result.rows;
            if (!($scope.todos && $scope.todos.length)) {
                $scope.todos = Meta.map([1, 2, 3], function(num) {
                    return new Todo("todo" + num);
                });
                Meta.map($scope.todos, function(todo) {
                    storage.save(todo);
                });
            }
            console.log($scope.todos);
            $scope.views = Meta.map($scope.todos, function(todo) {
                return new View(todo);
            });
            console.log($scope.views);
            $scope.$apply();
        }).fail(function(err) {
            console.error(err + "");
        });
    });

   $scope.add = function() {
       var todo = new Todo("new todo");
       var view = new View(todo);
       $scope.views.push(view);
       view.save();
   }
});
