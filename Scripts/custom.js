
 
  function add()
        {
            db.collection("cities").add({
                name: "Tokydjaskfo",
                country: "Janfkasfkaspan"
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                document.location.reload(true);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });

        }
        



            //make auth 
            const auth = firebase.auth();
      

             //this gets a specific post from the lobby and saves it as a document
            //  const post = db.collection('lobby').doc('jMqlqRvOUgQ7Bmv36sY0');
            // //THIS IS HOW YOU ACCESS EACH POST               
            //  post.get().then(doc => {
            //      //console.log(doc.data());
            //      data = doc.data();
            //      console.log(data.title);
            //      console.log(data.description)
            //  });

            
              
            db.collection("lobby")
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    var data = doc.data();
                    console.log(data.title);
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });



    //Two views: 1. list of examples
    //2. single page app
    let clickHandler = function(evt){
        let postid = $(evt.currentTarget).attr("data-postid");
        displayPost(postid);   
    }

    function displayPosts()
    {
        db.collection("cities").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                var data = doc.data();
                var id = doc.id
                console.log(data.country);
                console.log(id);                
                $("#theposts").append(`
                <li>
                <div id="post_div">

                    <a class="showpost" data-postid=${id}>  ${data.country}
                    </a>
                    </li> 

                </div>      <br/>`);
                //console.log(doc.id, " => ", doc.data());


            });

            $(".showpost").off("click",clickHandler);
            $(".showpost").on("click",clickHandler);
        });
        
    }

    let displayLobby = function(){
        $("#mainscreen").html($("#mytemplate").html());
        db.collection("cities")
        .onSnapshot(function(doc) {
           // console.log("Current data: ", doc.data());
            displayPosts();
    
    
    });

   
        // firebase.database().ref("lobby").on("value", ss=>{
        //         let postsObj = ss.val();
        //         let postids = Object.keys(postsObj);
        //         $("theposts").html('');
        //         postids.map(postid=>{
        //             $("#theposts").append(`
        //             <li>
        //             <div id="post_div">

        //                 <a class="showpost" data-postid=${postsObj[postid].title}>  ${postsObj[postid].title}
        //                 </a>
        //                 </li> 

        //             </div>      <br/>`);
                        
        //         });

        //         $(".showpost").off("click",clickHandler);
        //         $(".showpost").on("click",clickHandler);
        // });
    

    }
        
        // citiesRef.doc("SF").set({
        //     name: "San Francisco", state: "CA", country: "USA",
        //     capital: false, population: 860000,
        //     regions: ["west_coast", "norcal"] });
    // $("#createExample").on("click",function(){

    //     console.log("cklicked");
    //    // var newExampleRef = db.collection("lobby");
    //     // newExampleRef.doc("testttt").set({
    //     //    title: $("#title").val(), description: $("#content").val()
    //     // })
    //     //let newExampleRef = firebase.database().ref("lobby").push();
    //     //newExampleRef.set({title: $("#title").val(),description: $("#content").val()});
    //      // add($("#title").val(), $("#content").val());
    //      db.collection("cities").add({
    //         //title:$("#title").val(),
    //         //desc: $("#content").val()
    //         title: "ok",
    //         desc: "no"
    //     })
    //     .then(function(docRef) {
    //         console.log("Document written with ID: ", docRef.id);
    //     })
    //     .catch(function(error) {
    //         console.error("Error adding document: ", error);
    //     });
        
    // });

    let create_post = function()
    {
        db.collection("cities").add({
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


    
    let displayPost = function(postid){
        let x = firebase.database().ref(postid);
        console.log(x);
        $("#mainscreen").html(`
        <div id="post_div">
        <h1 align ="center">${postid}</h1> 
        <ul id="users"> </ul>
        </div>
        `);

    }
    
   
