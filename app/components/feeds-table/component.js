import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['table-responsive'],
  selectableFeeds: Ember.computed('feeds', function () {
    return this.get('feeds').map(function (feed) {
      return Ember.ObjectProxy.create({
        content: feed,
        isSelected: false
      });
    });
  }),
  selectedFeeds: Ember.computed('selectableFeeds.@each.isSelected', function() {
    // return this.get('selectableFeeds').filter(function(feed) {
    //   return feed.get('isSelected');
    // });
    return this.get('selectableFeeds').filterBy('isSelected', true);
  }),
  anyFeedsSelected: Ember.computed.notEmpty('selectedFeeds'),
  allFeedsSelected: Ember.computed('selectedFeeds.[]', function() {
    return (this.get('selectedFeeds.length') === this.get('feeds.length')) && (this.get('feeds.length') > 0);
  }),
  actions: {
    selectNone: function () {
      this.get("selectableFeeds").forEach(function (feed) {
        feed.set("isSelected", false);
      });
    },
    selectAll: function () {
      this.get("selectableFeeds").forEach(function (feed) {
        feed.set("isSelected", true);
      });
    },
    enqueueSelectedFeedsForImport: function(importLevel) {
      const flashMessages = Ember.get(this, 'flashMessages');
      let importPromises = this.get('selectedFeeds').map(function(feed) {
        return feed.content.enqueue(importLevel);
      });
      Ember.RSVP.allSettled(importPromises).then( () => {
        flashMessages.success('Successfully enqueued latest versions of feed(s) for import!');
      }).catch( (e) => {
        flashMessages.danger(`Error enqueuing feed(s) for import: ${e.message}`);
      });
    }
  }
});
