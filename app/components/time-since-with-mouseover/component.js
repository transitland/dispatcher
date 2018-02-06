import Ember from 'ember';
import { computed } from '@ember/object';

const TimeSinceWithMouseoverComponent = Ember.Component.extend({
  tagName: 'abbr',
  dateAsString: computed('date', function() {
    let date = this.get('date');
    if (Ember.isPresent(date)) {
      return this.get('date').toString();
    }
  }),
  attributeBindings: ['title'],
  title: computed.alias('dateAsString')
});

TimeSinceWithMouseoverComponent.reopenClass({
  positionalParams: 'date'
});

export default TimeSinceWithMouseoverComponent;
