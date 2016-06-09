import Ember from 'ember';

export default Ember.Mixin.create({
  per_page: 50,
  queryParams: ["offset", "per_page"],
  offset: 0,
  hasPreviousPage: Ember.computed("offset", function() {
    return this.get("offset") > 0;
  }),
  hasNextPage: Ember.computed("model.meta.next", function() {
    if (Ember.isPresent(this.get('model.meta.next'))) {
      return true;
    } else {
      return false;
    }
  }),
  previousOffset: Ember.computed("offset", function() {
    return this.get("offset") - this.get("per_page");
  }),
  nextOffset: Ember.computed("offset", function() {
    return this.get("offset") + this.get("per_page");
  })
});
