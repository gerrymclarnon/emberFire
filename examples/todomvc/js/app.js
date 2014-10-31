/*global Ember, DS, Todos:true */
window.Todos = Ember.Application.create();
var commentsRef = new Firebase('https://todomvc-ember.firebaseio-demo.com/');

Todos.ApplicationAdapter = DS.FirebaseAdapter.extend({
	firebase: new Firebase("https://todomvc-ember.firebaseio-demo.com/")
});