import Ember from 'ember';
import { computed } from '@ember/object';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['list-group-item'],
  entityUrl: computed('activityUpdate', function() {
    return this.router.generate(
      `${this.get('activityUpdate.entity_type')}s.show`,
      this.get()
    );
  })
});
