import Ember from 'ember';

export default Ember.Component.extend({
  // Proxy values
  tag_key_input: null,
  tag_value_input: null,
  actions: {
    // Update tags or dates
    setTagKeyValue() {
      this.set('tag_key', this.get('tag_key_input'));
      this.set('tag_value', this.get('tag_value_input'));
    }
  }
});
