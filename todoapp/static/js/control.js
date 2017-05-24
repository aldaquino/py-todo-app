angular
    .module('TaskApp', ['ngRoute'])
    .config(task_config)
    .controller('MainCtrl', MainCtrl)

var url = '/tsk/'

function MainCtrl( $scope, $http, $location ) {
    $scope.todolist = [];
    $scope.openform = false;
    $scope.newitemtext = '';
    $scope.openedit = false;

    function load() {
        $http.get(url + 'load/')
            .then(function(response){
                
                if (response.data.status == 'ok'){
                    console.log(response.data.todolist)
                    $scope.todolist = response.data.todolist;

                }
            }
        );
    }
    load()  

    $scope.insert = function(text){
        var t = text.trim()
        if (text.length > 0 ){
            //post e reload    
            var data = []
            data.text = text
            $http.post(url + 'savenew/', data)
                .then(function(response){
                    console.log(response)
 
                }
            );
        }
        
        $scope.openform = false;
        $scope.newitemtext = '';
        
    }

    $scope.done = function(itm){
        //update DB
    }

    $scope.remove = function(itm) {
        console.log('remove')
        var idx = $scope.todolist.todos.indexOf(itm)
        $scope.todolist.todos.splice(idx, 1)
        //post removendo do array
        
    }

    $scope.updateEdit = function(itm){
        console.log('updateEdit')
        $scope.openedit = false;
    }

    $scope.moveUp = function(itm){
        console.log('move up')
    }

    $scope.moveDown = function(itm){
        console.log('move down')
    }

    $scope.openOrClose = function(what, isopen){
        if (what == 'openedit'){
            $scope.openedit = !isopen;
        }

        if (what == 'openform'){
            $scope.openform = !isopen
        }
    }

  
}
MainCtrl.$inject = ['$scope', '$http', '$location'];


function task_config( $routeProvider ) {
    var pfx = '/static/templates/';

    $routeProvider
        .when( '/', { templateUrl: pfx + 'main.html'})
        .otherwise({redirectTo: '/' })
        ;
}
task_config.$inject = [ '$routeProvider' ];
