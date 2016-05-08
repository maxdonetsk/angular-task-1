(function () {
    'use strict';

    angular
            .module('app')
            .controller('Homepage', function ($scope, Tasks) {
                Array.prototype.contains = function (v) {
                    for (var i = 0; i < this.length; i++) {
                        if (this[i] === v)
                            return true;
                    }
                    return false;
                };

                Array.prototype.unique = function () {
                    var arr = [];
                    for (var i = 0; i < this.length; i++) {
                        if (!arr.contains(this[i])) {
                            arr.push(this[i]);
                        }
                    }
                    return arr;
                };

                var allTypes = [];
                var uniqueTypes = [];
                var basicsCount = 0;
                var intermediateCount = 0;
                var advancedCount = 0;
                $scope.labels = [];

                Tasks.getTasks().then(function (data) {
                    $scope.tasks = data;
                    for (var i = 0; i < $scope.tasks.length; i++) {
                        allTypes.push($scope.tasks[i].type);
                        uniqueTypes = allTypes.unique();
                        $scope.limit = uniqueTypes.length;

                        if ($scope.tasks[i].type === 'basics') {
                            basicsCount++;
                        }

                        if ($scope.tasks[i].type === 'intermediate') {
                            intermediateCount++;
                        }

                        if ($scope.tasks[i].type === 'advanced') {
                            advancedCount++;
                        }

                        //charts data
                        $scope.labels = uniqueTypes; //["basics", "intermediate", "advanced"]
                        $scope.data = [basicsCount, intermediateCount, advancedCount];
                        $scope.colours = ["#449d44", "#337ab7", "#d9534f"];
                        $scope.type = 'PolarArea';
                    }
                });
                $scope.isCollapsedBasics = false;
                $scope.isCollapsedIntermediate = false;
                $scope.isCollapsedAdvanced = false;

                $scope.onClick = function (points, evt) {
                    console.log(points, evt);
                };
            });
}());
