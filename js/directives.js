/**
 * Created by Insane on 15/5/9.
 */
angular.module('starter.directives', [])
    .directive('countDown', ['$timeout', function($timeout){
        return {
            restrict : 'E',
            template : '<span></span>',
            replace : true,
            link : function(scope, elm, attr){

            }
        }
    }]);