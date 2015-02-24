/* import myApp */ var myApp = require('./../myApp');
/* import Meta */ var Meta = window.Meta;
/* import Todo */ var Todo = require('./../Todo');
/* import todo */ var todo = require('./../component/todo');

myApp.controller('home', ["$scope", function($scope) {
    $scope.todos = Meta.map([1, 2, 3], function(num) {
        return new Todo("todo" + num);
    });
}])
