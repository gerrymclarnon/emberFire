/*global Ember, DS, Todos:true */
window.Todos = Ember.Application.create();
var commentsRef = new Firebase('https://todomvc-ember.firebaseio-demo.com/');

Todos.ApplicationAdapter = DS.FirebaseAdapter.extend({
	firebase: new Firebase("https://todomvc-ember.firebaseio-demo.com/")
});

//Create an Firebase Simple Login client so we can do Facebook auth
var auth = new FirebaseSimpleLogin(commentsRef, function(error, user) {
    if (error) {
        // an error occurred while attempting login
        console.log(error);
    } else if (user) {
        myUserID = user.id;
        $("#loginDiv").text(user.first_name + " " + user.last_name);
    } else {
        // User logged out
    }
});

//Handle Login
function onLoginButtonClicked() {
    auth.login("password", { email: "person@firebase.com", password: "blah" });
}
