/* import directives */ var directives = require('./../directives');

directives.addTemplate("todo", {
    todo: "="
}, function($scope, attr, elem) {
    $scope.onclick = function() {
        $scope.edited = true;
        console.log(elem);
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


var TodoView = function(todo) {
        var data = _.extend({}, todo);
        data = _.extend(data, {
            edited: false,
            binds: {
                ".todo_title": {
                    onclick: function() {
                        data.done = !data.done;
                        saveTodo(data);
                        data.render();
                    },
                    ondblclick: function() {
                        data.edited = true;
                        data.render();
                        var element = S(".todo_edit", S("#" + data._templateId), true);
                        element.focus();
                    }
                },
                ".todo_checkbox": {
                    onclick: function() {
                        data.done = !data.done;
                        saveTodo(data);
                        data.render();
                    },
                },
                ".todo_edit": {
                    onblur: function() {
                        data.edited = false;
                        data.title = this.value;
                        saveTodo(data);
                        data.render();
                    }
                },
                ".todo_delete": {
                    onclick: function() {
                        data.deleted = true;
                        saveTodo(data);
                        data.render();
                    }
                }
            }
        });
        return data;

    }
