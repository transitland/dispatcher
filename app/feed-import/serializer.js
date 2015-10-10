import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  attrs: {
    feed: {
      key: 'feed_onestop_id'
    }
  }
});
