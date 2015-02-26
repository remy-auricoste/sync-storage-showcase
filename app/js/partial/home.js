/* import myApp */ var myApp = require('./../myApp');
/* import Meta */ var Meta = window.Meta;
/* import Todo */ var Todo = require('./../Todo');
/* import todo */ var todo = require('./../component/todo');
/* import Storage */ var Storage = require('./../services/Storage');
/* import SyncStorage */ var SyncStorage = window.SyncStorage;

myApp.controller('home', ["$scope", function($scope) {
    console.log(Storage);
    Storage.promise.then(function() {
        var lastFilter = SyncStorage.query.Filter.value("_last", true);
        return Storage.query(new SyncStorage.query.Query(null, [lastFilter])).then(function(result) {
            console.log("test");
            console.log(result);
            $scope.todos = result.rows;
            if (!($scope.todos && $scope.todos.length)) {
                $scope.todos = Meta.map([1, 2, 3], function(num) {
                    return new Todo("todo" + num);
                });
            }
            $scope.$apply();
        }).fail(function(err) {
            console.error(err + "");
        });
    });

    $scope.add = function() {
        var todo = new Todo("new todo");
        Storage.save(todo).then(function(result) {
            $scope.todos.push(result);
            $scope.$apply();
        });
    }
}])
