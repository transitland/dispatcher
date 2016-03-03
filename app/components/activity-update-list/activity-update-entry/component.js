import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['list-group-item'],
  entityUrl: Ember.computed('activityUpdate', function() {
    return this.router.generate(
      `${this.get('activityUpdate.entity_type')}s.show`,
      this.get()
    );
  })
});
