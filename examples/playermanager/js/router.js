/*global Ember, Todos */
'use strict';

Todos.Router.map(function () {
	this.resource('players', { path: '/' }, function () {
		this.route('active');
		this.route('completed');
	});
});

Todos.PlayersRoute = Ember.Route.extend({
	model: function () {
		return this.store.find('player');
	}
});

Todos.PlayersIndexRoute = Ember.Route.extend({
	setupController: function () {
        this.controllerFor('players').set('filteredTodos', this.modelFor('players'));
	}
});

Todos.PlayersActiveRoute = Ember.Route.extend({
	setupController: function () {
		var players = this.store.filter('players', function (player) {
			return !player.get('isCompleted');
		});
		this.controllerFor('players').set('filteredTodos', players);
	}
});

Todos.PlayersCompletedRoute = Ember.Route.extend({
	setupController: function () {
		var players = this.store.filter('player', function (player) {
			return player.get('isCompleted');
		});
		this.controllerFor('players').set('filteredTodos', players);
	}
});
