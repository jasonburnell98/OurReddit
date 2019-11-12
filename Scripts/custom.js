var createComment=0;
var post_flag=0;



    //function that creates a post
  function add()
        {
            var title = $("#name").val();
            var content = $("#contents").val();
            var today = new Date();
            
            var currdate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var today = new Date();
            var time = today.getHours()%12 + ":" + today.getMinutes() + ":" + today.getSeconds();
            currdate= currdate +", "+time;
           db.collection("posts").add({
                
                title: title,
                name: content,
                date: currdate,
                upvotes:0,
                dowvotes:0
                
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


    //handles when clicked on a post
    let clickHandler = function(evt){
        let postid = $(evt.currentTarget).attr("data-postid");
        displaySinglePost(postid);   
    }

    //handles when comments get clicked
    let commentclickHandler = function(evt){
        let postid = $(evt.currentTarget).attr("data-commentid");
        displaySinglecomment(postid);   
    }

    let createCommentClickHandler = function(evt){
        let postid = $(evt.currentTarget).attr("data-commentid");
        create_comment(postid);   
    }

    let deleteHandler = function(evt)
    {
        let postid= $(evt.currentTarget).attr("data-postid");
        deletePost(postid);
    }

    function deletePost(postid)
    {
        db.collection("posts").doc(postid).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

        db.collection(postid).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            
        db.collection(postid).doc(doc.id).delete().then(function() {
            console.log("comment successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
            })
        })
    }

    //every time a change is made, a new post is added as an li
    //this function displays all the posts
    function displayPosts()
    {
        db.collection("posts").get().then(function(querySnapshot) {
            $("#theposts").html('');
            querySnapshot.forEach(function(doc) {
                var data = doc.data();
                var id = doc.id;
                console.log(id);                
                $("#theposts").append(`
                <li>
                <div id="post_div" data-postid=${id} class="showpost">
                    <div id="titlediv">
                        <h6>created:   ${data.date}</h6>
                        <button class ="delete" data-postid=${id}>delete </button>
                        <h3 >${data.title}</h3></div>
                    <br>
                    <a class="showpost" data-postid=${id}>${data.name}</a>
                    </li> 

                </div>      <br/>`);
            });

            $(".showpost").off("click",clickHandler);
            $(".showpost").on("click",clickHandler);

            $(".delete").off("click",deleteHandler);
            $(".delete").on("click",deleteHandler);

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
        
        displayLobby();
 
    //this functions creates comments
    function create_comment(id)
    {
        var x= $("#commentInput").val();
        console.log(id);
        console.log("creatting comment");
        var today = new Date();
        var currdate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours()%12 + ":" + today.getMinutes() + ":" + today.getSeconds();
        currdate= currdate +", "+time;

        db.collection(id).add({
            
             comment:x,
             date: currdate
         }) 

         .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            //document.location.reload(true);

            displaySinglePost(id);

        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

    }
    


    /*
    this functions calls another function to display all the comments
    for a specific post/comment
    */
    function getComments(id)
    {
        $("#commentDiv").html($("#comments").html());
        db.collection(id)
        .onSnapshot(function(doc) {
           // console.log("Current data: ", doc.data());
          displayComments(id);
        })
    }

    function displayComments(collectionId)
    {
        db.collection(collectionId).get().then(function(querySnapshot) {
            $("#commentList").html('');
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                var data = doc.data();
                var id = doc.id;
                console.log(data.comment);
                console.log(id);                
                $("#commentList").append(`
                <li id=${id}>
                <div id="comment_div">
                    <p>date created: ${data.date}</p>
                    <a class="showcomment" data-commentid=${id}>${data.comment}</a>
                    </li> 
                    <br/>

                </div><br/>`);
               
            });

            $(".showcomment").off("click",commentclickHandler);
            $(".showcomment").on("click",commentclickHandler);
        });
        
    }

    //display a single post
    function displaySinglePost(postid){
     
        console.log(postid);
        const post = db.collection('posts').doc(postid);
        var name;   
             //THIS IS HOW YOU ACCESS EACH POST               
        post.get().then(doc => {

            data = doc.data();
            var id = doc.id;
            
             
            $("#mainscreen").html(`
            <div id="post_div">
            <p>created on:   ${data.date}</p>
            <h1 align ="center">${data.title}</h1> <br/>
            <h2 align ="center">${data.name}</h2> 

            <ul id="users"> </ul>
            </div>
            <button id="comment" class="create_comment" data-commentid=${id}> create comment</button>
          </div>      <br/>`);
         
          $(".create_comment").off("click",createCommentClickHandler);
          $(".create_comment").on("click",createCommentClickHandler);
        getComments(postid);


        db.collection(postid).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var data = doc.data();
                var id = doc.id;
                console.log(id);            
            })})
    })
}

    function displaySinglecomment(postid){
        // let x = firebase.database().ref(postid);
        
        console.log(postid);
        const post = db.collection('posts').doc(postid);
        var name;   
             //THIS IS HOW YOU ACCESS EACH POST               
        post.get().then(doc => {

            data = doc.data();
            var id = doc.id;
        console.log(postid);
         $("#mainscreen").html(`
         <div id="post_div">
         <h1 align ="center">${postid}</h1> 
         <ul id="users"> </ul>
         </div>
           <button id="comment" class= "create_comment" data-commentid=${id}> create comment</button>
         </div>      <br/>`);
        
         $(".create_comment").off("click",createCommentClickHandler);
         $(".create_comment").on("click",createCommentClickHandler);
        
        })
        getComments(postid);
         //create_comment(postid);
 
        //  db.collection(postid).get().then(function(querySnapshot) {
        //      querySnapshot.forEach(function(doc) {
        //          var data = doc.data();
        //          var id = doc.id;
        //          console.log(id);            
        //      })})
     }
    
   
  
