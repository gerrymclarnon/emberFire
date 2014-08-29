/*global Ember, DS, Todos:true */
window.Todos = Ember.Application.create();
var commentsRef = new Firebase('https://playermanager.firebaseio.com/teams/broomhillrovers');

Todos.ApplicationAdapter = DS.FirebaseAdapter.extend({
	firebase: new Firebase("https://playermanager.firebaseio.com/teams/broomhillrovers")
});

//Create an Firebase Simple Login client so we can do Facebook auth
var auth = new FirebaseSimpleLogin(commentsRef, function(error, user) {
    if (error) {
        // an error occurred while attempting login
        console.log(error);
    } else if (user) {
        myUserID = user.id;
        $("#loginDiv").text(user.first_name + " " + user.last_name + " (" + user.email + ")");
    } else {
        // User logged out
    }
});

//Handle Login
function onLoginButtonClicked() {
    auth.login("password", { email: "admin@playermanager.net", password: "thegaffer", rememberMe: false });
}
