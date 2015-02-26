/* import directives */ var directives = require('./../directives');
/* import SyncStorage */ var SyncStorage = window.SyncStorage;
/* import Storage */ var Storage = require('./../services/Storage');

directives.addTemplate("todo", {
    view: "="
}, function($scope, attr, elem) {
    var saveTodo = function() {
        $scope.view.save();
    }
    $scope.onclick = function() {
        $scope.edited = true;
    }
    $scope.onblur = function() {
        $scope.edited = false;
        saveTodo();
    }
    $scope.ondelete = function() {
        $scope.view.todo.deleted = true;
        saveTodo();
    }
    $scope.oncheck = function() {
        $scope.view.todo.done = !$scope.view.todo.done;
        saveTodo();
    }
});
