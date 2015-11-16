var app = angular.module("customers", ["ui.grid"]);
app.controller('CustomersCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.query = '';
    $scope.queryValid = true;
    $scope.queryValidMessage = '';
    $scope.gridOptions = {};

    //$scope.gridOptions.columnDefs = [
    //  { name: 'id', width: 50 },
    //  { name: 'name', width: 100 },
    //  { name: 'age', width: 100, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>Age:{{COL_FIELD}}</span></div>' },
    //  { name: 'address.street', width: 150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>Street:{{COL_FIELD}}</span></div>' },
    //  { name: 'address.city', width: 150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>City:{{COL_FIELD}}</span></div>' },
    //  { name: 'address.state', width: 50, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>State:{{COL_FIELD}}</span></div>' },
    //  { name: 'address.zip', width: 50, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>Zip:{{COL_FIELD}}</span></div>' },
    //  { name: 'company', width: 100, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>Company:{{COL_FIELD}}</span></div>' },
    //  { name: 'email', width: 100, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>Email:{{COL_FIELD}}</span></div>' },
    //  { name: 'phone', width: 200, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>Phone:{{COL_FIELD}}</span></div>' },
    //  { name: 'about', width: 300, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>AAbout:{{COL_FIELD}}</span></div>' },
    //  { name: 'friends[0].name', displayName: '1st friend', width: 150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>Friend0:{{COL_FIELD}}</span></div>' },
    //  { name: 'friends[1].name', displayName: '2nd friend', width: 150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>Friend1:{{COL_FIELD}}</span></div>' },
    //  { name: 'friends[2].name', displayName: '3rd friend', width: 150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><span>Friend2:{{COL_FIELD}}</span></div>' },
    //  { name: 'agetemplate', field: 'age', width: 100, cellTemplate: '<div class="ui-grid-cell-contents"><span>Age 2:{{COL_FIELD}}</span></div>' }
    //];

    $scope.gridOptions.onRegisterApi = function (gridApi) {
        $scope.gridApi = gridApi;
    };

    $scope.find = function () {
        $scope.validateQuery();
        if ($scope.queryValid) {
            $http.get("/Customers/GetCustomers", {
                    params: { query: $scope.query }
                })
                .success(function(data) {
                    $scope.gridOptions.data = data;
                });
        } else {
            alert("Query is invalid!");
        }
    };

    $scope.validateQuery = function () {
        $http.get("/Customers/GetCustomers", {
            params: {
                query: $scope.query,
                validateOnly: true
            }
            })
            .success(function(data) {
                $scope.queryValid = data.Valid;
                $scope.queryValidMessage = data.Message ? data.Message : "";
            });
    };

    $scope.find();
}]);