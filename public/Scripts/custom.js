
var createComment=0;
var post_flag=0;
var uid;
var selectedFile;

const auth = firebase.auth(); 
  

function create_comment(id)
{
    firebase.auth().onAuthStateChanged((user) => {
        if (user){
              // User logged in already or has just logged in.
            console.log("uid " +user.uid);
            
            var content= $("#commentInput").val();
            console.log(id);
            console.log("creating comment");
            var today = new Date();
            var currdate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours()%12 + ":" + today.getMinutes() + ":" + today.getSeconds();
            currdate= currdate +", "+time;
            
            const users = db.collection('users').doc(user.uid);
                  
            users.get().then(doc => {
                console.log(doc.data());
                var data = doc.data();

            db.collection(id).add({
                username:user.email,
                author: user.uid,
                linkedto:id,
                comment:content,
                votes:0,
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

            })
        }

        else{
            alert("please log in to create a comment");
        }
   
    })
}

    //function that creates a post
  function add()
        {

            var category;

            // if(document.getElementById('other').checked)
            //     category="other";
            // else if(document.getElementById('sports').checked)
            //     category="sports";
            // else if(document.getElementById('news').checked)
            //     category="news";
            // else if(document.getElementById('media').checked)
            //     category="media";

        
            var title = $("#name").val();
            var content = $("#contents").val();
            var today = new Date();

            if (title==''||content=='')
            {
                alert('enter content');
            }

            else{
                firebase.auth().onAuthStateChanged((user) => {
                if (user){
                      // User logged in already or has just logged in.
                    
                    var currdate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    
                    var userName;
                    var time = today.getHours()%12 + ":" + today.getMinutes() + ":" + today.getSeconds();
                    currdate= currdate +", "+time;
                   
                

                   const users = db.collection('users').doc(user.uid);
                  
                    users.get().then(doc => {
                        console.log(doc.data());
                        var data = doc.data();
                       
                
            db.collection("posts").add({
                
                username: user.email,
                author:user.uid,
                title: title,
                name: content,
                date: currdate,
                votes:0,
                views:0                 
            }) 
            
            .then(function(doc) {
                console.log("Document written with ID: ", doc.data);
                document.location.reload(true);
                console.log("uid is: "+uid);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            })
        })
    }

     else {
         alert("please log in before making a post")
         console.log("no user");
      }
    })
    }
        }        
            //make auth 
           

        
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
        let commentid = $(evt.currentTarget).attr("data-commentid");
        let postid = $(evt.currentTarget).attr("data-postid");
        displaySinglecomment(commentid,postid);   
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

    let upvoteHandler = function(evt)
    {
        let postid= $(evt.currentTarget).attr("data-postid");
        upvote(postid);
    }

    let downvoteHandler = function(evt)
    {
        let postid= $(evt.currentTarget).attr("data-postid");
        downvote(postid);
    }

    let searchHandler= function(evt)
    {   
        var content= $("#mainsearch").val();
        console.log(content);
        displaySearchResults(content);
    }
    

    function showUserPosts(evt)
    {
        var username = $(evt.currentTarget).attr("data-username");
        displayuserPosts(username);
    }

    function getSports(evt)
    {
        displayCategory("sports");
    }

    function getNews(evt)
    {
        displayCategory("news");
    }

    function getMedia(evt)
    {
        displayCategory("media");
    }
    function downvoteCommentHandler(evt)
    {
        var id = $(evt.currentTarget).attr("data-commentid");
        var post = $(evt.currentTarget).attr("data-postid");
        downvoteComment(id,post);
    }

    function upvoteCommentHandler(evt)
    {
        var id = $(evt.currentTarget).attr("data-commentid");
        var post = $(evt.currentTarget).attr("data-postid");
        upvoteComment(id,post);
    }

    function deleteCommentHandler(evt)
    {
        var id = $(evt.currentTarget).attr("data-commentid");
        var post = $(evt.currentTarget).attr("data-postid");
        deleteComment(id,post);
    }

    $("#searchBar").off("click",searchHandler);
    $("#searchBar").on("click",searchHandler);
    $("#sports").off("click",getSports);
    $("#sports").on("click",getSports);
    $("#media").off("click",getMedia);
    $("#media").on("click",getMedia);
    $("#news").off("click",getNews);
    $("#news").on("click",getNews);
    
    function deleteComment(id,post)
    {
        firebase.auth().onAuthStateChanged((user) => {
            if (user){

               const users = db.collection('users').doc(user.uid);
              
                users.get().then(doc => {

                    var data = doc.data();
                    uid= data.uid;     
                    const comment = db.collection(post).doc(id);
            
             //THIS IS HOW YOU ACCESS EACH POST               
                comment.get().then(doc => {
                 //console.log(doc.data());
                    data = doc.data();
                    author = data.author;
                    console.log('author is:'+author+", uid is+"+uid);

                    if(author == uid)
                    {
                        db.collection(post).doc(id).delete().then(function() {
                            console.log("Document successfully deleted!");
                        }).catch(function(error) {
                            console.error("Error removing document: ", error);
                        });
                    }
                    else{
                        alert("permission denied");
                    }
                })
            })
        }
        })
    }

    function downvoteComment(id,post)
    {
        const ref = db.collection(post).doc(id);
        var temp;   
             //THIS IS HOW YOU ACCESS EACH POST               
        ref.get().then(doc => {
            
            var data = doc.data();
            temp= data.votes;
            temp--;
        
            db.collection(post).doc(id).update({
                votes:temp
            })
        })
    }

    function upvoteComment(id,post)
    {
        const ref = db.collection(post).doc(id);
        var temp;   
             //THIS IS HOW YOU ACCESS EACH POST               
        ref.get().then(doc => {
            
            var data = doc.data();
            temp= data.votes;
            temp++;
        
            db.collection(post).doc(id).update({
                votes:temp
            })
        })
    }
    function displayCategory(arg)
    {
        console.log("arg is: "+arg);
        $("#commentList").html('');
        db.collection("posts").where("category", "==","other")
        .get()
        .then(function(querySnapshot) {
            //$("#theposts").html('');
            $("#mainscreen").html('');
            querySnapshot.forEach(function(doc) {
                        var data = doc.data();
                        var id = doc.id;
                        console.log(data.votes);
                        console.log(id);                
                        $("#mainscreen").append(`
                        <li>
        
                        <div id="post_div" data-postid=${id} class="showpost">
                        
                            <div id="titlediv">
                            <small>created:   ${data.date}</small>
                                <h3 >${data.title}</h3></div>
                                <p id = "upvotes">votes: ${data.votes}</p>
                            
                            <br>
                            <a class="showpost" data-postid=${id}>${data.name}</a>
                            </li> 
        
                        </div>      <br/>`);
                    });
        
                    $(".showpost").off("click",clickHandler);
                    $(".showpost").on("click",clickHandler);    
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
  
    
    }
   
   
    function upvote(id)
    {
        const post = db.collection('posts').doc(id);
        var temp;   
             //THIS IS HOW YOU ACCESS EACH POST               
        post.get().then(doc => {
            
            var data = doc.data();
            temp= data.votes;
            temp++;
        
            db.collection('posts').doc(id).update({
                votes:temp
            })
    
})
}

function displayuserPosts(username)
{
    $("#commentList").html('');
    db.collection("posts").where("username", "==",username)
    .get()
    .then(function(querySnapshot) {
        //$("#theposts").html('');
        $("#mainscreen").html('');
        querySnapshot.forEach(function(doc) {
                    var data = doc.data();
                    var id = doc.id;
                    console.log(data.votes);
                    console.log(id);                
                    $("#mainscreen").append(`
                    <li>
    
                    <div id="post_div" data-postid=${id} class="showpost">
                    
                        <div id="titlediv">
                        <small>created:   ${data.date}</small>
                           <div class ="deletediv"> <button class ="delete btn-danger" data-postid=${id}>delete </button></div>
                            <h3 >${data.title}</h3></div>
                            <p id = "upvotes">votes: ${data.votes}</p>
                        
                        <br>
                        <a class="showpost" data-postid=${id}>${data.name}</a>
                        </li> 
    
                    </div>      <br/>`);
                });
    
                $(".showpost").off("click",clickHandler);
                $(".showpost").on("click",clickHandler);
    
                $(".delete").off("click",deleteHandler);
                $(".delete").on("click",deleteHandler);
    
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
  
    
}

    function downvote(id)
    {
        const post = db.collection('posts').doc(id);
        var temp;   
             //THIS IS HOW YOU ACCESS EACH POST               
        post.get().then(doc => {
            
            var data = doc.data();
            temp= data.votes;
                temp--;
            
                db.collection('posts').doc(id).update({
                    votes:temp
                })

        })
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
        document.location.reload(true);
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
                var uid=data.author;
                      
               
                firebase.auth().onAuthStateChanged((user) => {
                    if(!user){

                        $("#theposts").append(`
                        <div id="post_div">
                        <div id="titlediv">
                        <a data-postid=${id} class="showpost"><h1 >${data.title}</h1></a></div>
                        <small>created:   ${data.date}</small>
                        <a data-username=${data.username} class = "username">by: ${data.username}</a>
                        
                           <p id="upvotes"><small>views: ${data.views}</small></p> 
                                <h1 id="scoreCounter">${data.votes}</h1>
                                
                            <br/>
                            <div id="descdiv">
                                <p id="description"align ="center">${data.name}</p>     
                            </div>
                            </div>
        
                         <br/>`);
                        
                     
                        $(".username").off("click",showUserPosts);
                        $(".username").on("click",showUserPosts);
                        $(".showpost").off("click",clickHandler);
                        $(".showpost").on("click",clickHandler);
                   }
    
                   //if there is a user logged in but not the same user that created the post 
                   //then he can not delete the post
                   else if(user.uid !=uid){
                    $("#theposts").append(`
                    <div id="post_div">
                        <div id="titlediv">
                        <a data-postid=${id} class="showpost"><h1 >${data.title}</h1></a></div>
                    <small>created:   ${data.date}</small>
                    <a data-username=${data.username} class = "username">by: ${data.username}</a>
                      
    
                       <p id="upvotes"><small>views: ${data.views}</small></p> 
                        <div id="votediv">
                            <button  class="upvote btn-primary" id="upvoteButton" data-postid=${id}>&uarr;</button>
                            <h1 id="scoreCounter">${data.votes}</h1>
                            <button  class="downvote btn-primary" id="downvoteButton" data-postid=${id}>&darr;</button>
                        </div>
                        <br/>
                        <div id="descdiv">
                            <p id="description"align ="center">${data.name}</p>     
                        </div>
                        </div>
    
                        </div></div>
                          <br/>`);
                    
                    $(".downvote").off("click",downvoteHandler);
                    $(".downvote").on("click",downvoteHandler);
                    $(".upvote").off("click",upvoteHandler);
                    $(".upvote").on("click",upvoteHandler);
                    $(".username").off("click",showUserPosts);
                    $(".username").on("click",showUserPosts);
                    $(".showpost").off("click",clickHandler);
                    $(".showpost").on("click",clickHandler);
                    
                   }
    
                   //if the user made the post then he is allowed to delete it
                   else if(user.uid == uid)
                   {
                    $("#theposts").append(`
                    <div id="post_div">
                    <div id="titlediv">
                    <a data-postid=${id} class="showpost"><h1 >${data.title}</h1></a></div>
                        <small>created:   ${data.date}
                        <a data-username=${data.username} class = "username">by: ${data.username}</a></small>
                           <div class ="deletediv"> 
                                <button id="deletepost" class ="delete btn-danger" data-postid=${id}>delete </button>
                           </div>
    
                           <p id="upvotes"><small>views: ${data.views}</small></p> 
                            <div id="voterdiv">
                                <button  class="upvote btn-primary" id="upvoteButton" data-postid=${id}>&uarr;</button>
                                <h1 id="scoreCounter">${data.votes}</h1>
                                <button  class="downvote btn-primary" id="downvoteButton" data-postid=${id}>&darr;</button>
                            </div>
                            <br/>
                            <div id="descdiv">
                                <p id="description"align ="center">${data.name}</p>     
                            </div>
                            </div>
                                
                       
                            </div></div>
                                   <br/>`);

                                   $("#file").on("change",function(event){
                                    selectedFile = event.target.files[0];
                                    $("#uploadButton").show();
                                });


              $(".showpost").off("click",clickHandler);
              $(".showpost").on("click",clickHandler);
              $(".create_comment").off("click",createCommentClickHandler);
              $(".create_comment").on("click",createCommentClickHandler);
              $(".downvote").off("click",downvoteHandler);
              $(".downvote").on("click",downvoteHandler);
              $(".upvote").off("click",upvoteHandler);
              $(".upvote").on("click",upvoteHandler);
              $(".username").off("click",showUserPosts);
              $(".username").on("click",showUserPosts);
              $("#deletepost").off("click",deleteHandler);
              $("#deletepost").on("click",deleteHandler);
               }
                })

        });
        
    })
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
        console.log("postId:"+collectionId);
        db.collection(collectionId).get().then(function(querySnapshot) {
            $("#commentList").html('');
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                var data = doc.data();
                var id = doc.id;
                
                console.log("comment: "+data.comment);
                console.log("comment id: "+id);     
                           
                $("#commentList").append(`
                <div id=${id}>
                
                <div id="commentDiv">
                
                <div class="gradient-border" id="box">
                <span class="commentclose" title="commentclose" data-postid = ${data.linkedto} data-commentid=${id}>&times;</span>
                    <div id="commentdate" >
                    <p color="white">
                    <small  class="showcomment" data-commentid=${id} data-postid=${collectionId}>
                    date created: ${data.date}</p> </small>  <div id="voterdiv">
                    <button  class="upvote btn" id="upvoteCommentButton" data-commentid=${id} data-postid=${collectionId}>&uarr;</button>
                    <h1 id="scoreCounter">${data.votes}</h1>
                    <button  class="downvote btn" id="downvoteCommentButton" data-commentid=${id} data-postid=${collectionId}>&darr;</button>
                </div>
                    </div> <br>
                    <div id="descdiv">
                    <p >${data.comment}</p> </div>
                    </div>
                    </div>  
                    </div>

                <br/>`);
               
            });
            $(".showcomment").off("click",commentclickHandler);
            $(".showcomment").on("click",commentclickHandler);
            $(".commentclose").off("click",deleteCommentHandler);
            $(".commentclose").on("click",deleteCommentHandler);
            $("#upvoteCommentButton").off("click",upvoteCommentHandler);
            $("#upvoteCommentButton").on("click",upvoteCommentHandler);
            $("#downvoteCommentButton").off("click",downvoteCommentHandler);
            $("#downvoteCommentButton").on("click",downvoteCommentHandler);

        
        });
        
    }

    function displaySearchResults(search)
    {
        db.collection("posts").where("title", "==", search)
    .get()
    .then(function(querySnapshot) {
        $("#theposts").html('');
        querySnapshot.forEach(function(doc) {
                    var data = doc.data();
                    var id = doc.id;
                    console.log(data.votes);
                    console.log(id);                
                    $("#theposts").append(`
                    <li>
    
                    <div id="post_div" data-postid=${id} class="showpost">
                    
                        <div id="titlediv">
                        <small>created:   ${data.date}</small>
                            <h3 >${data.title}</h3></div>
                            <p id = "upvotes">votes: ${data.votes}</p>
                        
                        <br>
                        <a class="showpost" data-postid=${id}>${data.name}</a>
                        </li> 
    
                    </div>      <br/>`);
                });
    
                $(".showpost").off("click",clickHandler);
                $(".showpost").on("click",clickHandler);
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
  
    }
    
    //display a single post
    function displaySinglePost(postid){
     
        console.log(postid);
        const post = db.collection('posts').doc(postid);
        var name;   
             //THIS IS HOW YOU ACCESS EACH POST               
        post.get().then(doc => {

            var data = doc.data();
            var id = doc.id;
            var uid=data.author;
            console.log("post id:"+id);
            var viewcnt= data.views;
            viewcnt++;
            db.collection('posts').doc(postid).update({
                views: viewcnt
            })      
            firebase.auth().onAuthStateChanged((user) => {
                if(!user){

                    $("#mainscreen").html(`
                    <div id="post_div">
                    <div id="titlediv">
                    <h1 >${data.title}</h1></div>
                    <small>created:   ${data.date}</small>
                    <a data-username=${data.username} class = "username">by: ${data.username}</a>
                    
                       <p id="upvotes"><small>views: ${data.views}</small></p> 
                            <h1 id="scoreCounter">${data.votes}</h1>
                            
                        <br/>
                        <div id="descdiv">
                            <p id="description"align ="center">${data.name}</p>     
                        </div>
                        </div>
    
                        </div></div>
                            <div id = "commentbtn">
                            <input type="text" id = "commentInput" placeholder="enter comment"></input>
                        <button class="create_comment btn-primary" data-commentid=${id}> create comment</button>
                    
                    </div>      <br/>`);
                    
                 
                    $(".username").off("click",showUserPosts);
                    $(".username").on("click",showUserPosts);
               }

               
               //if there is a user logged in but not the same user that created the post 
               //then he can not delete the post
               else if(user.uid !=uid){
                $("#mainscreen").html(`
                <div id="post_div">
                <div id="titlediv">
                <h1 >${data.title}</h1></div>
                <small>created:   ${data.date}</small>
                <a data-username=${data.username} class = "username">by: ${data.username}</a>
                  

                   <p id="upvotes"><small>views: ${data.views}</small></p> 
                    <div id="votediv">
                        <button  class="upvote btn-primary" id="upvoteButton" data-postid=${id}>&uarr;</button>
                        <h1 id="scoreCounter">${data.votes}</h1>
                        <button  class="downvote btn-primary" id="downvoteButton" data-postid=${id}>&darr;</button>
                    </div>
                    <br/>
                    <div id="descdiv">
                        <p id="description"align ="center">${data.name}</p>     
                    </div>
                    </div>

                    </div></div>
                        <div id = "commentbtn">
                        <input type="text" id = "commentInput" placeholder="enter comment"></input>
                    <button class="create_comment btn-primary" data-commentid=${id}> create comment</button>
                
                </div>      <br/>`);
                
                $(".create_comment").off("click",createCommentClickHandler);
                $(".create_comment").on("click",createCommentClickHandler);
                $(".downvote").off("click",downvoteHandler);
                $(".downvote").on("click",downvoteHandler);
                $(".upvote").off("click",upvoteHandler);
                $(".upvote").on("click",upvoteHandler);
                $(".username").off("click",showUserPosts);
                $(".username").on("click",showUserPosts);
                
               }

               //if the user made the post then he is allowed to delete it
               else if(user.uid == uid)
               {
                $("#mainscreen").html(`
                    <div id="post_div">
                    <div id="titlediv">
                    <h1 >${data.title}</h1></div>
                    <small>created:   ${data.date}</small>
                    <a data-username=${data.username} class = "username">by: ${data.username}</a>
                       <div class ="deletediv"> 
                            <button id="deletepost" class ="delete btn-danger" data-postid=${id}>delete </button>
                       </div>

                       <p id="upvotes"><small>views: ${data.views}</small></p> 
                        <div id="voterdiv">
                            <button  class="upvote btn-primary" id="upvoteButton" data-postid=${id}>&uarr;</button>
                            <h1 id="scoreCounter">${data.votes}</h1>
                            <button  class="downvote btn-primary" id="downvoteButton" data-postid=${id}>&darr;</button>
                        </div>
                        <br/>
                        <div id="descdiv">
                            <p id="description"align ="center">${data.name}</p>     
                        </div>
                        </div>
                            
                   
                        </div></div>
                            <div id = "commentbtn">
                            <input type="text" id = "commentInput" placeholder="enter comment"></input>
                        <button class="create_comment btn-primary" data-commentid=${id}> create comment</button>
                    
                    </div>      <br/>`);
                    
                    
                    $("#file").on("change",function(event){
                        selectedFile = event.target.files[0];
                        $("#uploadButton").show();
                    });
         
          $(".create_comment").off("click",createCommentClickHandler);
          $(".create_comment").on("click",createCommentClickHandler);
          $(".downvote").off("click",downvoteHandler); 
          $(".downvote").on("click",downvoteHandler);
          $(".upvote").off("click",upvoteHandler);
          $(".upvote").on("click",upvoteHandler);
          $(".username").off("click",showUserPosts);
          $(".username").on("click",showUserPosts);
          $("#deletepost").off("click",deleteHandler);
          $("#deletepost").on("click",deleteHandler);
           }
   });
   
})
            

        //     $("#mainscreen").html(`
        //     <div id="post_div">
        //             <div id="titlediv">
        //             <h1 >${data.title}</h1></div>
        //             <small>created:   ${data.date}</small>
        //             <a data-username=${data.username} class = "username">by: ${data.username}</a>
        //                <div class ="deletediv"> 
        //                     <button id="deletepost" class ="delete btn-danger" data-postid=${id}>delete </button>
        //                </div>

        //                <p id="upvotes"><small>views: ${data.views}</small></p> 
        //                 <div id="votediv">
        //                     <button  class="upvote btn-primary" id="upvoteButton" data-postid=${id}>&uarr;</button>
        //                     <h1 id="scoreCounter">${data.votes}</h1>
        //                     <button  class="downvote btn-primary" id="downvoteButton" data-postid=${id}>&darr;</button>
        //                 </div>
        //                 <br/>
        //                 <div id="descdiv">
        //                     <p id="description"align ="center">${data.name}</p>     
        //                 </div>
        //                 </div>
                            
                   
        //      </div></div>
        //          <div id = "commentbtn">
        //         <input type="text" id = "commentInput" placeholder="enter comment"></input>
        //     <button class="create_comment btn-primary" data-commentid=${id}> create comment</button>
          
        //   </div>      <br/>`);
         
        //   $(".create_comment").off("click",createCommentClickHandler);
        //   $(".create_comment").on("click",createCommentClickHandler);
        //   $(".downvote").off("click",downvoteHandler);
        //   $(".downvote").on("click",downvoteHandler);
        //   $(".upvote").off("click",upvoteHandler);
        //   $(".upvote").on("click",upvoteHandler);
        //   $(".username").off("click",showUserPosts);
        //   $(".username").on("click",showUserPosts);

        getComments(postid);

}

    function displaySinglecomment(commentid,postid){
        
        
        let x = firebase.database().ref(postid);

        console.log(postid);
        const post = db.collection(postid).doc(commentid);
        var name;   
        
             //THIS IS HOW YOU ACCESS EACH POST               
        post.get().then(doc => {

            data = doc.data();
            var id = doc.id;
        console.log(postid);

        $("#mainscreen").html('');
        $("#mainscreen").html(`
        
                <div id="commentDiv">
                <div class="gradient-border" id="box">
                <span class="commentclose" title="commentclose" data-postid = ${data.linkedto} data-commentid=${id}>&times;</span>
                    <div id="commentdate" >
                    <p color="white">
                    date created: ${data.date}</p> </small>  <div id="voterdiv">
                    <button  class="upvote btn" id="upvoteButton" data-postid=${id}>&uarr;</button>
                    <h1 id="scoreCounter">${data.votes}</h1>
                    <button  class="downvote btn" id="downvoteButton" data-postid=${id}>&darr;</button>
                </div>
                    </div> <br>
                    <div id="descdiv">
                    <p >${data.comment}</p> </div>
                    </div>
                    </div>  
                  <br/>
                    <div id = "commentbtn">
                    <input type="text" id = "commentInput" placeholder="enter comment"></input>
                <button class="create_comment btn-primary" data-commentid=${id}> create comment</button>
            </div>    
    <br/>`);
        
         $(".create_comment").off("click",createCommentClickHandler);
         $(".create_comment").on("click",createCommentClickHandler);
        
        })
        getComments(commentid);


     }
    
   
  



