/* import directives */ var directives = require('./../directives');

directives.addTemplate("todo", {
    todo: "="
}, function($scope, attr, elem) {
    $scope.onclick = function() {
        $scope.edited = true;
    }
    $scope.onblur = function() {
        $scope.edited = false;
    }
    $scope.ondelete = function() {
        $scope.todo.deleted = true;
    }
    $scope.oncheck = function() {
        $scope.todo.done = !$scope.todo.done;
    }
});
