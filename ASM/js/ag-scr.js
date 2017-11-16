var LOGIN_API = "https://youtube-api-challenger.appspot.com/authentication";
var MEMBER_API = "https://youtube-api-challenger.appspot.com/members";
var YOUTUBE_APItab1 = "https://content.googleapis.com/youtube/v3/search?q=tam ka pkl&type=video&videoEmbeddable=true&videoSyndicated=true&maxResults=4&part=snippet&key=AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc";
var YOUTUBE_APItab2 = "https://content.googleapis.com/youtube/v3/search?q=dalab&type=video&videoEmbeddable=true&videoSyndicated=true&maxResults=4&part=snippet&key=AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc";
var YOUTUBE_APItab3 = "https://content.googleapis.com/youtube/v3/search?q=den vau&type=video&videoEmbeddable=true&videoSyndicated=true&maxResults=4&part=snippet&key=AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc";
var YOUTUBE_APItab4 = "https://content.googleapis.com/youtube/v3/search?q=mashup&type=video&videoEmbeddable=true&videoSyndicated=true&maxResults=12&part=snippet&key=AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc";
var VIDEO_URL = "https://youtube-api-challenger.appspot.com/videos";
var secretToken = localStorage.getItem("secretToken");
var userId = localStorage.getItem("userId");
//Router
 var app = angular.module("myApp", ["ngRoute"]);
      app.config(function($routeProvider) {
          $routeProvider.when("/home", {
              templateUrl : "home.html"
          }).when("/playlist", {
              templateUrl : "pages/playlist.html"
          }).when("/login", {
              templateUrl : "pages/login.html"
          }).when("/res", {
              templateUrl : "pages/register.html"
          }).when("/home", {
              templateUrl : "pages/home.html"
          }).when("/upload", {
              templateUrl : "pages/upload.html"
          }).otherwise({
              redirectTo: 'home'
          });
    });
//end router
  
//login controller
  app.controller('logincontrol', function($scope, $http) {
    var myEl3 = angular.element(document.querySelector('#msgsuccesslogin'));
    var myEl4 = angular.element(document.querySelector('#msgerrorsregister'));
    $scope.btnLogin = function(){
      $scope.Obj.data.type = "MemberLogin";
        console.log($scope.Obj);
        $http({
          method: "POST",
          url: LOGIN_API,
          data: $scope.Obj
        }
        ).then(function mySuccess(response) {
        console.log(response);
        localStorage.setItem("secretToken", response.data.data.attributes.secretToken);
        localStorage.setItem("userId", response.data.data.attributes.userId);
        window.location.reload();
        }, function myError(response) {
          $scope.msgsuccesslogin = false;
          $scope.msgerrorsregister = true;
          myEl4.text(response.data.errors[0].title +' '+ response.data.errors[0].detail);
          console.log(response.data.errors[0].title +' '+ response.data.errors[0].detail);
      });
    }
});
//end login

//member controller
  app.controller('rescontrol', function($scope, $http) {
   var myEl5 = angular.element(document.querySelector('#msgsuccessregister'));
   var myEl6 = angular.element(document.querySelector('#msgerrorsregister'));
   if($scope.Obj == undefined){
    $scope.Obj = {};
    $scope.Obj.data = {};
    $scope.Obj.data.attributes = {};
   }

   $scope.btnRes = function(){  
    $scope.Obj.data.type = "Member";
    $scope.Obj.data.attributes.birthDay = 15066499900231;
    $scope.Obj.data.attributes.gender = 1;
    
       $http({
        url : MEMBER_API,
        method : "POST",
        data: JSON.stringify($scope.Obj)        
       }).then(function mySuccess(response) {
          $scope.msgerrorsregister = false;
          $scope.msgsuccessregister = true;
           console.log(response);
           myEl5.text('Đăng Kí Thành Công');
           $scope.hideloginbtn = true;
       }, function myError(response) {
          $scope.msgsuccessregister = false;
          $scope.msgerrorsregister = true;
          myEl6.text(response.data.errors[0].title +' '+ response.data.errors[0].detail);
          console.log(response.data.errors[0].title +' '+ response.data.errors[0].detail);
       });
   }
})
//end member

//show video home
app.controller('videocontrol', function($scope, $http){
  $http.get(YOUTUBE_APItab1)
  .then(function(response) {
    $scope.listVideo = response.data.items;
  });

  $http.get(YOUTUBE_APItab2)
  .then(function(response) {
    $scope.listVideo1 = response.data.items;
  });

  $http.get(YOUTUBE_APItab3)
  .then(function(response) {
    $scope.listVideo2 = response.data.items;
  });

  $http.get(YOUTUBE_APItab4)
  .then(function(response) {
    $scope.listVideo3 = response.data.items;
  });

  

  $scope.showVideo = function showvideo(videoId) {
    $('#video-frame').attr('src','https://www.youtube.com/embed/'+ videoId +'?autoplay=1');
    // $('#titlevideo').attr('text',"");
    setTimeout(
    function () {
      $('#myModal').modal("show");
      $("#closemodal").click(function () {
        $('#myModal').modal('hide');
         $('#video-frame').attr('src','');
      });
    },400);
  }

  //show info video
    $scope.showInfo = function showinfo(videoId,title,description,channelTitle,publishedAt) {
      $http.get("https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc&part=snippet&id="+ videoId +"")
      .then(function(response) {
      $scope.gettag = response.data.items;
      });
      $('#showInfo').modal("show");
      $("#closemodal").click(function () {
        $('#closeshow').modal('hide');
      });
    }

    $scope.idaaaaa = function (id,title,description,tags) {         
        $("#closeupload").click();
        $scope.Objj = {
        "data": {
          "type": "Video",
          "attributes": {
            "youtubeId": ""+ id +"",
            "name": ""+ title +"",
            "description": ""+ description +"",
            "keywords": ""+ tags +"",
            "playlistId": "0",
            "thumbnail": "https://i.ytimg.com/vi/"+ id +"/mqdefault.jpg",
          }
        }
      };
    }
  //end show info
})
//end show video

//search video
    app.controller('panelctrl', function($scope, $http){
      $scope.btnsearch = function () {
        if ($scope.inputsearch.length > 0) {
          $scope.showpanel = true;
          SearchVideo();
          $scope.inputsearch = "";
        }
        else{
          $scope.showpanel = false;
        }
      }
      function SearchVideo(videoId){
          var keyword = $scope.inputsearch;
          var YOUTUBE_API = "https://content.googleapis.com/youtube/v3/search?q=" + keyword + "&type=video&videoEmbeddable=true&videoSyndicated=true&maxResults=12&part=snippet&key=AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc";
          $http({
              method : "GET",
              url : YOUTUBE_API
          }).then(function mySuccess(response) {
          $scope.listVideos = response.data.items;
          }, function myError(response) {
              console.log(response.statusText);
          });
        }
     //show info video
      $scope.btnshowInfoSearch = function showInfoSearch(videoId,title,description,channelTitle,publishedAt) {
        $http.get("https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc&part=snippet&id="+ videoId +"")
        .then(function(response) {
        $scope.getsearch = response.data.items;
        }); 
        $('#showInfosearch').modal("show");
        $("#closemodal").click(function () {
          $('#closeshow').modal('hide');
        });
      }

      $scope.addtoplaylist = function (id,title,description,tags) {         
         $("#closeupload").click();
         $scope.Objj = {
            "data": {
              "type": "Video",
              "attributes": {
                "youtubeId": ""+ id +"",
                "name": ""+ title +"",
                "description": ""+ description +"",
                "keywords": ""+ tags +"",
                "playlistId": "0",
                "thumbnail": "https://i.ytimg.com/vi/"+ id +"/mqdefault.jpg",
              }
            }
         };
      }

      //end show info

      //show user login
      $http({
        method : "GET",
        url : "https://youtube-api-challenger.appspot.com/members" + "/" + userId,
        headers: {
          "Authorization": secretToken
        }
        }).then(function mySuccess(response) {
            $scope.loggedInUsername = response.data.data.attributes.username;
            $scope.btnUpload = true;
            $scope.isLoggedIn = true;
        }, function myError(response) {
            $scope.isLoggedIn = false;
            console.log(response.statusText);
        });

        $scope.handleLogout = function () {
          if(confirm("Bạn có chắc muốn thoát khỏi hệ thống?")){
                localStorage.removeItem("secretToken");
                localStorage.removeItem("userId");
                $scope.isLoggedIn = false;
                alert("Logout thành công.");
        }
        };
      //end show user
    });
//end search

//upload video

  app.controller('uploadCtrl', function($scope, $http){
      var myEl = angular.element(document.querySelector('#msgsuccessupload'));
      var myEl2 = angular.element(document.querySelector('#msgerrorsupload'));
      $scope.btnUp = function () {
        $http({
        url : VIDEO_URL,
        method : "POST",
        data: $scope.Objj,
        headers: {
          "Authorization": secretToken
        }        
        }).then(function mySuccess(response) {
          console.log(response);
          $scope.msgerrorsupload = false;
          $scope.msgsuccessupload = true;
          myEl.text('Thành Công');
          $scope.Objj = {
            "data": {
              "type": "Video",
              "attributes": {
                "youtubeId": "",
                "name": "",
                "description": "",
                "keywords": "",
                "playlistId": "",
                "thumbnail": "",
              }
            }
         };
        }, function myError(response) {
          $scope.msgsuccessupload = false;
          $scope.msgerrorsupload = true;
           myEl2.text(response.data.errors[0].title +' '+ response.data.errors[0].detail);
       });
      }

      //search video upload

      $scope.btnSearchUp = function () {
        if ($scope.inputsearchchup.length > 0) {
          SearchVideoUp();
          $scope.inputsearchchup = "";
        }
        else{
        }
      }
      function SearchVideoUp(videoId){
          // $scope.inputsearch = keyword;
          var keyword = $scope.inputsearchchup;
          var YOUTUBE_API = "https://content.googleapis.com/youtube/v3/search?q=" + keyword + "&type=video&videoEmbeddable=true&videoSyndicated=true&maxResults=12&part=snippet&key=AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc";
          $http({
              method : "GET",
              url : YOUTUBE_API
          }).then(function mySuccess(response) {
          $scope.listVideoUp = response.data.items;
          }, function myError(response) {
              console.log(response.statusText);
          });
        } 

    //show info video search up

      $scope.getInfoUp = function showInfoUp(videoId,title,description,channelTitle,publishedAt,tags) {

        $http.get("https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc&part=snippet&id="+ videoId +"")
        .then(function(response) {
        $scope.getInfoVideoUp = response.data.items;
        });
        $('#showInfoVideoUp').modal("show");
        $("#closemodal").click(function () {
          $('#closeshow').modal('hide');
        });

        // $scope.addtoplaylist = function (videoId,title,description,channelTitle,publishedAt) {

        // }
      }
      $scope.addtoplaylist = function (id,title,description,tags) {         
         $("#closeupload").click();
         $scope.Objj = {
            "data": {
              "type": "Video",
              "attributes": {
                "youtubeId": ""+ id +"",
                "name": ""+ title +"",
                "description": ""+ description +"",
                "keywords": ""+ tags +"",
                "playlistId": "0",
                "thumbnail": "https://i.ytimg.com/vi/"+ id +"/mqdefault.jpg",
              }
            }
         };
      }

  //end show info video search up
      
    // // check info id
    //     $scope.checkVideo = function (videoId) {
    //       var key = $scope.checkid;
    //       var YOUTUBE_APIGET = "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc&part=snippet&id="+ key +"";
    //       $http({
    //           method : "GET",
    //           url : YOUTUBE_APIGET
    //       }).then(function mySuccess(response) {
    //         $scope.checkids = response.data.items;
    //       }, function myError(response) {
    //           console.log(response.statusText);
    //       });
    //       checkVideo(id,title,description,tags);
    //     }

        

    //       $scope.Objj = {
    //         "data": {
    //           "type": "Video",
    //           "attributes": {
    //             "youtubeId": ""+ id +"",
    //             "name": ""+ title +"",
    //             "description": ""+ description +"",
    //             "keywords": ""+ tags +"",
    //             "playlistId": "0",
    //             "thumbnail": "https://i.ytimg.com/vi/"+ id +"/mqdefault.jpg",
    //           }
    //         }
    //      }; qdd               \\
      // end checkinfo

    });
  //end search video upload
//end upload

// playlist

  app.controller('playlistCtr', function($scope, $http){
        $http({
        url : "https://youtube-api-challenger.appspot.com/videos",
        method : "GET",
        data: {},
        headers: {
          "Authorization": secretToken
        }       
      }).then(function(response) {
        $scope.getVideo = response.data.data;
        }); 

    //display video 

     $scope.showVideo = function showvideo(videoId) {
        $('#video-frame').attr('src','https://www.youtube.com/embed/'+ videoId +'?autoplay=1');
        // $('#titlevideo').attr('text',"");
        setTimeout(
        function () {
          $('#myModal').modal("show");
          $("#closemodal").click(function () {
            $('#myModal').modal('hide');
             $('#video-frame').attr('src','');
          });
        },400);
      }

    // show info video upload

    $scope.showInfoUp = function showinfoUp(videoId) {
      $http.get("https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc&part=snippet&id="+ videoId +"")
      .then(function(response) {
      $scope.infoUp = response.data.items;
      });
      $('#showInfo').modal("show");
      $("#closemodal").click(function () {
        $('#closeshow').modal('hide');
      });
    }
  });
//end display
    
    



