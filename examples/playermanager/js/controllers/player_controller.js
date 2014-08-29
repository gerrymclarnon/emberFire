/*global Todos, Ember */
'use strict';

Todos.PlayerController = Ember.ObjectController.extend({

	isEditing: false,

	// We use the bufferedTitle to store the original value of
	// the model's title so that we can roll it back later in the
	// `cancelEditing` action.
	bufferedTitle: Ember.computed.oneWay('fullName'),

	actions: {
		editTodo: function () {
			this.set('isEditing', true);
		},
		doneEditing: function () {
			var bufferedTitle = this.get('bufferedTitle').trim();
			if (Ember.isEmpty(bufferedTitle)) {
				// The `doneEditing` action gets sent twice when the user hits
				// enter (once via 'insert-newline' and once via 'focus-out').
				//
				// We debounce our call to 'removeTodo' so that it only gets
				// sent once.
				Ember.run.debounce(this, this.send, 'removeTodo', 0);
			} else {
				var player = this.get('model');
                var fullName = bufferedTitle.split(' ');
                player.set('firstName', fullName[0]);
                player.set('lastName', fullName[1]);
				player.save();
			}
			// Re-set our newly edited title to persist it's trimmed version
            var fullName = bufferedTitle.split(' ');
            player.set('firstName', fullName[0]);
            player.set('lastName', fullName[1]);
			this.set('isEditing', false);
		},
		cancelEditing: function () {
			this.set('bufferedTitle', this.get('fullName'));
			this.set('isEditing', false);
		},
		removeTodo: function () {
			var todo = this.get('model');

			todo.deleteRecord();
			todo.save();
		}
	}

});
