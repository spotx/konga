
(function() {
  'use strict';

  angular.module('frontend.core.directives')
    .directive('rawView', function directive() {
      return {
        restrict: 'E',
        scope: {
          item: '=',
          text: '='
        },
        replace: true,
        template : '<span class="text-nowrap clickable" data-ng-click="openRawView(item)"><i uib-tooltip="Raw view" class="mdi mdi-eye-outline"></i>{{text ? "&nbsp;&nbsp;" + text : ""}}</span>',
        controller: [
          '$scope','$uibModal',
          function controller($scope,$uibModal) {

            $scope.openRawView = function (item) {
              $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                template: '<div class="modal-header primary">' +
                ' <h5 class="modal-title" id="modal-title">' +
                'Raw View ' +
                '<a download="{{filename}}" href="{{data}}">' +
                '<i class="mdi mdi-export"></i>' +
                '</a>' +
                '<a class="modal-close pull-right" ng-click="close()">' +  
                '<i class="mdi mdi-close"></i>' +
                '</a>' +
                '</h5>' +
                '</div>' +
                '<div class="modal-body">' +
                '<pre class="no-margin">{{item | json}}</pre>' +
                '</div>',
                controller: function($scope,$uibModalInstance,_item){
                  $scope.item = _item
                  var cur = angular.copy(_item);
                  
                  delete cur.created_at;
                  delete cur.id;
                  delete cur["$$hashKey"];
                  
                  $scope.data = 'data:application/json;charset=utf-8,' +
                    JSON.stringify({
                      "name": "export_" + cur.name,
                      "data": {
                        "apis": [cur]
                      }
                    });
                  $scope.filename = item.name + ".json";
                  $scope.close = function(){
                    $uibModalInstance.dismiss()
                  }
                },
                controllerAs: '$ctrl',
                resolve: {
                  _item: function () {
                    return item;
                  }
                }
              });
            }

          }
        ]
      };
    })
  ;
}());
