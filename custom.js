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
             const db = firebase.firestore();

             //this gets a specific post from the lobby and saves it as a document
             const post = db.collection('lobby').doc('Fkas3Be5f1Eqp5VkjgxJ');
            //THIS IS HOW YOU ACCESS EACH POST               
             post.get().then(doc => {
                 //console.log(doc.data());
                 data = doc.data();
                 console.log(data.title);
                 console.log(data.description)
             });
             
             


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
                    <div id="post">
                        <a class="showpost" data-postid=${postsObj[postid].title}>${postsObj[postid].title}
                        </a>
                        </li> 
                    </div>`);
                        
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
        let x = firebase.database().ref(postid);
        console.log(x);
        $("#mainscreen").html(`
        <div id="post_div">
        <h1 align ="center">Welcome to the ${postid}</h1>
        
        <ul id="users"> </ul>
        </div>
        `);

    }
    
    displayLobby();
