/*global Todos, DS */
'use strict';

Todos.Player = DS.Model.extend({
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    fullName: function () {
        return this.get('firstName') + ' ' + this.get('lastName');
    }.property('firstName', 'lastName'),
	isCompleted: DS.attr('boolean'),
	saveWhenCompletedChanged: function () {
		this.save();
	}.observes('isCompleted')
});
