/*global Todos, Ember */
'use strict';

Todos.PlayersController = Ember.ArrayController.extend({

	actions: {
		createTodo: function () {
			var fullName, player;
			// Get the todo title set by the "New Todo" text field
            fullName = this.get('newTitle').trim().split(' ');
			if (!fullName) {
				return;
			}


			// Create the new Todo model
			player = this.store.createRecord('player', {
                firstName: fullName[0],
                lastName: fullName[1],
				isCompleted: false
			});
			player.save().then(function(value) {
                // success
            }, function(value) {
                // failure
            });

			// Clear the "New Todo" text field
			this.set('newTitle', '');
		},
		clearCompleted: function () {
			var completed = this.filterProperty('isCompleted', true);
			completed.invoke('deleteRecord');
			completed.invoke('save');
		}
	},

	remaining: function () {
		return this.filterProperty('isCompleted', false).get('length');
	}.property('@each.isCompleted'),

	remainingFormatted: function () {
		var remaining = this.get('remaining');
		var plural = remaining === 1 ? 'item' : 'items';
		return '<strong>%@</strong> %@ left'.fmt(remaining, plural);
	}.property('remaining'),

	completed: function () {
		return this.filterProperty('isCompleted', true).get('length');
	}.property('@each.isCompleted'),

	hasCompleted: function () {
		return this.get('completed') > 0;
	}.property('completed'),

	allAreDone: function (key, value) {
		if (value !== undefined) {
			this.setEach('isCompleted', value);
			return value;
		} else {
			return !!this.get('length') &&
				this.everyProperty('isCompleted', true);
		}
	}.property('@each.isCompleted')

});
