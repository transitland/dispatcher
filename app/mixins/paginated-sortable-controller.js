import Ember from 'ember';

export default Ember.Mixin.create({
  queryParams: [
    "offset",
    "per_page",
    "sort_key",
    "sort_order"
  ],
  per_page: '50',
  offset: 0,
  sort_key: null,
  sort_order: null,
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
  }),
  actions: {
    changeSort: function(sortKey) {
      if (this.get('sort_key') !== sortKey){
        var sortOrder = 'asc';
      }
      else if (this.get('sort_order') === 'desc') {
        var sortOrder = 'asc';
      } else {
        var sortOrder = 'desc';
      }
      this.set('sort_key', sortKey);
      this.set('sort_order', sortOrder);
    }
  }
});
