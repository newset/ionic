angular.module('starter.controllers', [])
    .controller('DashCtrl', function ($scope) {
    })
    .controller('CartCtrl', function ($scope, Chats) {
        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        }
    })
    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })
    .controller('AccountCtrl', function ($scope, $location) {
        $scope.settings = {
            enableFriends: true
        };

    })
    .controller('Login', function($scope, $http, $ionicLoading){

        $scope.signin = function(){
            var credential = {
                    phone : $scope.phone,
                    password : $scope.password
                },
                signInPath = 'http://localhost/blue/public/signin';

            $http.post(signInPath, credential).success(function(data){
                if(data.code == 0){
                    $ionicLoading.show({
                        template: '登录成功',
                        duration : 2000
                    });

                    //$state.go();
                }
            });
        }
    })
    .controller('Register', function($scope, $http, $ionicLoading, $timeout){

        // 处理验证码发送提示
        $scope.code_sent =false;

        $scope.signUp = function(sign){
            var credential = {
                    phone : $scope.phone
                },
                signUpPath = 'http://localhost/blue/public/signup';

            if(sign && $scope.active_code && $scope.code_sent){
                credential.active_code = $scope.active_code;
            }else if (!$scope.code_sent){
                delete credential['active_code'];
                $scope.code_sent = true;

                // 设置 code_sent 为false
                $timeout(function(){
                    $scope.code_sent = false;
                }, 1000);
            };

            $http.post(signUpPath, credential).success(function(data){
                // 发送验证码
                if(credential.active_code){
                    if(data.code == 0){
                        $ionicLoading.show({
                            template: '注册成功',
                            duration : 2000
                        });
                    }
                }else{
                    if(data.code == 0){
                        $ionicLoading.show({
                            template: '验证码发送成功',
                            duration : 2000
                        });
                    }
                }
            });

        };
    });
