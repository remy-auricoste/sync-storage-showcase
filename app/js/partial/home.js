/* import myApp */ var myApp = require('./../myApp');
/* import Meta */ var Meta = window.Meta;
/* import Todo */ var Todo = require('./../Todo');
/* import todo */ var todo = require('./../component/todo');
/* import todos */ var todos = require('./../component/todos');
/* import Storage */ var Storage = require('./../services/Storage');
/* import SyncStorage */ var SyncStorage = window.SyncStorage;

myApp.controller('home', ["$scope", function($scope) {
    $scope.storage1 = Storage("todos");
    $scope.storage2 = Storage("todos2");

    $scope.onSync = function() {
        $scope.storage1.syncWith($scope.storage2).then(function(result) {
            console.log("sync success");
            console.log(result);
            $scope.$apply();
        }).fail(function(err) {
            console.error(err);
        });
    }
}])
