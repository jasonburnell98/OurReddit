var firebaseConfig = {
    apiKey: "AIzaSyBUjU1OuJUnvueOI9FSvPGnnAg5w3uBQog",
    authDomain: "ourreddit-1572579679058.firebaseapp.com",
    databaseURL: "https://ourreddit-1572579679058.firebaseio.com",
    projectId: "ourreddit-1572579679058",
    storageBucket: "ourreddit-1572579679058.appspot.com",
    messagingSenderId: "759250034016",
    appId: "1:759250034016:web:612e3bb641ced9e02c1205",
    measurementId: "G-64PCTQ8QLZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
  //firebase.database().ref("hi").set("there");

  
            //make auth and firestone references
            const auth = firebase.auth();
            // const db = firebase.firestore();


  //This is a silly andy trick, ignore or not
//   var myid = "";
//   if(localStorage) {
//     if(!localStorage.getItem("sillyID")) {
//         myid = "id"+Math.floor(Math.random()*500000000);
//         localStorage.setItem("sillyID", myid);
//     } else {
//       myid = localStorage.getItem("sillyID");
//     }
//   }


    //Two views: 1. list of examples
    //2. single page app
    let clickHandler = function(evt){
        let postid = $(evt.currentTarget).attr("data-postid");
        displayPost(postid);   
    }

    let displayLobby = function(){
        $("#mainscreen").html($("#mytemplate").html());
        firebase.database().ref("lobby").on("value", ss=>{
                let postsObj = ss.val();
                let postids = Object.keys(postsObj);
                $("theposts").html('');
                postids.map(postid=>{
                    $("#theposts").append(`
                    <li>
                        <a class="showpost" data-postid=${postsObj[postid].title}>${postsObj[postid].title}
                        </a>
                        </li> `);
                });
                $(".showpost").off("click",clickHandler);
                $(".showpost").on("click",clickHandler);
        });
    $("#createExample").on("click",function(){
        let newExampleRef = firebase.database().ref("lobby").push();
        newExampleRef.set({title: $("#title").val(),description: $("#content").val()});
        
    })
    

    }
    let displayPost = function(postid){
       
        $("#mainscreen").html(`
        <h1>Welcome to the ${postid}</h1>
        <button class = "backbutton">Back to Lobby</button>
        <ul id="users"> </ul>
        `);
        $(".backbutton").on("click",displayLobby);
    }
    
    displayLobby();
