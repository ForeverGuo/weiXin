	var app=angular.module("wechat.routes",['ionic'])
	.run(function($ionicPlatform){
       $ionicPlatform.ready(function(){
        if(window.cordova && window.cordova.plugins.Keyboard){
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar){
          StatusBar.styleDefault();
        }
       });
      })
	.config(function($stateProvider,$urlRouterProvider){
		$stateProvider
		.state("tabs",{
			url:'/tab',
			templateUrl:'tpl/route.html'
		})
		.state("tabs.home",{
			url:'/home',
			views:{
				'home-tab':{
					templateUrl:'tpl/home.html',
					controller:'home'
				}
			}
		})
		.state("tabs.phone",{
		url:'/phone',
		views:{
			'phone-tab':{
				templateUrl:'tpl/phone.html',
				controller:'phone'
			}
		}
	})
		.state("tabs.find",{
		url:'/find',
		views:{
			'find-tab':{
				templateUrl:'tpl/find.html',
				controller:'find'
			}
		}
	})
	 .state("tabs.myself",{
		url:'/myself',
		views:{
			'myself-tab':{
				templateUrl:'tpl/myself.html',
				controller:'myself'
			}
		}
	});
	$urlRouterProvider.otherwise("/tab/home");
	})
	.controller('myctrl',["$scope",function($scope){
					
	}])
	/*第一个------*/
	.controller('home',["$scope","$http","$state","$ionicPopup",function($scope,$http,$state,$ionicPopup){
			$scope.OnSwipeLeft=function(){
				$state.go("tabs.phone");
			}
		
			$http.get('list.json').success(function(data){
				$scope.names=data;
			});
			$scope.popup={
				sel:false,
				index:0
			};
			$scope.stayPress=function(name){
				/*进行传值，知道点击的是哪一个------*/
				$scope.popup.index=$scope.names.indexOf(name);
				$scope.popup.optionsPopup= $ionicPopup.show({	
					scope:$scope,
					templateUrl:"tpl/poPup.html",
				});
			 $scope.popup.isPopup=true;
			};
			/*标记函数---------------*/
			$scope.markMessage=function(){
				var index=$scope.popup.index;
				var message=$scope.names[index];
				if(message.showIn){
					message.showIn=false;
					message.member=0;
				}else{
					message.showIn=true;
					message.member=1;
				}
				$scope.popup.optionsPopup.close();
				$scope.popup.isPopup=false;	
			}
			/*置顶函数------------*/
			$scope.toMessage=function(){
				var index=$scope.popup.index;
				var message=$scope.names[index];
				if(message.isTop){
					message.isTop=0;
				}else{
					message.isTop=new Date().getTime();
				}
				$scope.popup.optionsPopup.close();
				$scope.popup.isPopup=false;
			}
			/*删除该聊天----------*/
			$scope.delMessage=function(){
				var index=$scope.popup.index;
				var message=$scope.names[index];
				$scope.names.splice(index,1);
				$scope.popup.optionsPopup.close();
				$scope.popup.isPopup=false;	
			}
			
					
	}])
	.controller('phone',["$scope",'$state',function($scope,$state){
			$scope.OnSwipeLeft=function(){
				$state.go("tabs.find");
			}
			$scope.OnSwipeRight=function(){
				$state.go("tabs.home");
			}
				
					
	}])
	.controller('find',["$scope","$state",function($scope,$state){
			$scope.OnSwipeLeft=function(){
				$state.go("tabs.myself");
			}
			$scope.OnSwipeRight=function(){
				$state.go("tabs.phone");
			}
				
					
	}])
	.controller('myself',["$scope","$state","$ionicPopup",function($scope,$state,$ionicPopup){
			$scope.OnSwipeRight=function(){
				$state.go("tabs.find");
			}	
			$scope.myself=function(){
				$scope.popup= $ionicPopup.show({	
					scope:$scope,
					templateUrl:"tpl/weixin.html",
				});
			};
			$scope.myself_out=function(){
				$scope.popup.close();
			};
					
	}])