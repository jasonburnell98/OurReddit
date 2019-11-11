var createComment=0;
var post_flag=0;

var postToComment;

  function add()
        {
            var title = $("#name").val();
            var content = $("#contents").val();
            var today = new Date();
            var currdate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

           db.collection("posts").add({
               
                title: title,
                name: content,
                date: currdate
                
            }) 
          
            .then(function(doc) {
                console.log("Document written with ID: ", doc.data);
                document.location.reload(true);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        }
        

            //make auth 
            const auth = firebase.auth();
      

             //this gets a specific post from the lobby and saves it as a document
            //  const post = db.collection('posts').doc('Fg5NExhSvqlabDJb4dGE');
            
            //  //THIS IS HOW YOU ACCESS EACH POST               
            //  post.get().then(doc => {
            //      //console.log(doc.data());
            //      data = doc.data();
            //      console.log(data.title);
            //      console.log(data.name)
            //  });


    let clickHandler = function(evt){
        let postid = $(evt.currentTarget).attr("data-postid");
        displaySinglePost(postid);   
    }

    let commentclickHandler = function(evt){
        let postid = $(evt.currentTarget).attr("data-commentid");
        displaySinglecomment(postid);   
    }

    //every time a change is made, a new post is added as an li
    function displayPosts()
    {
        db.collection("posts").get().then(function(querySnapshot) {
            $("#theposts").html('');
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                var data = doc.data();
                var id = doc.id;
                console.log(data.country);
                console.log(id);                
                $("#theposts").append(`
                <li>
                <div id="post_div">
                    <p>created:   ${data.date}</p>
                    <a class="showpost" data-postid=${id}>${data.title}</a>
                    <br>
                    <a class="showpost" data-postid=${id}>${data.name}</a>
                    </li> 

                </div>      <br/>`);
                //console.log(doc.id, " => ", doc.data());


            });

            $(".showpost").off("click",clickHandler);
            $(".showpost").on("click",clickHandler);
        });
        
    }

    //displays all the posts
    let displayLobby = function(){
        $("#mainscreen").html($("#mytemplate").html());
        db.collection("posts")
        .onSnapshot(function(doc) {
           // console.log("Current data: ", doc.data());
            displayPosts();
    });

    }
        


    let create_post = function()
    {
        db.collection("posts").add({
            title:"test",
            desc:"hi"
        })
        console.log("function cretaed")
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
    


        displayLobby();

 
    //this functions creates comments
    function create_comment()
    {
        var x= $("#commentInput").val();
        console.log(postToComment);
        console.log("creatting comment");
        var today = new Date();
        var currdate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        db.collection(postToComment).add({
            
             comment:x,
             date: currdate
         }) 

         .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            //document.location.reload(true);

            displaySinglePost(postToComment);

        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });


      //  sleep(2);
    }
    

    function getComments()
    {
        $("#commentDiv").html($("#comments").html());
        db.collection(postToComment)
        .onSnapshot(function(doc) {
           // console.log("Current data: ", doc.data());
          displayComments(postToComment);
        })
    }

    function displayComments(collectionId)
    {
        db.collection(collectionId).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                var data = doc.data();
                var id = doc.id;
                console.log(data.comment);
                console.log(id);                
                $("#commentList").append(`
                <li>
                <div id="comment_div">
                    <p>date created: ${data.date}</p>
                    <a class="showcomment" data-commentid=${id}>${data.comment}</a>
                    </li> 
                    <br/>

                </div><br/>`);
                //console.log(doc.id, " => ", doc.data());
            });

            $(".showcomment").off("click",commentclickHandler);
            $(".showcomment").on("click",commentclickHandler);
        });
        
    }



    

    //display a single post
    function displaySinglePost(postid){
       // let x = firebase.database().ref(postid);
        console.log(postid);
        const post = db.collection('posts').doc(postid);
        var name;   
             //THIS IS HOW YOU ACCESS EACH POST               
      
        post.get().then(doc => {

            data = doc.data();

            postToComment = postid;
            $("#mainscreen").html(`
            <div id="post_div">
            <p>created on:   ${data.date}</p>
            <h1 align ="center">${data.title}</h1> <br/>
            <h2 align ="center">${data.name}</h2> 

            
            <ul id="users"> </ul>
            </div>
            <button id="comment" onclick="create_comment()"> create comment</button>
            </div>      <br/>`);
        });
        getComments();

        //create_comment(postid);

        db.collection(postid).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var data = doc.data();
                var id = doc.id;
                console.log(id);            
            })})
    }

    function displaySinglecomment(postid){
        // let x = firebase.database().ref(postid);
         console.log(postid);
         postToComment = postid;
         $("#mainscreen").html(`
         <div id="post_div">
         <h1 align ="center">${postid}</h1> 
         <ul id="users"> </ul>
         </div>
           <button id="comment" onclick="create_comment()"> create comment</button>
         </div>      <br/>`);
 
         getComments();
 
         //create_comment(postid);
 
         db.collection(postid).get().then(function(querySnapshot) {
             querySnapshot.forEach(function(doc) {
                 var data = doc.data();
                 var id = doc.id;
                 console.log(id);            
             })})
     }
    
   
  
