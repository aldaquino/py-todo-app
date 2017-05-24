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
                    
                //     $scope.qtn_list = JSON.parse(response.data.questions)
                // }else if(response.data.status == 'completed' || response.data.status == 'not_found'){
                //     alert(response.data.msg)//sim, não é elegante, é horrivel usar isso
                //     $location.path('/')
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
                    // if (response.data.status == 'ok'){
                    //     console.log(response.data)
                    //     $location.path('/questionario/'+ response.data.idcandidate)
                    // }else{
                    //     console.log(response.data)
                    //     $scope.err_msg = response.data.msg;
                    //     if (response.data.status != 'cand_exists'){
                    //         $scope.valid_input.name = response.data.fname;
                    //         $scope.valid_input.femail = response.data.femail;
                    //     }
                    // }   
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

    // $scope.login = {};
    // $scope.enablebtn = true;
    // $scope.valid_input = {}
    // $scope.valid_input.name = true; //Input for name is valid or not
    // $scope.valid_input.email = true;
    // $scope.err_msg = ''

    // $scope.senddata = function(){
    //     $scope.valid_input.name = true;
    //     $scope.valid_input.email = true;
    //     $scope.err_msg = ''
    //     $scope.login.page = 'login'
    //     $http.post(url, $scope.login)
    //         .then(function(response){
    //             if (response.data.status == 'ok'){
    //                 console.log(response.data)
    //                 $location.path('/questionario/'+ response.data.idcandidate)
    //             }else{
    //                 console.log(response.data)
    //                 $scope.err_msg = response.data.msg;
    //                 if (response.data.status != 'cand_exists'){
    //                     $scope.valid_input.name = response.data.fname;
    //                     $scope.valid_input.femail = response.data.femail;
    //                 }
    //             }   
    //         }
    //     );
    // }
}
MainCtrl.$inject = ['$scope', '$http', '$location'];

// function QuestController($scope, $http, $location, $routeParams){
//     $scope.answer = {};
//     $scope.qtn_list = [];
//     var idcandidate = $routeParams.idcandidate;

//     $scope.opts = [
//         {'val': 0, 'desc': 0},
//         {'val': 1, 'desc': 1},
//         {'val': 2, 'desc': 2},
//         {'val': 3, 'desc': 3},
//         {'val': 4, 'desc': 4},
//         {'val': 5, 'desc': 5},
//         {'val': 6, 'desc': 6},
//         {'val': 7, 'desc': 7},
//         {'val': 8, 'desc': 8},
//         {'val': 9, 'desc': 9},
//         {'val': 10, 'desc': 10},
//     ]

//     $scope.senddata = function(){
//         $scope.answer.page = 'quest'
//         $scope.answer.answers = $scope.qtn_list
//         $scope.answer.idcandidate = idcandidate
//         $http.post(url, $scope.answer)
//             .then(function(response){
//                 console.log(response.data)
//                 if (response.data.status == 'ok'){
//                     alert('Obrigado por se cadastrar. \n Enviamos um e-mail confirmando seu cadastro.')
//                     $location.path('/')
//                 }
//             });
//     };

//     $scope.onload = function(){
//         console.log(idcandidate)
//         $http.get(url + '?page=quest&idcandidate='+idcandidate)
//             .then(function(response){
//                 if (response.data.status == 'ok'){
//                     $scope.qtn_list = JSON.parse(response.data.questions)
//                 }else if(response.data.status == 'completed' || response.data.status == 'not_found'){
//                     alert(response.data.msg)//sim, não é elegante, é horrivel usar isso
//                     $location.path('/')
//                 }
//             }
//         );
//     };

//     $scope.onload()


// }
// QuestController.$inject = ['$scope', '$http', '$location', '$routeParams'];

function task_config( $routeProvider ) {
    var pfx = '/static/templates/';

    $routeProvider
        .when( '/', { templateUrl: pfx + 'main.html'})
        .when( '/questionario/:idcandidate', { templateUrl: pfx + 'quest.html'})
        .otherwise({redirectTo: '/' })
        ;
}
task_config.$inject = [ '$routeProvider' ];
