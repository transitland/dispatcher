import Ember from 'ember';

export default Ember.Mixin.create({
  per_page: '50',
  queryParams: [
    "offset",
    "per_page",
    "sort_key",
    "sort_order"
  ],
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
    let perPage = this.get("per_page");
    if (perPage !== '∞') {
      return Number(this.get("offset")) - Number(perPage);
    } else {
      return 0;
    }
  }),
  nextOffset: Ember.computed("offset", function() {
    let perPage = this.get("per_page");
    if (perPage !== '∞') {
      return Number(this.get("offset")) + Number(perPage);
    } else {
      return 0;
    }
  })
});
