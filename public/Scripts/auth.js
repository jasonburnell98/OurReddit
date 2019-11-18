function googleSigninEvent(evt)
{
  googleSignin();
}

   $("#google").off("click",googleSigninEvent);
   $("#google").on("click",googleSigninEvent);

// listen for auth status changes
  //call back function, takes in user as a parameter
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ');
    
  } else {
    console.log('user logged out');
  
  }
})

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  const username= signupForm['signup-username'].value;
 


  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    firebase.auth().onAuthStateChanged((cred) => {
      if (cred) {
        
        console.log(cred.uid);
        db.collection("users").doc(cred.uid).set({
          username: username,
          emailaddress:email,
          uid:cred.uid
      })
      .then(function() {
          console.log("Document successfully written!");
          alert("user made with uid: "+cred.uid );
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
  
      }
     
    //document.location.reload(true);
  });
//  document.location.reload(true);
});})

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  document.location.reload(true);
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    document.location.reload(true);
    
  })

  .then(function(cred) {
    alert("logged in  ");
    document.location.reload(true);
})
.catch(function(error) {
    //console.error("credentials not found: ", error);
    alert("please check your email and password");
});
 
});

//AUTHENTICATE WITH GOOGLE
var providerg = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
   firebase.auth()
   
   .signInWithPopup(providerg).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
	
      document.location.reload(true);

   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

   });
}


var providergh = new firebase.auth.GithubAuthProvider();

function githubSignin() {
   firebase.auth().signInWithPopup(providergh)
   
   .then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
	
      console.log(token)
      console.log(user)
      document.location.reload(true);
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
		
      console.log(error.code)
      console.log(error.message)
   });
}

var providerfb = new firebase.auth.FacebookAuthProvider();

function facebookSignin() {
  firebase.auth().signInWithPopup(providerfb).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    document.location.reload(true);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}