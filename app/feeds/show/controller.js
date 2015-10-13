import Ember from 'ember';

export default Ember.Controller.extend({
  feedImports: Ember.computed('model', function() {
    return this.model.get('feed_imports');
  })
});
