import DS from 'ember-data';

export default DS.Model.extend({
  feed_version: DS.belongsTo('feed-version', { async: true }),
  // data: DS.attr(),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date')
});
