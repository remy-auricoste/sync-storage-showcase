/* import directives */ var directives = require('./../directives');
/* import SyncStorage */ var SyncStorage = window.SyncStorage;
/* import Storage */ var Storage = require('./../services/Storage');

directives.addTemplate("todo", {
    todo: "="
}, function($scope, attr, elem) {
    var saveTodo = function() {
        Storage.promise.then(function() {
            return Storage.save($scope.todo).then(function(result) {
                console.log("result save=");
                console.log(result);
                $scope.todo = result;
                $scope.$apply();
            });
        });
    }
    $scope.onclick = function() {
        $scope.edited = true;
    }
    $scope.onblur = function() {
        $scope.edited = false;
        saveTodo();
    }
    $scope.ondelete = function() {
        $scope.todo.deleted = true;
        saveTodo();
    }
    $scope.oncheck = function() {
        $scope.todo.done = !$scope.todo.done;
        saveTodo();
    }
});
