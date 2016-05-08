(function () {
    'use strict';

    angular
            .module('app')
            .factory('Tasks', function ($http) {
                var tasks = [];
                function getTasks() {
                    return $http.get('../data/tasks.json').then(function (result) {
                        tasks = result.data;
                        return tasks;
                    });
                }

                return  {
                    getTasks: getTasks
                };
            });
})();